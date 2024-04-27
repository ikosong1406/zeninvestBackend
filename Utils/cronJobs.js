const mongoose = require("mongoose");
const cron = require("node-cron");
require("../Schemas/UsersDetails");

const User = mongoose.model("UserInfo");

// Function to generate profit and update totalInvested every 24 hours
async function updateTotalInvested() {
  try {
    const users = await User.find(); // Get all users

    for (const user of users) {
      let totalProfit = 0;

      // Calculate total profit from user's portfolio
      for (const investment of user.portfolio) {
        // Calculate profit for each investment (e.g., assuming profit is interest * amount)
        const investmentProfit = investment.interest * investment.amount;
        totalProfit += investmentProfit;
        investment.profit = investmentProfit; // Assign profit to the investment
      }

      // Update totalInvested with totalProfit
      user.totalInvested += totalProfit;
      await user.save();
    }

    console.log("updateTotalInvested function completed successfully.");
  } catch (error) {
    console.error("Error updating TotalInvested:", error);
  }
}

// Schedule the daily update task at 00:00 (midnight) every day
cron.schedule("0 0 * * *", () => {
  console.log("Cron job started.");
  updateTotalInvested();
});

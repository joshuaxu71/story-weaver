const { SlashCommandBuilder } = require("discord.js");

const BanActionService = require("@service/banAction.js");

const banActionService = new BanActionService();

module.exports = {
   data: new SlashCommandBuilder()
      .setName("ban_history")
      .setDescription("Lists the ban history of a specific user or the server.")
      .addUserOption((option) =>
         option
            .setName("user")
            .setDescription("The user whose ban history you want to view")
            .setRequired(false)
      ),
   async execute(interaction) {
      const user = interaction.options.getUser("user");
      let banActions;
      if (user) {
         banActions = await banActionService.getBanActionsByGuildIdAndUserId(
            interaction.guildId,
            user.id
         );
      } else {
         banActions = await banActionService.getBanActionsByGuildId(interaction.guildId);
      }

      let banHistory = [];
      if (banActions.length) {
         for (const banAction of banActions) {
            banHistory.push(
               `Date: ${banAction.createdDate}\nActor ID: ${banAction.actorId}\nActor Username: ${banAction.actorUsername}\nUser ID: ${banAction.userId}\nUser Username: ${banAction.userUsername}\nNote: ${banAction.note}`
            );
         }
      }

      if (!banActions.length) {
         banHistory.push("There are no bans yet.");
      }

      await interaction.reply({
         content: banHistory.join("\n\n"),
         ephemeral: true,
      });
   },
};

const { SlashCommandBuilder } = require("discord.js");

const { withPermissionAndBanCheck } = require("@auth/auth.js");
const ConfigService = require("@service/config.js");

const configService = new ConfigService();

async function execute(interaction) {
   const suffix = interaction.options.getString("suffix");

   if (await configService.setEndingSuffixByGuildId(interaction.guildId, suffix)) {
      await interaction.reply(`Ending suffix has been configured successfully.`);
   }
}

module.exports = {
   data: new SlashCommandBuilder()
      .setName("ending_suffix")
      .setDescription("Configure what the ending suffix is to end stories.")
      .addStringOption((option) =>
         option.setName("suffix").setDescription("Suffix to end the story").setRequired(true)
      ),
   execute: withPermissionAndBanCheck(execute),
};

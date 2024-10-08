const { SlashCommandBuilder } = require("discord.js");

const { withPermissionAndBanCheck } = require("@auth/auth.js");
const StoryInputService = require("@service/storyInput.js");

const storyInputService = new StoryInputService();

async function execute(interaction) {
   const storyInputId = interaction.options.getString("storyinputid");

   if (await storyInputService.deleteStoryInputById(storyInputId)) {
      await interaction.reply(`Story input been deleted successfully.`);
   }
}

module.exports = {
   data: new SlashCommandBuilder()
      .setName("delete_story_input")
      .setDescription("Deletes a story input.")
      .addStringOption((option) =>
         option
            .setName("storyinputid")
            .setDescription("ID of the story input to be deleted")
            .setRequired(true)
      ),
   execute: withPermissionAndBanCheck(execute),
};

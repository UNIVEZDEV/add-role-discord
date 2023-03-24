const discord = require('discord.js');
const config = require('./config.json');


const client = new discord.Client({
    intents: [
        "Guilds"
    ]
})

const commands = [{
    name: "role_add",
    description: "add role user",
    default_member_permissions: [discord.PermissionFlagsBits.Administrator],
    options: [{
            name: 'user',
            description: 'User',
            type: 6,
            required: true
        },
        {
            name: 'role',
            description: 'role',
            type: 8,
            required: true
        }
    ]
}]

client.on('ready', async () => {
    await client.application.commands.set(commands);
    console.log("Bot is Online!");
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand) return;
    if (interaction.commandName === 'role_add') {
        if (!config.ownerid.includes(interaction.user.id)) return interaction.reply({
            content: 'คุณไม่ใช่แอดมิน!',
            ephemeral: true
        });
        const user = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        user.roles.add(role);
        interaction.reply({
            content: `ให้ยศ ${role} ให้กับ ${user} สำเร็จ! ✅`
        })
    }
})




client.login(config.token)
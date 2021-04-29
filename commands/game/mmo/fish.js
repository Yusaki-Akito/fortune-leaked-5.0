const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    let userdata = await bot.db.getuser(message.author.id)
    if(userdata.backpackinventory.length>=config.storageperlvl*userdata.backpack){
        return message.reply("กระเป๋าคุณเต็มแล้ว")
    }
    
    let fishing_rod = bot.item.fishing_rod[userdata.fishing_rod]
    const expanded = fishing_rod.rate.flatMap(fish => Array(fish.pct).fill(fish));
    let reward = []
    let fishtime = 2
    for (let i = 0; i < fishtime; i++) {
        let fish = expanded[Math.floor(Math.random() * expanded.length)].id;
        if(fish) reward.push(fish)
    }
    message.channel.send(new Discord.MessageEmbed()

    .addField(`${fishing_rod.emoji} Fish!`,`คุณตกปลา **${fishtime}** รอบและได้:
${reward.length?reward.map((id)=>"+ "+bot.item[id].emoji+" "+bot.item[id].name).join("\n"):":x: คุณไม่ได้อะไรเลย ;-;"}`)
    .setAuthor(message.author.tag)
    .setColor(config.color)
    )
    for (let i = 0; i < reward.length; i++) {
        if(userdata.backpackinventory.length>=config.storageperlvl*userdata.backpack){
            message.reply("กระเป๋าคุณเต็มแล้ว")
            break;
        }
        userdata.backpackinventory.push(reward[i])
    }
    bot.db.prepare(`UPDATE users SET backpackinventory = :backpackinventory WHERE id = :id`).run({
        backpackinventory: JSON.stringify(userdata.backpackinventory),
        id: message.author.id
    })
}
exports.conf = { aliases: ["f"],delay: 4000 };
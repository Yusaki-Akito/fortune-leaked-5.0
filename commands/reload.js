  const Discord = require('discord.js') 
  /**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
module.exports.run = async(bot, message, args) => {
	message.delete()
  let msg = message.channel.send("กำลังรีโหลด command(s)! 🔄")
  require(appRoot+'/config/command')(bot);
  msg.then((msg)=>{
    msg.edit("รีโหลด command(s) เสร็จแล้ว <:CheckMark:515870172377120780>")
  })
}

exports.conf = { aliases: [],
permission: "dev"};
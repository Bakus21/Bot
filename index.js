const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const config = require("./botconfig.json");
const request = require('request');
const { url } = require("inspector");
const refresh = 10;
const IP = "146.59.41.9:30120";




bot.commands = new Discord.Collection();


fs.readdir("./komendy/", (err, files) => {
	if(err) console.log(err)
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
		console.log("Seller K0L1NEK#9016");
		return;
	}
	
	jsfile.forEach((f, i) => {
		let props = require(`./komendy/${f}`);
        console.log(`${f} Został załadowany! Seller K0L1NEK#9016`);
        bot.commands.set(props.help.name, props);
	});
	
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  











  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


  if(message.content == "!tworca"){
      var embed = new Discord.MessageEmbed()
      .setTitle("Main Dream")
      .setDescription("(Wiadomość Twórcy)")
      .setColor(`${config.kolorst}`)
      .addField('Discord:', 'https://discord.gg/SzGPMAk')
      .setFooter("Main Dream © ","https://i.imgur.com/xMsnuKc.png")
      message.delete()
      message.reply(embed)

  }

});

bot.on('ready', async () => {
    console.log("Bot zostal odpalony. Bot również został wykonany przez MDD#6674");
    setInterval(async () => {
            await request(`http://${IP}/players.json`, async (error, response, playerss) => {
                let players = JSON.parse(playerss);
                    bot.user.setActivity(`${players.length} / ${config.sloty}`, { type: "WATCHING"  
                        
              });
            });
	}, refresh * 1000);
});

bot.login(config.token);
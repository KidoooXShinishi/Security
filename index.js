const { Client, Collection } = require('discord.js');
const { readdirSync } = require("fs");
const { TOKEN, PREFIX } = require('./config.js');

const client = new Client();
client.commands = new Collection();

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande chargée: ${getFileName.help.name}`);
    };
  });
};

loadCommands();

client.on('message', message =>{
  if (!message.content === (PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.help.args && !args.length) {
    let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

  if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande:\`${PREFIX}${command.help.name} ${command.help.usage}\``

    return message.channel.send(`\nVoici comment utiliser la commande:\`${PREFIX}${command.help.name} ${command.help.usage}\``);
  }

  command.run(client, message, args);
});

client.on("guildMemberAdd", member => {
  member.roles.add("770344536736006154")

})
client.on("message", (message) => {
  if (message.content.includes("https://")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete();
    message.channel.send("Pas de lien ici, " + `${message.member}`)
  }
    if (message.content.includes("http://")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete();
    message.channel.send("Pas de lien ici, " + `${message.member}`)
  }
  if (message.content.includes("www.")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete();
    message.channel.send("Pas de lien ici, " + `${message.member}`)
  }
   if (message.content.includes("discord.gg/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete();
    message.channel.send("Pas de lien ici, " + `${message.member}`)
  }
});
  



client.on('ready', () => {
  const statuses = [
      () => `Security +help`,
  ]
  let i = 0
  setInterval(() => {
      client.user.setActivity(statuses[i](), {type: 'STREAMING'})
      i = ++i % statuses.length
  }, 1e4)

})

client.on('ready', () => console.log(`${client.user.tag}! est connecté`));
client.login(TOKEN);
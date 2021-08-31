const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const client = new Discord.Client()
const mySecret = process.env["TOKEN"]
const querystring = require('querystring');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
const prefix = "d!"


function update() {
  tick+=1
  setTimeout(update, 1000)
}

client.on('ready', () => {
  client.user.setActivity('the chat | d! help ', { type: 'WATCHING' })
})

client.on('message', async (msg) => {
  //if our message doesnt start with our defined prefix, dont go any further into function
  if(!msg.content.startsWith(prefix)) {
    return  
  }


  const args = msg.content.slice(prefix.length).trim().split(" ")
  
 //splits off the first word from the array, which will be our command
  const command = args.shift().toLowerCase()
  //log the command
  console.log("command: ", command)
  //log any arguments passed with a command
  console.log(args)

  if(command === "muffin") {
   msg.react("🧁")
    const muffinEmbed = new Discord.MessageEmbed ()
    .setColor("#0064ff")
    .setDescription("wow, i love myself some small domed spongy cake made with eggs and baking powder or also known as a flat circular spongy bread roll made from yeast dough and eaten split, toasted, and buttered myself!")
    msg.channel.send(muffinEmbed);
  }

  if(command === "joke") {
    //async API call using async/await syntax
    let getJoke = async () => {
      //make API call
      let result = await fetch("https://official-joke-api.appspot.com/random_joke")
      //convert to object we can work with
      let json = await result.json()
      return json
    }
    //call function defined above
    let joke = await getJoke()
    
    //have our bot reply using the data returned from our API call
   const jokeSend = new Discord.MessageEmbed()
      .setColor("#0064ff")
      .setTitle("Here is your joke you requested")
      .setDescription(`${joke.setup}\n   || ${joke.punchline}|| `)
    msg.channel.send(jokeSend)

  }
  if (command === "help") {
    const help = new Discord.MessageEmbed()
      .setColor("#0064ff")
      .setTitle("Help")
      .setAuthor("Muffin bot")
      .setDescription("Here are a list of commands to get you started:\n Type the prefix `m.` followed by one of the commands below to get started!")
      .addFields(
        { name: "Quick Defenitions", value: "`dictionary` to request \na defenition of a \nword", inline: true},
        { name: "Cook Up Something", value: "`bake` to bake \nup some goodies", inline: true},
        { name: "Command For Laughs", value: "`joke` to request me \nfor a good original \njoke", inline: true},
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true },
      )
      .addField("Inline field title", "Some value here", true)
    msg.channel.send(help)


  }
  if (command === "eat") {
    if (args[0]) {
      msg.reply(`You ate ${args} and it gave you special powers! LOL!`)
    } else {
      msg.reply("I wonder what you are trying to eat...")
    }
  } 
  else if (command === "dict" || command === "dictionary") {
		if (!args.length) {
			return ('You need to supply a search term!')
		}
		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
	
  	.then(response => response.json());
    
    if (!list.length) {
      return msg.channel.send(`No results found for **${args.join(' ')}**.`);
    }

     const [answer] = list;

    const dict = new Discord.MessageEmbed()
    	.setColor("#EFFF00")
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
			);
		msg.channel.send(dict);
  } 
})

keepAlive()
client.login(process.env.TOKEN)
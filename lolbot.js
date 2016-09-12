// libraries, folders, files
const Discord = require('discord.js'),
      fs = require('fs'),
      configFile = 'config.json',
      bot = new Discord.Client(),
      commands = require('./lib/commands')(bot);

// static data
let config;
const commandsList = {
        'commands': 'Lists all available commands',
        'help': '\`\`\` help <command> \`\`\`\n' +
                'Show the usage description of a given command',
        'setname': '\`\`\` setname <name with spaces | namewithoutspaces> \`\`\`\n' +
                'Set the name of the bot - the new name can contain spaces\n' +
                'Choose carefully! You can only change the bot name twice per hour\n' +
                '**Requires you to be a bot owner**',
        'mmr': '\`\`\` mmr <summonername> [na | euw | eune] \`\`\`\n' +
            'Get\'s user mmr from http://whatismymmr.com/.\n' +
            'If there are any spaces in the summoner name replace them with \'+\'\n' +
            'If no region is given, lookup defaults to NA',
        'bestrated': '\`\`\` bestrated [top | middle | jungle | adc | support] \`\`\`\n' +
            'Retrieves the top 10 \"Best Rated\" champions according to champion.gg\n' +
            'If a role is given, retrieves the best rated champions for the given role\n' +
            'If no role is given, retrieves the best rated champions from all roles\n' +
            '\**"Overall Performance takes more than win rate into account' + 
            '- including play rate, ban rate, kda, gold, cs, damage and other role dependant stats.\"**',
        'bestwinrate': '\`\`\` bestwinrate [top | middle | jungle | adc | support] \`\`\`\n' +
            'Retrieves the top 10 champions with the highest winrate from champion.gg\n' +
            'If a role is given, retrieves the highest winrate champions for the given role\n' +
            'If no role is given, retrieves the highest winrate champions from all roles\n'
    };
exports.commandsList = commandsList;

// static methods
// read the config file and populate the config var
const readConfig = (cb) => {
    try {
        console.log('Attempting to load `config.json` from ' + __dirname);
        config = JSON.parse(fs.readFileSync(configFile)),
        exports.config = config;
        console.log('Config file successfully read');
        cb();
    } catch (err) {
        console.log(err.message);
        console.log('Please fix the issue and restart')
    }   
}

// do things with the config options
const populateOptions = () => {
    if (!config.commandPrefix) {
        console.log('Please set a valid command prefix');
        process.exit(1);
    }
}

// Read the config, log the bot in, populate options
readConfig(() => {
    bot.login(config.DiscordBotToken);
    populateOptions();
});

bot.on('ready', () => {
    console.log('lolbot running');
});

bot.on('error', (error) => {
    console.log('lolbot encountered an error:' + error);
});
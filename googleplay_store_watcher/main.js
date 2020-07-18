var gplay = require('google-play-scraper');
var fs = require("fs");
const { exit } = require('process');

const outputFilename  = process.argv[2]; // first argument
if (outputFilename == undefined) {
  console.error("Error: an argument is required");
  console.error("command usage: \`node main.js output.json\`");
  exit(1);
}

gplay.list({
    collection: gplay.collection.TOP_GROSSING_GAMES, //「売上トップのゲーム」
    num: 200, //200が上限っぽい
    country: "jp"
  }).then(function(results) {
    return new Promise(function(resolve, reject) {
            fs.writeFile(outputFilename, JSON.stringify(results), function(err) {
               if (err) reject(err);
               else resolve(results);
            });
    });
  }).then(function(results) {
       console.log("[Success] outputfile: " + outputFilename);
       num_result = results.length
       console.log("number of result: " + num_result);
  }).catch(function(err) {
       console.log("[Error]: " + err);
  });
var gplay = require('google-play-scraper');
var fs = require("fs");
const { exit } = require('process');

let outputFilename  = process.argv[2]; // first argument
if (outputFilename == undefined) {
  require('date-utils');
  var dt = new Date();
  var formatted = dt.toFormat("YYYYMMDDHH24MISS");
  outputFilename = formatted+".json";
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
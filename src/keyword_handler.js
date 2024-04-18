const fs = require("fs");

function getDefaultKeywords(topic) {
    let obj = JSON.parse(fs.readFileSync("./src/keyword_categories.json", "utf8"));
    return Array.from(obj[topic]);
}

module.exports = getDefaultKeywords;

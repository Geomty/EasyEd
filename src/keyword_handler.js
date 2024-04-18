const fs = require("fs");

function getDefaultKeywords(topic) {
    let obj = JSON.parse(fs.readFileSync("./public/defalt_keywords.json", "utf8"));
    return obj[topic];
}

module.exports = getDefaultKeywords;

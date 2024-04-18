const logger = require("./logger");
const getVideos = require("./api.js");
const getDefaultKeywords = require("./keyword_handler.js");

async function handleClient(client) {
    let keywords = getDefaultKeywords("default");
    let data = await getVideos(keywords);
    if (data.error) {
        logger(data.error);
        // Return statement to prevent further code execution
        return client.send(`ERROR: ${data.error}`);
    }
    let next = data.next;
    let videos = data.ids;

    client.send("Child process running");
    client.on("message", async message1 => {
        message = message1.toString();
        if (message == "get video") {
            let video = videos.pop(0);
            console.log(`Sending video id ${video} to client`);
            client.send(video);

            if (videos.length <= 1) {
                data = await getVideos(keywords, next);
                if (data.error) {
                    logger(data.error);
                    return client.send(`ERROR: ${data.error}`);
                }
                next = data.next;
                videos = videos.concat(data.ids);
            }
        } else if (message.split(" ")[0] == "keyword_category") {
            keywords = getDefaultKeywords(message.split(" ")[1]);
            data = await getVideos(keywords);
            if (data.error) {
                logger(data.error);
                return client.send(`ERROR: ${data.error}`);
            }
            next = data.next;
            videos = data.ids;

            let video = videos.pop(0);
            console.log(`Sending video id ${video} to client`);
            client.send(video);
        } else if (message.split(" ") == "keywords") {
            keywords = message.split(" ").slice(1, -1);
        } else {
            logger(`Invalid message from client: ${data}`);
            client.send("ERROR: Invalid message");
        }
    })
}

module.exports = handleClient;

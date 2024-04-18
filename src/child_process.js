const logger = require("./logger");
const getVideos = require("./api.js");
const getDefaultKeywords = require("./keyword_handler.js");

function handleClient(client) {
    let keywords = getDefaultKeywords("default");
    let videos = [];
    let data = getVideos(keywords);
    if (data.error) {
        logger(data.error);
        client.send(data.error);
        // Return statement to prevent further code execution
        return client.close();
    }
    let next = data.next;
    videos.extend(data.ids);

    client.send("child process running");
    client.on("message", message => {
        if (message == "get video") {
            //client.send("dQw4w9WgXcQ");
            let video = videos.pop(0);
            console.log(`Sending video id ${video} to client`);
            client.send(video);

            if (videos.length == 0) {
                data = getVideos(next);
                if (data.error) {
                    client.send(data.error);
                    return client.close();
                }
                next = data.next;
                video.extend(data.ids);
            }
        } else if (message.split(" ")[0] == "keywordsDefault") {
            keywords = getDefaultKeywords(message.split(" ")[1]);
        } else if (message.split(" ") == "keywords") {
            keywords = message.split(" ") // TODO
        } else {
            logger(`Invalid message from client: ${data}`);
            client.send("Invalid message");
        }
    })
}

module.exports = handleClient;

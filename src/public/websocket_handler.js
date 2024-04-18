const ipAddress = window.location.hostname;
console.log(ipAddress);
const ws = new WebSocket('ws://'+ipAddress+':443/');
ws.addEventListener("open", async () => {
    console.log("Websocket connected");
    for (let i = 0; i < 2; i++) {
        console.log(await waitForMessage());
    }
    await displayVideo();
});

// ws.onmessage = event => {
//     console.log(event.data); // TODO remove
// };

async function sendMessage(message, event) {
    await ws.send(message);
    event.preventDefault();
}

function waitForMessage() {
    return new Promise(resolve => {
        ws.onmessage = event => {
            resolve(event.data);
        };
    });
}

async function nextVideo(event) {
    await sendMessage("get video", event);
    const message = await waitForMessage();
    if (message.startsWith("ERROR")) {
        message = await waitForMessage();
    }
    if (message.startsWith("ERROR")) {
        console.log(message);
    }
    return message;
}

function setKeywords(keywordCategory, event) {
    sendMessage("keyword_category " + keywordCategory, event);
}

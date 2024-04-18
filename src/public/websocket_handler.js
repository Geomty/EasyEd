const ipAddress = window.location.hostname;
console.log(ipAddress);
const ws = new WebSocket('ws://'+ipAddress+':443/');
ws.addEventListener("open", () => {
    console.log("We are connected");
    sendMessage();
});

ws.onmessage = event => {
    console.log(event.data);
};

function sendMessage(message, event) {
    let inputMessage = "get video";
    ws.send(inputMessage);
    event.preventDefault();
}

async function waitForMessage() {
    return await new Promise(resolve => {
        ws.onmessage = event => {
            resolve(event.data);
        };
    });;
}

async function nextVideo(event) {
    sendMessage(category, event);
    message = await waitForMessage();
    if (message.split(" ").length > 1) {
        // show error message on ui
    }
}

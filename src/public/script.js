const ipAddress = window.location.hostname;
console.log(ipAddress);
const webSocket = new WebSocket('ws://'+ipAddress+':443/');
webSocket.addEventListener("open", () => {
    console.log("We are connected");
    sendMessage();
});

webSocket.onmessage = (event) => {
    console.log(event);
};

function sendMessage(event) {
    let inputMessage = "test value";
    webSocket.send(inputMessage.value);
    event.preventDefault();
}

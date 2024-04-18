const params = new URLSearchParams(Object.entries({
  autoplay: 1,
  disablekb: 1,
  loop: 1,
  playsinline: 1
}));

async function displayVideo(event = new Event("keypress")) {
  const id = await nextVideo(event);
  if (id.startsWith("ERROR")) {
    alert("Something went wrong...");
    console.log(id);
  } else {
    document.getElementsByClassName("ytvideo")[0].src = `https://www.youtube.com/embed/${id}?playlist=${id}&${params}`;
  }
}

var counter = 0;
var counterDiv = document.getElementById("counter");

document.getElementsByTagName("body")[0].addEventListener("keydown", async event => {
  if (event.key == "ArrowDown" || event.key == "ArrowRight") {
    await displayVideo(event);
    counterDiv.textContent = ++counter;
  }
})

var btnContainer = document.getElementsByClassName("li");
var btns = Array.prototype.slice.call(document.getElementsByClassName("btn"));
var categories = ["default", "math", "science", "arts", "social studies", "language"];

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", event => {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
    
    setKeywords(categories[btns.indexOf(event.currentTarget)], event);
  });
}

const params = new URLSearchParams(Object.entries({
  autoplay: 1,
  disablekb: 1,
  loop: 1,
  playsinline: 1
}));

var count = -1;
var counter = document.getElementById("counter");

async function displayVideo(event = new Event("keypress")) {
  const id = await nextVideo(event);
  if (id.startsWith("ERROR")) {
    alert("Something went wrong...");
    console.log(id);
  } else {
    document.getElementsByClassName("ytvideo")[0].src = `https://www.youtube.com/embed/${id}?playlist=${id}&${params}`;
  }
  counter.textContent = ++count;
}

document.getElementsByTagName("body")[0].addEventListener("keydown", async event => {
  if (event.key == "ArrowDown" || event.key == "ArrowRight") {
    await displayVideo(event);
  }
})

var btnContainer = document.getElementsByClassName("li");
var btns = Array.prototype.slice.call(document.getElementsByClassName("btn"));
var categories = ["default", "math", "science", "arts", "social", "language"];

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", async event => {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
    
    setKeywords(categories[btns.indexOf(event.currentTarget)], event);
    await waitForMessage();
    displayVideo(event);
  });
}

counter.style.opacity = 1;
document.getElementById("sliderInput").addEventListener("click", () => {
  toggle();
});
function toggle() {
  if (counter.style.opacity == 1) {
    counter.style.opacity = 0;
  } 
  else {
    counter.style.opacity = 1;
  }
}

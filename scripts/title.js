var toppath = document.querySelector('.top-percent');
var lengthTop = toppath.getTotalLength();

var path = document.querySelector('.slash-percent');
var lengthSlash = path.getTotalLength();

var bottompath = document.querySelector('.bottom-percent');
var lengthBottom = bottompath.getTotalLength();

let root = document.documentElement;

console.log(lengthBottom)

  root.style.setProperty('--length-top', lengthTop);
  root.style.setProperty('--length-slash', lengthSlash);
  root.style.setProperty('--length-bottom', lengthBottom);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#title-section",
      start: "top top",
      onEnter: () => animate(),
      onLeave: () => unAnimate(),
      onEnterBack: () => animate(),
    },
  });

  function animate() {
    toppath.classList.add("top-animate");
    bottompath.classList.add("bottom-animate");
}

function unAnimate() {
    toppath.classList.remove("top-animate");
    bottompath.classList.remove("bottom-animate");
}
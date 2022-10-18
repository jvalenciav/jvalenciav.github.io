slide = document.querySelectorAll(".slide");
nextSlide = document.querySelector(".right-slider");
prevSlide = document.querySelector(".left-slider");
var index = 0;
allSlides = slide.length;

nextSlide.onclick = function () {
  next("next");
};
prevSlide.onclick = function () {
  next("prev");
};

function next(direction) {
  if (direction == "next") {
    index++;
    if (index == allSlides) {
      index = 0;
    }
  } else {
    if (index == 0) {
      index = allSlides - 1;
    } else {
      index--;
    }
  }

  for (i = 0; i < slide.length; i++) {
    slide[i].classList.remove("active");
    console.log(slide[i]);
  }
  slide[index].classList.add("active");
}

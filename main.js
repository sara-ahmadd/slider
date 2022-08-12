let images = Array.from(document.querySelectorAll(".image img"));
let nextBtn = document.querySelector("#next");
let parentDiv = document.querySelector(".image");
let imageNumber = document.querySelector(".image span");

images.forEach((img, index) => {
  img.style.left = `${index * 100}%`;
});

let prevBtn = document.querySelector("#prev");
//create list of bullets
let bulletsList = document.createElement("ul");

for (let i = 1; i <= images.length; i++) {
  let bullet = document.createElement("li");
  bullet.id = `${i}`;
  bullet.innerText = i;
  bulletsList.appendChild(bullet);
}
//insert the created list between the next and prev buttons.
prevBtn.insertAdjacentElement("afterend", bulletsList);

//set the default slide index.
let slideCount = 1;
//set the active slide number to one.
imageNumber.innerHTML = `Image ${slideCount} of ${images.length}`;

//add click event to the next button.
nextBtn.addEventListener("click", (e) => {
  prevBtn.classList.remove("disabled");
  if (slideCount === images.length) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
  if (nextBtn.classList.contains("disabled")) {
    return false;
  } else {
    slideCount++;
    slidesMove();
  }
});

//add click event to the previus button.
prevBtn.addEventListener("click", (e) => {
  nextBtn.classList.remove("disabled");
  if (slideCount === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  if (prevBtn.classList.contains("disabled")) {
    return false;
  } else {
    slideCount--;
    slidesMove();
  }
});

//display slides.
function slidesMove() {
  images.forEach((img) => {
    img.classList.remove("active");
  });
  images[slideCount - 1].classList.add("active");
  images.forEach((img) => {
    img.style.transform = `translatex(-${(slideCount - 1) * 100}%)`;
  });
  imageNumber.innerHTML = `Image ${slideCount} of ${images.length}`;
  checkActive();
}

let bullets = Array.from(document.querySelectorAll("ul li"));

//set the default active bullet.
bullets[0].classList.add("active");
//on click on each bullet the corresponding image is displayed.
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    bullets.forEach((b) => {
      b.classList.remove("active");
    });
    slideCount = index + 1;
    slidesMove();
  });
});

//function to check the active bullet number.
function checkActive() {
  bullets.forEach((bullet) => {
    if (bullet.id == slideCount) {
      bullet.classList.add("active");
    } else {
      bullet.classList.remove("active");
    }
  });
}

var carousel = document.querySelector('#starredPokemons__carousel');
var cells = document.querySelectorAll('.starredPokemons__card');
var cellCount; // cellCount set from cells-range input value
var selectedIndex = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;
let rotateIndex = 0;
// console.log( cellWidth, cellHeight );

(function () {
  cells[0].classList.add("card__visible");
}())

function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
  rotateFn + '(' + angle + 'deg)';

  cells.forEach(((element,index) => {
    if (rotateIndex >= 9) {
      rotateIndex = 0;
    } else if(rotateIndex < 0) {
      rotateIndex += 9;
    }

    if(index != rotateIndex)
    element.classList.remove("card__visible");
    else {
      element.classList.add("card__visible");
    }
  }))
}

var prevButton = document.querySelector('#button__previous');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateIndex--;
  rotateCarousel();
});

var nextButton = document.querySelector('#button__next');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateIndex++;
  rotateCarousel();
});

function changeCarousel() {
  cellCount = 9;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      // cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px) translateY(-50%)';
      // cell.style.transform = `${rotateFn + cellAngle}deg, translateZ(${radius}px) translateY(-50%)`;
      // carousel.style.transform = rotateFn + '(' + cellAngle + 'deg) translateY(-50%)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateCarousel();
}

changeCarousel();

// var orientationRadios = document.querySelectorAll('input[name="orientation"]');
// ( function() {
//   for ( var i=0; i < orientationRadios.length; i++ ) {
//     var radio = orientationRadios[i];
//     radio.addEventListener( 'change', onOrientationChange );
//   }
// })();

// function onOrientationChange() {
//   var checkedRadio = document.querySelector('input[name="orientation"]:checked');
//   isHorizontal = checkedRadio.value == 'horizontal';
//   rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
//   changeCarousel();
// }

// // set initials
// onOrientationChange();

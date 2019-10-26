'use strict';


function AllProductsCont(name, src) {
  this.name = name;
  this.src = src;
  this.clickCounter = 0;
  this.seenCounter = 0;
  AllProductsCont.all.push(this);
}

AllProductsCont.initialCounter = 0;
AllProductsCont.maxLimit = 25;
AllProductsCont.all = [];
//console.log(' aaaalllllllll ' , AllProductsCont.all);


AllProductsCont.container = document.getElementById('products-container');

AllProductsCont.leftImage = document.getElementById('left-product-image');
AllProductsCont.middleImage = document.getElementById('middle-product-image');
AllProductsCont.rightImage = document.getElementById('right-product-image');


AllProductsCont.leftTitle = document.getElementById('left-product-title');
AllProductsCont.middleTitle = document.getElementById('middle-product-title');
AllProductsCont.rightTitle = document.getElementById('right-product-title');

AllProductsCont.leftObject = null;
AllProductsCont.middleObject = null;
AllProductsCont.rightObject = null;

new AllProductsCont('bag', 'img/bag.jpg');
new AllProductsCont('banana', 'img/banana.jpg');
new AllProductsCont('bathroom', 'img/bathroom.jpg');
new AllProductsCont('boots', 'img/boots.jpg');
new AllProductsCont('breakfast', 'img/breakfast.jpg');
new AllProductsCont('bubblegum', 'img/bubblegum.jpg');
new AllProductsCont('chair', 'img/chair.jpg');
new AllProductsCont('cthulhu', 'img/cthulhu.jpg');
new AllProductsCont('dog-duck', 'img/dog-duck.jpg');
new AllProductsCont('dragon', 'img/dragon.jpg');
new AllProductsCont('pen', 'img/pen.jpg');
new AllProductsCont('pet-sweep', 'img/pet-sweep.jpg');
new AllProductsCont('scissors', 'img/scissors.jpg');
new AllProductsCont('shark', 'img/shark.jpg');
new AllProductsCont('sweep', 'img/sweep.png');
new AllProductsCont('tauntaun', 'img/tauntaun.jpg');
new AllProductsCont('unicorn', 'img/unicorn.jpg');
new AllProductsCont('usb', 'img/usb.gif');
new AllProductsCont('water-can', 'img/water-can.jpg');
new AllProductsCont('wine-glass', 'img/wine-glass.jpg');



function renderNewProducts() {

  var forbidden = [AllProductsCont.leftObject, AllProductsCont.middleObject, AllProductsCont.rightObject];

  do {

    AllProductsCont.leftObject = getRandomProduct();

  } while (forbidden.includes(AllProductsCont.leftObject))
  forbidden.push(AllProductsCont.leftObject);
  do {

    AllProductsCont.middleObject = getRandomProduct();

  } while (forbidden.includes(AllProductsCont.middleObject));
  forbidden.push(AllProductsCont.middleObject);
  do {

    AllProductsCont.rightObject = getRandomProduct();
  } while (forbidden.includes(AllProductsCont.rightObject));
  // forbidden.push(AllProductsCont.rightObject);

  AllProductsCont.leftObject.seenCounter++;                                        /// Increment The Counter 
  //console.log('showctr' , seenCounter);   
  AllProductsCont.middleObject.seenCounter++;
  AllProductsCont.rightObject.seenCounter++;


  var leftProductImageElement = AllProductsCont.leftImage;
  var middleProductImageElement = AllProductsCont.middleImage;
  var rightProductImageElement = AllProductsCont.rightImage;


  leftProductImageElement.setAttribute('src', AllProductsCont.leftObject.src);            // Left Product 
  leftProductImageElement.setAttribute('alt', AllProductsCont.leftObject.name);

  middleProductImageElement.setAttribute('src', AllProductsCont.middleObject.src);        // Middle Product 
  middleProductImageElement.setAttribute('alt', AllProductsCont.middleObject.name);

  rightProductImageElement.setAttribute('src', AllProductsCont.rightObject.src);          // Right Product 
  rightProductImageElement.setAttribute('alt', AllProductsCont.rightObject.name);


  AllProductsCont.leftTitle.textContent = AllProductsCont.leftObject.name;
  AllProductsCont.middleTitle.textContent = AllProductsCont.middleObject.name
  AllProductsCont.rightTitle.textContent = AllProductsCont.rightObject.name;

}  // Ending render Products function 





function getRandomProduct() {
  var index = Math.floor(Math.random() * AllProductsCont.all.length);
  console.log('index', index);
  return AllProductsCont.all[index];
}  // Ending random product function 



function updateTotals() {

  var alloutput = document.getElementById('productsTable');

  alloutput.innerHTML = '';

  for (var i = 0; i < AllProductsCont.all.length; i++) {
    var newProduct = AllProductsCont.all[i];
    var output = addElement('output', alloutput);
    addElement('p', output, newProduct.name + ' had ' + newProduct.clickCounter + ' votes and was shown ' + newProduct.seenCounter + ' times');
  }
} // Ending Total Updates product function 



function addElement(tag, container, text) {

  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;

} // Ending Add Element  function 



function clickHandler(event) {

  var clickItemId = event.target.id;
  var productChlicked;

  if (clickItemId === 'left-product-image') {
    productChlicked = AllProductsCont.leftObject;
  } else if (clickItemId === 'middle-product-image') {
    productChlicked = AllProductsCont.middleObject;
  } else if (clickItemId === 'right-product-image') {
    productChlicked = AllProductsCont.rightObject;

  } else {
    console.log('oooops , Finished ', clickItemId);
  }

  if (productChlicked) {
    productChlicked.clickCounter++;
    AllProductsCont.initialCounter++;

    

    if (AllProductsCont.initialCounter === AllProductsCont.maxLimit) {

      alert('Your Trails Over ');
      updateTotals();
      fullChart();

      AllProductsCont.container.removeEventListener('click', clickHandler);

    } else {

      renderNewProducts();
    } // Ending last else to render the new product 
  } // Ending if statement condition if clicked 
} // Ending Click Handler function 

AllProductsCont.container.addEventListener('click', clickHandler);


renderNewProducts();

////////////////////////// Canvas ////////////////////////////////

var ctx = document.getElementById('ClickChart').getContext('2d');


var productsNames = [];
var productsSeen = [];
var productsClicks = [];


function makeProductname() {

  for (var i = 0; i < AllProductsCont.all.length; i++) {         // Store the products name in array to use it in the chart 
    var productName = AllProductsCont.all[i].name;
    productsNames.push(productName);
    console.log('productsnames', productsNames);
  }

  return productsNames;

}/// Ending product name function 

function makeProductseen() {

  for (var i = 0; i < AllProductsCont.all.length; i++) {
    var productSeen = AllProductsCont.all[i];
    //console.log('productClick',productClick);
    productsSeen.push(productSeen.seenCounter);
    console.log('productsSeen', productsSeen);
  }

  return productsSeen;
} /// Ending product seen function 


//////////////////////////////////////////////
function makeProductclick() {

  for (var i = 0; i < AllProductsCont.all.length; i++) {
    var productClick = AllProductsCont.all[i];
    productsClicks.push(productClick.clickCounter);
    console.log('productsClicks', productsClicks);
  }

  return productsClicks;

}/// Ending product click function 


function fullChart()
{

  console.log('Chart : ', Chart);
  var chart = new Chart(ctx, {
    type: 'line',
  
    data: {
      labels: makeProductname(),
      datasets: [
        {
          label: 'My First Dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: makeProductclick()
        }
      ]
  
    },
    // Configuration options go here
    options: {}
  });

}

'use strict';


function Products(name, src) {
  this.name = name;
  this.src = src;
  this.clickCounter = 0;
  this.seenCounter = 0;
  Products.all.push(this);
}

Products.initialCounter = 0;
Products.maxLimit = 25;
Products.all = [];


Products.container = document.getElementById('products-container');

Products.leftImage = document.getElementById('left-product-image');
Products.centerImage = document.getElementById('center-product-image');
Products.rightImage = document.getElementById('right-product-image');


Products.leftTitle = document.getElementById('left-product-title');
Products.centerTitle = document.getElementById('center-product-title');
Products.rightTitle = document.getElementById('right-product-title');

Products.leftObject = null;
Products.centerObject = null;
Products.rightObject = null;



new Products('bag product', 'img/bag.jpg');
new Products('banana product', 'img/banana.jpg');
new Products('bathroom product ', 'img/bathroom.jpg');
new Products('boots product', 'img/boots.jpg');
new Products('breakfast product', 'img/breakfast.jpg');
new Products('bubblegum product', 'img/bubblegum.jpg');


new Products('chair product', 'img/chair.jpg');
new Products('cthulhu product', 'img/cthulhu.jpg');
new Products('dog-duck product', 'img/dog-duck.jpg');
new Products('dragon product', 'img/dragon.jpg');
new Products('pen product', 'img/pen.jpg');

new Products('pet-sweep product', 'img/pet-sweep.jpg');
new Products('scissors product', 'img/scissors.jpg');
new Products('shark product', 'img/shark.jpg');
new Products('sweep product', 'img/sweep.png');
new Products('tauntaun product', 'img/tauntaun.jpg');


new Products('unicorn product', 'img/unicorn.jpg');
new Products('usb product', 'img/usb.gif');
new Products('water-can product', 'img/water-can.jpg');
new Products('wine-glass product', 'img/wine-glass.jpg');





function renderNewProducts() {

  var forbidden = [Products.leftObject, Products.centerObject, Products.rightObject];

  do {

    Products.leftObject = getRandomProduct();

  } while (forbidden.includes(Products.leftObject))
  forbidden.push(Products.leftObject);
  do {

    Products.centerObject = getRandomProduct();

  } while (forbidden.includes(Products.centerObject));
  forbidden.push(Products.centerObject);
  do {

    Products.rightObject = getRandomProduct();
  } while (forbidden.includes(Products.rightObject));

  Products.leftObject.seenCounter++;                                       
  Products.centerObject.seenCounter++;
  Products.rightObject.seenCounter++;


  var leftProductImageElement = Products.leftImage;
  var centerProductImageElement = Products.centerImage;
  var rightProductImageElement = Products.rightImage;


  leftProductImageElement.setAttribute('src', Products.leftObject.src);             
  leftProductImageElement.setAttribute('alt', Products.leftObject.name);

  centerProductImageElement.setAttribute('src', Products.centerObject.src);        
  centerProductImageElement.setAttribute('alt', Products.centerObject.name);

  rightProductImageElement.setAttribute('src', Products.rightObject.src);          
  rightProductImageElement.setAttribute('alt', Products.rightObject.name);


  Products.leftTitle.textContent = Products.leftObject.name;
  Products.centerTitle.textContent = Products.centerObject.name
  Products.rightTitle.textContent = Products.rightObject.name;

}  



function getRandomProduct() {
  var index = Math.floor(Math.random() * Products.all.length);
  return Products.all[index];
}  



function updateTotals() {

  var alloutput = document.getElementById('product-sentences');



  alloutput.innerHTML = '';

  for (var i = 0; i < Products.all.length; i++) {
    var newProduct = Products.all[i];
    addElement('li', alloutput, newProduct.name + 'Votes = ' + newProduct.clickCounter + '  && number of shown  =' + newProduct.seenCounter + ' times');
  }
}  



function addElement(tag, container, text) {

  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;

}  



function clickHandler(event) {

  var clickItemId = event.target.id;
  var productChlicked;

  if (clickItemId === 'left-product-image') {
    productChlicked = Products.leftObject;
  } else if (clickItemId === 'center-product-image') {
    productChlicked = Products.centerObject;
  } else if (clickItemId === 'right-product-image') {
    productChlicked = Products.rightObject;

  } 

  if (productChlicked) {
    productChlicked.clickCounter++;
    Products.initialCounter++;


    if (Products.initialCounter === Products.maxLimit) {

      alert('Your fight ended up unfortunately');
      updateTotals();
      fullChart();

      Products.container.removeEventListener('click', clickHandler);
      updateProducts();             

    } else {
     
      
      renderNewProducts();
        }  
  }  
}  

Products.container.addEventListener('click', clickHandler);



var ctx = document.getElementById('chartdrwing').getContext('2d');


var productsNames = [];
var productsSeen = [];
var productsClicks = [];


function makeProductname() {

  for (var i = 0; i < Products.all.length; i++) {        
    var productName = Products.all[i].name;
    productsNames.push(productName);
  }

  return productsNames;

}

function makeProductseen() {

  for (var i = 0; i < Products.all.length; i++) {
    var productSeen = Products.all[i];
    productsSeen.push(productSeen.seenCounter);
  }

  return productsSeen;
} 


function makeProductclick() {

  for (var i = 0; i < Products.all.length; i++) {
    var productClick = Products.all[i];
    productsClicks.push(productClick.clickCounter);
  }

  return productsClicks;

} 


function fullChart()
{

  var chart = new Chart(ctx, {
    type: 'bar',
  
    
    data: {
      labels: makeProductname(),
      datasets: [
        {
          label: 'Clicked Product ',
          backgroundColor: 'rgb(211, 118, 65)',
          borderColor: 'rgb(211, 118, 65)',
          data: makeProductclick()
        }, 
{         label: 'show Product ',
          backgroundColor: 'rgb(213, 228, 84)',
          borderColor: ' rgb(213, 228, 84)',
          data: makeProductseen(), 
        }            ]
        
        
    },
    options: {}
  });

}  




var localStrg = document.getElementById('productsTable');


function updateProducts() {
  var productStr = JSON.stringify(Products.all);
  localStorage.setItem('Products', productStr);
}  


function getProducts() {
  var dataP = localStorage.getItem('Products');

  var ProductData = JSON.parse(dataP);



  if (ProductData) {
    for (let i = 0; i < ProductData.length; i++) {
      var rawProductObject = ProductData[i];
      var chgProductCtrs = Products.all[i];
      
      chgProductCtrs.seenCounter = rawProductObject.seenCounter;
      chgProductCtrs.clickCounter = rawProductObject.clickCounter;
    }

    renderNewProducts();
  }
} 

renderNewProducts();
getProducts();

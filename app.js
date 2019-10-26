'use strict';


function Products(title, src) {
  this.title = title;
  this.src = src;
  this.clickCtr = 0;
  this.ShowCtr = 0;
  Products.all.push(this);
}

Products.initialCounter = 0;
Products.maxLimit = 25;
Products.all = [];


Products.container = document.getElementById('productForm');

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
new Products('bathroom product', 'img/bathroom.jpg');
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

  Products.leftObject.ShowCtr++;
  Products.centerObject.ShowCtr++;
  Products.rightObject.ShowCtr++;

  var leftProductImageElement = Products.leftImage;
  var centerProductImageElement = Products.centerImage;
  var rightProductImageElement = Products.rightImage;


  leftProductImageElement.setAttribute('src', Products.leftObject.src);
  leftProductImageElement.setAttribute('alt', Products.leftObject.title);
  centerProductImageElement.setAttribute('src', Products.centerObject.src);
  centerProductImageElement.setAttribute('alt', Products.centerObject.title);
  rightProductImageElement.setAttribute('src', Products.rightObject.src);
  rightProductImageElement.setAttribute('alt', Products.rightObject.title);


  Products.leftTitle.textContent = Products.leftObject.title;
  Products.centerTitle.textContent = Products.centerObject.title
  Products.rightTitle.textContent = Products.rightObject.title;

}
function getRandomProduct() {
  var index = Math.floor(Math.random() * Products.all.length);
  console.log('index', index);
  return Products.all[index];
}


function updateTotals() {

  var alloutput = document.getElementById('productList');

  alloutput.innerHTML = '';

  for (var i = 0; i < Products.all.length; i++) {
    var newProduct = Products.all[i];
    var output = addElement('output', alloutput);
    addElement('li', output, newProduct.title + ' Votes >>> ' + newProduct.clickCtr + ' ||   Shown >>>' + newProduct.ShowCtr + ' times');
  }}
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
    productChlicked = Products.rightObject;}

  if (productChlicked) {
    productChlicked.clickCtr++;
    Products.initialCounter++;


    if (Products.initialCounter === Products.maxLimit) {

      alert('Your fight ended up unfortunately');
      updateTotals();
      Products.container.removeEventListener('click', clickHandler);
    } else 
    {
      renderNewProducts();
    }
  }}

Products.container.addEventListener('click', clickHandler);

renderNewProducts();

let header = document.getElementById('unclickedHeader');
let cartButton = document.querySelectorAll('.cartButton');
let cartContainer = document.getElementById('cartObject');
let hideSideBar = document.getElementById('hideSidebar');
let addToCart = document.querySelectorAll('.addToCart');
let sidebar = document.querySelector('sidebar');
let grandTotal = document.getElementById('grandTotal');
let navButton = document.getElementById('navigation');
let smallNavButton = navButton
let isCartDisplayed = false;

let cartList = {
  itemList: [],
  grandTotal: 0,
  currentIndex: -1,
  alreadyAdded: false,

  addToCartList(id) {
    //Checks if item has already been added to cart before adding
    this.alreadyAdded = false;
    this.itemList.forEach(element => {
      if(element.quantInput.dataset.identify == id) {
        this.alreadyAdded = true;
      }
    });

    if(!this.alreadyAdded) {
      let name = document.getElementById(id).dataset.name;
      let price = document.getElementById(id).dataset.price;
      let nameSpanText = document.createTextNode(name);
      let priceSpanText = document.createTextNode(price);
      let nameSpan = document.createElement('span');
      let priceSpan = document.createElement('span');

      nameSpan.appendChild(nameSpanText);
      priceSpan.appendChild(priceSpanText);
      nameSpan.setAttribute('class', 'nameSpan');
      priceSpan.setAttribute('class', 'priceSpan');
      
      let quantInput = document.createElement('input');
      quantInput.setAttribute('type', 'text');
      quantInput.setAttribute('data-identify', id);
      quantInput.value = 1;
      let prevValue = quantInput.value;

      quantInput.addEventListener('change', () => {
        if(this.withinBounds(quantInput.value)) {
          prevValue = quantInput.value;
          this.calculateTotal();
        } else {quantInput.value = prevValue};
      });
      
      this.itemList.push({nameSpan, priceSpan, quantInput});
      this.currentIndex++;
      this.createListing(id);
    } else {
      let node = document.createTextNode('Item already in cart. Please edit quantity from there.');
      createAlert(document.body, node);
    }
  },

  createListing(id) {       
    let cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', 'cartItem');
    let cartP = document.createElement('p');
    cartP.setAttribute('class', 'cartP');

    let listing = document.createElement('span');
    listing.setAttribute('class', 'listing');
    let node = document.createTextNode(
      `${this.itemList[this.currentIndex].nameSpan.innerHTML} - 
      $${this.itemList[this.currentIndex].priceSpan.innerHTML}`
    );

    let input = this.itemList[this.currentIndex].quantInput;
    input.setAttribute('class', 'quantInput');
    let cartButton = document.createElement('button');
    cartButton.setAttribute('data-identify', id);
    cartButton.setAttribute('class', 'cartButton');
    cartButton.innerHTML = 'x';
    cartButton.addEventListener('click', () => {
      cartDiv.remove();
      this.itemList.forEach(function(element, index, itemList) {
        if(element.quantInput.dataset.identify == cartButton.dataset.identify) {
          itemList.splice(index, 1);
          cartList.currentIndex--;
        }
      });
      this.calculateTotal();
    });

    cartP.appendChild(node);
    cartDiv.appendChild(cartP);
    cartDiv.appendChild(input);
    cartDiv.appendChild(cartButton);
    cartContainer.appendChild(cartDiv);  
    this.calculateTotal();
  },

  withinBounds(value) {
    let str = value.toString();
    for(let index = 0; index < str.length; index++) {    
      if(isNaN(parseFloat(str[index]))) {
        let node = document.createTextNode('Input must be a positive, whole number');
        createAlert(sidebar, node);
        return false;
      } 
    }
    return true;
  },

  calculateTotal() {
    this.grandTotal = 0;
    this.itemList.forEach(element => {
      this.grandTotal += (parseFloat(element.priceSpan.innerHTML) * 
      (element.quantInput.value));
    });
    grandTotal.innerHTML = Math.round(100 * this.grandTotal)/100;
  },
}

function createAlert(parentElement, alertNode) {
  let alertCreated = false;
  if(!alertCreated) {
    let alertBubble = document.createElement('div');
    alertBubble.setAttribute('class', 'alert');
    let alertText = document.createElement('section');
    alertText.setAttribute('class', 'alertElement');
    let closeX = document.createElement('button');
    closeX.setAttribute('class', 'closeX');
    closeX.innerHTML = 'x';

    closeX.addEventListener('click', () => {
      alertBubble.remove();
      alertCreated = false;
    });

    alertText.appendChild(alertNode);
    alertBubble.appendChild(closeX);
    alertBubble.appendChild(alertText);
    parentElement.prepend(alertBubble);
    alertCreated = true;
  }
}

function cartDisplay() {
  if (!isCartDisplayed) {
    sidebar.setAttribute('id', 'clicked');
    header.setAttribute('id', 'clickedHeader');
    /*
    sidebar.style.width = '410px';
    sidebar.style.opacity = '100';
    header.style.backgroundColor = 'rgb(0,0,0,.95)';
    header.style.boxShadow = '0px 0px 0px 0px';
    sidebar.style.transitionProperty = 'all';
    sidebar.style.transitionDuration = '.5s';
    header.style.transitionProperty = 'all';
    header.style.transitionDuration = '.5s';
    */
    isCartDisplayed = true;
    
  } else {
    sidebar.setAttribute('id', 'unclicked');
    header.setAttribute('id', 'unclickedHeader');
    /*
    sidebar.style.width = '0px';
    sidebar.style.opacity = '0';
    header.style.backgroundColor = 'rgb(0,0,0,.7)';
    header.style.boxShadow = '0px 3px 3px 0px rgb(0,0,0,.2);'
    sidebar.style.transitionProperty = 'all';
    sidebar.style.transitionDuration = '.5s';
    header.style.transitionProperty = 'all';
    header.style.transitionDuration = '.5s';
    */
    isCartDisplayed = false;
  }
}

addToCart.forEach(element => { 
  element.addEventListener('click', () => {
    cartList.addToCartList(element.id);
  })
});

cartButton.forEach(element => {
  element.addEventListener('click', () => {
    cartDisplay();
  })
})
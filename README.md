# Coffee-Store-Front
Demo of an online coffee store front

## More Information
This website was created to practice and showcase HTML, CSS and Javascript skills as well as provide a semi-realistic shopping experience using a cart system.

## The Javascript
Uses basic dom manipulation and programming logic to accurately display a cart and a dollar amount total. It checks to see if there is a particular item currently in the cart, and if there is, it does not allow you to add another of that same item via the "Add to Cart" button; instead, you must edit the amount in the cart item quantity field.  Although this is not a realistic representation of a cart in a real world application, as adding an item to a cart multiple times would usually just increase the quantity within the cart, I decided it would be a good way to practice bounds checking and warning messages.

The code is written in a way that would make adding more items in the future very straight-forward.  You would simply need to create another
div with the indicated fields edited to fit the specific item.

Indicated fields to customize have *** next to them.

<div class="flexParent">
      <div class="left">
***     <img src="<Image Location>" alt="">
      </div><!--left-->
      <div class="right">
        <button class="button addToCart" 
***     id="<Unique ID>"
***     data-name="<Name of item>"
***     data-price="<Price without dollar sign>"
        >Add to cart</button>
***     <p>Name of the item</p>
***     <p class="secondP">Description</p>
      </div><!--right-->
    </div><!--flexParent-->


## The Style
This is completely custom-written css and html
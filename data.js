const container = document.querySelector(".container");
const cont1 = document.querySelector(".cont1");
const cartlist = document.querySelector(".cartlist");
const cartnum = document.querySelector(".cartnum");
const empty = document.querySelector(".empty");

// addCont.addEventListener("click", function () {
//   "clcik";
// });

let prodList = [];

let carts = [];

let sum = 0;

function inner() {
  cont1.innerHTML = "";

  if (prodList.length > 0) {
    //looped over prodlist array
    prodList.forEach((prod, i) => {
      let productId = prod.id;
      let productInCart = carts.find((item) => item.productId === productId);
      let quantity = productInCart ? productInCart.quantity : 0;

      //created a div with name foodCont
      const foodCont = document.createElement("div");

      //added a class name to foodCont
      foodCont.classList.add("foodCont");

      //added a dataset  to  foodCont
      // foodCont.dataset.id = prod.id;

      const foodImg = document.createElement("img");
      foodImg.classList.add("foodImg");
      foodImg.src = prod.image.mobile;
      // added html to food cont
      foodCont.innerHTML = `
           
            
            <div class="cartXadd">
              <div class="cartCont cartadder">
                <img class="cartadder" src="${prod.addToCartImg}" alt="" />
                <p class="cartadder">Add to Cart</p>
              </div>
              <div class="addCont hide" ">
                <div class="decimg">
                <svg class="decrement" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path  d="M0 .375h10v1.25H0V.375Z"/></svg>
                 
                </div>

                <p class="amount">${quantity}</p>
                <div class="incimg">
                <svg class="increment xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                  
                </div>
              </div>
            </div>

            <h6>${prod.name}</h6>
            <h5 class="foodCat">${prod.category}</h5>

            <div class="Priceconts">
              <p>$</p>
            <span>$${parseFloat(prod.price).toFixed(2)}</span>

         </div>
          `;
      foodCont.prepend(foodImg);
      // console.log(foodCont);

      cont1.appendChild(foodCont);

      const cartCont = document.querySelectorAll(".cartCont");
      const addCont = document.querySelectorAll(".addCont");
      const incimg = document.querySelectorAll(".incimg");
      const cartXadd = document.querySelectorAll(".cartXadd");

      addCont[i].dataset.id = prod.id;

      cartXadd[i].addEventListener("click", function (event) {
        const positionClick = event.target;

        if (positionClick.classList.contains("cartadder")) {
          //added event listener to cart cont to display incr

          cartCont[i].classList.add("hide");
          addCont[i].classList.remove("hide");
          foodImg.classList.toggle("border");
        }
        if (positionClick.classList.contains("addCont")) {
          //added event listener to incr to display cart cont

          cartCont[i].classList.add("hide");
          addCont[i].classList.remove("hide");
        }

        if (positionClick.classList.contains("incimg")) {
          // let productId = positionClick.parentElement.dataset.id;

          let productId = addCont[i].dataset.id;

          addtocart(productId);
          addCartToHtml();
          empty.classList.add("hide");

          let productInCart = carts.find(
            (item) => item.productId === productId
          );
          let amountElem = addCont[i].querySelector(".amount");
          amountElem.textContent = productInCart.quantity;

          localStorage.setItem(`quantity-${productId}`, amountElem.textContent);
        }

        if (positionClick.classList.contains("decimg")) {
          // let productId = positionClick.parentElement.dataset.id;

          console.log("dec");
          let productId = addCont[i].dataset.id;

          removeFromCart(productId);
          addCartToHtml();

          // Find the amount element for this specific item
          let amountElem = addCont[i].querySelector(".amount");
          let currentVal = parseInt(amountElem.textContent);
          amountElem.textContent = currentVal - 1;

          if (currentVal > 1) {
            amountElem.textContent = currentVal - 1;
          } else {
            amountElem.textContent = 0;
            cartCont[i].classList.remove("hide");
            addCont[i].classList.add("hide");
            foodImg.classList.remove("border");
          }

          // Hide "empty" message only if something is in the cart
          if (carts.length === 0) {
            empty.classList.remove("hide");
          }
          localStorage.setItem(`quantity-${productId}`, amountElem.textContent);
        }
      });
    });
  }
}
function addtocart(productId) {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.productId === productId
  );
  if (carts.length <= 0) {
    carts = [
      {
        productId: productId,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      productId: productId,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }

  addToMemory();
}
function addToMemory() {
  localStorage.setItem("cart", JSON.stringify(carts));
}

function addCartToHtml() {
  cartlist.innerHTML = "";

  let totalQty = 0;

  if (carts.length > 0) {
    carts.forEach(function (cart, i) {
      totalQty = totalQty + cart.quantity;
      let newList = document.createElement("div");
      newList.classList.add("list");

      let positionProduct = prodList.findIndex(
        (value) => value.id == cart.productId
      );

      let info = prodList[positionProduct];
      console.log(info);

      newList.innerHTML = ` 
          <div class="left">
            <h5 class="cartFoodName">${info.name}</h5>
            <div class="lower">
              <p class="number">${cart.quantity}x</p>
              <p class="cartPrice">@ $${info.price}</p>
              <p class="cartTotal">@ ${info.price * cart.quantity}</p>
            </div>
          </div>
          <div class="removeImg ">
            <img  class="delete-btn" data-id="${
              info.id
            }" src="./assets/images/icon-remove-item.svg" alt="" />
          </div>
        `;

      cartlist.appendChild(newList);
      cartnum.textContent = totalQty;

      const deleteBtn = newList.querySelector(".delete-btn");

      deleteBtn.addEventListener("click", function () {
        const productId = this.dataset.id;

        // Remove from cart array
        carts = carts.filter((item) => item.productId !== productId);

        // Update local storage
        addToMemory();

        // Re-render cart UI
        addCartToHtml();

        // Optionally show empty message
        if (carts.length === 0) {
          empty.classList.remove("hide");
        }

        // Re-render quantity number
        let totalQty = carts.reduce((sum, item) => sum + item.quantity, 0);
        cartnum.textContent = totalQty;
      });

      // console.log(carts);
    });
  }
}
// addtocart();
function api() {
  fetch("data.json")
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      prodList = data;
      inner();

      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHtml();
      }
      if (localStorage.getItem("cart")) {
        empty.classList.add("hide");
      }
      // localStorage.clear();
      // localStorage.removeItem(carts);
    });
}
api();

function removeFromCart(productId) {
  let positionInCart = carts.findIndex((item) => item.productId === productId);

  if (positionInCart >= 0) {
    carts[positionInCart].quantity--;

    if (carts[positionInCart].quantity <= 0) {
      carts.splice(positionInCart, 1); // Remove from cart
    }

    addToMemory(); // Update localStorage
  }
}

const confirmBtn = document.querySelector("#confirm");
const newOrder = document.querySelector(".newOrder");
console.log(newOrder);
const confirmationContainer = document.querySelector(".confirmationContainer");

confirmBtn.addEventListener("click", function () {
  console.log("cl");

  // if (carts.length !== 0) {
  // }
  confirmationContainer.classList.add("open");
  confirmationContainer.classList.remove("close");

  displayConfirmation();
});

// newOrder.addEventListener("click", function () {
//   console.log("hi");
//   // confirmationContainer.classList.add("close");
// });
confirmationContainer.addEventListener("click", function () {
  console.log("clicked");
  confirmationContainer.classList.remove("open");

  confirmationContainer.classList.add("close");
});

function displayConfirmation() {
  let innerItems = "";
  let orderTotal = 0;

  carts.forEach((cart) => {
    const product = prodList.find((item) => item.id == cart.productId);

    if (product) {
      const itemTotal = product.price * cart.quantity;
      orderTotal += itemTotal;

      innerItems += `
          <div class="innerConfirmLIst">
            <div class="thumb">
              <img src="${product.image.mobile}" alt="${product.name}" />
            </div>
            <div class="left">
              <h5 class="cartFoodName">${product.name}</h5>
              <div class="lower">
                <p class="number">${cart.quantity}x</p>
                <p class="cartPrice">@ $${product.price}</p>
              </div>
            </div>
            <p class="cartTotal">@ $${itemTotal.toFixed(2)}</p>
          </div>
        `;
    }
  });

  confirmationContainer.innerHTML = `
      <div class="confirmation">
        <img
          class="conIcon"
          src="./assets/images/icon-order-confirmed.svg"
          alt=""
        />
        <h2 class="conIcon">Order Confirmed</h2>
        <p class="conIcon">We hope you enjoy your food</p>
  
        <div class="confirmList">
          ${innerItems}
          <span class="totalCont">
            <p>Order Total</p>
            <h1>$${orderTotal.toFixed(2)}</h1>
          </span>
        </div>
  
        <button class="newOrder">Start New Order</button>
      </div>
    `;
}

// const cartCont = document.querySelectorAll(".cartCont");
// const addCont = document.querySelectorAll(".addCont");
// const amount = document.querySelectorAll(".amount");
// const imgCont = document.querySelectorAll(".imgCont");
// const decrement = document.querySelectorAll(".decimg");
// const increment = document.querySelectorAll(".incimg");
// const foodCont = document.querySelectorAll(".foodCont");
// const empty = document.querySelector(".empty");
// const order = document.querySelector(".order");
// let cartnum = document.querySelector(".cartnum");
// let confirmbtn = document.querySelector(".confirm");

// //display plus and minus btn when add to cart is  clicked
// cartCont.forEach(function (cart, i) {
//   cart.addEventListener("click", function () {
//     cart.classList.add("hide");

//     addCont[i].classList.remove("hide");

//     console.log("cart");
//     imgCont[i].style.border = "1px solid red";
//   });
// });

// //remove plus and minus btn when img  is  clicked

// imgCont.forEach(function (add, i) {
//   add.addEventListener("click", function () {
//     addCont[i].classList.add("hide");

//     cartCont[i].classList.remove("hide");
//   });
// });

// let sum = new Array(9).fill(0);

// let times = 0;

// let cartTotalNum = 0;
// increment.forEach(function (plus, i) {
//   plus.addEventListener("click", function () {
//     sum[i]++;

//     amount[i].textContent = sum[i];

//     confirmbtn.classList.remove("hide");

//     empty.classList.add("hide");

//     const list = document.createElement("div");
//     list.classList.add("list");

//     const left = document.createElement("div");
//     left.classList.add("left");
//     list.prepend(left);

//     const cartFoodName = document.createElement("h5");
//     cartFoodName.classList.add("cartFoodName");
//     left.append(cartFoodName);

//     const lower = document.createElement("div");
//     lower.classList.add("lower");
//     left.append(lower);

//     const cartTotal = document.createElement("p");
//     cartTotal.classList.add("cartTotal");
//     lower.prepend(cartTotal);

//     const cartPrice = document.createElement("p");
//     cartPrice.classList.add("cartPrice");
//     lower.prepend(cartPrice);

//     const number = document.createElement("p");
//     number.classList.add("number");
//     lower.prepend(number);

//     const removeImg = document.createElement("div");
//     removeImg.classList.add("removeImg");
//     list.append(removeImg);

//     order.append(list);

//     removeImg.addEventListener("click", function () {
//       console.log("clik");
//       list.style.display = "none";

//       sum[i]--;
//     });

//     const foodcategory =
//       this.closest(".foodCont").querySelector("h5").textContent;

//     const rate = this.closest(".foodCont").querySelector("span").textContent;

//     if (foodcategory === cartFoodName.textContent) {
//       console.log("yes");
//     } else {
//       cartFoodName.textContent = foodcategory;
//       console.log("no");
//     }
//     cartPrice.textContent = rate;

//     let cartPlus = cartTotalNum++;

//     cartnum.textContent = cartPlus;
//     console.log(cartnum.textContent, cartTotalNum);

//   });
// });
// {
// }
// decrement.forEach(function (minus, i) {
//   minus.addEventListener("click", function () {
//     sum[i]--;

//     if (sum[i] < 0) {
//       sum[i] = 0;
//     }
//     amount[i].textContent = sum[i];

//     cartnum.textContent = cartTotalNum--;

//     console.log(cartnum.textContent, cartTotalNum);
//   });
// });

// const foods = document.querySelectorAll("h6");
// const foodTitles = document.querySelectorAll("h5");
// const price = document.querySelectorAll("span");
// const foodImg = document.querySelectorAll(".imgCont");

// foodImg.forEach(function (img) {});

const container = document.querySelector(".container");
const cont1 = document.querySelector(".cont1");
const cartlist = document.querySelector(".cartlist");
const cartnum = document.querySelector(".cartnum");

// addCont.addEventListener("click", function () {
//   "clcik";
// });

let prodList = [];

let carts = [];

let sum = 1;

function inner() {
  cont1.innerHTML = "";

  if (prodList.length > 0) {
    //looped over prodlist array
    prodList.forEach((prod, i) => {
      //created a div with name foodCont
      const foodCont = document.createElement("div");

      //added a class name to foodCont
      foodCont.classList.add("foodCont");

      //added a dataset  to  foodCont
      // foodCont.dataset.id = prod.id;

      // added html to food cont
      foodCont.innerHTML = `
            <div class="imgCont">
               <img
                class="foodImg"
                src="${prod.image.mobile}"
                alt=""
              /> 
            </div>
            <div class="cartXadd">
              <div class="cartCont cartadder">
                <img class="cartadder" src="${prod.addToCartImg}" alt="" />
                <p class="cartadder">Add to Cart</p>
              </div>
              <div class="addCont hide" ">
                <div class="decimg">
                  <img
                    class="decrement"
                    src="${prod.decr}"
                    alt=""
                  />
                </div>

                <p class="amount">${sum}</p>
                <div class="incimg">
                  <img
                    class="increment"
                    src="${prod.incr}"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <h6>${prod.name}</h6>
            <h5 class="foodCat">${prod.category}</h5>

            <div class="Priceconts">
              <p>$</p>
              <span>${prod.price} </span>
            </div>
          `;

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
        }
        if (positionClick.classList.contains("addCont")) {
          //added event listener to incr to display cart cont

          cartCont[i].classList.add("hide");
          addCont[i].classList.remove("hide");
        }

        if (positionClick.classList.contains("incimg")) {
          let productId = positionClick.parentElement.dataset.id;

          addtocart(productId);
          addCartToHtml();
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

      newList.innerHTML = ` <div class="list">
          <div class="left">
            <h5 class="cartFoodName">${info.name}</h5>
            <div class="lower">
              <p class="number">${cart.quantity}x</p>
              <p class="cartPrice">@ $${info.price}</p>
              <p class="cartTotal">@ ${info.price * cart.quantity}</p>
            </div>
          </div>
          <div class="removeImg">
            <img src="./assets/images/icon-remove-item.svg" alt="" />
          </div>
        </div>`;

      cartlist.appendChild(newList);
      cartnum.textContent = totalQty;

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
    });
}
api();

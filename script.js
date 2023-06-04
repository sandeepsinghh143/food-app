let container=document.getElementById("container");

// getting menu items
async function getMenu(){
    try{ const response=await fetch("https://avivashishta29.github.io/f2-contest-test/db.json");
    const data=await response.json();
    for(let i=0; i<data.length; i++){
        let div=document.createElement("div");
        let content=`<div class="item">
        <div class="item-image"><img src="${data[i].imgSrc}"></div>
        <div class="details">
            <div class="item-name">${data[i].id}. ${data[i].name}</div>
            <div class="item-price">$${data[i].price}/-</div>
        </div>
    </div>`
    div.innerHTML=content;
    container.append(div);
    }
    return data;
}catch(error){
    alert("Failed to fetch:", error);
   }
   
}



getMenu();
const orderButton=document.getElementById("order-button");
const orderDiv=document.getElementById("first-button");
orderButton.addEventListener("click",takeOrder);
const heading=document.getElementById("order-heading");

// ?order functionality
async function takeOrder() {
    heading.innerText="You have selected these three items. Please continue to place Order."
    orderDiv.innerHTML ="";
    let arr=await getMenu();
    await new Promise(resolve => {
      setTimeout(resolve, 2500);
    });
    
    container.innerHTML="";
    for (let i = 0; i < 3; i++) {
        let item=await arr[Math.floor(Math.random()*arr.length)];
        let div=document.createElement("div");
        let content=`<div class="item">
        <div class="item-image"><img src="${item.imgSrc}"></div>
        <div class="details">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price}/-</div>
        </div>
    </div>`
    div.innerHTML=content;
    container.append(div);
    }
    let main=document.getElementById('main');
    let div=document.createElement('div');
    div.className="btn-div";
    div.id="prep-button";
    div.innerHTML=`<button class="button" id="prep" onclick="orderPrep().then(payOrder().then(thankyouFnc()))">Order</button>`;
    main.append(div);
  }

  
  async function orderPrep() {
    let prepDiv=document.getElementById("prep-button");
    heading.innerText="Preparing your Order...."
    container.innerHTML="Please wait..."

    prepDiv.style.display="none";
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }


  async function payOrder() {
    heading.innerText="Payment Successful!! Order Completed..."
    container.innerHTML="";
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }

  async function thankyouFnc() {
    setTimeout(()=>{
        alert('Thank you for eating with us today!');
    },3000)
  }

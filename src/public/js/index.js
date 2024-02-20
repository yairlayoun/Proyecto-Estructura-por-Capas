const socket = io();
console.log("cart connected")
socket.on("list_user",(data)=>{
    const usercartDiv = document.getElementById('usercart');
    usercartDiv.innerHTML = `<h2>Welcome, ${data.username}!</h2>`;
})
let item_button = document.getElementsByClassName('add_to_cart')
console.log(item_button)
for (const button of item_button) {
    button.addEventListener('click',() =>{
        console.log("calling",button.value)
        socket.emit('add_to_cart',button.value)
    })
}
//////////////////////////////////////////////////
//////////////mostrar el carrito
let add = document.getElementsByClassName("add_cart")
let remove = document.getElementsByClassName("remove_cart")
socket.on("cart_updated", (data,why) => {
  const usercartDiv = document.getElementById("usercart");
  let inner_text = `<h2>Welcome, ${data[0].username}!</h2>
    <p>This are some items in your cart</p>`;
  inner_text += `<h1>Total: ${data[1].total} bells</h1>`;

  for (let product in data[1].products) {
    let pointer = data[1].products[product];
    inner_text += `
      <ul id=${pointer.product}>
        <h3>>ID: ${pointer.product}</h3>
        <img src="${pointer.thumbnail}" style="width:150px; border:1px solid black; "alt="https://dodo.ac/np/images/a/af/Leaf_NH_Icon.png">
        <h2>Name: ${pointer.name}</h2>
        <li>Price: ${pointer.price} Bells</li>
        <li>Quantity: ${pointer.quantity}</li>
      </ul>
      <button   type="button" id="" class="add_cart" value= ${pointer.product}>Add More</button>
      <button   type="button" id="" class="remove_cart" value=${pointer.product}>Remove One</button>
      </br>`;
  }

  usercartDiv.innerHTML=(inner_text);
  updatebuttons()
});
function updatebuttons(){
  add = document.getElementsByClassName("add_cart")
  remove = document.getElementsByClassName("remove_cart")
for (const button of add) {
  button.addEventListener('click',() =>{
      console.log("add",button.value)
      socket.emit('add_to_cart',button.value)
  })
}
for (const button of remove) {
  button.addEventListener('click',() =>{
      console.log("remove",button.value)
      /socket.emit('remove_from_cart',button.value)
  })
}
}


//////////////////Metodo de frontend////////////////////
const sortBySelect = document.getElementById('SortBy');
const categorySelect = document.getElementById('Category');
const priceSelect = document.getElementById('Price_sort');
const submit_button = document.getElementById('sort_button')
priceSelect.style.display = 'none';
let type_sort ="";
sortBySelect.addEventListener('change', () => {
    if (sortBySelect.value === 'Category') {
      categorySelect.style.display = 'inline';
      priceSelect.style.display = 'none';
    } else {
      categorySelect.style.display = 'none';
      priceSelect.style.display = 'inline';
    }
  });
  
submit_button.addEventListener('click',()=>{
    if (sortBySelect.value === 'Category') {
        submit_button.value=categorySelect.value
        type_sort="category"
      }
      else{
        submit_button.value=priceSelect.value
        type_sort="sort"
      }

    socket.emit("sort_now",[type_sort,submit_button.value])
})  

socket.on('redirect',function(destination){
    window.location.href=destination;
})
///////////////////////////

socket.on("not_enough",()=>{
    const errorMessage = {
        title: "Oh no :(",
        text: "It seems we dont have enough of the selected item in stock.",
        icon: "error"
      };
    
      Swal.fire(errorMessage);
})
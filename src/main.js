class Item {
	constructor(name, imgsrc, price) {
		this.name = name;
		this.price = price;
		this.image = imgsrc;
	  this.id = 'item'+crypto.randomUUID().replaceAll('-','');
	}
}

let items = [
      new Item("fruits",'assets/fruits.png',100),
      new Item("lui viton bag(fake)",'/assets/bag.png',200),
      new Item("usb cable",'assets/cable.png',390),
      new Item("keyboard",'assets/keyboard.png',3000),
      new Item("phone",'assets/phone.png',10000)
]


class Order {
  constructor(item,qty){
	 this.qty=0;
	 this.item=item
  }

}

let cart = [



]


const loadCart =()=>{
 console.log("loading cart items...");
  const templateItem = document.querySelector('#list-item-template');
  const container = document.querySelector('.added-items-list ul') 
  container.innerHTML='';
  cart.forEach(item=>{ 
  const content = templateItem.content.cloneNode(true);
  const itemName = content.querySelector('.item-name');
  const itemPrice= content.querySelector('.item-price');
  const removeItemButton = content.querySelector('.remove-item-button');


  removeItemButton.addEventListener('click',()=>{
		cart=cart.filter(it=>it.id!=item.id);
	   items.push(item);
	 loadItems(items);
	   console.log(cart)
	   loadCart()
  });
  
  itemName.textContent=item.name;
  itemPrice.textContent=item.price;
  container.appendChild(content);
  })

}

const displayCount =()=>{
   const counter = document.querySelector('#total-item-counter');
   counter.textContent=`${items.length}`;
}

const displayCartCount = ()=>{
   const priceCounter = document.querySelector('#total-price-counter');
  const itemCounter = document.querySelector('#added-items-counter');
   itemCounter.textContent = cart.length;
   priceCounter.textContent = cart.reduce((sum,item)=>sum+item.price,0);

}

const initializeSearchBar = ()=>{
  let input= document.getElementById('search-input');
  input.addEventListener('input',()=>{
	 loadItems(items.filter(items => items.name.startsWith(input.value)));
  })
}

const loadItems =(iter)=>{
  console.log("loading items...")

   const templateCard = document.querySelector('.item-card-template');
   const container =document.querySelector('.card-container') 
  
  container.innerHTML=''
  iter.forEach((item,index) => {
    const templateContent = templateCard.content.cloneNode(true);
    let imgElem = templateContent.querySelector(".item-card-image");
	 let itemName = templateContent.querySelector('.item-card-name')
	 let itemPrice = templateContent.querySelector('.item-card-price');
    let itemButton = templateContent.querySelector('.item-card-action-button');



	 //setting values
	 itemPrice.textContent = '$'+item.price;
	 itemName.textContent = item.name;
	 templateContent.id=item.id


	 itemButton.addEventListener('click',(e)=>{
		 cart.push(item);
		items=items.filter(it=>it.id != item.id);
       loadCart(); 	
		 displayCount();
		displayCartCount();
		loadItems(items);
      
	 });

	 imgElem.setAttribute("src",item.image);
    container.appendChild(templateContent); 

 })

 displayCount();
  displayCartCount();
}

loadItems(items)
initializeSearchBar();


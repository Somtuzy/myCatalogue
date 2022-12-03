// Week Three Task
// This is a simple e-commerce console application for ordering Shawarma.. Who's hungry? LoL

// Command for Vs terminal's Prompt Sync - Optional, Use for Vs Code Only
"use strict";

const prompt = require("prompt-sync")();


// Declaring Variables For Products & Prices
let products, mini, reg, big;

products = ['Chicken Shawarma', 'Beef Shawarma', 'Mixed'];
mini = [1200, 1100, 1000];
reg = [1400, 1300, 1200];
big = [2000, 1900, 1800];

// Getting Customer's Name 
let customer = prompt(`Welcome to Shawarma Hub - Your Shawarma Heaven On EArth.. What do we call you? `);
console.log(`Hello, ${customer}. You must be hungry! Let us take your order right away!
  - Enter "Chicken" for Chicken Shawarma
  - Enter "Beef" for Beef Shawarma
  - Enter "Mixed" for Chicken & Beef`);


// Taking And Calculating Customer's Order
let order = prompt(`What would you like to eat? `);

// Chicken Shawarma
if(order === "Chicken" || order === 'chicken' || order === 'CHICKEN'){
  console.log(`Please specify the size you want below: 
  - Enter "mini" for our smallest roll @ ₦1000 - ₦1200
  - Enter "reg" for our regular roll @ ₦1200 - ₦1400
  - Enter "big" for our biggie roll @ ₦1800 - ₦2000
`);

// Choosing size & quantity & getting exact price(s) for your order
  let size = prompt(`What size are you here for, my friend? `);

if(size === "mini" || size === 'Mini' || size === 'MINI'){
    console.log(`Please specify how many rolls you want in figures: `);
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * mini[0];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? 
  - Enter Yes to checkout
  - Enter No to cancel your order.. `);

} else if (size === "reg" || size === 'Reg' || size === 'REG'){
    console.log(`Please specify how many rolls you want in figures `);
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * reg[0];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

} else if (size === "big" || size === 'Big' || size === 'BIG'){
    console.log(`Please specify how many rolls you want in figures `);
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * big[0];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);
    
}

// Beef Shawarma
} else if(order === "Beef" || order === 'beef' || order === 'BEEF'){
  console.log(`Please specify the size you want below: 
  - Type "mini" for our smallest roll @ ₦1000 - ₦1200
  - Type "reg" for our regular roll @ ₦1200 - ₦1400
  - Type "big" for our biggie roll @ ₦1800 - ₦2000
`);

// Choosing size & quantity & getting exact price(s) for your order
  let size = prompt(`What size are you here for, my friend? `);

if(size === "mini" || size === 'Mini' || size === 'MINI'){
    console.log(`Please specify how many rolls you want in figures: `);
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * mini[1];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

} else if (size === "reg" || size === 'Reg' || size === 'REG'){
    console.log(`Please specify how many rolls you want in figures `);
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * reg[1];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

} else if (size === "big" || size === 'Big' || size === 'BIG'){
    console.log(`Please specify how many rolls you want in figures `);
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * big[1];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);
    
}

// Chicken & Beef
} else if(order === "Mixed" || order === 'mixed' || order === 'MIXED'){
  console.log(`Please specify the size you want below: 
  - Type "mini" for our smallest roll @ ₦1000 - ₦1200
  - Type "reg" for our regular roll @ ₦1200 - ₦1400
  - Type "big" for our biggie roll @ ₦1800 - ₦2000
`);

// Choosing size & quantity & getting exact price(s) for your order
  let size = prompt(`What size are you here for, my friend? `);

if(size === "mini" || size === 'Mini' || size === 'MINI'){
    console.log(`Please specify how many rolls you want in figures: `);
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * mini[2];
    console.log(`Your order costs ₦${bill}..
    Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

} else if (size === "reg" || size === 'Reg' || size === 'REG'){
    console.log(`Please specify how many rolls you want in figures `)
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * reg[2];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

} else if (size === "big" || size === 'Big' || size === 'BIG'){
    console.log(`Please specify how many rolls you want in figures `)
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * big[2];
    console.log(`Your order costs ₦${bill}..
Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);
    
}

// No order
} else {
  console.log(`Thank you for visiting Shawarma Hub, ${customer}. We hope to serve you better next time!
Please exit by typing no on the checkout option below:`)
}

// Checkout

let checkout = prompt(`Proceed to checkout? `);
if (checkout ==='yes' || checkout ==='Yes' || checkout ==='YES'){
let phoneNumber, address;
phoneNumber = prompt(`Please give us your phone number to dispatch your order.. `);
address = prompt(`What address would you like for us to send your order to? `);

if (phoneNumber !== null && address !== null){
    console.log(`Your order is being processed. We will ship your order to ${address} in 15-20 minutes. 
    Our dispatch rider will call you on ${phoneNumber} within the hour once your order is on its way. 
Thanks for your patronage!`);

} else {
    phoneNumber;
    address;
}

} else if (checkout === 'no'){
    console.log(`Thank you for visiting Shawarma Hub, ${customer}. We hope to serve you better next time!`)
}
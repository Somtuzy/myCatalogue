"use strict";

const prompt = require("prompt-sync")();


// This is a simple e-commerce console application for ordering Shawarma.. Who's hungry? LoL


// Getting Customer's Name 
let userName = prompt(`whats your name? `);
console.log(`Hello, ${userName}. Welcome to Shawarma Hub - Your Shawarma Heaven On EArth..

You must be hungry! Let us take your order right away!
Type the number equivalent to the size you want so we can take your order right away!
Type "mini" for our smallest roll @ ₦1000, "reg" for our regular roll @ ₦1200 & "big" for our biggie roll @ ₦1800 `);


// Taking And Calculating Customer's Order
let order = prompt(`What would you like to eat? `);
let mini = 1000, reg = 1200, big = 1800;

if(order === "mini" || order === 'Mini' || order === 'MINI'){
    console.log(`Please specify how many rolls you want in figures: `)
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * mini;
    console.log(`Your order costs a total of ₦${bill}..
    Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

} else if (order === "reg" || order === 'Reg' || order === 'REG'){
    console.log(`Please specify how many rolls you want in figures `)
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * reg;
    console.log(`Your order costs a total of ₦${bill}..
    Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

} else if (order === "big" || order === 'Big' || order === 'BIG'){
    console.log(`Please specify how many rolls you want in figures `)
    let qty = prompt(`How many of those do you need? `);
    let bill = qty * big;
    console.log(`Your order costs a total of ₦${bill}..
    Would you like to proceed to checkout? Type Yes to checkout or type No to cancel your order.. `);

    
} else {
    console.log(`Thank you for visiting Shawarma Hub, ${userName}. We hope to serve you better next time! `)
}

// Checkout

let checkout = prompt(`Proceed to checkout? `);
if (checkout ==='yes' || checkout ==='Yes' || checkout ==='YES'){
let phoneNumber, address;
phoneNumber = prompt(`Please input your phone number to dispatch your order.. `);
address = prompt(`Let us know where you want us to send your order to `);

if (phoneNumber !== null && address !== null){
    console.log(`Your order will be shipped to ${address} in 45 minutes. 
    Our dispatch rider will call you on ${phoneNumber} within the hour.`);

} else {
    phoneNumber;
    address;
}

} else if (checkout === 'no'){
    console.log(`Thank you for visiting Shawarma Hub, ${userName}. We hope to serve you better next time!`)
}
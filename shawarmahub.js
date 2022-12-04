const prompt = require("prompt-sync")();


// Declaring Variables, Products, Variants & Prices
 let products, price, userName, choice, order, bill;
 let quantity, min, mid, big, vat, size, pcs, details;
 products = ['Chicken Shawarma', 'Beef Shawarma', 'Chicken & Beef']
 base = [1300, 1200, 1100]
 min = 0.75
 mid = 1 
 big = 1.25
 vat = 25


// Greeting the user 
 console.log(`Welcome to Shawarma Hub, Where You Meat Heaven On Earth... Pun intended!
My name is $omtuzy...`)
 userName = prompt(`What do I call you? `)

 console.log(`Hey, ${userName}. That's a nice name! 
Would you like to see some of our best rolls? `)
 choice = prompt(`Reply with 'yes' to see rolls or 'no' to exit `)


// Displaying Products
 if (choice === `yes` || choice === `Yes`|| choice === `YES`){
 console.log(`Here's a list of our top products. Please choose a product below:
- For ${products[0]} reply with "one"
- For ${products[1]} reply with "two"
- For ${products[2]} reply with "three"`)

// Making your order
 order = prompt(`You must be starving! What would you like to eat? `)

  if (order === 'One' || order === 'one' || order === 'ONE'){
            quantity = prompt(`How many rolls? `)
            price = quantity * base[0]
            details = `Chicken Shawarma`
   
            

 } else if (order === 'two' || order === 'Two' || order === 'TWO'){
            quantity = prompt(`How many rolls? `)
            price = quantity * base[1]
            details = `Beef Shawarma`
            


 } else if (order === 'three' || order === 'three' || order === 'three'){
            quantity = prompt(`How many rolls? `)
            price = quantity * base[2]
            details = `Chicken & Beef Shawarma`
 }


// Choosing Sizes
console.log(`Please choose the size of Shawarma you would like below:
Reply with 'min' for the smallest size
Reply with 'mid' for the regular size
Reply with 'big' for the biggest size
`)
size = prompt(`What size of Shawarma would you like? `)

if (size === 'min'|| size === 'Min' || size === 'MIN'){
    bill = (price * min) + vat
    console.log(`Your order currently costs ${bill}. Would you like to proceed?
Reply with 'yes' to checkout
Reply with 'no' to cancel?`)
    pcs = `mini sized`

} else if (size === 'mid' || size === 'Mid' || size === 'MID'){
  bill = (price * mid) + vat
  console.log(`Your order currently costs ${bill}. Would you like to proceed?
Reply with 'yes' to checkout
Reply with 'no' to cancel?`)
  pcs = `medium sized`

} else if (size === 'big' || size === 'Big' || size === 'BIG'){
  bill = (price * big) + vat
  console.log(`Your order currently costs ₦${bill}. Would you like to proceed?
  Type 'yes' to checkout
  Type 'no' to cancel?`)
  pcs = `big sized`

}


//  Billing, Order Details & Checkout
 let dispatch, phoneNumber, address, deliveryFee;
 deliveryFee = 500
 dispatch = prompt(`Proceed to checkout `);
 phoneNumber = prompt(`Can we have your phone number? `);
 address = prompt(`What address do we send your order to? `);
 bill = bill + deliveryFee;
 console.log(`
Your order has been processed & will be dispatched within 15 minutes to ${address}.
You will be charged a delivery fee of ₦${deliveryFee} which is included in your total bill below.

Your order details are:

- Name: ${userName}
- Order: ${quantity} ${pcs} ${details}
- Phone number: ${phoneNumber}
- Order address: ${address}
- Order total (Vat Inclusive): ₦${bill}

Our dispatch rider will call you in 15 minutes. Thanks for your patronage!`)

} else if (choice === `no` || choice === `NO` || choice === `NO`) {
  console.log(`Hey, ${userName}. We're sad that we couldn't take your order.
We hope to serve you better next time!`)
}


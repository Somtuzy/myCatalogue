"use strict"
const prompt = require("prompt-sync")({sigint: true})

// Creates User Cart
const cart = []

// Creates total amount of all user orders
const bill = []

// Creates a total amount of orders with their details
const details = []

// Creates products & Prices
const products = [
    {
        product: 'Rice',
        price: 800
    }, 
    {
        product: 'Beans',
        price: 800
    },
     {
        product: 'Yam',
        price: 800
    },
    {
        product: 'Beef',
        price: 200
    },
    {
        product: 'Chicken',
        price: 500
    },
    {
        product: 'Plantain',
        price: 300
    },
    {
        product: 'Salad',
        price: 300
    },
]

// Stores a menu to display to User
const showProducts = `Here's our menu:
• For ${products[0].product} @ ₦${products[0].price} reply with 1
• For ${products[1].product} @ ₦${products[1].price} reply with 2
• For ${products[2].product} @ ₦${products[2].price} reply with 3
• For ${products[3].product} @ ₦${products[3].price} reply with 4
• For ${products[4].product} @ ₦${products[4].price} reply with 5
• For ${products[5].product} @ ₦${products[5].price} reply with 6
• For ${products[6].product} @ ₦${products[6].price} reply with 7
• To exit reply with 0
`
// Welcome message to User
console.log(`Welcome to Roadside Foods! I'm $omtuzy..`);

// Creates a function to get User's name
let getUserName = name => {
    console.log(`Hey, ${name}..`);
    return name
}
// Returns and stores the User's name from the name function for use in the main function
let name = getUserName(prompt(`What do I call you? `))

// Function to display the menu
let displayProducts = show => console.log(show);

// Function to let a User choose what meal they want
let chooseProduct = (choose, currentBill = 0, orderDetails) => {
    let exit;
    if (choose === 1){
        cart.push(products[0].product)
        let qty = parseFloat(prompt(`How many of those would you like to go? `));
        currentBill = qty * products[0].price
        bill.push(currentBill)
        orderDetails = qty > 1 ? `${qty} plates of ${products[0].product} - ₦${currentBill}`: `A plate of ${products[0].product} - ₦${currentBill}`
        details.push(orderDetails)
        exit = 'no'
    } else if (choose === 2){
        cart.push(products[1].product)
        let qty = parseFloat(prompt(`How many of those would you like to go? `));
        currentBill = qty * products[1].price
        bill.push(currentBill)
        orderDetails = qty > 1 ? `${qty} plates of ${products[1].product} - ₦${currentBill}`: `A plate of ${products[1].product} - ₦${currentBill}`
        details.push(orderDetails)
        exit = 'no'
    } else if (choose === 3){
        cart.push(products[2].product)
        let qty = parseFloat(prompt(`How many of those would you like to go? `));
        currentBill = qty * products[2].price
        bill.push(currentBill)
        orderDetails = qty > 1 ? `${qty} plates of ${products[2].product} - ₦${currentBill}`: `A plate of ${products[2].product} - ₦${currentBill}`
        details.push(orderDetails)
        exit = 'no'
    } else if (choose === 4){
        cart.push(products[3].product)
        let qty = parseFloat(prompt(`How many of those would you like to go? `));
        currentBill = qty * products[3].price
        bill.push(currentBill)
        orderDetails = qty > 1 ? `${qty} pieces of ${products[3].product} - ₦${currentBill}`: `A piece of ${products[3].product} - ₦${currentBill}`
        details.push(orderDetails)
        exit = 'no'
    } else if (choose === 5){
        cart.push(products[4].product)
        let qty = parseFloat(prompt(`How many of those would you like to go? `));
        currentBill = qty * products[4].price
        bill.push(currentBill)
        orderDetails = qty > 1 ? `${qty} pieces of ${products[4].product} - ₦${currentBill}`: `A piece of ${products[4].product} - ₦${currentBill}`
        details.push(orderDetails)
        exit = 'no'
    } else if (choose === 6){
        cart.push(products[5].product)
        let qty = parseFloat(prompt(`How many of those would you like to go? `));
        currentBill = qty * products[5].price
        bill.push(currentBill)
        orderDetails = qty > 1 ? `${qty} plates of ${products[5].product} - ₦${currentBill}`: `A plate of ${products[5].product} - ₦${currentBill}`
        details.push(orderDetails)
        exit = 'no'
    } else if (choose === 7){
        cart.push(products[6].product)
        let qty = parseFloat(prompt(`How many of those would you like to go? `));
        currentBill = qty * products[6].price
        bill.push(currentBill)
        orderDetails = qty > 1 ? `${qty} plates of ${products[6].product} - ₦${currentBill}`: `A plate of ${products[6].product} - ₦${currentBill}`
        details.push(orderDetails)
        exit = 'no'
        // Logs a User out when they choose to exit
    } else if (choose === 0){
        exit = 'yes'
    } else {
        console.log('Invalid selection, please reply with a number in the option below: ');
        displayProducts();
        chooseProduct()
    }
    return exit
}

// Asking a User if they want to keep shopping or check out
let keepShopping = (ask) => {
    let answer = ask;
    return answer
}

// Checks a User out after shopping
let checkOut = (name) => {
    let phoneNumber = prompt('Please give us your phone number to contact you: ')
    let address = prompt('What address would you like your order shipped to? ')
    let total = bill.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    let checkoutMessage = `
Here are your order details below: `
    console.log(checkoutMessage);
    details.forEach(list => console.log(`• ${list}`))
    console.log(`
We'll call you on ${phoneNumber} when your order is ready to be dispatched. Thanks for your patronage, ${name}!

Please note that your order will be shipped to ${address} and your bill is ₦${total}.
You can pay in cash, by transfer or pos when our dispatch rider arrives.. `);
}

// Main function that runs and calls every other function
const main = () => {
    displayProducts(showProducts)
    let exitCheck = chooseProduct(parseFloat(prompt(`What would you like to eat? `)))
    let askPhrase = `Would you like to checkout or continue shopping? 
• To continue shopping reply with 1
• To checkout reply with 2`
    // if a User decides not to logout
    if (exitCheck === 'no'){
        console.log(askPhrase);
        let answer = keepShopping(parseFloat(prompt('continue shopping or checkout? ')))
        function check (ans){
            if (ans === 1){
                main()
            } else if (ans === 2){
            checkOut(name)
            // Is displayed when a User makes an invalid selection
            } else {
                console.log('invalid selection, please reply with a valid number');
                ans;
                check()
                }
            }
        check(answer)
        // Displays a log out message when a user decides to logout
    } else if (exitCheck === 'yes'){
        console.log(`We look forward to seeing you again next time, ${name}! `);
    }
}

main()
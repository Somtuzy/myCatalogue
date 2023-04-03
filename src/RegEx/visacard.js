"use strict"
const prompt = require("prompt-sync")({sigint: true})

// This RegEx tests for a Visa card that starts with 4 and has a total card number of 16 digits ONLY. Please run the code & reply the prompt with a random 16 digit card number that starts with 4 and has no spaces between the digits.
const auth = /^4\d{12,15}$/

// Function to validate the Visa credit card number.
const validate = (cardNumber) => {
    cardNumber = parseFloat(prompt('Please input your 13 - 16 digits Visa Card number: '))   
    
    // If the test method returns true, the card is validated & if 'false', card is invalid.
    let check = auth.test(cardNumber)

    // Validates or rejects card
    if (check){
        console.log('Your Visa card was validated successfully!');
            //→ Your Visa card was validated successfully!
    } else {
        console.log('Invalid Card number. Please input a valid Card number or contact your card issuer for further assistance: ');
        validate();
            //→ Invalid Card number. Please input a valid Card number or contact your card issuer for further assistance:
        }
    return cardNumber
}
// The function is called to validate card. If the card is valid, it returns the card number.
let cardDetails = validate()

// Using the exec method to output the details of the match in an array. These details include the matched pattern, its index in the string, the entire string and its group.
console.log(auth.exec(cardDetails));
//→ [ <search result: string>, <index: number>, <input: string>, <groups: undefined>]


const prompt = require("prompt-sync")();

// Declaring Variables
let tempInFahrenheit, tempInCelsius, tempInKelvin, tempFrom, tempTo, result;


tempFrom = prompt(`What temperature do you want to convert from? `)

// Converting From Celsius
if (tempFrom === `celsius` || tempFrom === `Celsius ` || tempFrom === `CELSIUS`){
    tempTo = prompt(`Input temperature you wish to convert to `);

    
// Converting To Fahrenheit From Celsius
if (tempTo === `Fahrenheit` || tempTo === `fahrenheit` || tempTo === `FAHRENHEIT`){
    tempInCelsius = parseFloat(prompt(`Input temperature in Celsius `))
    tempInFahrenheit = (tempInCelsius * 9/5) + 32
    console.log(`${tempInFahrenheit}°F`) 

// Converting To Kelvin From Celsius
} else if (tempTo === `kelvin` || tempTo === `Kelvin` || tempTo === `KELVIN`){
    tempInCelsius = parseFloat(prompt(`Input temperature in Celsius `))
    tempInKelvin = tempInCelsius + 273.15
    console.log(`${tempInKelvin}K`)

}


// Converting From Fahrenheit
} else if (tempFrom === `fahrenheit` || tempFrom === `Fahrenheit` || tempFrom === `FAHRENHEIT`){
    tempTo = prompt(`Input temperature you wish to convert to `);

// Converting To Celsius From Fahrenheit
if (tempTo === `celsius` || tempTo === `Celsius` || tempTo === `CELSIUS`){
    tempInFahrenheit = parseFloat(prompt(`Input temperature in Fahrenheit `))
    tempInCelsius = (tempInFahrenheit - 32) * 5/9;
    console.log(`${tempInCelsius}°C`)
    
// Converting To Kelvin From Fahrenheit
} else if (tempTo === `kelvin` || tempTo === `Kelvin` || tempTo === `KELVIN`){
    tempInFahrenheit = parseFloat(prompt(`Input temperature in Fahrenheit `))
    tempInKelvin = (tempInFahrenheit - 32) * 5/9 + 273.15;
    console.log(`${tempInKelvin}K`)
    
}


// Converting From Kelvin
} else if (tempFrom === `kelvin` || tempFrom === `Kelvin` || tempFrom === `KELVIN`){
    tempTo = prompt(`Input temperature you wish to convert to `);

// Converting To Fahrenheit From Kelvin
    if (tempTo === `Fahrenheit` || tempTo === `fahrenheit` || tempTo === `FAHRENHEIT`){
        tempInKelvin = parseFloat(prompt(`Input temperature in Kelvin `))
        tempInFahrenheit = (tempInKelvin - 273.15) * (9/5) + 32;
        console.log(`${tempInFahrenheit}°F`);

// Converting To Celsius From Kelvin
    } else if (tempTo === `celsius` || tempTo === `Celsius` || tempTo === `CELSIUS`){
        tempInKelvin = parseFloat(prompt(`Input temperature in Kelvin `))
        tempInCelsius = tempInKelvin - 273.15
        console.log(`${tempInCelsius}°C`)
    }
}

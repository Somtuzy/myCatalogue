"use strict"
// Creates a telephone class for a telephone package
class Telephone{
    constructor(){
        // This makes sure at least one instance is created
       if(!Telephone.instance){
        this.dialer = new Set()
        this.observers = new Set()
        Telephone.instance = this
        }
        return Telephone.instance
    }

    // For adding a phone number
    addPhoneNumber(phoneNumber){
        this.dialer.add(phoneNumber)
    }
    
    // For removing a phone number
    removePhoneNumber(number){
        this.dialer.delete(number)
    }

    // For dialing a phone number in the dialer
    dialPhoneNumber(number){
        if(this.dialer.has(number)) this.notifyObserver(`Now Dialing +${number}`);
        else this.notifyObserver('This number was not found in the dialer.');
    }

    // For adding an observer
    addObserver(observer){
        this.observers.add(observer)
    }

    // For removing an observer
    removeObserver(observer){
        this.observers.delete(observer)
    }

    // For notifying each observer
    notifyObserver(message){
       for(const observer of this.observers) observer.update(message);
    }
}

// Creates an observer class
class Observer {
    constructor(observer){
        this.observer = observer
    }
    
    // For accessing & notifying all observers when there's an update
    update(message){
        console.log(`New notification for ${this.observer.name}{${this.observer.gender}, ${this.observer.age}}(${this.observer.status}): ${message}`);
    }
}

// Creates an instance of the telephone class 
const dialer = new Telephone()

// Uses a singleton pattern to prevent another instance of the dialer from being created
Object.freeze(dialer)

// Creates two observers with their personal details
const somto = new Observer({name: 'Somto', age: 22, gender: 'male', status: 'online'})
const onyeka = new Observer({name: 'Onyeka', age: 24, gender: 'female', status: 'online'})

// Adds the two observers created
dialer.addObserver(somto)
dialer.addObserver(onyeka)

// Creates two phone numbers
let validNumber = 2347023232
let wrongNumber = 2347023233

// Adds the validNumber to the dialer to make it valid & notifies the observers
dialer.addPhoneNumber(validNumber)
dialer.notifyObserver(`+${validNumber} has been added to the dialer.`)

// Dials the wrongNumber that's not stored in the dialer first & notifies observers
dialer.dialPhoneNumber(wrongNumber)

// Dials the validNumber stored in the dialer & notifies observers
dialer.dialPhoneNumber(validNumber)
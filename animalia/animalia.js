// Base class showing the necessary features all animals have in common 
class Animalia {
    // The constructor function is used to create and initialize an object created from a class
    constructor(className, animal){
        if(this.constructor == Animalia){
            throw new Error('This class cannot be instantiated.. ')
        }
        this.className = className
        this._animal = animal
    }

    // The `_animal` attribute is private and can only be modified using this method - This is encapsulation 
    setAnimal(newAnimal){ 
        this._animal = newAnimal
    }

    // The private `_animal` attribute can be accessed using this method - This is encapsulation
    getAnimal(){
        return this._animal
    }

    // A method is declared, but has no implementation - This is abstraction
    getDetails(){
        throw new Error('This method cannot be instantiated.. ') 
    }

}



// The `extends` keyword is used to create class(es) that is/are a child of the base class - This is inheritance

// Arthropodas
class Arthropoda extends Animalia{
    // The child class can have its own constructor function
    constructor(className, animal){
        // The `super` keyword is used to call the constructor of the parent class
        super(className, animal)

        this.isColdBlooded = true
        this.hasScalyWings = true
        
    }

    // The child class must implement the abstract method of the parent class in its own way - This is polymorphism
    getDetails(){
        console.log(this);
        console.log(`I'm a Butterfly.. 
        
        `);
    }

    
}


// Fishes
class Fish extends Animalia{
    // The child class can have its own constructor function
    constructor(className, animal){
        // The `super` keyword is used to call the constructor of the parent class
        super(className, animal)

        this.hasBackbone =  true
        this.isColdBlooded = true
        this.hasFins = true
        
    }

    // The child class must implement the abstract method of the parent class in its own way - This is polymorphism
    getDetails(){
        console.log(this);
        console.log(`I'm a Fish.. 
        
        `);
    }
}

// Amphibians
class Amphibia extends Animalia{
    // The child class can have its own constructor function
    constructor(className, animal){
         // The `super` keyword is used to call the constructor of the parent class
        super(className, animal)

        this.hasBackbone =  true
        this.isColdBlooded = true
        this.hasLimbs = true
        
    }

    // The child class must implement the abstract method of the parent class in its own way - This is polymorphism
    getDetails(){
        console.log(this);
        console.log(`I'm a Frog.. 
        
        `);
    }
}



// Reptiles
class Reptile extends Animalia{
    // The child class can have its own constructor function
    constructor(className, animal){
        // The `super` keyword is used to call the constructor of the parent class
        super(className, animal)

        this.hasBackbone =  true
        this.isColdBlooded = true
        this.hasLegs = true
    }


    // The child class must implement the abstract method of the parent class in its own way - This is polymorphism
    getDetails(){
        console.log(this);
        console.log(`I'm a Tortoise.. 
        
        `);
    }
}

// Aves
class Aves extends Animalia{
     // The child class can have its own constructor function
    constructor(className, animal){
        // The `super` keyword is used to call the constructor of the parent class
        super(className, animal)
        
        this.hasBackbone =  true
        this.isWarmBlooded = true
        this.hasFeatheryWings = true
    }


    // The child class must implement the abstract method of the parent class in its own way - This is polymorphism
    getDetails(){
        console.log(this);
        console.log(`I'm a Bird.. 
        
        `);
    }
}

// Mammals
class Mammal extends Animalia{
    // The child class can have its own constructor function
    constructor(className, animal){
        // The `super` keyword is used to call the constructor of the parent class
        super(className, animal)
        
        this.hasBackbone =  true
        this.isWarmBlooded = true
        this.hasLegs = true
    }


    // The child class must implement the abstract method of the parent class in its own way - This is polymorphism
    getDetails(){
        console.log(this);
        console.log(`I'm a Cat.. 
        
        `);
    }
    
}

// Instantiating the classes
const arthropoda = new Arthropoda('Arthropoda')
const fish = new Fish('Fish')
const amphibia = new Amphibia('Amphibia')
const reptile = new Reptile('Reptile')
const aves = new Aves('Aves')
const mammal = new Mammal('Mammal')


// Calling Methods to set and show all animals with their class and class attributes 

arthropoda.setAnimal('Butterfly')
console.log(arthropoda.getAnimal());
arthropoda.getDetails()

fish.setAnimal('Fish')
console.log(fish.getAnimal());
fish.getDetails()

amphibia.setAnimal('Frog')
console.log(amphibia.getAnimal());
amphibia.getDetails()

reptile.setAnimal('Tortoise')
console.log(reptile.getAnimal());
reptile.getDetails()

aves.setAnimal('Bird')
console.log(aves.getAnimal());
aves.getDetails()

mammal.setAnimal('Cat')
console.log(mammal.getAnimal());
mammal.getDetails()
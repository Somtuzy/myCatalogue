const prompt = require('prompt-sync')()

// creates the initial todolist
const myTodo = []

// Adding your first activity to the todolist
const newAct = firstActivity => {
    firstActivity = prompt(`Please add an activity to create your todolist or reply with exit to close the program: `)
    if(firstActivity && firstActivity !== 'exit'){
        myTodo.push(firstActivity)
        console.log(`Your todolist was created successfully!`);
    } else if (firstActivity === 'exit' ){
        // exit
        return
    } else {
        console.log('Invalid Command. Please enter a valid Command from the options below.');
    }
    return firstActivity
}
// declaring the function that creates the first entry in the todolist and lets the program run
let startProgram = newAct()

// views todolist
const displayTodo = () => {
    console.log(`
Here's your Updated todolist below: 
    •••••••••• ToDo List ••••••••••`);
    myTodo.forEach((todo, index) => console.log(`
=> task ${index + 1}: ${todo}`))
}

// creates a new todolist
const newTodo = newInput => {
    console.log(`
-- Input an activity 
-- Input view to see todolist
-- Input back to go to previous menu
-- Input exit to close program`);
    newInput = prompt('what activity do you want to add? ')
    if (newInput && newInput !== 'exit' && newInput !== 'back' && newInput !== 'view' ){
        myTodo.push(newInput)
        console.log(`${newInput} has been successfully added to your todolist! Reply with view at any point to see your todolist`);
    } else if (newInput === 'back'){
        main()
    } else if (newInput === 'view'){
        displayTodo()
        newTodo()
    } else if (newInput ===  'exit'){
        startProgram = false;
    } else {
        console.log(`Please input an activity or reply with back to go to the main menu or exit to close`);
        newTodo()
    }
}

// edits an entry on a todolist
const updateTodo = (changeInput, i, replaceTodo) => {
    displayTodo()
    console.log(`
-- Input an activity to edit
-- Reply back to go to previous menu
-- Reply exit to close program`);
    changeInput = prompt('what activity do you want to change? ')
    i = myTodo.indexOf(changeInput)
    if (changeInput && changeInput !== 'exit' && changeInput !== 'back' && changeInput !== 'view' && i >= 0){
        replaceTodo = prompt(`what would you like to replace ${changeInput} with? `)
        myTodo.splice(i, 1, replaceTodo)
        console.log(`${changeInput} has been successfully changed to ${replaceTodo} on your todolist! Reply with view at any point to see your todolist`);
    } else if (changeInput === 'back'){
        main()
    } else if (changeInput === 'view'){
        displayTodo()
        updateTodo()
    } else if (changeInput ===  'exit'){
        startProgram = false;
    } else {
        console.log(`Please input an activity in your todolist or reply with back to go to the main menu or exit to close`);
        updateTodo()
    }
}

// removes an entry from the todolist
const removeTodo = (deleteInput, i) => {
    displayTodo()
    console.log(`
-- Input an activity to delete from your todolist
-- Reply back to go to previous menu
-- Reply exit to close program`);
    deleteInput = prompt('what activity do you want to delete?')
    i = myTodo.indexOf(deleteInput)
    if (deleteInput && deleteInput !== 'exit' && deleteInput !== 'back' && deleteInput !== 'view' && i >= 0){
        myTodo.splice(i, 1)
        console.log(`${deleteInput} has been successfully deleted on your todolist! Reply with view at any point to see your todolist`);
    } else if (deleteInput === 'back'){
        main()
    } else if (deleteInput === 'view'){
        displayTodo()
        removeTodo()
    } else if (deleteInput ===  'exit'){
        startProgram = false;
    } else {
        console.log(`Please input an activity in your todolist or input back to go to the main menu or exit to close. `);
        removeTodo()
    }
}

// runs the program functionality
const main = (start) => {
    while(startProgram && startProgram !== 'exit'){
        console.log(`
-- Reply add to create a new activity on your todolist
-- Reply view to display your todolist
-- Reply edit to change an activity on your todolist
-- Reply delete to remove an activity from your todolist
-- Reply exit at any point to close program`)
        start = prompt('what would you like to do? ')
        if(start === 'add'){
            newTodo()
        } else if (start === 'edit'){
            updateTodo()
        } else if (start === 'delete'){
            removeTodo()
        } else if (start === 'help'){
            commands()
        } else if (start === 'view'){
            displayTodo()
        } else if (start === 'exit'){
            startProgram = false;
        } else {
            console.log('Invalid Input. Please enter a valid Input or reply help for more');
        }
    } 
}
// runs the program
main()
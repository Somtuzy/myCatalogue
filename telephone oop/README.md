The goal is to create a telephone package using some basic knowledge of Object Oriented Programming and implement some design patters. 

Here is a step by step breakdown of my code below:
1. A Telephone class was created with two properties and three methods were exposed:
=> Property one: dialer - For adding numbers to the dialer.
=> Property two: observers - For adding observers to the dialer.
=> Method one: AddPhoneNumber - For adding a new phone number
=> Method two: RemovePhoneNumber - For removing a phone number
=> Method three: DialPhoneNumber - For dialling a phone number (only phone numbers that have been added can be dialled). This method notifies our observers whenever a phone number is dialled.

2. The telephone class was updated so it uses the observer pattern (have methods to add, remove and notify observers) by creating three extra methods: 
=> Method four: addObserver - For adding a new Observer
=> Method five: removeObserver - For removing an Observer
=> Method six: notifyObserver - For notifying an Observer

3. A second class was created for the observer, with an observer property and a method that can be called by the telephone class to notify it.
=> Property one: observer - For creating a new observer and taking their details 
=> Method one: update - To be called by the Telephone class to notify the observers.

4. The Telephone class was instantiated once and we used a Singleton pattern to prevent it from having more than one instance.

5. Two new observers were created by making two instances of the observer class.

6. The two observers were added to the observers property on the telephone package with the addObserver method.

7. Two phone numbers were created to test the package - one valid number and one wrong number.

8. The valid number was added to the dialer property on the telephone package with the addPhoneNumber method.

9. The observers were notified that the number was added to the dialer.

10. The wrong number is dialled first with the dialPhonenumber method of the telephone package and it notifies the observers that the number doesn't exist in the dialer.

11. The valid number is then dialled with the same method above and this notifies the observers with `Now Dialling 2347023232` to show that the valid number is being dialled as it exists in the dialer.
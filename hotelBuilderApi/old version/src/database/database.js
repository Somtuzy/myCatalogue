const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const constants = require('../app/constants')
const Uri = "mongodb+srv://gandalfTheBlack:getduf-qubvav-cyXpi5@tehcville.y2rv9we.mongodb.net/?retryWrites=true&w=majority"

function database() {
    mongoose
    .connect(Uri, { 
        dbName: "hotel-management",
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => {
        console.log(`${constants.MESSAGES.CONNECTED}: Connected to mongoose database!`);
    })
    .catch((err) => {
        console.error(`${constants.MESSAGES.ERROR}: ${err}`);
    })
}

module.exports = database
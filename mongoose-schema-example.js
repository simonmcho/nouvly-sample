const mongoose = require('mongoose'); // Use mongoose
const Schema = mongoose.Schema; // Create reference to mongoose Schema class

const TankProfile = new Schema({ // Create new instance of mongoose Schema. Must be an object
    name: String, 
    size: String
});

const someTank = mongoose.model('Tank', TankProfile);

// Below, you can call on many mongoose model methods to create and save data to a database
someTank.save(err =>{
    if (err) return err;
    // Save to db here...
});

someTank.create({ size: 'Small '}, (err, small) => {
    
});
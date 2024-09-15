const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shawal_061:shawal_061@cluster0.ts7cgjv.mongodb.net/Restaurant_MERN?retryWrites=true&w=majority';
// /Restaurant_MERN? was added for mongoose
// Added the new password

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);

        await mongoose.connect(mongoURI);
        // Connection to MongoDB which takes a bit of time

        console.log('Mongo has been connected!');

        {/* Fetching the tables and then converting them into arrays.
            .find({}) indicates we are fetching all data */}
        const foodItemsCollection = mongoose.connection.collection("food_items");
        const data = await foodItemsCollection.find({}).toArray();

        const foodCategory = mongoose.connection.collection("foodCategory");
        const categoryData = await foodCategory.find({}).toArray();

        // This is for the unique email per account property
        const userDataConnection = mongoose.connection.collection("users");
        const userData = await userDataConnection.find({}).toArray();

        // Changing the scope to global
        global.food_items = data;
        global.foodCategory = categoryData;
        global.userData = userData; // Added userData

        return { food_items: data, foodCategory: categoryData, userData: userData }; // Added userData
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = connectToMongo;

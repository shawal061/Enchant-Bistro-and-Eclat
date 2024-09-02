// const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://shawal_061:shawal@cluster0.ts7cgjv.mongodb.net/Restaurant_MERN?retryWrites=true&w=majority';

// const connectToMongo = async () => {
//     try {
//         mongoose.set('strictQuery', false);
//         await mongoose.connect(mongoURI);
//         console.log('Mongo has been connected!');

//         // const foodItemsCollection = mongoose.connection.collection("food_items");
//         // const data = await foodItemsCollection.find({}).toArray();
//         // console.log(data);

//         const fetched_data = await mongoose.connection.db.collection("food_items");
//         fetched_data.find({}).toArray(function (err, data) {
//             if (err) console.log(err)
//             else {
//                 global.food_items = data;
//                 console.log(global.food_items);
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         process.exit(1); // Exit the process with a non-zero code to indicate an error
//     }
// };

// module.exports = connectToMongo;


const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shawal_061:shawal_061@cluster0.ts7cgjv.mongodb.net/Restaurant_MERN?retryWrites=true&w=majority'; // Added the new password

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);

        await mongoose.connect(mongoURI);

        console.log('Mongo has been connected!');

        const foodItemsCollection = mongoose.connection.collection("food_items");
        const data = await foodItemsCollection.find({}).toArray();

        const foodCategory = mongoose.connection.collection("foodCategory");
        const categoryData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = categoryData; // Corrected variable name

        return { food_items: data, foodCategory: categoryData };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = connectToMongo;


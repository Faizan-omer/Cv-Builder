const mongoose = require('mongoose');

//Creates a Mongoose Schema mapping to MongoDB collection
const CvSchema = new mongoose.Schema(
    {
        title: String,
        name: String,
        email: String,
        phone: String,
        info: String,
        education: String,
        experience: String,
        projects: String
    }
)

mongoose.model('cv',CvSchema);
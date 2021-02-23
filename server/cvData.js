const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema(
    {
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
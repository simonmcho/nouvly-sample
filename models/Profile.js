const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    field: {
        type: String,
        required: true
    },
    subjects: [
        {
           title: {
               type: String,
               required: true
           },
           levels: {
               type: Number,
               required: true
           },
           currentlyTeaching: {
               type: Boolean,
               default: false
           },
           description: {
               type: String
           }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            study: {
                type: String,
                required: true
            },
        }
    ],
    social: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    rate: {
        type: Number,
        required: true
    },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
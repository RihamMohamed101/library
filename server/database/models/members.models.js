import { model, Schema } from "mongoose";




const schema = new Schema({
    fullName:
    {
        type: String,
        required: true
    },
    membershipType: {
        type: String,
        enum: ['student', 'teacher', 'staff'],
        required: true
    },
    joinYear:
    {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});

export const Member = model('Member', schema);

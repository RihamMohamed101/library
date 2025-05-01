import { model, Schema, Types } from "mongoose";



const schema = new Schema({
    member:
    {
        type: Types.ObjectId,
        ref: 'Member',
        required: true
    },

    book:
    {
        type: Types.ObjectId,
        ref: 'Book',
        required: true
    },

    borrowDate:
    {
        type: Date,
        default: Date.now
    },

  returnDate: Date
}, {
    versionKey: false
});

export  const Borrowing =model('Borrowing', schema);

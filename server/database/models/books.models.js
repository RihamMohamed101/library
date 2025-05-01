import { model, Schema } from "mongoose";



const schema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    author: {
        type: String,
        required:true
    },
    yearPublished: {
        type: Number,
        required:true
  }
}, {
    versionKey: false
});


export const Book =model('Book', schema);

import { Book } from "../../database/models/books.models.js"
import { ApiFeature } from "../api.js"
import qs from 'qs';




export const addBook = async(req, res) => {
    const book = new Book(req.body)
    await book.save()
    res.status(201).json({message:"success"})
}

export const allBook = async (req, res) => {
     
    const parsedQuery = qs.parse(req._parsedUrl.query); // بدل req.query
    const apiFeature = new ApiFeature(Book.find(), parsedQuery);
    apiFeature.filter().sort().search()

    let books = await apiFeature.mongooseQuery;
    
    res.status(200).json({message:"sucsses" , books})
}

export const updateBook = async(req , res) => {
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json({message:"sucess" ,book })
}


export const deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete( req.params.id )
    res.json({message:"sucess"})
    
}
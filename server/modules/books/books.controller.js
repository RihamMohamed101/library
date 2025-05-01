import { Book } from "../../database/models/books.models.js"



export const addBook = async(req, res) => {
    const book = new Book(req.body)
    await book.save()
    res.status(201).json({message:"success"})
}

export const allBook = async(req, res) => {
    const books = await Book.find()
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
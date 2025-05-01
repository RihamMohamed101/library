import { Borrowing } from "../../database/models/borrowings.models.js"



export const addBorrowing = async(req, res) => {
    const borrowing = new Borrowing(req.body)
    await borrowing.save()
    res.status(201).json({message:"success"})
}

export const allBorrowing = async(req, res) => {
    const borrowings = await Borrowing.find()
        .populate('member', 'fullName membershipType')
        .populate('book', 'title author');
         
    res.status(200).json({message:"sucsses" , borrowings})
}

export const updateBorrowing = async(req , res) => {
    const borrowing = await Borrowing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json({message:"sucess" ,borrowing })
}


export const deleteBorrowing = async (req, res) => {
    const borrowing = await Borrowing.findByIdAndDelete( req.params.id )
    res.json({message:"sucess"})
    
}
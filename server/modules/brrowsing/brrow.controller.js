import { Borrowing } from "../../database/models/borrowings.models.js"
import qs from 'qs';




export const addBorrowing = async(req, res) => {
    const borrowing = new Borrowing(req.body)
    await borrowing.save()
    res.status(201).json({message:"success"})
}

export const allBorrowing = async (req, res) => {
  const parsedQuery = qs.parse(req._parsedUrl.query); 

  const searchTerm = parsedQuery.search || ''; 
  const sortBy = parsedQuery.sort || 'borrowDate'; 
  const pipeline = [
    {
      $lookup: {
        from: 'members',
        localField: 'member',
        foreignField: '_id',
        as: 'member'
      }
    },
    { $unwind: '$member' },
    {
      $lookup: {
        from: 'books',
        localField: 'book',
        foreignField: '_id',
        as: 'book'
      }
    },
    { $unwind: '$book' },
    
    {
      $match: {
        $or: [
          { 'member.fullName': { $regex: searchTerm, $options: 'i' } },
          { 'book.title': { $regex: searchTerm, $options: 'i' } },
          { borrowDate: { $regex: searchTerm, $options: 'i' } }
        ]
      }
    },

  
    {
      $project: {
        _id: 1,
        borrowDate: 1,
        returnDate: 1,
        memberName: '$member.fullName',
        membershipType: '$member.membershipType',
        bookTitle: '$book.title',
        bookAuthor: '$book.author'
      }
      }
      ,
       {
      $sort: {
        [sortBy]: -1 
      }
    },
  ];

  const borrowings = await Borrowing.aggregate(pipeline);

  res.status(200).json({ message: 'success', borrowings });
};

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




export const membersByBook = async (req, res) => {
 
    const { bookId } = req.params;

    const borrowings = await Borrowing.find({ book: bookId })
        .populate('member', 'fullName membershipType joinYear')
        .populate('book', 'title ');

    res.status(200).json({ message: "success", borrowings });
 
};

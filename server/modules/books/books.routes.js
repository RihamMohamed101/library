import { Router } from "express";
import { addBook, allBook, deleteBook, updateBook } from "./books.controller.js";


const bookRouter = Router()

bookRouter.route('/')
          .post(addBook)
          .get(allBook)
          
bookRouter.route('/:id')
          .put(updateBook)
          .delete(deleteBook)       



export default bookRouter
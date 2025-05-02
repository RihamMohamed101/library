import { Router } from "express";
import { addBorrowing, allBorrowing, deleteBorrowing, membersByBook, updateBorrowing } from "./brrow.controller.js";


const brrowRouter = Router()

brrowRouter.route('/')
          .post(addBorrowing)
    .get(allBorrowing)
          
brrowRouter.get('/by-book/:bookId', membersByBook)

brrowRouter.route('/:id')
          .put(updateBorrowing)
          .delete(deleteBorrowing)       



export default brrowRouter
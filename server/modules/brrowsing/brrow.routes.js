import { Router } from "express";
import { addBorrowing, allBorrowing, deleteBorrowing, updateBorrowing } from "./brrow.controller.js";


const brrowRouter = Router()

brrowRouter.route('/')
          .post(addBorrowing)
          .get(allBorrowing)
          
brrowRouter.route('/:id')
          .put(updateBorrowing)
          .delete(deleteBorrowing)       



export default brrowRouter
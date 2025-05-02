
import { Router } from "express";
import { addMember, allMember, deleteMember, membersByJoinYear, updateMember } from "./member.controller.js";



const memberRouter = Router()

memberRouter.route('/')
          .post(addMember)
          .get(allMember)

memberRouter.route('/:id')
          .put(updateMember)
          .delete(deleteMember)       



export default memberRouter
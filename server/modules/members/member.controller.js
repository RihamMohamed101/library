import { Member } from "../../database/models/members.models.js"
import { ApiFeature } from "../api.js"
import qs from 'qs';



export const addMember = async(req, res) => {
    const member = new Member(req.body)
    await member.save()
    res.status(201).json({message:"success"})
}

export const allMember = async (req, res) => {
    

        const parsedQuery = qs.parse(req._parsedUrl.query); // بدل req.query
        const apiFeature = new ApiFeature(Member.find(), parsedQuery);
        apiFeature.filter().sort().search()
         
        let members = await apiFeature.mongooseQuery;
       res.status(200).json({message:"sucsses" , members})
}

export const updateMember = async(req , res) => {
    const member = await Member.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json({message:"sucess" ,member })
}


export const deleteMember = async (req, res) => {
    const member = await Member.findByIdAndDelete( req.params.id )
    res.json({message:"sucess"})
    
}


export const membersByJoinYear = async (req, res) => {
    const { year } = req.params;
    const members = await Member.find({ joinYear: parseInt(year) });
    res.status(200).json({ message: "success", members });
};
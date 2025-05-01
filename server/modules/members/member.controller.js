import { Member } from "../../database/models/members.models.js"



export const addMember = async(req, res) => {
    const member = new Member(req.body)
    await member.save()
    res.status(201).json({message:"success"})
}

export const allMember = async(req, res) => {
    const members = await Member.find()
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
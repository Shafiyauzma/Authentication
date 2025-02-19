import userModel from "../models/userModel.js";

//to get users data
export const getUserData = async (req,res) =>{
    try{

        const {userId} = req.body;
        
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({
                success:false,
                message:"User not Found"
            })
        }

        res.json({
            success: true,
            userData:{
                name: user.name,
                isAccountverified: user.isAccountVerified
            }
        });

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
}
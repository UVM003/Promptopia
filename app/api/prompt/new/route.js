import Prompt from "@/models/prompt";
import mongoose from "mongoose";

const { connectToDB } = require("@/utils/database");

export const POST = async (req)=>
{
    const{prompt,u,tag}=await req.json();
    console.log(u)
    try {
        await connectToDB();
        const newPrompt=new Prompt({
            creator:u,
            prompt,
            tag
        })
        console.log(newPrompt)
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201})
        
    } catch (error) {
        console.error('Error fetching prompts:', error);
     return new Response("Failed to Create a new Prompt",{status:500}) 
        // return new Response(error,{status:500}) 
    }
}
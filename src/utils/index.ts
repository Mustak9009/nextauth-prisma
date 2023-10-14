import {prisma} from '../db/prisma/index';

export const connectDB= async()=>{
    try{
        await prisma.$connect();
    }catch(err){
        console.log("Connection established",err);
        await prisma.$disconnect();
        throw new Error("Connection faield due to some resion");
    }
}
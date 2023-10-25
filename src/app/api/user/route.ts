import {NextResponse,NextRequest} from 'next/server';
import {prisma} from '@/db/prisma';
import {connectDB} from '@/utils';
import {hash,genSalt} from 'bcryptjs';
connectDB(); //Connect with database
export const POST = async (req:NextRequest) =>{
    try{
        const body = await req.json();
        const {userName,email,password} = body;
        const isUserNameEmailExist = await prisma.user.findUnique({where:{email}});
        if(isUserNameEmailExist){
            return NextResponse.json({error:"User already exist ...!!"},{status:409});
        }
        const isUserEmailExist = await prisma.user.findUnique({where:{email}});
        if(isUserEmailExist){
            return NextResponse.json({error:"User already exist ...!!"},{status:409});
        }
        const salt = await genSalt(10);
        const hashPassword = await hash(password,salt);
        const newUser = await prisma.user.create({
            data:{
                userName,
                email,
                password:hashPassword
            },
            select:{
                userName:true,
                email:true,
            }
        })
        return NextResponse.json({newUser},{status:201});
    }catch(err){
        console.log(err);
        return NextResponse.json({error:"Something going wrong...!!"},{status:500});
    }
}
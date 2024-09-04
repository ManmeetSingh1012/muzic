import { NextResponse } from "next/server";
import {z} from "zod";
import {getServerSession} from "next-auth";
const UpvoteStreamSchema = z.object({   

    streamId : z.string(),
    
})



export async function POST(req:NextResponse)
{

const session = await getServerSession()
}

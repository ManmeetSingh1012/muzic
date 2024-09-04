import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { prismaClient } from "@/app/lib/db";
const UpvoteStreamSchema = z.object({
  streamId: z.string(),
});

const DownvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextResponse) {
  // you will get user information
  const session = await getServerSession();

  const user = prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 403,
      }
    );
  }

  console.log("User", user);

  try {
    const data = DownvoteSchema.parse(await req.json());

    await prismaClient.upvote.delete({
      //  TODO : user?.id ?? "" change this a the place of the todo
      where: {
        userId_streamId: {
          userId: "",
          streamId: data.streamId,
        },
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error While Upvoting",
      },
      {
        status: 400,
      }
    );
  }
}

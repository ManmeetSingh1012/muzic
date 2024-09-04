import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import { useRouter } from "next/navigation";

const yt_regex = new RegExp(
  "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+"
);

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextResponse) {
  try {
    const data = CreateStreamSchema.parse(await req.json());

    const isYT = yt_regex.test(data.url);

    if (!isYT) {
      return NextResponse.json(
        {
          message: "invalid url",
        },
        {
          status: 400,
        }
      );
    }

    const extractId = data.url.split("v=")[1];

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: extractId,
        type: "YOUTUBE",
      },
    });

    // Return a success response after creating the stream
    return NextResponse.json(
      {
        message: "Stream added successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "error while adding stream",
      },
      {
        status: 400,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const createrId = req.nextUrl.searchParams.get("creatorId");

  const streams = await prismaClient.stream.findMany({
    where: {
      userId: createrId ?? "",
    },
  });

  return NextResponse.json(streams);
}

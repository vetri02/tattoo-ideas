
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { message } = body;
  
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "0ea3d46aac800ae87cd210a5e98f4eee1f4b3b183837e922db3574b7170e0308",
          input: { prompt: message, num_outputs: 4 },
        }),
      });

      const prediction = await response.json();
  
      return new NextResponse(JSON.stringify(prediction), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      let error_response = {
        status: "error",
        message: error.message,
      };
  
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }


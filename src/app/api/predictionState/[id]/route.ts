import { NextRequest, NextResponse } from "next/server";

type ErrorResponse = {
  detail: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + id,
    {
      next: { revalidate: 1 },
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    let error: ErrorResponse = await response.json();
    return new NextResponse(JSON.stringify({ detail: error.detail }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const prediction = await response.json();
  return new NextResponse(JSON.stringify(prediction));
}
// Importing necessary types from Next.js server
import { NextRequest, NextResponse } from "next/server";

// Defining the structure of error response
type ErrorResponse = {
  detail: string;
};

// Configuring the function to run at the edge servers
export const config = {
  runtime: 'edge',
}

// Defining the GET function for the API endpoint
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Extracting the id from the request parameters
  const id = params.id;

  // Making a fetch request to the Replicate API with the provided id
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + id,
    {
      next: { revalidate: 1 },
      // Setting the necessary headers for the request
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Checking if the response status is not 200
  if (response.status !== 200) {
    // Parsing the error response
    let error: ErrorResponse = await response.json();
    // Returning the error response with a status of 500
    return new NextResponse(JSON.stringify({ detail: error.detail }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parsing the successful response
  const prediction = await response.json();
  // Returning the successful response
  return new NextResponse(JSON.stringify(prediction));
}

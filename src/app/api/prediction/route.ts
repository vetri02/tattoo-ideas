
// Importing necessary libraries for handling requests and responses
import { NextRequest, NextResponse } from "next/server";

// Importing Ratelimit for handling rate limiting
import { Ratelimit } from '@upstash/ratelimit'

// Importing kv from @vercel/kv for key-value storage
import { kv } from '@vercel/kv'

// Setting up the rate limiter with a sliding window of 5 requests per hour
const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(10, '1 h'),
})

// Configuring the runtime environment
export const config = {
    runtime: 'edge',
}

// Defining the POST method for the API endpoint
export async function POST(req: NextRequest) {
    // Getting the IP address from the request, defaulting to localhost if not found
    const ip = req.ip ?? '127.0.0.1'

    // Checking the rate limit for the IP address
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    // If the rate limit has been reached, return a response with status 429 and rate limit headers
    if (!success) {
        return new NextResponse('You have reached your request limit for the day.', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        })
      }

    // Try to process the request
    try {
        // Parse the request body as JSON
        const body = await req.json();

        // Extract the message from the request body
        const { message } = body;

        // Make a POST request to the Replicate API with the message as input
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

        // Parse the response as JSON
        const prediction = await response.json();

        // Return the prediction in the response with status 201 and rate limit headers
        return new NextResponse(JSON.stringify(prediction), {
            status: 201,
            headers: {
                'Content-Type': 'application/json', 
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString(),
            },
        });
    } catch (error: any) {
        // If an error occurs, return a response with status 500 and the error message
        let error_response = {
            status: "error",
            message: error.message,
        };

        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: {
                'Content-Type': 'application/json', 
            },
        });
    }
}

import { generatePostSchema } from "@/validators/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body using the schema
    const validatedData = generatePostSchema.parse(body);

    // Prepare the payload for the external API
    const externalApiPayload = {
      prompt:
        "Generate a really good post or article for the product: " +
        validatedData.product.name +
        " with the description: " +
        validatedData.product.description +
        " and the vibe: " +
        validatedData.vibe +
        "dont talk about anything else just the product and the vibe, make sure to sound human do minimum 100 words and max 2000 words",
      language: "english",
      vibe: validatedData.vibe,
      productName: validatedData.product.name,
      platform:
        validatedData.platform.charAt(0).toUpperCase() +
        validatedData.platform.slice(1), // Capitalize first letter
    };

    // Send request to external API
    const externalApiResponse = await fetch(
      "http://79.98.27.129:8080/api/marketing/request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(externalApiPayload),
      }
    );

    if (!externalApiResponse.ok) {
      const errorText = await externalApiResponse.text();
      console.error("External API error:", errorText);
      return NextResponse.json(
        { error: "Failed to generate post from external service" },
        { status: externalApiResponse.status }
      );
    }

    // Get the response as text first to handle both JSON and plain text responses
    const responseText = await externalApiResponse.text();

    let generatedPost = responseText;
    let metadata = {};

    // Try to parse as JSON, if it fails, use the text as the generated post
    try {
      const externalApiData = JSON.parse(responseText) as Record<
        string,
        unknown
      >;
      generatedPost =
        (externalApiData.generatedPost as string) ||
        (externalApiData.post as string) ||
        (externalApiData.content as string) ||
        responseText;
      metadata = externalApiData.metadata || {};
    } catch {
      // If JSON parsing fails, use the response text as the generated post
      console.log("External API returned plain text, using as generated post");
      generatedPost = responseText;
    }

    // Return the generated post from external API
    return NextResponse.json({
      success: true,
      generatedPost,
      metadata,
    });
  } catch (error) {
    console.error("API route error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

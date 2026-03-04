// OpenRouter API helper
// Used only inside Server Actions — never imported on the client

export interface OpenRouterMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface OpenRouterResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

export async function callOpenRouter(
    messages: OpenRouterMessage[],
    model: string = "google/gemini-2.0-flash-001"
): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set");
    }

    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
                "HTTP-Referer": appUrl,
                "X-Title": "AI Resume Builder",
            },
            body: JSON.stringify({
                model,
                messages,
                max_tokens: 2500,
                temperature: 0.7,
            }),
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
            `OpenRouter API error: ${response.status} — ${errorBody}`
        );
    }

    const data: OpenRouterResponse = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error("OpenRouter returned an empty response");
    }

    return content;
}

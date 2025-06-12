import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "meta/Llama-4-Maverick-17B-128E-Instruct-FP8";

export async function fetchChatCompletion(messages: { role: string, content: string }[]): Promise<string> {
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token!),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages,
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  return response.body.choices[0].message.content;
}
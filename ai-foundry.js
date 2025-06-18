import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

async function main() {
  const client = ModelClient(
    process.env.AZURE_INFERENCE_SDK_ENDPOINT ?? "https://aistudioaiservices020539591018.services.ai.azure.com/models",
    new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY ?? "Fi5yRwLmxbCHQTWx4jmcugxt1od397cK3ZQZM3OPSbg07qA0AE7IJQQJ99BFACMsfrFXJ3w3AAAAACOGfR4s")
  );

  const messages = [
    { role: "system", content: "You are an helpful assistant" },
    { role: "user", content: "What are 3 things to see in Seattle?" },
  ];

  const response = await client.path("/chat/completions").post({
    body: {
      messages,
      max_tokens: 2048,
      temperature: 0.8,
      top_p: 0.1,
      presence_penalty: 0,
      frequency_penalty: 0,
      model: "Llama-4-Maverick-17B-128E-Instruct-FP8",
    },
  });

  // Print the full response if you want:
  // console.log(JSON.stringify(response, null, 2));

  // Print only the assistant's reply:
  console.log(response.body.choices[0].message.content);
}

main();
import Link from "next/link";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

const testAPI = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "can you tell me what this code block means? const array = [1,2,3].map(x => x+1)";

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
};

await testAPI();

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex w-full flex-col items-center px-8 py-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">ez</span>Code
        </h1>
        <div className="mt-12 flex w-full justify-center">
          <span>hello</span>
        </div>
      </div>
    </main>
  );
}

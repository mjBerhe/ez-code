import Link from "next/link";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";
import { Explainer } from "./components/explainer";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

const testAPI = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "can you tell me what this code block means? const array = [1,2,3].map(x => x+1)";

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};

// const text = await testAPI();

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="flex h-full w-full flex-col items-center px-4 py-6 sm:px-8 sm:py-12">
        <div className="flex flex-col items-center gap-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            <span className="text-[hsl(280,100%,70%)]">ez</span>Code
          </h1>
          <span className="text-center text-base sm:text-xl">
            Explain some code with a click of a button
          </span>
        </div>
        <div className="mt-6 flex w-full flex-col items-center sm:mt-12">
          <Explainer />
        </div>
      </div>
    </main>
  );
}

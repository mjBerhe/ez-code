"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { codeExplainQuery } from "../actions";

export const TextInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [showSimple, setShowSimple] = useState<boolean>(true);

  const mutation = useMutation({
    mutationFn: (prompt: string) => codeExplainQuery(prompt),
  });
  const { isPending } = mutation;

  const handleSubmit = () => {
    mutation.mutate(input);
  };

  // console.log(mutation);

  const responses = mutation.data?.split("## ").filter((x) => x !== "");
  const simpleResponse = responses?.[0];
  const complexResponse = responses?.[1];
  console.log(responses);

  return (
    <div className="flex w-full max-w-6xl flex-col gap-y-8">
      <textarea
        className="min-h-[200px] min-w-[500px] rounded-lg bg-[#bdbdbd]/10 p-4 text-white shadow-lg"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        placeholder="code goes here!"
        disabled={isPending}
      />

      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="h-[50px] rounded-full bg-[#6D0E7A]/90 px-8 py-2 tracking-wider shadow-lg hover:bg-[#6D0E7A] disabled:bg-[#6D0E7A]/50 disabled:text-white/50"
          disabled={isPending}
        >
          EXPLAIN
        </button>
      </div>

      <div className="flex">
        <button></button>
        <button></button>
      </div>

      {/* <div className="text-sm">{mutation.data}</div> */}
      <div className="flex flex-col">
        <div className="flex gap-x-4">
          <button onClick={() => setShowSimple(true)}>Simple</button>
          <button onClick={() => setShowSimple(false)}>Complex</button>
        </div>
        <div className="relative mt-4 min-h-[200px] rounded-lg bg-[#bdbdbd]/10 p-4 shadow-lg">
          {isPending && (
            <div className="absolute left-[0%] top-[0%] flex h-full w-full items-center justify-center">
              <svg
                className="h-8 w-8 animate-spin text-white"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6D0E7A]/70"
                ></path>
              </svg>
            </div>
          )}

          {showSimple && <span>{simpleResponse}</span>}
          {!showSimple && <span>{complexResponse}</span>}
        </div>
      </div>
    </div>
  );
};

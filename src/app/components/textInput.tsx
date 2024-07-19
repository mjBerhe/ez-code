"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { codeExplainQuery } from "../actions";

export const TextInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [showSimple, setShowSimple] = useState<boolean>(true);

  // need to pass input here somehow?
  const mutation = useMutation({
    mutationFn: (prompt: string) => codeExplainQuery(prompt),
  });

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
      />

      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="h-[50px] rounded-full bg-[#6D0E7A]/90 px-8 py-2 tracking-wider shadow-lg hover:bg-[#6D0E7A]"
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
        <div className="mt-4 min-h-[200px] rounded-lg bg-[#bdbdbd]/10 p-4">
          {showSimple && <span>{simpleResponse}</span>}
          {!showSimple && <span>{complexResponse}</span>}
        </div>
      </div>
    </div>
  );
};

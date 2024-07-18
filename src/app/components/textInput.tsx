"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { codeExplainQuery } from "../actions";

export const TextInput: React.FC = () => {
  const [input, setInput] = useState<string>("");

  // need to pass input here somehow?
  const mutation = useMutation({
    mutationFn: (prompt: string) => codeExplainQuery(prompt),
  });

  const handleSubmit = () => {
    mutation.mutate(input);
  };

  console.log(mutation);

  return (
    <div className="">
      <textarea
        className="min-w-[500px] p-4 text-black"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />

      <button type="submit" onClick={handleSubmit}>
        submit
      </button>

      <div>{mutation.data}</div>
    </div>
  );
};

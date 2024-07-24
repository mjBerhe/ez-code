"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { codeExplainQuery, codeImageExplainQuery } from "../actions";
import { DragAndDrop } from "./fileInput";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export const Explainer: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [type, setType] = useState<"text" | "image">("text");

  const mutation = useMutation({
    mutationFn: (prompt: string) => codeExplainQuery(prompt),
  });
  const { isPending } = mutation;

  const imageMutation = useMutation({
    mutationFn: (variables: { path: string; type: string }) =>
      codeImageExplainQuery(variables.path, variables.type),
  });

  const handleSubmit = () => {
    mutation.mutate(input);
  };

  const handleUpload = (path: string, type: string) => {
    // mutation.mutate(path, type)
    imageMutation.mutate({ path: path, type: type });
  };

  const responses = mutation.data
    ? mutation.data?.split("## ").filter((x) => x !== "")
    : imageMutation.data
      ? imageMutation.data?.split("## ").filter((x) => x !== "")
      : "";
  const simpleResponse = responses?.[0]?.split(/\r?\n/);
  const complexResponse = responses?.[1];

  const complexResponseSplit = complexResponse?.split(/\r?\n/);
  const complexResponseCleaned = complexResponseSplit
    ?.map((x) => x.split(/\**(.*?)\*/))
    .flat()
    .filter((y) => y !== "");

  return (
    <div className="flex w-full max-w-6xl flex-col">
      <TabGroup>
        <TabList className="flex gap-4">
          <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            Text
          </Tab>
          <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            Image
          </Tab>
        </TabList>
        <TabPanels className="mt-4 flex w-full">
          <TabPanel className="w-full">
            <textarea
              className="min-h-[200px] w-full rounded-lg bg-[#bdbdbd]/10 p-4 text-white shadow-lg"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="code goes here!"
              disabled={isPending}
            />
          </TabPanel>
          <TabPanel>
            <DragAndDrop handleUpload={handleUpload} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <div className="flex w-full"></div>

      <div className="mt-4 flex w-full items-center justify-center sm:mt-8">
        <button
          type="submit"
          onClick={handleSubmit}
          className="h-[50px] rounded-full bg-[#6D0E7A]/90 px-8 py-2 tracking-wider shadow-lg hover:bg-[#6D0E7A] disabled:bg-[#6D0E7A]/50 disabled:text-white/50"
          disabled={isPending || !input}
        >
          EXPLAIN
        </button>
      </div>

      <div className="mt-4 flex flex-col sm:mt-8">
        <TabGroup>
          <TabList className="flex gap-4">
            <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Simple
            </Tab>
            <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Complex
            </Tab>
          </TabList>
          <TabPanels className="relative mt-4 min-h-[200px] rounded-lg bg-[#bdbdbd]/10 p-4 shadow-lg">
            {!mutation.data && (
              <span className="text-white/50">explanation will come here!</span>
            )}
            <TabPanel className="flex flex-col gap-y-1">
              {simpleResponse?.map((x, i) => (
                <span key={`${x}-${i}`}>{x}</span>
              ))}
            </TabPanel>
            <TabPanel className="flex flex-col gap-y-2">
              {complexResponseCleaned?.map((x, i) => (
                <span key={`${x}-${i}`}>{x}</span>
              ))}
            </TabPanel>
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
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

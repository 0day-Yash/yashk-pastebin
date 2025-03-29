"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with content:", content);
    try {
      const response = await fetch("/api/createPaste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      console.log("API response:", data);
      setUrl(`/paste/${data.id}`);
    } catch (error) {
      console.error("Error creating paste:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Yash&apos;s PasteBin
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your paste here..."
          rows={6}
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-md shadow-md hover:opacity-90 transition-opacity"
        >
          Create Paste
        </button>
      </form>

      {url && (
        <p className="mt-6 text-lg">
          ✅ Paste Created:{" "}
          <a
            href={url}
            className="text-blue-400 underline hover:text-blue-300 transition-colors"
          >
            {url}
          </a>
        </p>
      )}
    </div>
  );
}

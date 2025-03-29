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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Yashs PasteBin</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your paste here..."
          rows={6}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Create Paste
        </button>
      </form>

      {url && (
        <p className="mt-4 text-lg">
          ✅ Paste Created: <a href={url} className="text-blue-600 underline">{url}</a>
        </p>
      )}
    </div>
  );
}

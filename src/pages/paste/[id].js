import Link from "next/link";
import clientPromise from "../../../lib/mongodb";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = await clientPromise;
  const db = client.db("pastebin");
  const paste = await db.collection("pastes").findOne({ id });

  if (!paste) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: paste.id,
      content: paste.content,
      createdAt: paste.createdAt ? new Date(paste.createdAt).toLocaleString() : "Unknown",
    },
  };
}

export default function Paste({ id, content, createdAt }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Content copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <header className="w-full max-w-2xl mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          PasteBin Viewer
        </h1>
      </header>
      <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Paste Details
        </h2>
        <p className="text-sm text-gray-400 mb-2">
          <strong>Paste ID:</strong> {id}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          <strong>Created At:</strong> {createdAt}
        </p>
        <h3 className="text-lg font-semibold mb-2">Content:</h3>
        <pre className="bg-gray-800 text-white p-4 rounded-md border border-gray-700 overflow-auto">
          {content}
        </pre>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Copy to Clipboard
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto text-center bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Paste Details
        </h1>
        <p className="text-sm text-gray-400 mb-2">
          <strong>Paste ID:</strong> {id}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          <strong>Created At:</strong> {createdAt}
        </p>
        <h2 className="text-lg font-semibold mb-2">Content:</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-md border border-gray-700 overflow-auto">
          {content}
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(content)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Copy to Clipboard
        </button>
        <a
          href="/"
          className="mt-4 inline-block text-blue-400 hover:text-blue-300 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}


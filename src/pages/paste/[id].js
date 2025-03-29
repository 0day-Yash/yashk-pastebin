import clientPromise from "../../../lib/mongodb";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = await clientPromise;
  const db = client.db("pastebin");
  const paste = await db.collection("pastes").findOne({ id });

  return {
    props: {
      paste: paste ? paste.content : "Paste not found",
    },
  };
}

export default function Paste({ paste }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Your Paste:</h1>
      <pre className="mt-2 border p-2 rounded">{paste}</pre>
    </div>
  );
}

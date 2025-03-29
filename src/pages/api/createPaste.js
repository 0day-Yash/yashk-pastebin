import clientPromise from "../../../lib/mongodb";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("pastebin");
      const pastesCollection = db.collection("pastes");

      const pasteId = nanoid(6);
      await pastesCollection.insertOne({ id: pasteId, content, createdAt: new Date() });

      res.status(200).json({ id: pasteId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create paste" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

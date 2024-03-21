import {connectToDatabase} from "../../lib/mongodb";

export default async function handler(req, res) {
  const {db} = await connectToDatabase();

  const data = await db
    .collection("tournaments")
    .find({})
    .toArray()
    .catch(console.error);

  res.status(200).json({data});
}

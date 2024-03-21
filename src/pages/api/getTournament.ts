import {connectToDatabase} from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {db} = await connectToDatabase();

  const data = await db
    .collection("tournaments")
    .find({})
    .toArray()
    .catch(console.error);

  res.status(200).json({data});
}

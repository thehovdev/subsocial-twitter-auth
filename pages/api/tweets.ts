import type { NextApiRequest, NextApiResponse } from 'next'
import {Client} from "twitter-api-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Client(process.env.BEARER_TOKEN as string);
  const response = await client.tweets.tweetsRecentSearch({
    query: "(from:DevAfgan)",
  });


  res.status(200).json(response.data)
}

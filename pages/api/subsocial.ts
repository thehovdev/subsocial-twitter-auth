import type {NextApiRequest, NextApiResponse} from 'next'
import {SubsocialApi} from "@subsocial/api";
import {generateCrustAuthToken} from "@subsocial/api/utils/ipfs";
import { IpfsContent } from '@subsocial/types/substrate/classes'
import { Keyring } from '@polkadot/keyring'
import {Tweet} from "../../interfaces/iTweet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  const config = {
    substrateNodeUrl: "wss://rco-para.subsocial.network",
    ipfsNodeUrl: 'https://staging-ipfs.subsocial.network',
    ipfsAdminNodeUrl: 'https://staging-admin-ipfs.subsocial.network',
    offchainUrl: ""
  };

  // const mnemmonic = '0x2a2619fc52488410bc9be94167fb86311539578fba7c50ae7fcb6143e2291b16'
  const mnemonic = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice'
  const authHeader = generateCrustAuthToken(mnemonic);

  const initSubsocialApi = async () => await SubsocialApi.create(config);
  const api = await initSubsocialApi();

  // Use this ipfs object, to set authHeader for writing on Crust IPFS cluster.
  api.ipfs.setWriteHeaders({
    authorization: "Basic " + authHeader,
  });

  await savingPost(api, mnemonic, data)

  res.status(200).json({...req.body, status: true})
}


async function savingPost(api: any, mnemonic: string, data: Tweet) {
  const keyring = new Keyring({ type: 'sr25519' })
  const pair = keyring.addFromMnemonic(mnemonic)
  const cid = await api.ipfs.saveContent({
    title: data.text,
    image: null,
    tags: [],
    body: '.',
    canonical: 'htpps://twitter.com'
  })
  const substrateApi = await api.blockchain.api
  const spaceId = '10102'

  const postTransaction = substrateApi.tx.posts.createPost(
    spaceId,
    { RegularPost: null },
    IpfsContent(cid)
  )

  postTransaction.signAndSend(pair)
}
import { TezosToolkit, MichelsonMap } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import * as config from '../config/config'
import { bytes2Char, char2Bytes } from '@taquito/utils'
import axios from 'axios'

const Tezos = new TezosToolkit(config.RPC_URL)

const options = {
  name: config.NAME,
  iconUrl: 'https://tezostaquito.io/img/favicon.png',
  preferredNetwork: config.NETWORK,
}

const wallet = new BeaconWallet(options)

Tezos.setWalletProvider(wallet)

const connectWallet = async () => {
  await wallet.requestPermissions({
    network: {
      type: config.NETWORK,
    },
  })
  return wallet
}

const disconnectWallet = async () => {
  await wallet.clearActiveAccount()
}

const getPKH = async () => {
  const pkh = await wallet.getPKH()
  return pkh
}

const getContract = async () => {
  const contract = await Tezos.wallet.at(config.CONTRACT_ADDRESS)
  return contract
}

const mintNFT = async (
  address,
  url = 'https://images.unsplash.com/photo-1639264416398-ff4509f6e1f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  token_id,
) => {
  await disconnectWallet()
  await connectWallet()
  const amount = 1
  const contract = await getContract()
  url = char2Bytes(url)
  const op = await contract.methods
    .mint(address, amount, MichelsonMap.fromLiteral({ '': url }), token_id)
    .send()
  return await op.confirmation(3)
}

const getNFTs = async () => {
  const response = await axios.get(
    `https://api.hangzhou2net.tzkt.io/v1/contracts/${config.CONTRACT_ADDRESS}/bigmaps/token_metadata/keys`,
  )
  const data = response.data
  let tokens = []
  for (let i = 0; i < data.length; i++) {
    let url = data[i].value.token_info['']
    if (url) {
      url = bytes2Char(url)
    }
    const token = {
      token_id: data[i].value.token_id,
      url,
    }
    tokens.push(token)
  }
  return tokens
}

export {
  connectWallet,
  disconnectWallet,
  getPKH,
  getContract,
  mintNFT,
  getNFTs,
}

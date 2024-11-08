import { ethers } from "ethers";

export function getInstance() {
  return new ethers.WebSocketProvider(process.env.ETHEREUM_ENDPOINT);
}

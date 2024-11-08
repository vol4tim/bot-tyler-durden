import { ethers, Mnemonic, Wallet } from "ethers";

export function generate() {
  const wallet = Wallet.fromPhrase(
    Mnemonic.entropyToPhrase(ethers.randomBytes(32)),
  );

  return {
    address: wallet.address,
    phrase: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  };

  // console.log("wallet.address:", wallet.address);
  // console.log("wallet.mnemonic.phrase:", wallet.mnemonic.phrase);
  // console.log("wallet.privateKey:", wallet.privateKey);
}

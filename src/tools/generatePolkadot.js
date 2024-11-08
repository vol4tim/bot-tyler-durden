import {
  ed25519PairFromSeed,
  encodeAddress,
  mnemonicGenerate,
  mnemonicToMiniSecret,
} from "@polkadot/util-crypto";

export async function generate() {
  const mnemonicAlice = mnemonicGenerate();
  console.log(`Generated mnemonic: ${mnemonicAlice}`);
  const seedAlice = mnemonicToMiniSecret(mnemonicAlice);
  const { publicKey, secretKey } = ed25519PairFromSeed(seedAlice);
  console.log(publicKey, secretKey);
  const address = encodeAddress(publicKey);
  console.log(address);
  return [mnemonicAlice, address];
}

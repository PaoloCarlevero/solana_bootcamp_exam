import { Keypair } from "@solana/web3.js";

// Create a new keypair instance
const keypair = Keypair.generate();

// Logging the wallet address and private key so that we can save them in a file
console.log(`PublicKey: ${keypair.publicKey.toBase58()} \n\n SecretKey: [${keypair.secretKey}]`)

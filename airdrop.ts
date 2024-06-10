import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

import wallet from "./wallet.json";

// Create a new instance of Keypair from the secret key
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a connection to the solana dev net
const connection = new Connection("https://api.devnet.solana.com", "finalized");

// Airdropping 2 SOL
(async () => {
    try {
        const airdropSignature = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log("Airdrop Signature: ", airdropSignature);
    }
    catch (error) {
        console.log(error)
    }
})()
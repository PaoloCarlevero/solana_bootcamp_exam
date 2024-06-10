import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {

    const mint = await createMint(
        connection, // Conntection to use
        keypair, // Payer of the transaction and initialization gees
        keypair.publicKey, // Accoun that will controll minting
        null, // Optional account that can freeze token account
        6, // Position of the deciamal place
    );

    console.log("Mint Address:", mint.toBase58());
})()
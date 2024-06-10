import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    mintTo,
    getOrCreateAssociatedTokenAccount,
 } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("5PwbHs8PZdEzBc6ayvEdYypWqoDryQEG6dkB6EX91fsR");

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, // Connection to use
        keypair, // Payer of the transaction and initialization fees
        mint, // Mint assosiated to the account to set or verify
        keypair.publicKey, // Owner of the account to set or verify
    );

    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

    const amount = 10e6;

    await mintTo(
        connection, // Connection to use
        keypair, // Payer of the transaction fees
        mint, // Mint for the account
        ata, // Address of the account to mint to
        keypair.publicKey, // Minting authority
        amount // Amount to mint
    );

    console.log("Minted", amount, "to", ata.toBase58());

})()

/* OTUPUT:

$ ts-node ./spl_mints.ts
Associated Token Account:  2X4ZURY1WNEfR1LcDdmaN212WEgKggogQhPABBQziEFG
Minted 10000000 to 2X4ZURY1WNEfR1LcDdmaN212WEgKggogQhPABBQziEFG
Done in 15.19s.

*/
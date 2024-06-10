import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
 } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("5PwbHs8PZdEzBc6ayvEdYypWqoDryQEG6dkB6EX91fsR");
const fromAta = new PublicKey("2X4ZURY1WNEfR1LcDdmaN212WEgKggogQhPABBQziEFG")
// const fromAta = new PublicKey("5PwbHs8PZdEzBc6ayvEdYypWqoDryQEG6dkB6EX91fsR");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    const amount = 10e5;

    await transfer(
        connection, // Connection to use
        keypair, // Payer of the transaction fees
        fromAta, // Source account
        toAta, // Destination account
        keypair, // Owner of the source account
        amount // Number of thokens to transfet
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})()
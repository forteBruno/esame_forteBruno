import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, LAMPORTS_PER_SOL, } from "@solana/web3.js";
import "dotenv/config"
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

const toPubkey = new PublicKey(senderKeypair.publicKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

//serve per le keypair appena create
await airdropIfRequired(
    connection,
    senderKeypair.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
  );
  
const transaction = new Transaction();

const LAMPORTS_TO_SEND = 1;

//in dev mittente e destinatario coincidono
const sendSolInstruction = SystemProgram.transfer({
fromPubkey: senderKeypair.publicKey,
toPubkey,
lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
senderKeypair,
]);

console.log(
`INviati ${LAMPORTS_TO_SEND} all'indirizzo ${toPubkey}. `
);
console.log(`La firma della transazione è ${signature}!`);
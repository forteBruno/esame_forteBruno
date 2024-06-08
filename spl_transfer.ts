import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

// altro mio wallet
const recipient = new PublicKey("5hKpy8Raj1NjoGgq2YrAhbYLv7M4UtanAMotxFgTDwEJ");

const tokenMintAccount = new PublicKey("DJ9Fq1bcaSvqtJd6joN7Toa4NP3DyA9vuR4KMtegu393");

console.log(`Tentativo di inviare 10 token a ${recipient.toBase58()}...`);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  sender.publicKey
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

const signature = await transfer(
  connection,
  sender,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  sender,
  10 
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`Transazione confermata: ${explorerLink}!`);
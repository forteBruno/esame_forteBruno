import { Keypair } from "@solana/web3.js";
import "dotenv/config";
import fs from "fs";

// genero una nuova keypair
const keypair = Keypair.generate();

// stampo la mia nuova chiave pubblica
console.log(`Public Key: ${keypair.publicKey.toBase58()}`);

// salvo la mia chiave privata su un file .env
const secretKeyString = `[${keypair.secretKey.toString()}]`;
fs.writeFileSync(".env", `SECRET_KEY=${secretKeyString}`);
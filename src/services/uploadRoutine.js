import admin from "firebase-admin";
import fs from "fs";
import { readFileSync } from "fs";  // Needed for file reading
import { fileURLToPath } from "url";
import { dirname } from "path";

// Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase initialization
const serviceAccount = JSON.parse(fs.readFileSync(__dirname + "/serviceAccountKey.json", "utf-8"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load JSON data from the same directory
const routines = JSON.parse(readFileSync(__dirname + "/routine.json", "utf-8"));

async function uploadRoutines() {
  const batch = db.batch();

  for (const [id, data] of Object.entries(routines)) {
    const docRef = db.collection("routine").doc(id);
    batch.set(docRef, data);
  }

  await batch.commit();
  console.log("✅ All routines uploaded successfully!");
}

uploadRoutines().catch(console.error);

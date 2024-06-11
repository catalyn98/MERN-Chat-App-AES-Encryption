import mongoose from "mongoose";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import { performance } from "perf_hooks";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    encryptionKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Funcție pentru generarea unei noi chei de criptare
function generateEncryptionKey() {
  const keyBuffer = crypto.randomBytes(32); // Generăm bufferul de 32 bytes
  const hexKey = keyBuffer.toString("hex"); // Convertim la format hex
  const keyLengthBits = keyBuffer.length * 8; // Calculăm lungimea în biți
  return { hexKey, keyLengthBits }; // Returnăm cheia și lungimea în biți
}

// Funcție pentru măsurarea memoriei
function measureMemoryUsage() {
  const used = process.memoryUsage();
  console.log(
    `🧠  Memorie fizică [resident set size (RSS)]: ${(
      used.rss /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
  console.log(
    `🧠  Memorie totală alocată pentru heap: ${(
      used.heapTotal /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
  console.log(
    `🧠  Memorie utilizată din heap: ${(used.heapUsed / 1024 / 1024).toFixed(
      2
    )} MB`
  );
}

// Metoda de criptare
messageSchema.methods.encryptMessage = function () {
  // Măsurăm timpul de generare a cheii
  const startTimeGenerateKey = performance.now();
  const { hexKey, keyLengthBits } = generateEncryptionKey();
  const endTimeGenerateKey = performance.now();
  const timeGenerateKey = (endTimeGenerateKey - startTimeGenerateKey).toFixed(
    2
  );
  console.log(
    "____________________________________________________________________________________________________________________________________________________________________"
  );
  console.log("🔒  Advanced Encryption Standard 256 [AES-256]  🔒");
  console.log("");
  console.log("");
  // Măsurare resurse înainte criptare
  console.log("📊  Măsurare resurse înainte de criptare  🔒");
  measureMemoryUsage();
  console.log("");

  if (this.message) {
    // Măsurăm lungimea mesajului original (numarul de caractere)
    const originalMessageLength = this.message.length;
    // Măsurăm dimensiunea mesajului original (numarul de bytes)
    const originalSize = Buffer.byteLength(this.message, "utf8");
    // Generează un nou IV pentru fiecare mesaj
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    // Criptează mesajul folosind cheia și vectorul de inițializare
    const encrypted = CryptoJS.AES.encrypt(
      this.message,
      CryptoJS.enc.Hex.parse(hexKey),
      { iv: iv }
    );
    // Salvează mesajul criptat și vectorul de inițializare ca parte a mesajului criptat
    this.message = iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.toString();
    // Măsurăm lungimea mesajului criptat (numarul de caractere)
    const encryptedMessageLength = this.message.length;
    this.encryptionKey = hexKey;
    console.log("🔑  Cheia de criptare: ", hexKey);
    console.log(
      "📐  Dimensiunea cheii de criptare: " + keyLengthBits + " biți"
    );
    console.log(
      "⏱️  Timpul necesar pentru generarea cheii de criptare: " +
        timeGenerateKey +
        " ms"
    );
    console.log("");
    console.log(
      "📏  Lungimea mesajului original: " + originalMessageLength + " caractere"
    );
    console.log(
      "📐  Dimensiunea mesajului original: " + originalSize + " bytes"
    );
    console.log("");
    // console.log("🔒  Mesajul criptat: ", this.message);
    console.log(
      "📏  Lungimea mesajului criptat: " + encryptedMessageLength + " caractere"
    );
    console.log("");
    // Măsurare resurse după criptare
    console.log("📊  Măsurare resurse după criptare  🔒");
    measureMemoryUsage();
    console.log("");
  }
};

// Metoda de decriptare
messageSchema.methods.decryptMessage = function () {
  if (this.message) {
    // Extragerea IV și ciphertext din mesajul criptat
    // Măsurare resurse înainte de decriptare
    console.log("📊  Măsurare resurse înainte de decriptare  🔓");
    measureMemoryUsage();
    console.log("");
    const components = this.message.split(":");
    const iv = CryptoJS.enc.Hex.parse(components[0]);
    const ciphertext = components[1];
    // Decriptează mesajul folosind cheia și iv
    const decrypted = CryptoJS.AES.decrypt(
      ciphertext,
      CryptoJS.enc.Hex.parse(this.encryptionKey),
      { iv: iv }
    );
    this.message = decrypted.toString(CryptoJS.enc.Utf8);
    const decryptedMessageLength = this.message.length;
    // Măsurare resurse după decriptare
    console.log("📊  Măsurare resurse după decriptare  🔓");
    measureMemoryUsage();
    console.log("");
    console.log(
      "📏  Lungimea mesajului decriptat: " +
        decryptedMessageLength +
        " caractere"
    );
    console.log("");
  }
};

const Message = mongoose.model("Message", messageSchema);

export default Message;

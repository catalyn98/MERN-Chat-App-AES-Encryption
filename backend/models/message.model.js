import mongoose from "mongoose";
import crypto from "crypto";
import CryptoJS from "crypto-js";

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
// La fiecare inserare de mesaj în baza de date se crează o nouă cheie de criptare
function generateEncryptionKey() {
  return crypto.randomBytes(32).toString("hex");
}

// Metodele de criptare și de decriptare
messageSchema.methods.encryptMessage = function () {
  const encryptionKey = generateEncryptionKey();
  if (this.message) {
    // Generează un nou IV pentru fiecare mesaj
    const iv = CryptoJS.lib.WordArray.random(128 / 8); // AES folosește un bloc de 128 de biți
    // Criptează mesajul folosind cheia și iv
    const encrypted = CryptoJS.AES.encrypt(this.message, encryptionKey, {
      iv: iv,
    });
    // Salvează mesajul criptat și iv-ul ca parte a mesajului criptat
    this.message = iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.toString();
    this.encryptionKey = encryptionKey;
    console.log(
      "_________________________________________________________________________"
    );
    console.log("Cheia secretă este -> ", this.encryptionKey);
    console.log("Mesajul criptat este -> ", this.message);
  }
};

messageSchema.methods.decryptMessage = function () {
  if (this.message) {
    // Extragerea IV și ciphertext din mesajul criptat
    const components = this.message.split(":");
    const iv = CryptoJS.enc.Hex.parse(components[0]);
    const ciphertext = components[1];
    // Decriptează mesajul folosind cheia și iv
    const decrypted = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey, {
      iv: iv,
    });
    this.message = decrypted.toString(CryptoJS.enc.Utf8);
  }
};

const Message = mongoose.model("Message", messageSchema);

export default Message;

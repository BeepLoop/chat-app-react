import CryptoJS from 'crypto-js';

type TEncryptDetails = {
    recipientPublicKey: string
    userPrivateKey: string
    prime: string
    message: string
}

type TDecryptDetails = {
    senderPublicKey: string
    userPrivateKey: string
    prime: string
    encryptedText: string

}

export function encryptMessage({recipientPublicKey, userPrivateKey, prime, message}: TEncryptDetails) {
    const sharedSecret = BigInt(recipientPublicKey) ** BigInt(userPrivateKey) % BigInt(prime);
    const encrypted = CryptoJS.AES.encrypt(message, sharedSecret.toString())
    return encrypted.toString()
}

export function decryptMessage({senderPublicKey, userPrivateKey, prime, encryptedText}: TDecryptDetails) {
    const sharedSecret = BigInt(senderPublicKey) ** BigInt(userPrivateKey) % BigInt(prime);
    const decrypted = CryptoJS.AES.decrypt(encryptedText, sharedSecret.toString());
    const readableFormOfDecryptedText = CryptoJS.enc.Utf8.stringify(decrypted)
    return readableFormOfDecryptedText.toString()
}

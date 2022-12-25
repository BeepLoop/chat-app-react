import CryptoJS from 'crypto-js';

export function encryptMessage(sharedSecret: any, message: any) {
    const encrypted = CryptoJS.AES.encrypt(message, sharedSecret)
    return encrypted
}


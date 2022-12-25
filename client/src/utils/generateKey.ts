function generateKey(P: number, g: number) {
    const privateKey = BigInt(generateRandomInt(P))
    const prime = BigInt(P)
    const generator = BigInt(g)
    const publicKey = generator ** privateKey % prime
    return {private: privateKey, public: publicKey}
}

function generateRandomInt(P: number) {
    return Math.floor(Math.random() * P)
}

export default generateKey
export const getRandomClientID = (): number => {
    const characters = '0123456789'
    let randomString: string = ''

    while (randomString.length < 10) {
        const index = Math.floor(Math.random() * 10)
        const char = characters[index]
        randomString += char
    }
    return Number(randomString)
}

export const getRandomNumberID = (): number => {
    const characters = '0123456789'
    const randomString: string = ''
    while (randomString.length < 10) {
        const index = Math.floor(Math.random() * 10)
        const char = characters[index]
        randomString.concat(char)
    }
    console.log(randomString)
    return Number(randomString)
}

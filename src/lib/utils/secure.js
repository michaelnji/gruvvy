import { customAlphabet } from 'nanoid'
export const idGen = () => {
    const gen = customAlphabet('abcdefGHIJKLMNOPQRStuvwxYZ', 10)
    return gen()
}

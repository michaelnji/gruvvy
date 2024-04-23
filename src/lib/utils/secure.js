import { customAlphabet } from 'nanoid'
export const idGen = () => {
    const gen = customAlphabet('67890PIDABEepqrstuvwxyzghi', 10)
    return gen()
}

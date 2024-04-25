import { customAlphabet } from 'nanoid'
export const idGen = () => {
    const gen = customAlphabet('QWERTYUIOPasdfghJKLMNbvcxz', 10)
    return gen()
}

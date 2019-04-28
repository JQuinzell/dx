import {parse} from '@babel/parser'

export default function dx(prevCode: string, currCode: string) {
    const prevAst = parse(prevCode)
    const currAst = parse(currCode)
    return ''
}

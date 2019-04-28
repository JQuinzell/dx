import {parse} from '@babel/parser'
import {Program, FunctionDeclaration, isFunctionDeclaration} from '@babel/types'
import {zip} from 'lodash'

function globalFunctions(program: Program): FunctionDeclaration[] {
    return program.body.filter(statement =>
        isFunctionDeclaration(statement)
    ) as FunctionDeclaration[]
}

function addedIdentifiers(prev: string[], curr: string[]) {
    return curr.filter(name => !prev.includes(name))
}

function removedIdentifiers(prev: string[], curr: string[]) {
    return prev.filter(name => !curr.includes(name))
}

function diffFunctions(
    prev: FunctionDeclaration[],
    curr: FunctionDeclaration[]
) {
    const prevNames = prev.map(func => func.id.name)
    const currNames = curr.map(func => func.id.name)
    return {
        added: addedIdentifiers(prevNames, currNames),
        removed: removedIdentifiers(prevNames, currNames),
        changed: {}
    }
}

export default function dx(prevCode: string, currCode: string) {
    const {program: prevProgram} = parse(prevCode)
    const {program: currProgram} = parse(currCode)
    return {
        functions: diffFunctions(
            globalFunctions(prevProgram),
            globalFunctions(currProgram)
        )
    }
}

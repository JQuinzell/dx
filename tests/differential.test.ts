import * as dx from 'differential'
import {parse} from '@babel/parser'
function genFunction(name: string, ...args: string[]) {
    return `
        function ${name}(${args.join(',')}) {}
    `
}

describe('differential', () => {
    describe('global functions', () => {
        const foo = genFunction('foo')
        const bar = genFunction('bar')
        const baz = genFunction('baz')

        it('outputs added functions', () => {
            const prev = dx.globalFunctions(parse(foo).program)
            const next = dx.globalFunctions(parse(foo + bar + baz).program)
            const functions = dx.diffFunctions(prev, next)
            const barDiff = {
                identifier: 'bar',
                added: true
            }
            const bazDiff = {
                identifier: 'baz',
                added: true
            }
            expect(functions).toEqual(
                expect.arrayContaining([barDiff, bazDiff])
            )
        })

        it('outputs removed functions', () => {
            const prev = dx.globalFunctions(parse(foo + bar + baz).program)
            const next = dx.globalFunctions(parse(foo).program)
            const functions = dx.diffFunctions(prev, next)

            const barDiff = {
                identifier: 'bar',
                removed: true
            }
            const bazDiff = {
                identifier: 'baz',
                removed: true
            }
            expect(functions).toEqual(
                expect.arrayContaining([barDiff, bazDiff])
            )
        })
    })
})

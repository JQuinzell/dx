import dx from '../src/differential'

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
            const {functions} = dx(foo, foo + bar + baz)
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
            const {functions} = dx(foo + bar + baz, foo)

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

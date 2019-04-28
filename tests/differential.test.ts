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
            const {
                functions: {added}
            } = dx(foo, foo + bar + baz)

            expect(added).toEqual(['bar', 'baz'])
        })

        it('outputs removed functions', () => {
            const {
                functions: {removed}
            } = dx(foo + bar + baz, foo)

            expect(removed).toEqual(['bar', 'baz'])
        })
    })
})

let fn = require('./preflight.js')

describe('mergeArrays function', () => {
    it('should merge 2 arrays of strings', () => {
				const arr1 = ["Rattata", "Raticate"]
				const arr2 = ["Bulbasaur", "Ivysaur", "Venusaur"]
        const result = fn.mergeArrays(arr1, arr2)
        expect(result).toEqual(["Rattata", "Raticate", "Bulbasaur", "Ivysaur", "Venusaur"])
    })
    it('should merge two arrays of numbers', () => {
        const result = fn.mergeArrays([9, 3, 5], [10])
        expect(result).toEqual([9, 3, 5, 10])
    })
    it('should merge an empty array', () => {
        const result = fn.mergeArrays(["Pikachu", "Raichu"], [])
        expect(result).toEqual(["Pikachu", "Raichu"])
    })
})
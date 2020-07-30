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

describe('firstLongerThan function', () => {
    it('should find a string in the middle of an array', () => {
				const arr = ["Ekans", "Arbok", "Pikachu", "Raichu"]
        const result = fn.firstLongerThan(arr, 5)
        expect(result).toEqual("Pikachu")
    })
    it('should find a string at the end of an array', () => {
				const arr = ["Caterpie", "Metapod", "Butterfree"]
        const result = fn.firstLongerThan(arr, 9)
        expect(result).toEqual("Butterfree")
    })
    it('should find the first string longer than 0', () => {
        const result = fn.firstLongerThan(["a", "b", "c"], 0)
        expect(result).toEqual("a")
    })
    it('should return undefined', () => {
      const result = fn.firstLongerThan([], 5)
      expect(result).toEqual(undefined)
    })
})

describe('getReturnValues function', () => {
    const fn1 = () => { return 25 }
    const fn2 = () => { return true }
    const fn3 = () => { return "Pikachu" }
    const fn4 = () => { "I'm function four" }

    it('should get 3 return values of various types', () => {
        const result = fn.getReturnValues([fn1, fn2, fn3])
        expect(result).toEqual([25, true, "Pikachu"])
    })
    it('should return an empty array if no functions', () => {
        const result = fn.getReturnValues([])
        expect(result).toEqual([])
    })
    it('should return undefined for functions with no return value', () => {
        const result = fn.getReturnValues([fn4])
        expect(result).toEqual([undefined])
    })
})

describe('zeroSquare function', () => {
    it('should create a 1x1 array of zeroes', () => {
        const square1 = [[0]]
        expect(fn.zeroSquare(1)).toEqual(square1)
    })
    it('should create a 1x1 array of zeroes', () => {
        const square2 = [
            [0,0],
            [0,0]
        ]
        expect(fn.zeroSquare(2)).toEqual(square2)
    })
    it('should create a 1x1 array of zeroes', () => {
        const square3 = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ]
        expect(fn.zeroSquare(3)).toEqual(square3)
    })
    it('should return an empty array for 0 value', () => {
        expect(fn.zeroSquare(0)).toEqual([])
    })
})
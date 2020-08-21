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
            [0, 0],
            [0, 0]
        ]
        expect(fn.zeroSquare(2)).toEqual(square2)
    })
    it('should create a 1x1 array of zeroes', () => {
        const square3 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        expect(fn.zeroSquare(3)).toEqual(square3)
    })
    it('should return an empty array for 0 value', () => {
        expect(fn.zeroSquare(0)).toEqual([])
    })
})

describe('filterNonKeys function', () => {
    const avengers = ["ironman", "strange", "thor", "spiderman", "hulk"]
    const info = {
        ironman: "arrogant",
        spiderman: "naive",
        hulk: "strong",
    }
    it('should return an empty array when filtering on an empty object', () => {
        const result = fn.filterNonKeys(avengers, {})
        expect(result).toEqual([])
    })
    it('should return an empty array when starting with an empty array', () => {
        const result = fn.filterNonKeys([], info)
        expect(result).toEqual([])
    })
    it('should return an empty array if no matches are found', () => {
        const b = ["batman", "superman", "flash"]
        const result = fn.filterNonKeys(b, info)
        expect(result).toEqual([])
    })
})

describe('addDescriptions function', () => {
    it('should add 3 descriptions to corresponding names', () => {
        const characters = [{ name: "ironman" },
        { name: "spiderman" }, { name: "hulk" }]
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        fn.addDescriptions(characters, info)
        expect(characters).toEqual([
            { name: "ironman", description: "arrogant" },
            { name: "spiderman", description: "naive" },
            { name: "hulk", description: "strong" }
        ])
    })
    it('should not add descriptions to objects without names', () => {
        const characters = [{ tonyStark: "ironman" },
        { peterParker: "spiderman" }, { name: "hulk" }]
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        fn.addDescriptions(characters, info)
        expect(characters).toEqual([
            { tonyStark: "ironman" },
            { peterParker: "spiderman" },
            { name: "hulk", description: "strong" }
        ])
    })
    it('should ignore unmatched keys', () => {
        const characters = [{ name: "ironman" },
        { name: "rocket" }, { name: "drax" }]
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        fn.addDescriptions(characters, info)
        expect(characters).toEqual([
            { name: "ironman", description: "arrogant" },
            { name: "rocket" },
            { name: "drax" }
        ])
    })
})

describe('countOccurrences function', () => {
    it('should count occurrences of strings', () => {
        const abc = ["abc", "a", "abc", "b", "abc", "a", "b", "c", "abc"]
        const result = fn.countOccurrences(abc)
        expect(result).toEqual({ abc: 4, a: 2, b: 2, c: 1 })
    })
    it('should count occurrences of numbers', () => {
        const nums = [0, 3, 3, 1, 0, 0, 3, 0, 0, 2]
        const result = fn.countOccurrences(nums)
        expect(result).toEqual({ '0': 5, '3': 3, '1': 1, '2': 1 })
    })
    it('should return an empty object for an empty array', () => {
        const result = fn.countOccurrences([])
        expect(result).toEqual({})
    })
})

describe('longestString function', () => {
    it('should find the longest string from the beginning of an object', () => {
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        expect(fn.longestString(info)).toEqual("arrogant")
    })
    it('should find the longest string from the end of an object', () => {
        const leaders = {
            vermilion: "Surge",
            cinnabar: "Blaine",
            fuchsia: "Koga",
            saffron: "Sabrina"
        }
        expect(fn.longestString(leaders)).toEqual("Sabrina")
    })
    it('should return the empty string for an empty object', () => {
        expect(fn.longestString({})).toEqual("")
    })
})

describe('keyOfLongestString function', () => {
    it('should find key of longest string in the beginning of an object', () => {
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        expect(fn.keyOfLongestString(info)).toEqual("ironman")
    })
    it('should find key of longest string at the end of an object', () => {
        const leaders = {
            vermilion: "Surge",
            cinnabar: "Blaine",
            fuchsia: "Koga",
            saffron: "Sabrina"
        }
        expect(fn.keyOfLongestString(leaders)).toEqual("saffron")
    })
    it('should return undefined (no key) for an empty object', () => {
        expect(fn.keyOfLongestString({})).toEqual(undefined)
    })
})

describe('removeLongestString function', () => {
    it('should remove the longest string in the beginning of an object', () => {
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        fn.removeLongestString(info)
        expect(info).toEqual({ spiderman: "naive", hulk: "strong" })
    })
    it('should remove the longest string at the end of an object', () => {
        const leaders = {
            vermilion: "Surge",
            cinnabar: "Blaine",
            fuchsia: "Koga",
            saffron: "Sabrina"
        }
        fn.removeLongestString(leaders)
        expect(leaders).toEqual(
            { vermilion: "Surge", cinnabar: "Blaine", fuchsia: "Koga" }
        )
    })
    it('should work on an empty object', () => {
        const imEmpty = {}
        fn.removeLongestString(imEmpty)
        expect(imEmpty).toEqual({})
    })
})

describe('headers function (part 3)', () => {
    it('should create h1s for 3 items', () => {
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong"
        }
        const exp = "<div><h1>ironman</h1><h2>arrogant</h2></div>\
<div><h1>spiderman</h1><h2>naive</h2></div>\
<div><h1>hulk</h1><h2>strong</h2></div>"
        expect(fn.headers(info)).toEqual(exp)
    })
    it('should create headers for 4 elements', () => {
        const leaders = {
            vermilion: "Surge",
            cinnabar: "Blaine",
            fuchsia: "Koga",
            saffron: "Sabrina"
        }
        const exp = "<div><h1>vermilion</h1><h2>Surge</h2></div>\
<div><h1>cinnabar</h1><h2>Blaine</h2></div>\
<div><h1>fuchsia</h1><h2>Koga</h2></div>\
<div><h1>saffron</h1><h2>Sabrina</h2></div>"
        expect(fn.headers(leaders)).toEqual(exp)
    })
    it('should return an empty string if no elements', () => {
        expect(fn.headers([])).toEqual("")
    })
})

describe('forEach function', () => {
    it('should run a function 3 times on 3 elements', () => {
        const fun = jest.fn()
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        info.forEach(fun)
        expect(fun).toHaveBeenCalledTimes(3)
    })
    it('should run a function 0 times on an empty object', () => {
        const fun = jest.fn()
        const imEmpty = {}
        imEmpty.forEach(fun)
        expect(fun).not.toHaveBeenCalled()
    })
    it('should let functions access object values & positions', () => {
        const vals = []
        const fun = (_k, v, i) => {
            vals.push(i + v)
        }
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        info.forEach(fun)
        expect(vals).toEqual(["0arrogant", "1naive", "2strong"])
    })
})

describe('filter function', () => {
    const leaders = {
        vermilion: "Surge",
        cinnabar: "Blaine",
        fuchsia: "Koga",
        saffron: "Sabrina"
    }
    it('should filter based on keys', () => {
        const seven = (k) => {
            return k.length === 7
        }
        const result = leaders.filter(seven)
        expect(result).toEqual({ fuchsia: "Koga", saffron: "Sabrina" })
    })
    it('should filter based on keys', () => {
        const six = (_k, v) => {
            return v.length < 6
        }
        const result = leaders.filter(six)
        expect(result).toEqual({ vermilion: "Surge", fuchsia: "Koga" })
    })
    it('should return an empty object if no matches', () => {
        const celadon = (k) => {
            return k === "Celadon"
        }
        const result = leaders.filter(celadon)
        expect(result).toEqual({})
    })
})

describe('reduce function', () => {
    it('should let functions access keys, values, & positions', () => {
        const fun = (acc, key, value, i) => {
            return acc + `${key}-${i}-${value},`
        }
        const info = {
            ironman: "arrogant",
            spiderman: "naive",
            hulk: "strong",
        }
        const result = info.reduce(fun, "")
        const exp = "ironman-0-arrogant,spiderman-1-naive,hulk-2-strong,"
        expect(result).toEqual(exp)
    })
    it('should return the starting value if the object is empty', () => {
        const imEmpty = {}
        const result = imEmpty.reduce(() => { }, "I am Groot")
        expect(result).toEqual("I am Groot")
    })
})

describe('getCharCount function', () => {
    it('should count letters in an array of 3 strings', () => {
        const result = ['Charmander', 'Charmeleon', 'Charizard'].getCharCount()
        expect(result).toEqual({
            C: 3, h: 3, a: 5,
            r: 5, m: 2, n: 2,
            d: 2, e: 3, l: 1,
            o: 1, i: 1, z: 1
        })
    })
    it('should handle an empty array', () => {
        const result = [].getCharCount()
        expect(result).toEqual({})
    })
    it('should count characters in empty strings', () => {
        const result = ["Pallet", "", "Pewter", "", "Saffron"].getCharCount()
        expect(result).toEqual({
            P: 2, a: 2, l: 2,
            e: 3, t: 2, w: 1,
            r: 2, S: 1, f: 2,
            o: 1, n: 1
        })
    })

    it('should return { a : 1 }', () => {
        const result = ['a'].getCharCount()
        expect(result).toEqual({a:1})
    })
})

describe('getMostCommon function', () => {
    it('should return a number as the most common', () => {
        const result = [9,8,7,8,7,7,7].getMostCommon()
        expect(result).toEqual(7)
    })
    it('should return a string as the most common', () => {
				const arr =  ["Batman", 8,7, "Batman", "Robin"]
        const result = arr.getMostCommon()
        expect(result).toEqual("Batman")
    })
    it('should return first element if all equally common', () => {
        const types = ["grass", "poison", "fire", "flying", "water", "bug"]
        const result = types.getMostCommon()
        expect(result).toEqual("grass")
    })
    it('should return null on an empty array', () => {
        const result = [].getMostCommon()
        expect(result).toEqual(null)
    })
})

describe('removeDupes function', () => {
    it('should remove 2 sets of duplicate numbers', () => {
        const data = [9,8,7,8,7,7,7]
        data.removeDupes()
        expect(data).toEqual([9])
    })
    it('should remove 1 set of duplicate strings', () => {
        const data = ["ice", "electric", "psychic", "ice", "ground", "ice"]
        data.removeDupes()
        expect(data).toEqual(["electric", "psychic", "ground"])
    })
    it('should remove duplicate boolean values', () => {
        const data = ["grass", false, "poison", "electric", false]
        data.removeDupes()
        expect(data).toEqual(["grass", "poison", "electric"])
    })
    it('shouldn\'t remove anything from an array with no dups', () => {
        const data = ["Pewter", "Saffron", "Vermilion", "Veridian"]
        data.removeDupes()
        expect(data).toEqual(["Pewter", "Saffron", "Vermilion", "Veridian"])
    })
    it('should leave an empty array unchanged', () => {
        const data = []
        data.removeDupes()
        expect(data).toEqual([])
    })
})

describe('getNext function', () => {
    it('should iterate through 3 elements', () => {
      const arr = ['Edna', 'Optimus', 'Minion'];
      let result = arr.getNext();
      expect(result).toEqual('Edna');
      expect(arr.getNext()).toEqual('Optimus');
      expect(arr.getNext()).toEqual('Minion');
    });
    it('should return to beginning once done', () => {
      const arr = [9, 80, 12, 2];
      expect(arr.getNext()).toEqual(9);
      expect(arr.getNext()).toEqual(80);
      expect(arr.getNext()).toEqual(12);
      expect(arr.getNext()).toEqual(2);
      expect(arr.getNext()).toEqual(9);
      expect(arr.getNext()).toEqual(80);
    });
    it('should return undefined for an empty array', () => {
      const arr = [];
      expect(arr.getNext()).toEqual(undefined);
    });
    it('should iterate through one element', () => {
      const arr = ['Ironman'];
      expect(arr.getNext()).toEqual('Ironman');
      expect(arr.getNext()).toEqual('Ironman');
    });
    it(`shouldn't iterate`, () => {
      const arr = []
      expect(arr.getNext()).toEqual()
      expect(arr.getNext()).toEqual()
      expect(arr.getNext()).toEqual()
      expect(arr.getNext()).toEqual()
    })
  });

  describe('setMaxSize prototype', () => {
    it('maxSize should stay four', () => {
      const arr = ['Michelangelo', 'Leonardo', 'Raphael'];
      arr.setMaxSize(4);
      arr.push('Donatello')
      arr.setMaxSize(3)
      arr.push('Shredder');
      arr.setMaxSize(1)
      arr.push('Splinter')
      expect(arr.length).toEqual(4)
    });
    it('maxSize should increase', () => {
      const arr = ['Michelangelo']
      arr.setMaxSize(2)
      arr.push('Donatello')
      expect(arr.length).toEqual(2)
    })
    it ('maxSize keeps array empty', () => {
      const arr = []
      arr.setMaxSize(0)
      arr.push('M', 'L', 'R')
      expect(arr.length).toEqual(0)
    })
  });

  /*
  describe('tiredForEach function', () => {
    jest.useFakeTimers()
    it('should call callback immediately when not tired', () => {
        const callback = jest.fn()
        const arr = ["Edna", "Optimus", "Minion"] 
        arr.tiredForEach(callback, 200)
        expect(callback).toHaveBeenCalled()
    })
    it('should not run function before time has passed', () => {
        const callback = jest.fn()
        const callback2 = jest.fn()
        const arr = ["Edna", "Optimus", "Minion"] 
        arr.tiredForEach(callback, 200)
        arr.tiredForEach(callback2, 200)
        expect(callback2).not.toHaveBeenCalled()
    })
    it('should work again once time has passed', () => {
        const callback = jest.fn()
        const arr = ["Edna", "Optimus", "Minion"] 
        arr.tiredForEach(callback, 200)
        jest.advanceTimersByTime(200)
        arr.tiredForEach(callback, 200)
        expect(callback).toHaveBeenCalledTimes(6)
    })
})
*/

const fs = require('fs')

describe('makeFiles function', () => {
    fn.makeFiles(2)
    const files = fs.readdirSync('./')
    it('should create 3 files', () => {
        const foundAll =
            files.find((e) => { return e === 'trainer0.txt'}) &&
            files.find((e) => { return e === 'trainer1.txt'}) &&
            files.find((e) => { return e === 'trainer2.txt'})
        expect(foundAll).toBeTruthy()
    })
    it('should put "Gotta catch \'em all" in the files', async () => {
        await fs.readFile('./trainer1.txt', {encoding: 'utf8'}, (_err, data) => {
            expect(data).toEqual("Gotta catch 'em all")
        })
    })
})

jest.mock('request')
const request = require('request')
const lessons = require('./printLessonTitles')

describe('lessons', ()=>{
    test (`console log should not be called if lessons `, ()=>{
        request.mockClear()
        lessons.printLessons()
        expect(request.mock.calls.length).toEqual(1)
        const firstCall = request.mock.calls[0] 
        expect(firstCall[0]).toEqual('https://c0d3.com/api/lessons') 
    })

    test('console.log should be called once if length of lessons array is 1', ()=>{
        request.mockClear()
        lessons.printLessons()
        console.log = jest.fn()
        request.mock.calls[0][1]({},{}, JSON.stringify([
        {
            title: 'testing'
        }
        ]))
        expect(request.mock.calls.length).toEqual(1)
        expect(console.log.mock.calls[0][0]).toEqual('testing')
    })

    test('console.log should return 3 times if lessons array has 3 elements', ()=>{
        request.mockClear()
        lessons.printLessons()

        console.log = jest.fn()
        request.mock.calls[0][1]({},{},JSON.stringify([
            {
                title: "Testing1"
            },
            {
                title: 'Testing2'
            },
            {
                title: 'Testing3'
            }
        ]))
        expect(console.log.mock.calls.length).toEqual(3)
        expect(console.log.mock.calls[0][0]).toEqual('Testing1')
        expect(console.log.mock.calls[1][0]).toEqual('Testing2')
        expect(console.log.mock.calls[2][0]).toEqual('Testing3')
    })
})

jest.mock('request')
const titlesDoc = require('./lessonTitles')

describe("Titles Document", ()=>{

    test('should write two titles', ()=> {
        request.mockClear()
        titlesDoc.createTitlesDoc()

        fs.writeFile = jest.fn()
        request.mock.calls[0][1]({},{}, JSON.stringify([
            {
                title: 'c0d3'
            },
            {
                title: "recursion"
            }
        ]))
        expect(fs.writeFile.mock.calls.length).toEqual(1)
        expect(fs.writeFile.mock.calls[0][1]).toEqual( "<h1>c0d3</h1><h1>recursion</h1>")
    })
})

const pokemon = require('./getPokemonNames')

describe('Pokemons', ()=>{
    test('should write two different pokemon names', ()=>{
        request.mockClear()
        pokemon.getNames()

        fs.writeFile =  jest.fn()
        request.mock.calls[0][1]({},{}, JSON.stringify({
            results: 
            [{
                name: 'RahiZzYyY'
            },
            {
                name: 'McGiggles'
            },
            {
                name: 'BrownDynamite'
            }]}
            ))
        expect(fs.writeFile.mock.calls.length).toEqual(1)
        expect(fs.writeFile.mock.calls[0][1]).toEqual("<h1>RahiZzYyY</h1><h1>McGiggles</h1><h1>BrownDynamite</h1>")
    })
})

jest.mock("request")
const getCountry = require('./getCountryWithMostCities')

describe('Countries', ()=> {
    test ('find the country with most cities', ()=>{
        request.mockClear()
        getCountry.getMostCities()

        console.log = jest.fn()
        request.mock.calls[0][1]({},{}, JSON.stringify({
            results: [
                {
                    name:"Narnia",
                    cities: 100
                },
                {
                    name: "SpaceJam",
                    cities: 48
                },
                {
                    name: "Pluto",
                    cities: 250
                },
                {
                    name: "Galaxy",
                    cities: 20
                }
            ]
        }))
        expect(console.log.mock.calls[0][0]).toEqual("Pluto")
    })
})

jest.mock("request")
const heaviest = require('./getHeaviestPokemon')

describe('Pokemons', ()=>{
    test ('console.log the heaviest pokemon', ()=>{
        request.mockClear()
        heaviest.heaviestPokemon()

        console.log = jest.fn()
        request.mock.calls[0][1]({}, {}, JSON.stringify({
            results: [
                { 
                    name: "Rocky",
                    url:"testing1"
                },
                {
                    name: "Zoolander",
                    url: "testing2"
                },
                {
                    name: "Naruto",
                    url: "testing"
                }
            ]
        }))
        expect(request.mock.calls.length).toEqual(4)
        request.mock.calls[1][1]({},{}, JSON.stringify({weight: 200}))
        request.mock.calls[2][1]({},{}, JSON.stringify({weight: 300}))
        request.mock.calls[3][1]({},{}, JSON.stringify({weight: 100}))
        expect(console.log.mock.calls[0][0]).toEqual('Heaviest Pokemon is Zoolander at 300 pounds')
    })
})

jest.mock("request")
const pokemons = require('./createPokemonProfile')

describe('Pokemons', ()=> {
    test ('return 3 pokemon profiles', ()=>{
        request.mockClear()
        pokemons.createProfile()

        fs.writeFile = jest.fn()
        request.mock.calls[0][1]({}, {}, JSON.stringify({
            results: [
                {
                    name: "jollyRancher",
                    url: "testing1"
                },
                {
                    name: "johnnyBravo",
                    url: "tesing2"
                },
                {
                    name: "blueEyeDragon",
                    url: "testing3"
                }
            ]
        }))
        expect(request.mock.calls.length).toEqual(4) 
        request.mock.calls[1][1]({},{}, JSON.stringify({
            sprites: 
            {
                front_default: "testingPicture1"
            }
        }))
        request.mock.calls[2][1]({},{}, JSON.stringify({
            sprites: 
            {
                front_default: "testingPicture2"
            }
        }))
        request.mock.calls[3][1]({},{}, JSON.stringify({
            sprites: 
            {
                front_default: "testingPicture3"
            }
        }))
        expect(fs.writeFile.call.length).toEqual(1)
        expect(fs.writeFile.mock.calls[0][1]).toEqual(
            '<div><p>jollyRancher</p><img src="testingPicture1"/></div><div><p>johnnyBravo</p><img src="testingPicture2"/></div><div><p>blueEyeDragon</p><img src="testingPicture3"/></div>'
            )
    })
})
const allFuns = {}

function mergeArrays(one, two, merged = [], i = 0, j = 0) {
    if (i < one.length) {
        merged.push(one[i])
        return mergeArrays(one, two, merged, i + 1)
    }

    if (j < two.length) {
        merged.push(two[j])
        return mergeArrays(one, two, merged, i, j + 1)
    }

    return merged
}

allFuns.mergeArrays = mergeArrays

function firstLongerThan(arr, nr, i = 0) {
    if (i === arr.length) {
        return
    }

    if (arr[i].length > nr) {
        return arr[i]
    }

    return firstLongerThan(arr, nr, i + 1)

}
allFuns.firstLongerThan = firstLongerThan

function getReturnValues(arr, values = [], i = 0) {
    if (i === arr.length) {
        return values
    }
    let fn = arr[i]
    values.push(fn())
    return getReturnValues(arr, values, i + 1)
}
allFuns.getReturnValues = getReturnValues

function getColArr(nr, colArr = []) {
    if (colArr.length < nr) {
        colArr.push(0)
        return getColArr(nr, colArr)
    }
    return colArr
}
function zeroSquare(nr, rowArr = []) {
    if (rowArr.length < nr) {
        rowArr[rowArr.length] = getColArr(nr)
        return zeroSquare(nr, rowArr)
    }

    return rowArr
}
allFuns.zeroSquare = zeroSquare


function filterNonKeys(arr, obj, newArr = [], i = 0) {
    if (i === arr.length) {
        return newArr
    }
    if (obj[arr[i]]) {
        newArr.push(arr[i])
    }
    return filterNonKeys(arr, obj, newArr, i + 1)
}

allFuns.filterNonKeys = filterNonKeys

function addDescriptions(arr, obj, i = 0) {
    if (i === arr.length) {
        return
    }
    arr[i].description = obj[arr[i].name]
    return addDescriptions(arr, obj, i + 1)
}


allFuns.addDescriptions = addDescriptions

function countOccurrences(arr, obj = {}, i = 0) {
    if (i === arr.length) {
        return obj
    }
    if (obj[arr[i]]) {
        obj[arr[i]] += 1
        return countOccurrences(arr, obj, i + 1)
    }
    obj[arr[i]] = 1
    return countOccurrences(arr, obj, i + 1)
}

allFuns.countOccurrences = countOccurrences

function longestString(obj) {
    let arr = Object.values(obj)
    let longest = ''
    arr.forEach(v => {
        longest = v.length > longest.length ? v : longest
    })
    return longest
}
allFuns.longestString = longestString

function keyOfLongestString(obj, key, longest = '') {
    Object.entries(obj).forEach(v => {
        if (v[1].length > longest.length) {
            longest = v[1]
            key = v[0]
        }
    })
    return key
}
allFuns.keyOfLongestString = keyOfLongestString

function removeLongestString(obj) {
    let keys = Object.keys(obj)
    let longestK = keys.reduce((lK, k) => {
        return obj[k].length > obj[lK].length ? k : lK
    }, keys[0])

    delete (obj[longestK])
}
allFuns.removeLongestString = removeLongestString

function headers(obj) {
    return Object.keys(obj).reduce((acc, k) => {
        return acc + `<div><h1>${k}</h1><h2>${obj[k]}</h2></div>`
    }, '')
}
allFuns.headers = headers

Object.prototype.forEach = function (fn, i = 0) {
    let enteries = Object.entries(this)
    if (i === enteries.length) {
        return
    }
    fn(enteries[i][0], enteries[i][1], i, this)

    return this.forEach(fn, i + 1)
}

Object.prototype.filter = function (fn, i = 0, obj = {}, entries = Object.entries(this)) {
    if (i === entries.length) {
        return obj
    }
    if (fn(entries[i][0], entries[i][1], i, this)) {
        obj[entries[i][0]] = entries[i][1]
    }

    return this.filter(fn, i + 1, obj, entries)

}

Object.prototype.reduce = function (fn, acc, i = 0) {
    let enteries = Object.entries(this)
    if (i === enteries.length) {
        return acc
    }

    return this.reduce(fn, fn(acc, enteries[i][0], enteries[i][1], i, this), i + 1)

}

Array.prototype.getCharCount = function (i = 0, j = 0, obj = {}) {
    if (i === this.length) {
        return obj
    }

    if (j === this[i].length) {
        return this.getCharCount(i + 1, j = 0, obj)
    }

    if (obj[this[i][j]]) {
        obj[this[i][j]] += 1
        return this.getCharCount(i, j + 1, obj)
    }

    if (this[i] !== "") {
        obj[this[i][j]] = 1
        return this.getCharCount(i, j + 1, obj)
    }
}

Array.prototype.getMostCommon = function () {
    let mostCommon = this.reduce((acc, e) => {
        let obj = acc[0]
        obj[e] = obj[e] || 0
        obj[e] += 1

        if (obj[e] > acc[2]) {
            acc[1] = e
            acc[2] = obj[e]
        }
        return acc
    }, [{}, null, 0])

    return mostCommon[1]
}

// [6,6,6,7,7,4] => [4]
Array.prototype.removeDupes = function () {
    let obj = this.reduce((acc, e) => {
        acc[e] = (acc[e] || 0) + 1
        return acc
    }, {})

    const remove = (i = 0) => {
        if (i === this.length) {
            return
        }

        if (obj[this[i]] === 1) {
            return remove(i + 1)
        }

        this.splice(i, 1)
        return remove(i)
    }

    remove()
}

Array.prototype.getNext = function () {
    index = this.count || 0
    this.count = (index + 1) % this.length

    return this[index]
}

Array.prototype.setMaxSize = function (max) {
    this.oldPush = this.push
    this.push = (newElement) => {
        if (this.length < max) {
            this.oldPush(newElement)
        }
        return this.length
    }
}

Array.prototype.tiredForEach = function (cb, time) {
    if (this.isTired) {

    }
}

const fs = require('fs')


function makeFiles(nr, i = 0) {
    if (i > nr) {
        return
    }

    fs.writeFile(`./trainer${i}.txt`, "Gotta catch 'em all", () => { })

    return makeFiles(nr, i + 1)
}
allFuns.makeFiles = makeFiles

function listFiles() {
    fs.readdir('./', (err, files) => {
        let str = files.reduce((acc, file) => {
            return acc + `<h1>${file}</h1>`
        }, '')
        fs.writeFile('./fileList.txt', str, () => { })
    })
}
allFuns.listFiles = listFiles

module.exports = allFuns

const allFuns = {}

function mergeArrays(one, two, merged = [], i = 0, j = 0){
    if(i < one.length){
        merged.push(one[i])
        return mergeArrays(one, two, merged, i + 1) 
    }

    if(j < two.length){
        merged.push(two[j])
        return mergeArrays(one, two, merged, i, j + 1) 
    }

    return merged
}

allFuns.mergeArrays = mergeArrays 

function firstLongerThan(arr, nr, i = 0) {
    if(i === arr.length){
        return 
    }

    if(arr[i].length > nr){
        return arr[i]
    }

    return firstLongerThan(arr, nr, i + 1)

}
allFuns.firstLongerThan = firstLongerThan

function getReturnValues(arr, values = [], i = 0){
    if(i === arr.length){
        return values
    }
    let fn = arr[i]
    values.push(fn())
    return getReturnValues(arr, values, i + 1)
}
allFuns.getReturnValues = getReturnValues

function getColArr(nr, colArr = []){
    if(colArr.length < nr ){
        colArr.push(0)
        return getColArr(nr, colArr)
    }
    return colArr
}
function zeroSquare(nr, rowArr = []){
    if(rowArr.length < nr){
        rowArr[rowArr.length] = getColArr(nr)
        return zeroSquare(nr, rowArr)
    }

    return rowArr
}
allFuns.zeroSquare = zeroSquare


module.exports = allFuns

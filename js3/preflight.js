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

module.exports = allFuns

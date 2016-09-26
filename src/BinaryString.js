export const createBinaryString = function (num, length) {
    return ('0'.repeat(length) + num.toString(2)).slice(-length);
};

export const invertBinaryString = function (string) {
    return string.split('').map(i => Number.parseInt(i)).map(i => Number(!i)).join('')
};

export const binaryStringLessOrEqual = function(l, r) {
    if(l.length !== r.length)
        throw new Error("bad boolean strings");

    let diffs = 0;
    let diff_pos = -1;
    for(let i = 0; i < l.length; i++){
        if(l[i] !== r[i]){
            diffs++;
            diff_pos = i;
        }
    }

    if(diffs > 1)
        return null;
    if(diffs === 0)
        return null;
    if(diffs === 1)
        return Number.parseInt(l[diff_pos]) < Number.parseInt(r[diff_pos]);
};

export const binaryStringSetAt = function(string, at, value) {
    return string.substr(0, at) + value.toString() + string.substr(at+1);
};
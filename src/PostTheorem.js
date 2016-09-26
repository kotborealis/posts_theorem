/**
 * Created by kotborealis on 26.09.2016.
 */

import {BooleanFunction} from "./BooleanFunction";
import {createBinaryString} from "./BinaryString";
import {invertBinaryString} from "./BinaryString";
import {binaryStringLessOrEqual} from "./BinaryString";

export const isT0 = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected, got "+JSON.stringify(booleanFunction));

    return booleanFunction.data.values[0] === 0;
};

export const isT1 = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    return booleanFunction.data.values[booleanFunction.data.values.length - 1] === 1;
};

export const isS = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    for(let i = 0; i < booleanFunction.data.values.length/2; i++){
        const i_bin = createBinaryString(i, booleanFunction.argc);
        const l = booleanFunction.data.binaryString[i_bin];
        const r = booleanFunction.data.binaryString[invertBinaryString(i_bin)];
        if(l === r)
            return false;
    }
    return true;
};

export const isM = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    for(let i = 0; i < booleanFunction.data.values.length; i++){
        for(let j = 0; j < booleanFunction.data.values.length; j++){
            const l = createBinaryString(i, booleanFunction.argc);
            const r = createBinaryString(j, booleanFunction.argc);
            const less_or_equal = binaryStringLessOrEqual(l, r);

            if(less_or_equal === null)
                continue;
            else if(less_or_equal && !(booleanFunction.data.values[i] <= booleanFunction.data.values[j]))
                return false;
        }
    }

    return true;
};

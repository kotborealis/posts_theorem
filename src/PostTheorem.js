/**
 * Created by kotborealis on 26.09.2016.
 */

import {BooleanFunction} from "./BooleanFunction";
import ByteNumber from './BitNumber';

export const isT0 = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected, got "+JSON.stringify(booleanFunction));

    return booleanFunction.value.byte(0) === 0;
};

export const isT1 = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    return booleanFunction.value.byte(booleanFunction.value.length - 1) === 1;
};

export const isS = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    for(let i = 0; i < booleanFunction.value.length/2; i++){
        const l = booleanFunction.value.byte(i);
        const r = booleanFunction.value.byte(i, true);
        if(l === r)
            return false;
    }
    return true;
};

export const isM = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    for(let i = 0; i < booleanFunction.value.length; i++){
        for(let j = i+1; j < booleanFunction.value.length; j++){
            const l = new ByteNumber(i, booleanFunction.argc);
            const r = new ByteNumber(j, booleanFunction.argc);
            const less_or_equal = l.lessOrEqual(r);

            if(less_or_equal && !(booleanFunction.value.byte(i) <= booleanFunction.value.byte(j)))
                    return false;
        }
    }

    return true;
};

export const isL = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    let ZhegalkinRows = [];
    ZhegalkinRows.push(booleanFunction.value.map(b => b));

    for(let reduced = ZhegalkinReduceRow(ZhegalkinRows[0]);
        reduced.length > 0;
        reduced = ZhegalkinReduceRow(ZhegalkinRows[ZhegalkinRows.length - 1]))
        ZhegalkinRows.push(reduced);

    const ZhegalkinPolynomial = ZhegalkinRows.map(row => row[0]);

    let linearPolynomial = true;
    ZhegalkinPolynomial.forEach((member, i) => {
        if(member && i !== 0 && !Number.isInteger(Math.log2(i)))
            linearPolynomial = false;
    });

    return linearPolynomial;
};

export const isFullSystem = function(booleanFunctions){
    if(!Array.isArray(booleanFunctions))
        throw new Error("Array expected");

    for(let i = 0; i < booleanFunctions.length; i++)
        if(!(booleanFunctions[i] instanceof BooleanFunction))
            throw new Error("BooleanFunction instances array expected");

    const postsCriterion = {
        hasNotT0: false,
        hasNotT1: false,
        hasNotS: false,
        hasNotM: false,
        hasNotL: false
    };

    const functionsClasses = [];

    booleanFunctions.forEach(booleanFunction => {
        const functionClasses = {
            f: booleanFunction.toString(),
            isT0: isT0(booleanFunction),
            isT1: isT1(booleanFunction),
            isS: isS(booleanFunction),
            isM: isM(booleanFunction),
            isL: isL(booleanFunction)
        };

        postsCriterion.hasNotT0 = postsCriterion.hasNotT0 || !functionClasses.isT0;
        postsCriterion.hasNotT1 = postsCriterion.hasNotT1 || !functionClasses.isT1;
        postsCriterion.hasNotS = postsCriterion.hasNotS || !functionClasses.isS;
        postsCriterion.hasNotM = postsCriterion.hasNotM || !functionClasses.isM;
        postsCriterion.hasNotL = postsCriterion.hasNotL || !functionClasses.isL;

        functionsClasses.push(functionClasses);
    });

    return {
        isFullSystem: postsCriterion.hasNotT0
        && postsCriterion.hasNotT1
        && postsCriterion.hasNotS
        && postsCriterion.hasNotM
        && postsCriterion.hasNotL,
        functions: functionsClasses
    };
};

function ZhegalkinReduceRow(row){
    const reduced = [];
    for(let i = 0; i < row.length - 1; i++)
        reduced.push((row[i] + row[i+1])%2);

    return reduced;
}
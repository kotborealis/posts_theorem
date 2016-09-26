/**
 * Created by kotborealis on 26.09.2016.
 */

import {BooleanFunction} from "./BooleanFunction";
import * as BinaryString from "./BinaryString";

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
        const i_bin = BinaryString.create(i, booleanFunction.argc);
        const l = booleanFunction.data.binaryString[i_bin];
        const r = booleanFunction.data.binaryString[BinaryString.invert(i_bin)];
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
            const l = BinaryString.create(i, booleanFunction.argc);
            const r = BinaryString.create(j, booleanFunction.argc);
            const less_or_equal = BinaryString.lessOrEqual(l, r);

            if(less_or_equal && !(booleanFunction.data.values[i] <= booleanFunction.data.values[j]))
                return false;
        }
    }

    return true;
};

export const isL = function(booleanFunction){
    if(!(booleanFunction instanceof BooleanFunction))
        throw new Error("BooleanFunction instance expected");

    let ZhegalkinRows = [];
    ZhegalkinRows.push(booleanFunction.data.values);

    for(let reduced = ZhegalkinReduceRow(ZhegalkinRows[0]);
        reduced.length > 0;
        reduced = ZhegalkinReduceRow(ZhegalkinRows[ZhegalkinRows.length - 1]))
        ZhegalkinRows.push(reduced);

    const ZhegalkinPolynomial = ZhegalkinRows.map(row => row[0]);

    let linearPolynomial = true;
    ZhegalkinPolynomial.forEach((member, i) => {
        if(member && !BinaryString.isZhegalkinPolynomialLinearMember(BinaryString.create(i, booleanFunction.argc)))
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
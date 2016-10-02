/**
 * Created by kotborealis on 26.09.2016.
 */

import ByteNumber from './BitNumber';

export const BooleanFunction = function (output_values){
    //constructor
    const values = output_values.split('').map(v => Number.parseInt(v));
    const argc = Math.log2(values.length);

    if(!Number.isInteger(argc)){
        throw new Error("Boolean function must have 2^n values!");
    }

    for(let i = 0; i < values.length; i++){
        if(!Number.isInteger(values[i])){
            throw new Error("Boolean function must consist of integers!");
        }
        if(values[i] !== 0 && values[i] !== 1){
            throw new Error("Wrong values for boolean function!");
        }
    }

    this.argc = argc;
    this.value = new ByteNumber(Number.parseInt(values.join(''), 2), Math.pow(2, this.argc));

    this.toString = () => values.join('');
};
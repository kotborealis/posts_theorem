/**
 * Created by kotborealis on 26.09.2016.
 */

import * as BinaryString from './BinaryString';

export const BooleanFunction = function (output_values){
    //constructor
    const values = output_values.split('').map(v => Number.parseInt(v));
    const argc = Math.log2(values.length);

    if(!Number.isInteger(argc)){
        throw new Error("Boolean function must have 2^n values!");
    }

    for(let i = 0; i < values; i++){
        if(!Number.isInteger(values[i])){
            throw new Error("Boolean function must consist of integers!");
        }
        if(values[i] !== 0 || values[i] !== 1){
            throw new Error("Wrong values for boolean function!");
        }
    }

    this.argc = argc;

    this.data = {};
    this.data.values = values;
    this.data.binaryString = {};
    for(let i = 0; i < values.length; i++)
        this.data.binaryString[BinaryString.create(i, this.argc)] = this.data.values[i];

    this.forEach = (callback) => {
        for(let i = 0; i < this.data.values.length; i++)
            callback(this.data.values[i], BinaryString.create(i, this.argc));
    };

    this.toString = () => values.join('');
};
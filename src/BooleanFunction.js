import {createBinaryString} from "./BinaryString";
/**
 * Created by kotborealis on 26.09.2016.
 */

export const BooleanFunction = function (output_values){
    //constructor
    const values = output_values.split('').map(v => Number.parseInt(v));
    const argc = Math.log2(values.length);

    if(!Number.isInteger(argc)){
        throw new Error("Boolean function must have 2^n values!");
    }

    this.argc = argc;

    this.data = {};
    this.data.values = values;
    this.data.binaryString = {};
    for(let i = 0; i < values.length; i++)
        this.data.binaryString[createBinaryString(i, this.argc)] = this.data.values[i];

    this.forEach = (callback) => {
        for(let i = 0; i < this.data.values.length; i++)
            callback(this.data.values[i], createBinaryString(i, this.argc));
    };

    this.toString = () => values.join('');
};
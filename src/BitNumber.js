export default function(num, _length){
    this.length = _length ? _length : 32;
    this.value = Number(num);

    this.byte = (n, reverse) => {
        if(!reverse)
            return (this.value >> (this.length - n - 1)) & 1;
        else
            return (this.value >> n) & 1;
    };

    this.forEach = callback => {
        for(let i = 0; i < this.length; i++)
            callback(this.byte(i), i, this.value);
    };

    this.map = callback => {
        const r = [];
        this.forEach(v => {
            r.push(callback(v));
        });
        return r;
    };

    this.equal = n => {
        return n.value === this.value;
    };

    this.lessOrEqual = byteNumber => {
        if(this.length !== byteNumber.length)
            throw new Error("Bad arg");

        let diffs = 0;
        let diff_pos = -1;
        for(let i = 0; i < this.length; i++){
            const l = this.byte(i);
            const r = byteNumber.byte(i);
            if(l !== r){
                diffs++;
                diff_pos = i;
                if(diffs > 1){
                    return null;
                }
            }
        }

        if(diffs === 0)
            return null;
        if(diffs === 1)
            return this.byte(diff_pos) < byteNumber.byte(diff_pos);
    };
};
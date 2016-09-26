import {BooleanFunction} from './BooleanFunction';
import * as PostTheorem from './PostTheorem';
window.BooleanFunction = BooleanFunction;
window.PostTheorem = PostTheorem;

function test(){
    const style = {
        error: 'background: red; color: white;',
        success: 'background: green; color: white;',
        badass: 'background: #222; color: #bada55'
    };

    const testData = [
        {
            "f": new BooleanFunction("00010011"),
            "isT0": true,
            "isT1": true,
            "isS": false,
            "isM": true,
            "isL": false
        },
        {
            "f": new BooleanFunction("00001111"),
            "isT0": true,
            "isT1": true,
            "isS": true,
            "isM": true,
            "isL": true
        },
        {
            "f": new BooleanFunction("00101001"),
            "isT0": true,
            "isT1": true,
            "isS": false,
            "isM": false,
            "isL": false
        },
        {
            "f": new BooleanFunction("11011110"),
            "isT0": false,
            "isT1": false,
            "isS": false,
            "isM": false,
            "isL": false
        },
        {
            "f": new BooleanFunction("11010001"),
            "isT0": false,
            "isT1": true,
            "isS": false,
            "isM": false,
            "isL": false
        },
        {
            "f": new BooleanFunction("01100110"),
            "isT0": true,
            "isT1": false,
            "isS": false,
            "isM": false,
            "isL": true
        }
    ];

    const props = ["isT0", "isT1", "isS", "isM", "isL"];

    testData.forEach((testData, i)=>{
        console.log(`%c Test for function ${i+1}: ${testData.f.toString()}`, style.badass);

        props.forEach(p => {
            if(PostTheorem[p]){
                const testResult = {};
                testResult.result = PostTheorem[p](testData.f);
                testResult.expected = testData[p];
                testResult.valid = testResult.result === testResult.expected;

                console.log(`%c ${p}: got ${testResult.result}, expected ${testResult.expected}`,
                    testResult.valid ? style.success : style.error);
            }
        })
    });
}

test();
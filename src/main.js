import {BooleanFunction} from './BooleanFunction';
import * as PostTheorem from './PostTheorem';
import * as utils from './utils';

function test(filename){
    const style = {
        error: 'background: red; color: white;',
        success: 'background: green; color: white;',
        badass: 'background: #222; color: #bada55'
    };

    const props = ["isT0", "isT1", "isS", "isM", "isL"];

    utils.loadJSONfromURL(filename, testData => {
        testData.forEach((testData, i)=> {
            console.log(`%c Test for function ${i + 1}: ${testData.f}`, style.badass);

            props.forEach(p => {
                if (PostTheorem[p]) {
                    const testResult = {};
                    testResult.result = PostTheorem[p](new BooleanFunction(testData.f));
                    testResult.expected = testData[p];
                    testResult.valid = testResult.result === testResult.expected;

                    console.log(`%c ${p}: got ${testResult.result}, expected ${testResult.expected}`,
                        testResult.valid ? style.success : style.error);
                }
            })
        });
    });
}

test('./test/set1.json');
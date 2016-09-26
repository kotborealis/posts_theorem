import {BooleanFunction} from './BooleanFunction';
import * as PostTheorem from './PostTheorem';
import * as utils from './utils';

function test(filename){
    const style = {
        error: 'background: #ffcccc; color: #0c0c0c; font-size: 20px;',
        success: 'background: #ccffcc; color: #0c0c0c; font-size: 20px;',
        info: 'background: #050505; color: #fcfcfc; font-size: 20px;'
    };

    const props = ["isT0", "isT1", "isS", "isM", "isL"];

    utils.loadJSONfromURL(filename, testData => {
        console.log(`%cTests from file ${filename}`, style.info);
        testData.forEach((testData, i)=> {
            console.log(`%cTest for function ${testData.f}`, style.info);

            props.forEach(p => {
                if (PostTheorem[p]) {
                    const testResult = {};
                    testResult.result = PostTheorem[p](new BooleanFunction(testData.f));
                    testResult.expected = testData[p];
                    testResult.valid = testResult.result === testResult.expected;

                    console.log(`%c${p}: got ${testResult.result}, expected ${testResult.expected}`,
                        testResult.valid ? style.success : style.error);
                }
            })
        });
    });
}

test('./test/set1.json');
test('./test/set2.json');
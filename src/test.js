import {BooleanFunction} from './BooleanFunction';
import * as PostTheorem from './PostTheorem';
import * as utils from './utils';

const testLogStyle = {
    error: 'background: #ffcccc; color: #0c0c0c;',
    success: 'background: #ccffcc; color: #0c0c0c;',
    info: 'background: #050505; color: #fcfcfc;'
};

const testPostsClassesProps = ["isT0", "isT1", "isS", "isM", "isL"];

export const testPostsClasses = function(filename){
    utils.loadJSONfromURL(filename, data => {
        console.log(`%cPost's Classes tests from file ${filename}`, testLogStyle.info);
        data.functions.forEach(testData => {
            console.log(`%cPost's Classes test for function ${testData.f}`, testLogStyle.info);
            testPostsClassesProps.forEach(p => {
                if (PostTheorem[p]) {
                    const testResult = {};
                    testResult.result = PostTheorem[p](new BooleanFunction(testData.f));
                    testResult.expected = testData[p];
                    testResult.valid = testResult.result === testResult.expected;

                    console.log(`%c${p}: got ${testResult.result}, expected ${testResult.expected}`,
                        testResult.valid ? testLogStyle.success : testLogStyle.error);
                }
            });
        });
    });
}

export const testPostsCriterionFullSystem = function(filename){
    utils.loadJSONfromURL(filename, data => {
        console.log(`%cPost's Criterion tests for file ${filename}`, testLogStyle.info);
        const testData = data.functions.map(f => new BooleanFunction(f.f));
        const result = PostTheorem.isFullSystem(testData).isFullSystem;
        const expected = data.isFullSystem;
        const valid = result === expected;

        console.log(`%cGot ${result}, expected ${expected}`, valid ? testLogStyle.success : testLogStyle.error);
    });
}
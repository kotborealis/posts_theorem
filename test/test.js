const expect = require('chai').expect;

import {BooleanFunction} from '../src/BooleanFunction';
import * as PostTheorem from '../src/PostTheorem';

const testPostsClassesProps = ["isT0", "isT1", "isS", "isM", "isL"];

const test = file => {
    describe(`Test set ${file}`, () => {
        const data = require(file);

        describe('Classify boolean functions', () => {
            testPostsClassesProps.forEach(postClass => {
                it(`Should classify boolean function as ${postClass}`, () => {
                    data.functions.forEach(testData => {
                        const result = PostTheorem[postClass](new BooleanFunction(testData.f));
                        const expected = testData[postClass];
                        expect(result).to.equal(expected)
                    });
                });
            });
        });

        describe('PostTheorem full system check', () => {
            it('Should test if functions system is full', () => {
                const testData = data.functions.map(f => new BooleanFunction(f.f));
                const result = PostTheorem.isFullSystem(testData).isFullSystem;
                const expected = data.isFullSystem;
                expect(result).to.equal(expected);
            });
        });
    });
};

describe('PostTheorem', () => {
    test('./set1.json');
    test('./set2.json');
});
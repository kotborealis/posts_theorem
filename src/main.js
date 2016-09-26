import * as Test from './test';
import * as GUI from './gui';

Test.testPostsClasses('./test/set1.json');
Test.testPostsClasses('./test/set2.json');

Test.testPostsCriterionFullSystem('./test/set1.json');
Test.testPostsCriterionFullSystem('./test/set2.json');
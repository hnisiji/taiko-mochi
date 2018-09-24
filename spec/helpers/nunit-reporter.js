const path = require('path');
const reporters = require('jasmine-reporters');

const nunitReporter = new reporters.NUnitXmlReporter({
    savePath: path.join(process.cwd(), 'reports'),
    consolidateAll: false
});
jasmine.getEnv().addReporter(nunitReporter);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

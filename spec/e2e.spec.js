const path = require('path');

const mkdirp = require('mkdirp');
const {
    closeBrowser,
    openBrowser,
    goto,
    inputField,
    write,
    $,
    click,
    screenshot,
} = require('taiko');

describe('www.yahoo.co.jp', () => {
    const screenshotDir = path.join(process.cwd(), 'reports/attachments/');
    beforeAll(async (done) => {
        mkdirp(screenshotDir, done);
    });

    beforeEach(async (done) => {
        await openBrowser({ headless: true, args: '--no-sandbox' });
        done();
    });

    it('検索できる', async (done) => {
        await goto('https://www.yahoo.co.jp');
        await write('うおぽぉ', inputField({ id: 'srchtxt' }));
        await click($('#srchbtn'));
        await screenshot({ path: path.join(screenshotDir, 'uopolo.png') });
        done();
    });

    afterEach(async (done) => {
        await closeBrowser();
        done();
    });
});

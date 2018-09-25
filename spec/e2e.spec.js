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
const BrowserFetcher = require('taiko/lib/browserFetcher');
const childProcess = require('child_process');

describe('www.yahoo.co.jp', () => {
    const screenshotDir = path.join(process.cwd(), 'reports/attachments/');
    beforeAll(async (done) => {
        mkdirp(screenshotDir, done);
    });

    // beforeEach(async (done) => {
    //     await openBrowser({ headless: true, args: '--no-sandbox' });
    //     done();
    // });

    it(' troubleshooting', async (done) => {
        const browserFetcher = new BrowserFetcher();
        const revisions = await browserFetcher.localRevisions();
        const revisionInfo = browserFetcher.revisionInfo(revisions[0]);

        try {
            const data = childProcess.execSync(`${revisionInfo.executablePath} --remote-debugging-port=0 --headless 2>&1`, { timeout: 3 * 1000 });
            console.log('success');
            console.log(data.toString());
        } catch (e) {
            console.log('failed');
            console.log(e.stdout.toString());
        }
        done();
    });

    // it('検索できる', async (done) => {
    //     await goto('https://www.yahoo.co.jp');
    //     await write('うおぽぉ', inputField({ id: 'srchtxt' }));
    //     await click($('#srchbtn'));
    //     await screenshot({ path: path.join(screenshotDir, 'uopolo.png') });
    //     done();
    // });

    // afterEach(async (done) => {
    //     await closeBrowser();
    //     done();
    // });
});

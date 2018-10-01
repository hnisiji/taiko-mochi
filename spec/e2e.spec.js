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
const util = require('util');
const exec = util.promisify(childProcess.exec);

describe('www.yahoo.co.jp', () => {
    
    jasmine.DEFAULT_TIMEOUT_INTERVAL=20000000;
    const screenshotDir = path.join(process.cwd(), 'reports/attachments/');
    beforeAll(async (done) => {
        mkdirp(screenshotDir, done);
    });

    // beforeEach(async (done) => {
    //     await openBrowser({ headless: true, args: '--no-sandbox' });
    //     done();
    // });

    it('troubleshooting', async (done) => {
        const browserFetcher = new BrowserFetcher();
        const revisions = await browserFetcher.localRevisions();
        const revisionInfo = browserFetcher.revisionInfo(revisions[0]);
        try {
            const [chrome, printenv] = await Promise.all([
                exec(`${process.env.CHROME_BIN} --enable-logging --v=1 --vmodule --remote-debugging-port=19222 --window-size=1440,900 --headless`, { timeout: 10 * 1000 }).catch(e => e),
                new Promise((r) => setTimeout(r, 5000)).then(() => exec('printenv')),
            ]);
            console.log('success');
            console.log(`chrome stdout: ${chrome.stdout}`);
            console.log(`chrome stderr: ${chrome.stderr}`);
            console.log(`printenv stdout: ${printenv.stdout}`);
            console.log(`printenv stderr: ${printenv.stderr}`);
        } catch (e) {
            console.log(e);
            console.log('failed');
            console.log(e.stdout.toString());
            console.log(e.stderr.toString());
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

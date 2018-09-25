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
            const [chrome, netstat, ps] = await Promise.all([
                exec(`${revisionInfo.executablePath} --remote-debugging-port=19222 --window-size=1440,900 --headless 2>&1`, { timeout: 10 * 1000 }).catch(e => e),
                new Promise((r) => setTimeout(r, 5000)).then(() => exec('netstat -an')),
                new Promise((r) => setTimeout(r, 5000)).then(() => exec('ps auxwww')),
            ]);
            console.log('success');
            console.log(`chrome stdout: ${chrome.stdout}`);
            console.log(`chrome stderr: ${chrome.stderr}`);
            console.log(`netstat stdout: ${netstat.stdout}`);
            console.log(`netstat stderr: ${netstat.stderr}`);
            console.log(`ps stdout: ${ps.stdout}`);
            console.log(`ps stderr: ${ps.stderr}`);
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

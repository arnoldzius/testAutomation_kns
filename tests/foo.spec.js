const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage')
const {DuckResultsPage} = require('../pages/duckResultsPage')

test.describe('Duck duck test suite', () => {
    let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
      startPage = new DuckStartPage(page);
      resultsPage = new DuckResultsPage(page);
  });
 test.beforeEach(async () => {
    await startPage.goto();
  });
    test('Checks that duckduckGo page can be opened', async () => {    
        const isLogoVisible = await page.isVisible('#logo_homepage_link');
        expect(isLogoVisible).toBe(true);
    });

    test('Checks that results page opens and results are correct', async () => {
        await startPage.initiateSearch('Test');
        const rezultatasTextContent = await page.textContent('#r1-0');
        console.log(rezultatasTextContent);
        expect(rezultatasTextContent).toContain('Test');
    });

    test('Inspector demo', async () => {     
        await page.fill('[placeholder="Search the web without being tracked"]', 'Test');
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&t=h_&ia=web' }*/),
            page.click('input:has-text("S")')
        ]);
        const rezultatasTextContent = await page.textContent('#r1-0');
        expect(rezultatasTextContent).toContain('Test');
    });

    test(`Search MS word cheatsheets`, async () => {
        await startPage.initiateSearch('ms word cheat sheet');
        const textContent = await page.textContent('.c-base__title');
        const isCheatSheetsVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
        expect(isCheatSheetsVisible).toBe(true);
        expect(textContent).toContain("Microsoft Word 2010");
    });

    test('microsoft word cheat sheet', async () => {
        await page.fill('#search_form_input_homepage', "microsoft word cheat sheet");
        await page.click('#search_button_homepage');
        const rezultatasTextContent = await page.textContent('h3.c-base__title');
        const rezultatasTextContent2 = await page.textContent('a.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');

        expect(rezultatasTextContent).toContain('Microsoft Word 2010');
        expect(rezultatasTextContent2).toContain('Cheat Sheet');
    });

    test('Shortened wikipedea link', async () => {       
        await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.org/');
        await page.click('#search_button_homepage');
        const shortURL = await page.inputValue('#shorten-url');
        await page.goto(shortURL);
        const title = await page.isVisible('#www-wikipedia-org');
        expect(title).toBe(true);
    });

    test('go to wikipedia ', async () => {      
        await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
        await page.click('#search_button_homepage');
        const shortUrl = await page.inputValue('#shorten-url');
        await page.goto(shortUrl);
        const webPage = page.url();
        expect(webPage).toBe('https://www.wikipedia.org/');
    });

    test('Testing if page shortener proceed ', async () => {
        await page.waitForSelector('#logo_homepage_link');
        await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
        await page.click('#search_button_homepage');
        const shorterPage = await page.getAttribute('#shorten-url', 'value');
        await page.goto(shorterPage);
        const webPage = page.url();
        expect(webPage).toBe('https://www.wikipedia.org/');
    });

    test('Shorten url', async () => {
        await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
        await page.click('#search_button_homepage');
        const shortUrl = await page.inputValue('#shorten-url')
        await page.goto(shortUrl);
        const webPage = page.url();
        expect(webPage).toBe('https://www.wikipedia.org/');
    });

    test('panda', async () => {
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', "intitle:panda");
        await page.click("#search_button_homepage", { force: true });
        await page.waitForNavigation();
        const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
        console.log(results);
        results.forEach(result => {
            expect(result.toLowerCase()).toContain("panda");
        });
    });


    const passwordsLengths = [8, 16, 64];
    passwordsLengths.forEach(passwordLength => {
        test(`Generate ${passwordLength} chracters long password`, async () => {
            await startPage.initiateSearch("password " + passwordLength);
            const generatedPassword = await resultsPage.getGeneratedPassword();
            expect(generatedPassword.length).toEqual(passwordLength)
        });
    });

    test('QR TEST', async () => {    
        await page.fill('#search_form_input_homepage', 'qr devbridge.com');
        await page.click('#search_button_homepage');
        const textContent = await page.textContent('.zci.zci--answer.is-active');
        const isAnswerVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--answer.is-active');
        expect(textContent).toContain('A QR code that means');
        expect(isAnswerVisible).toBe(true);
        const qrImage = await page.$('img[alt="A QR Code"]');
        await qrImage.screenshot({
            path: 'nqr.png',
            omitBackground: true,
        });
        await page.goto('https://metriqr.com/scanner/');
        await page.setInputFiles('input.hidden', 'nqr.png')
        const urlLink = await page.textContent('div.py-4>div.text-black');
        expect(urlLink).toBe("devbridge.com");
  
    });

    test('Check calendar', async () => {      
        await page.fill('#search_form_input_homepage', "calendar 21st March 1989");
        await page.click('#search_button_homepage');
        const text = await page.textContent('tr:nth-child(6) > td:nth-child(3)');
        expect(text).toContain('21');
    });
    const passwordsLengths2 = ['7', '65'];
    passwordsLengths2.forEach(passwordLength => {
        test(`Doesn't generate ${passwordLength} chracters long password`, async () => {
            await page.waitForSelector("#search_form_input_homepage");
            await page.fill('#search_form_input_homepage', ("password " + passwordLength));
            await page.click("#search_button_homepage");
            const isPasswordContentVisible = await page.isVisible(".c-base__title");
            expect(isPasswordContentVisible).toBe(false)
        });
    });
});
const { test, expect } = require('@playwright/test');

test('Checks if duckduckgo page is loaded', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const isLogoVisible = await page.isVisible('#logo_homepage_link');

  expect(isLogoVisible).toBe(true);
});

test('Checks that results page opens and are correct', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "Test"); // fill iklijuoja reiksme, geriau nei type. Type imituoja vartotoja
    await page.click('#search_button_homepage');
    const rezultatas = await page.textContent('#r1-0');
    
    expect(rezultatas).toContain('Test');
  });


test(`Search MS word cheatsheets`, async ({ page }) => {
    await page.goto('https://duckduckgo.com');
    await page.fill('#search_form_input_homepage', 'ms word cheat sheet');
    await page.click('#search_button_homepage');
    const textContent = await page.textContent('h3.c-base__title');
    const isCheatSheetsVisible = await page.isVisible('a.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
    expect(isCheatSheetsVisible).toBe(true);
    expect(textContent).toContain("Microsoft Word 2010");
});

test('Shorten Wikipedia', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "shorten www.wikipedia.com");
    await page.click('#search_button_homepage');
    const shortLink = await page.inputValue('#shorten-url'); // buvau parases bloga metoda.
    await page.goto(shortLink);
    const webPage = page.url();
    expect(webPage).toBe('https://www.wikipedia.org/');
    
});

test('panda', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
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
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await page.textContent(".c-base__title");
        expect(generatedPassword.length).toEqual(passwordLength)
        
    });
  });







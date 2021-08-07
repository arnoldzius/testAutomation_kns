const { test, expect } = require('@playwright/test');


const mathCommand = [0,1,2,3,4];
mathCommand.forEach(mathCommand => {

    test.only(`Test with math function :${mathCommand}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','0');
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    await page.fill('#number1Field', a);
    await page.fill('#number2Field', b);
    await page.selectOption('#selectOperationDropdown', mathCommand);
    await page.click('#calculateButton');
    const actResult = await page.inputValue('#numberAnswerField');
    if (mathCommand = 0) {expResult = a + b;}
    if (mathCommand = 1) {expResult = a - b;}
    if (mathCommand = 2) {expResult = a * b;}
    if (mathCommand = 3) {expResult = a / b;}
    if (mathCommand = 4) {expResult = "" + a + b;}
    expect(actResult).toEqual(expResult);
    await page.click('#clearButton');
    });
    });

//Prototype dalies istestavimas pavieniais testais
test(`Test with prototype01`, async ({ page }) => {
    
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','0');
    await page.fill('#number1Field','1');
    await page.fill('#number2Field','1');
    await page.selectOption('#selectOperationDropdown','0');
    await page.click('#calculateButton');
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult0 = '2';
    expect(actResult).toEqual(expResult0);
    await page.click('#clearButton');
    
    });
test(`Test with prototype02`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','0');
    await page.fill('#number1Field','1');
    await page.fill('#number2Field','1');
    await page.selectOption('#selectOperationDropdown','1');
    await page.click('#calculateButton');
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult1 = '0';
    expect(actResult).toEqual(expResult1);
    await page.click('#clearButton');
    });
test(`Test with prototype03`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','0');
    await page.fill('#number1Field','1');
    await page.fill('#number2Field','1');
    await page.selectOption('#selectOperationDropdown','2');
    await page.click('#calculateButton');
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult2 = '1';
    expect(actResult).toEqual(expResult2);
    await page.click('#clearButton');
    });
test(`Test with prototype04`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','0');
    await page.fill('#number1Field','1');
    await page.fill('#number2Field','1');await page.selectOption('#selectOperationDropdown','3');
    await page.click('#calculateButton');
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult3 = '1';
    expect(actResult).toEqual(expResult3);
    await page.click('#clearButton');
    });
test(`Test with prototype05`, async ({ page }) => {
   await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','0');
    await page.fill('#number1Field','1');
    await page.fill('#number2Field','1');
    await page.selectOption('#selectOperationDropdown','4');
    await page.click('#calculateButton');
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult4 = '11';
    expect(actResult).toEqual(expResult4);
    await page.click('#clearButton');
    });

    //testai su bug'ais

test.only('Test with forth build function', async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','4');
    await page.fill('#number1Field', '0.89');
    await page.fill('#number2Field', '5');
    await page.selectOption('#selectOperationDropdown','1');
    await page.click('#calculateButton');
    await page.uncheck('#integerSelect'); // fail, because checkbox is allready checked.
    const expResult = '5';
    expect(actResult).toEqual(expResult);
    await page.click('#clearButton');
    });
test.only('Test with ninth build function', async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild','9');
    await page.fill('#number1Field', '0.999');
    await page.fill('#number2Field', '8');
    await page.selectOption('#selectOperationDropdown','3');
    await page.click('#calculateButton');  // fail, because missing number2field and calculateButton
    });

test.only('Test with seventh build function', async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild','7');
        await page.fill('#number1Field', '10');
        await page.fill('#number2Field', '20');
        await page.selectOption('#selectOperationDropdown','2');
        await page.click('#calculateButton');
        await page.click('#calculateButton');
        const actResult = await page.inputValue('#numberAnswerField');
        expect(actResult).toEqual('10');// fail, because when you push twice calculateButton, system repeats action as many times you push it
        await page.click('#clearButton');
    });












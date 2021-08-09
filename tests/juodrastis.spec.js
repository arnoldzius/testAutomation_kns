const { test, expect } = require('@playwright/test');


    const mathOperations = [0,1,2]
    mathOperations.forEach(mathOperations => {
    test(`test for tryouts: ${mathOperations}`, async ({ page }) => {
        
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild','0');
        const a = await page.fill('#number1Field', '1');
        const b = await page.fill('#number2Field', '2');
        await page.click('#selectOperationDropdown');
        await page.selectOption('#selectOperationDropdown',mathOperations);
        await page.click('#calculateButton');
        const actResult = await page.inputValue('#numberAnswerField');
        const expResult = '3';
        expect(actResult).toEqual(expResult);
        await page.click('#clearButton');
        });
    });

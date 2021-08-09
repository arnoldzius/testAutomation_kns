const { test, expect } = require('@playwright/test');
const {calculatorStartPage} = require('../pages/calculatorStartPage');

test.describe('',() =>{
    let page;
    test.beforeAll(async({browser})=>{
        page = await browser.newPage();
        startPage = new calculatorStartPage(page);
        });
test.beforeEach(async() =>{
await startPage.goto();
    });

const mathCommand = [0,1,2,3,4];
mathCommand.forEach(mathCommand => {

    test.only(`Prototype build test:${mathCommand}`, async () => {
    await page.selectOption('#selectBuild', '0');
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    await page.fill('#number1Field', a);
    await page.fill('#number2Field', b);
    await page.selectOption('#selectOperationDropdown',mathCommand);
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

//Prototype product testing, by single tests.
test.only(`Prototype build Add function test`, async () => {
    await page.selectOption('#selectBuild','0');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','0');
    await startPage.initiateClick();
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult0 = '6';
    expect(actResult).toEqual(expResult0);
    await page.click('#clearButton');
    });
test('Prototype build Subtract function test', async () => {
    await page.selectOption('#selectBuild','0');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','1');
    await startPage.initiateClick();
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult1 = '-4';
    expect(actResult).toEqual(expResult1);
    await page.click('#clearButton');
    });
test(`Prototype build Multiply function test`, async () => {
    await page.selectOption('#selectBuild','0');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','2');
    await startPage.initiateClick();
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult2 = '5';
    expect(actResult).toEqual(expResult2);
    await page.click('#clearButton');
    });
test(`Prototype build Divide function test`, async () => {
    await page.selectOption('#selectBuild','0');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','3');
    await startPage.initiateClick();
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult3 = '0';
    expect(actResult).toEqual(expResult3);
    await page.click('#clearButton');
    });
test(`Prototype build Concatanate function test`, async () => {
    await page.selectOption('#selectBuild','0');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','4');
    await startPage.initiateClick();
    await page.check('#integerSelect');
    const actResult = await page.inputValue('#numberAnswerField');
    const expResult4 = '15';
    expect(actResult).toEqual(expResult4);
    await page.click('#clearButton');
    });

    //Single tests with found bug's of calculator

test.only('4th build test_ Already checked checkbox', async () => {
    await page.selectOption('#selectBuild','4');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','1');
    await startPage.initiateClick();
    await page.uncheck('#integerSelect'); // fail, because checkbox is allready checked.
    const expResult = '-4';
    expect(actResult).toEqual(expResult);
    await page.click('#clearButton');
    });
test.only('9th build test_ Missing number2field ', async () => {
    await page.selectOption('#selectBuild','9');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','3');
    await startPage.initiateClick();  // fail, because missing number2field and calculateButton
    });

test.only('7th build test _ No limit for answerButton', async () => {
    await page.selectOption('#selectBuild','7');
    await startPage.initiateFill();
    await page.selectOption('#selectOperationDropdown','2');
    await startPage.initiateClick();
    await startPage.initiateClick();;
    const actResult = await page.inputValue('#numberAnswerField');
    expect(actResult).toEqual('5');// fail, because when you push twice calculateButton, system repeats action as many times you push it
    await page.click('#clearButton');
    });
});











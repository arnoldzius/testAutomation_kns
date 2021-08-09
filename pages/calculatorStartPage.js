exports.calculatorStartPage = class calculatorStartPage {
    constructor(page) {
        this.page = page;}
        async goto() {
            await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
            }
async initiateFill(){
    await this.page.fill('#number1Field','1');
    await this.page.fill('#number2Field','5');
    }
async initiateClick(){
    await this.page.click('#calculateButton');
}

}

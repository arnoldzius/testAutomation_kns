exports.DuckStartPage = class DuckStartPage {
    constructor(page) {
        this.page = page;}

    async goto() {
    await this.page.goto('https://start.duckduckgo.com/');
    }

    async initiateSearch() {
    await this.page.fill('#search_form_input_homepage');
    await this.page.fill("#search_button_homepage");
    }
    
    
}

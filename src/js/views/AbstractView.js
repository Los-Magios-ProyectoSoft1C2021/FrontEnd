export default class {
    title;

    constructor(params) {
        this.params = params;
    }

    setTitle(t) {
        this.title = t;
    }

    get getTitle() {
        return title;
    }

    async getHtml() {
        return "";
    }

    async executeViewScript() { }
}

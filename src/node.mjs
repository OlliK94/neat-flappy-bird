export default class Node {
    static get Type() {
        return {
            "INPUT": 1,
            "HIDDEN": 2,
            "OUTPUT": 3
        };
    }

    constructor(type, layer, innovationNumber) {
        this.type = type;
        this.layer = layer;
        this.innovationNumber = innovationNumber;
    }
}
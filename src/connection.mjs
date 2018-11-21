export default class Connection {
    constructor(inputNode, outputNode, weight, enabled, innovationNumber) {
        this.inputNode = inputNode;
        this.outputNode = outputNode;
        this.weight = weight;
        this.enabled = enabled;
        this.innovationNumber = innovationNumber;
    }
}
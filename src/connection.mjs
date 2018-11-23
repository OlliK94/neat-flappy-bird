export default class Connection {
    constructor(inputNode, outputNode, weight, innovationNumber) {
        this.inputNode = inputNode;
        this.outputNode = outputNode;
        this.weight = weight;
        this.innovationNumber = innovationNumber;

        this.enabled = true;
    }
}
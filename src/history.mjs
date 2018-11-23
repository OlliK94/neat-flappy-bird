export default class History {
    constructor(innovationCount) {
        this.innovationCount = innovationCount;
        this.connectionInnovations = [];
        this.nodeInnovations = [];
    }

    getInnovationNumberForNode(oldConnection) {
        // look if this innovation already occured
        for (let innovation of this.nodeInnovations) {
            if (innovation.connectionNumber === oldConnection.innovationNumber) {
                return innovation.innovationNumber;
            }
        }

        // if it is a new innovation, add it to the history
        let newNodeInnovation = {
            "innovationNumber": ++this.innovationCount,
            "connectionNumber": oldConnection.innovationNumber
        };
        this.nodeInnovations.push(newNodeInnovation);
        return newNodeInnovation.innovationNumber;
    }

    getInnovationNumberForConnection(inputNode, outputNode) {
        // look if this innovation already occured
        for (let innovation of this.connectionInnovations) {
            if (innovation.inputNodeNumber === inputNode.innovationNumber && innovation.outputNodeNumber === outputNode.innovationNumber) {
                return innovation.innovationNumber;
            }
        }

        // if it is a new innovation, add it to the history
        let newConnectionInnovation = {
            "innovationNumber": ++this.innovationCount,
            "inputNodeNumber": inputNode.innovationNumber,
            "outputNodeNumber": outputNode.innovationNumber
        };
        this.connectionInnovations.push(newConnectionInnovation);
        return newConnectionInnovation.innovationNumber;
    }
}
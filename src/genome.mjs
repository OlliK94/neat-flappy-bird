import Connection from './connection.mjs';
import Node from './node.mjs';

export default class Genome {
    constructor(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs;

        this.layers = 2;

        this.connections = [];
        this.nodes = [];
    }

    addConnection() {
        // get unconnected pairs
        let pairs = this._getUnconnectedNodePairs();
        // make sure the network is not already fully connected
        if (pairs.length > 0) {
            // choose a random pair
            let index = Math.floor(pairs.length * Math.random());
            let pair = pairs[index];
            // generate a random weight between -1 and 1
            let weight = 2 * Math.random() - 1; // exlusive 1
            weight = weight >= 0 ? 1 - weight : weight; // this should include 1 (and exclude 0 as a nice side effect)
            // connect the chosen pair
            if (pair[0].layer < pair[1].layer) {
                this.connections.push(new Connection(pair[0], pair[1], weight));
            }
            else {
                this.connections.push(new Connection(pair[1], pair[0], weight));
            }
        }
    }

    addNode() {
        // do nothing if there are no connections
        if (this.connections.length === 0) return;

        // choose a random connection
        let index = Math.floor(this.connections.length * Math.random());
        let oldConnection = this.connections[index];

        // remove the chosen connection
        this.connections.splice(index, 1);

        // get the participating nodes
        let predecessorNode = oldConnection.inputNode;
        let successorNode = oldConnection.outputNode;

        // get the layer for the new node
        let distance = successorNode.layer - predecessorNode.layer;
        if (distance === 1) {
            this._addNewLayerAfter(predecessorNode.layer);
        }
        let layer = predecessorNode.layer + 1;

        // create the new node
        let newNode = new Node(Node.Type.HIDDEN, layer);
        this.nodes.push(newNode);

        // create a new connection between the predecessor and the new node and give it the weight 1
        let predecessorConnection = new Connection(predecessorNode, newNode, 1);
        this.connections.push(predecessorConnection);

        // create a new connection between the successor and the new node and give it the weight of the old connection
        let successorConnection = new Connection(newNode, successorNode, oldConnection.weight);
        this.connections.push(successorConnection);
    }

    _getUnconnectedNodePairs() {
        let unconnectedPairs = [];

        for (let i = 0; i < this.nodes.length - 1; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                if (this.nodes[i].layer !== this.nodes[j].layer && !this._connectionExists(this.nodes[i], this.nodes[j])) {
                    unconnectedPairs.push([this.nodes[i], this.nodes[j]]);
                }
            }
        }

        return unconnectedPairs;
    }

    _connectionExists(node1, node2) {
        for (let connection of this.connections) {
            if (connection.inputNode === node1 && connection.outputNode === node2) {
                return true;
            }
            else if (connection.inputNode === node2 && connection.outputNode === node1) {
                return true;
            }
        }

        return false;
    }

    _addNewLayerAfter(layer) {
        this.layers++;

        // increase the layer of all nodes with a larger layer than the given
        for (let node of this.nodes) {
            if (node.layer > layer) {
                node.layer++;
            }
        }
    }
}
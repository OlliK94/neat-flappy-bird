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
            let pair = pairs[Math.floor(pairs.length * Math.random())];
            // generate a random weight between -1 and 1
            let weight = Math.floor(3 * Math.random()) - 1;
            // connect the chosen pair
            if (pair[0].layer < pair[1].layer) {
                this.connections.push(new Connection(pair[0], pair[1], weight));
            }
            else {
                this.connections.push(new Connection(pair[1], pair[0], weight));
            }
        }
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
}
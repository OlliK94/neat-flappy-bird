import {expect} from 'chai';
import Genome from '../src/genome.mjs';
import Connection from '../src/connection.mjs';
import Node from '../src/node.mjs';
import History from '../src/history.mjs';

describe('Genome', function() {
    it('should start with two layers', function() {
        let history = new History(2);
        let genome = new Genome(1, 1, history);
        expect(genome.layers).to.equal(2);
    });

    it('should start with the correct number of input and output nodes', function() {
        let history = new History(2);
        let genome = new Genome(1, 1, history);
        expect(genome.nodes).to.have.lengthOf(2);
        expect(genome.nodes[0].type).to.equal(Node.Type.INPUT);
        expect(genome.nodes[1].type).to.equal(Node.Type.OUTPUT);
    });

    describe('#_connectionExists()', function() {
        it('should return true if node1 is the inputNode and node2 is the outputNode', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            expect(genome._connectionExists(genome.nodes[0], genome.nodes[1])).to.equal(true);
        });

        it('should return true if node1 is the outputNode and node2 is the inputNode', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            expect(genome._connectionExists(genome.nodes[1], genome.nodes[0])).to.equal(true);
        });

        it('should return false if no connection exists between node1 and node2', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            let connection1 = new Connection(genome.nodes[0], genome.nodes[1]);
            let connection2 = new Connection(genome.nodes[1], genome.nodes[2]);
            genome.connections.push(connection1);
            genome.connections.push(connection2);
            expect(genome._connectionExists(genome.nodes[0], genome.nodes[2])).to.equal(false);
        });

        it('should return false if no connection exists at all', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            expect(genome._connectionExists(genome.nodes[0], genome.nodes[1])).to.equal(false);
        });
    });

    describe('#_getUnconnectedNodePairs()', function() {
        it('should return the correct number of unconnected pairs', function() {
            let genome = getFullyUnconnectedGenomeWithFourNodes();
            expect(genome._getUnconnectedNodePairs()).to.have.lengthOf(5);
        });

        it('should return an empty array if the genome is fully connected', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            expect(genome._getUnconnectedNodePairs()).to.be.an('array').that.is.empty;
        });
    });

    describe('#addConnection()', function() {
        it('should add a new connection if the genome is not fully connected', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            genome.addConnection();
            expect(genome.connections).to.have.lengthOf(1);
        });

        it('should not add a new connection if the genome is already fully connected', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            genome.addConnection();
            expect(genome.connections).to.have.lengthOf(1);
        });
    });

    describe('#_addNewLayerAfter()', function() {
        it('should increase the number of layers of the genome by 1', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            genome._addNewLayerAfter(1);
            expect(genome.layers).to.equal(4);
        });

        it('should increase the layer of succeeding nodes by 1', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            genome._addNewLayerAfter(1);
            expect(genome.nodes[1].layer).to.equal(3);
            expect(genome.nodes[2].layer).to.equal(4);
        });

        it('should not increase the layer of preceding nodes', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            genome._addNewLayerAfter(2);
            expect(genome.nodes[0].layer).to.equal(1);
            expect(genome.nodes[1].layer).to.equal(2);
        });
    });

    describe('#addNode()', function() {
        it('should add a node to the genome', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            genome.addNode();
            expect(genome.nodes).to.have.lengthOf(3);
        });

        it('should correctly adjust the layer of the nodes', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            genome.addNode();
            expect(genome.nodes[0].layer).to.equal(1);
            expect(genome.nodes[1].layer).to.equal(3);
            expect(genome.nodes[2].layer).to.equal(2);
        });

        it('should increase the number of connections by 2', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            genome.addNode();
            expect(genome.connections).to.have.lengthOf(3);
        });

        it('should disable the old connection', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            genome.addNode();
            expect(genome.connections[0].enabled).to.equal(false);
        });

        it('should set the weight of the new incoming connection to 1', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            genome.addNode();
            let incomingConnection;
            for (let connection of genome.connections) {
                if (connection.inputNode === genome.nodes[0]) {
                    incomingConnection = connection;
                    break;
                }
            }
            expect(incomingConnection.weight).to.equal(1);
        });

        it('should set the weight of the new outgoing connection to the weight of the old connection', function() {
            let genome = getFullyConnectedGenomeWithTwoNodes();
            genome.connections[0].weight = 0.123;
            genome.addNode();
            let outgoingConnection;
            for (let connection of genome.connections) {
                if (connection.outputNode === genome.nodes[1]) {
                    outgoingConnection = connection;
                    break;
                }
            }
            expect(outgoingConnection.weight).to.equal(0.123);
        });

        it('should not add a node if there exist no connections', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            genome.addNode();
            expect(genome.nodes).to.have.lengthOf(3);
        });

        it('should not add connections if there exist no connections', function() {
            let genome = getFullyUnconnectedGenomeWithThreeNodes();
            genome.addNode();
            expect(genome.connections).to.have.lengthOf(0);
        });
    });
});

function getFullyConnectedGenomeWithTwoNodes() {
    let node1 = new Node(Node.Type.INPUT, 1, 1);
    let node2 = new Node(Node.Type.OUTPUT, 2, 2);
    let connection = new Connection(node1, node2, 1, 3);
    let history = new History(0);
    let genome = new Genome(1, 1, history);
    genome.layers = 2;
    genome.nodes = [];
    genome.connection = [];
    genome.nodes.push(node1);
    genome.nodes.push(node2);
    genome.connections.push(connection);
    return genome;
}

function getFullyUnconnectedGenomeWithThreeNodes() {
    let node1 = new Node(Node.Type.INPUT, 1, 1);
    let node2 = new Node(Node.Type.HIDDEN, 2, 2);
    let node3 = new Node(Node.Type.OUTPUT, 3, 3);
    let history = new History(0);
    let genome = new Genome(1, 1, history);
    genome.layers = 3;
    genome.nodes = [];
    genome.connection = [];
    genome.nodes.push(node1);
    genome.nodes.push(node2);
    genome.nodes.push(node3);
    return genome;
}

function getFullyUnconnectedGenomeWithFourNodes() {
    let node1 = new Node(Node.Type.INPUT, 1, 1);
    let node2 = new Node(Node.Type.HIDDEN, 2, 2);
    let node3 = new Node(Node.Type.HIDDEN, 2, 3);
    let node4 = new Node(Node.Type.OUTPUT, 3, 4);
    let history = new History(0);
    let genome = new Genome(1, 1, history);
    genome.layers = 3;
    genome.nodes = [];
    genome.connection = [];
    genome.nodes.push(node1);
    genome.nodes.push(node2);
    genome.nodes.push(node3);
    genome.nodes.push(node4);
    return genome;
}
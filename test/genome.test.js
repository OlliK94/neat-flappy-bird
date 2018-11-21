import {expect} from 'chai';
import Genome from '../src/genome.mjs';
import Connection from '../src/connection.mjs';
import Node from '../src/node.mjs';

describe('Genome', function() {
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
});

function getFullyConnectedGenomeWithTwoNodes() {
    let node1 = new Node(Node.Type.INPUT, 1, 1);
    let node2 = new Node(Node.Type.OUTPUT, 2, 2);
    let connection = new Connection(node1, node2);
    let genome = new Genome(1, 1);
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
    let genome = new Genome(1, 1);
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
    let genome = new Genome(1, 1);
    genome.layers = 3;
    genome.nodes = [];
    genome.connection = [];
    genome.nodes.push(node1);
    genome.nodes.push(node2);
    genome.nodes.push(node3);
    genome.nodes.push(node4);
    return genome;
}
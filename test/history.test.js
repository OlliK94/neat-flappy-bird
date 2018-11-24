import {expect} from 'chai';
import History from '../src/history.mjs';
import Connection from '../src/connection.mjs';
import Node from '../src/node.mjs';

describe('History', function() {
    it('should start with an innovation count of the sum of the number of inputs and outputs', function() {
        let history = new History(3, 2);
        expect(history.innovationCount).to.equal(5);
    })

    describe('#getInnovationNumberForNode()', function() {
        it('should increase the innovation count by 1 if the innovation is new', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            let connection = new Connection(input, output, 1, 3);
            history.getInnovationNumberForNode(connection);
            expect(history.innovationCount).to.equal(1);
        });

        it('should add a new nodeInnovation to the history if the innovation is new', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            let connection = new Connection(input, output, 1, 3);
            history.getInnovationNumberForNode(connection);
            expect(history.nodeInnovations).to.have.lengthOf(1);
        });

        it('should return the correct innovationNumber for a new innovation', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            let connection = new Connection(input, output, 1, 3);
            let innovationNumber = history.getInnovationNumberForNode(connection);
            expect(innovationNumber).to.equal(1);
        });

        it('should not increase the innovation count if the innovation already exists', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            let connection = new Connection(input, output, 1, 3);
            history.getInnovationNumberForNode(connection);
            history.getInnovationNumberForNode(connection);
            expect(history.innovationCount).to.equal(1);
        });

        it('should not add a new nodeInnovation to the history if the innovation already exists', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            let connection = new Connection(input, output, 1, 3);
            history.getInnovationNumberForNode(connection);
            history.getInnovationNumberForNode(connection);
            expect(history.nodeInnovations).to.have.lengthOf(1);
        });

        it('should return the correct innovationNumber for an existing innovation', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            let connection = new Connection(input, output, 1, 3);
            innovationNumber = history.getInnovationNumberForNode(connection);
            let innovationNumber = history.getInnovationNumberForNode(connection);
            expect(innovationNumber).to.equal(1);
        });
    });

    describe('#getInnovationNumberForConnection()', function() {
        it('should increase the innovation count by 1 if the innovation is new', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            history.getInnovationNumberForConnection(input, output);
            expect(history.innovationCount).to.equal(1);
        });

        it('should add a new connectionInnovation to the history if the innovation is new', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            history.getInnovationNumberForConnection(input, output);
            expect(history.connectionInnovations).to.have.lengthOf(1);
        });

        it('should return the correct innovationNumber for a new innovation', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            let innovationNumber = history.getInnovationNumberForConnection(input, output);
            expect(innovationNumber).to.equal(1);
        });

        it('should not increase the innovation count if the innovation already exists', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            history.getInnovationNumberForConnection(input, output);
            history.getInnovationNumberForConnection(input, output);
            expect(history.innovationCount).to.equal(1);
        });

        it('should not add a new connectionInnovation to the history if the innovation already exists', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            history.getInnovationNumberForConnection(input, output);
            history.getInnovationNumberForConnection(input, output);
            expect(history.connectionInnovations).to.have.lengthOf(1);
        });

        it('should return the correct innovationNumber for an existing innovation', function() {
            let history = new History(0, 0);
            let input = new Node(Node.Type.INPUT, 1, 1);
            let output = new Node(Node.Type.OUTPUT, 2, 2);
            innovationNumber = history.getInnovationNumberForConnection(input, output);
            let innovationNumber = history.getInnovationNumberForConnection(input, output);
            expect(innovationNumber).to.equal(1);
        });
    });
});
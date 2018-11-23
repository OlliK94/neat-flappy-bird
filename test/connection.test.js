import {expect} from 'chai';
import Connection from '../src/connection.mjs';
import Node from '../src/node.mjs';

describe('Connection', function() {
    it('should start enabled', function() {
        let input = new Node(Node.Type.INPUT, 1, 1);
        let output = new Node(Node.Type.OUTPUT, 2, 2);
        let connection = new Connection(input, output, 1, 3);
        expect(connection.enabled).to.equal(true);
    });
});
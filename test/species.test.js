import {expect} from 'chai';
import Species from '../src/species.mjs';
import History from '../src/history.mjs';
import Genome from '../src/genome.mjs';

const compatibilityParameterSet = {
    "excessCoefficient": 1.0,
    "disjointCoefficient": 1.0,
    "weightCoefficient": 0.4,
    "compatibilityThreshold": 0.3
};

const excessTestParameterSet = {
    "excessCoefficient": 1.0,
    "disjointCoefficient": 0.0,
    "weightCoefficient": 0.0,
    "compatibilityThreshold": 0.3
};

const disjointTestParameterSet = {
    "excessCoefficient": 0.0,
    "disjointCoefficient": 1.0,
    "weightCoefficient": 0.0,
    "compatibilityThreshold": 0.3
};

const weightTestParameterSet = {
    "excessCoefficient": 0.0,
    "disjointCoefficient": 0.0,
    "weightCoefficient": 0.4,
    "compatibilityThreshold": 0.3
};

describe('Species', function() {
    it('should start with the representative in the genome list', function() {
        let history = new History(3, 2);
        let genome = new Genome(3, 2, history);
        let species = new Species(genome, compatibilityParameterSet);
        expect(species.genomes).to.have.lengthOf(1);
        expect(species.genomes[0]).to.equal(species.representative);
    });

    describe('#add()', function() {
        it('should add the given genome to the list of genomes', function() {
            let history = new History(3, 2);
            let genome1 = new Genome(3, 2, history);
            let genome2 = new Genome(3, 2, history);
            let species = new Species(genome1, compatibilityParameterSet);
            species.add(genome2);
            expect(species.genomes).to.have.lengthOf(2);
        });
    });

    describe('#isCompatible()', function() {
        it('should return true if the genome does not differ from the representative', function() {
            let history = new History(3, 2);
            let genome1 = new Genome(3, 2, history);
            let species = new Species(genome1, compatibilityParameterSet);
            expect(species.isCompatible(genome1)).to.equal(true);
        });

        it('should return false if the genome has many excess genes', function() {
            let history = new History(3, 2);
            let genome1 = new Genome(3, 2, history);
            let genome2 = new Genome(3, 2, history);
            for (let i = 0; i < 3; i++) {
                genome2.addNode();
            }
            let species = new Species(genome1, excessTestParameterSet);
            expect(species.isCompatible(genome2)).to.equal(false);
        });

        it('should return false if the genome has many disjoint genes', function() {
            let history = new History(3, 2);
            let genome1 = new Genome(3, 2, history);
            let genome2 = new Genome(3, 2, history);
            for (let i = 0; i < 4; i++) {
                genome2.addNode();
            }
            genome1.connections.push(genome2.connections[genome2.connections.length-1]);
            let species = new Species(genome1, disjointTestParameterSet);
            expect(species.isCompatible(genome2)).to.equal(false);
        });

        it('should return false if the genome has a big average weight difference', function() {
            let history = new History(3, 2);
            let genome1 = new Genome(3, 2, history);
            let genome2 = new Genome(3, 2, history);
            for (let connection of genome2.connections) {
                connection.weight = 1000;
            }
            let species = new Species(genome1, weightTestParameterSet);
            expect(species.isCompatible(genome2)).to.equal(false);
        });
    });
});
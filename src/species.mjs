export default class Species {
    constructor(representative, compatibilityParamterSet) {
        this.representative = representative;
        this.compatibilityParamterSet = compatibilityParamterSet;

        this.genomes = [representative];
    }

    add(genome) {
        this.genomes.push(genome);
    }

    isCompatible(genome) {
        let c1 = this.compatibilityParamterSet.excessCoefficient;
        let c2 = this.compatibilityParamterSet.disjointCoefficient;
        let c3 = this.compatibilityParamterSet.weightCoefficient;
        let dt = this.compatibilityParamterSet.compatibilityThreshold;
        let n = Math.max(this.representative.connections.length, genome.connections.length);

        this.representative.connections.sort(geneCompareFunction);
        genome.connections.sort(geneCompareFunction);
        let matchingCount = 0;
        let weightDifferencesSum = 0;
        let excess = 0;
        let disjoint = 0;
        let i = 0;
        let j = 0;
        while (i < this.representative.connections.length || j < genome.connections.length) {
            if (i < this.representative.connections.length && j < genome.connections.length) {
                if (this.representative.connections[i].innovationNumber === genome.connections[j].innovationNumber) {
                    matchingCount++;
                    weightDifferencesSum += Math.abs(this.representative.connections[i].weight - genome.connections[j].weight);
                    i++;
                    j++;
                }
                else {
                    disjoint++;
                    if (this.representative.connections[i].innovationNumber < genome.connections[j].innovationNumber) {
                        i++;
                    }
                    else { // this.representative.connections[i].innovationNumber > genome.connections[j].innovationNumber
                        j++;
                    }
                }
            }
            else {
                excess++;
                if (i === this.representative.connections.length) {
                    j++;
                }
                else { // j === genome.connections.length
                    i++;
                }
            }
        }
        if (matchingCount === 0) return false;
        let avgWeightDiff = weightDifferencesSum / matchingCount;

        let d = (c1*excess + c2*disjoint)/n + c3*avgWeightDiff;

        if (d <= dt) return true;
        return false;
    }
}

function geneCompareFunction(gene1, gene2) {
    return gene1.innovationNumber - gene2.innovationNumber;
}
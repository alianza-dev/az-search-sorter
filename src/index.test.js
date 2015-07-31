import search from './index';

describe(`az-search-sorter`, () => {
  let data;
  beforeEach(() => {
    data = getData();
  });

  it(`should sort things that are awesome...`, () => {
    const beregond = data[36];
    const fredegar = data[35];
    const treebeard = data[39];
    const results = search('ber', data, {propToMatch: 'name'});

    expect(results).to.have.length(3);
    expect(results[0]).to.equal(beregond);
    expect(results[1]).to.equal(fredegar);
    expect(results[2]).to.equal(treebeard);
  });

  it(`should return an empty array if nothing matches`, () => {
    const results = search('something really crazy', data, {propToMatch: 'name'});
    expect(results).to.be.empty;
  });

  it(`should return all the objects if nothing matches but keepNonMatching is set to true`, () => {
    const results = search('something really crazy', data, {propToMatch: 'name', keepNonMatching: true});
    expect(results).to.eql(data);
  });

  it(`should not break when you just invoke with nothing`, () => {
    expect(() => search()).to.not.throw();
  });

  it(`should allow you to pass an array of strings`, () => {
    const results = search('hi', ['hello', 'hi', 'Hannah Istanbul', 'secret and hidden', 'this', 'Heidi', 'hurt']);
    expect(results).to.eql(['hi', 'secret and hidden', 'this', 'Hannah Istanbul', 'Heidi']);
  });

  it(`should work ok with a single character search`, () => {
    const results = search('h', ['sup', 'this', 'h']);
    expect(results).to.eql(['h', 'this']);
  });

  describe(`getAcronymIndexes`, () => {
    it(`should give the indexes of a search term that's an acronym`, () => {
      const results = search.getAcronymIndexes('Choose the Right', 'CTR');
      expect(results).to.eql([0, 7, 11]);
    });

    it(`should give null if it's not an acronym`, () => {
      const results = search.getAcronymIndexes('Choose the Right', 'CTW');
      expect(results).to.equal(null);
    });

    it(`should handle calling it with nothing`, () => {
      expect(() => search.getAcronymIndexes()).to.not.throw();
    });
  });
});

function getData() {
  return [
    {name: 'Gandalf', value: 'GANDALF', group: 'first'},
    {name: 'Aragorn', value: 'ARAGORN', group: 'first'},
    {name: 'Gollum', value: 'GOLLUM', group: 'first'},
    {name: 'Frodo Baggins', value: 'FRODO BAGGINS', group: 'first'},
    {name: 'Legolas', value: 'LEGOLAS', group: 'first'},
    {name: 'Sauron', value: 'SAURON', group: 'first'},
    {name: 'Bilbo Baggins', value: 'BILBO BAGGINS', group: 'first'},
    {name: 'Arwen', value: 'ARWEN', group: 'first'},
    {name: 'Gimli', value: 'GIMLI', group: 'first'},
    {name: 'Samwise Gamgee', value: 'SAMWISE GAMGEE', group: 'first'},
    {name: 'Boromir', value: 'BOROMIR', group: 'first'},
    {name: 'Galadriel', value: 'GALADRIEL', group: 'first'},
    {name: 'Peregrin Took', value: 'PEREGRIN TOOK', group: 'first'},
    {name: 'Saruman', value: 'SARUMAN', group: 'first'},
    {name: 'Nazgûl', value: 'NAZGÛL', group: 'first'},
    {name: 'Éowyn', value: 'ÉOWYN', group: 'first'},
    {name: 'Balrog', value: 'BALROG', group: 'first'},
    {name: 'Elrond', value: 'ELROND', group: 'second'},
    {name: 'Meriadoc Brandybuck', value: 'MERIADOC BRANDYBUCK', group: 'second'},
    {name: 'Witch-king of Angmar', value: 'WITCH-KING OF ANGMAR', group: 'second'},
    {name: 'Faramir', value: 'FARAMIR', group: 'second'},
    {name: 'Éomer', value: 'ÉOMER', group: 'second'},
    {name: 'Théoden', value: 'THÉODEN', group: 'second'},
    {name: 'Glorfindel', value: 'GLORFINDEL', group: 'second'},
    {name: 'Shelob', value: 'SHELOB', group: 'second'},
    {name: 'Gríma Wormtongue', value: 'GRÍMA WORMTONGUE', group: 'second'},
    {name: 'Celeborn', value: 'CELEBORN', group: 'third'},
    {name: 'Harad', value: 'HARAD', group: 'third'},
    {name: 'Radagast', value: 'RADAGAST', group: 'third'},
    {name: 'Denethor II', value: 'DENETHOR II', group: 'third'},
    {name: 'Elendil', value: 'ELENDIL', group: 'third'},
    {name: 'Anárion', value: 'ANÁRION', group: 'third'},
    {name: 'Forlong the Fat', value: 'FORLONG THE FAT', group: 'third'},
    {name: 'Eldarion', value: 'ELDARION', group: 'third'},
    {name: 'Gamling', value: 'GAMLING', group: 'third'},
    {name: 'Fredegar Bolger', value: 'FREDEGAR BOLGER', group: 'third'},
    {name: 'Beregond and Bergil', value: 'BEREGOND AND BERGIL', group: 'third'},
    {name: 'Old Man Willow', value: 'OLD MAN WILLOW', group: 'third'},
    {name: 'Corsairs of Umbar', value: 'CORSAIRS OF UMBAR', group: 'third'},
    {name: 'Treebeard', value: 'TREEBEARD', group: 'third'},
    {name: 'Harry Goatleaf', value: 'HARRY GOATLEAF', group: 'third'}
  ];
}

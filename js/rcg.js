/* Random Chord Generator */

var RandomChordGenerator = function() {

    /*
     * Variables accessible
     * in the class
     */

    var defaultChordQualities = [{
        "label": "",
        "id": "major",
        "fullName": "Major",
    }, {
        "label": "m",
        "id": "minor",
        "fullName": "Minor",
    }, {
        "label": "7",
        "id": "7",
        "fullName": "Dominant 7",
    }, {
        "label": "maj7",
        "id": "maj7",
        "fullName": "Major 7",
    }, {
        "label": "m7",
        "id": "m7",
        "fullName": "Minor 7",
    }];

    var defaultChordRootNotes = [{

        // A
        "label": "Ab",
        "accidental": "flat",
        "fullName": "A Flat",
    }, {
        "label": "A",
        "accidental": "natural",
        "fullName": "A Natural",
    }, {
        "label": "A#",
        "accidental": "Sharp",
        "fullName": "A Sharp",
    }, {

        // B
        "label": "Ab",
        "accidental": "flat",
        "fullName": "A Flat",
    }, {
        "label": "A",
        "accidental": "natural",
        "fullName": "A Natural",
    }, {
        "label": "A#",
        "accidental": "Sharp",
        "fullName": "A Sharp",


        // B
        "label": "Bb",
        "accidental": "flat",
        "fullName": "B Flat",
    }, {
        "label": "B",
        "accidental": "natural",
        "fullName": "B Natural",
    }, {


        // C
        "label": "C",
        "accidental": "natural",
        "fullName": "C Natural",
    }, {
        "label": "C#",
        "accidental": "Sharp",
        "fullName": "C Sharp",


        // D
        "label": "Db",
        "accidental": "flat",
        "fullName": "D Flat",
    }, {
        "label": "D",
        "accidental": "natural",
        "fullName": "D Natural",
    }, {
        "label": "D#",
        "accidental": "Sharp",
        "fullName": "D Sharp",


        // E
        "label": "Eb",
        "accidental": "flat",
        "fullName": "E Flat",
    }, {
        "label": "E",
        "accidental": "natural",
        "fullName": "E Natural",
    }, {


        // F
        "label": "F",
        "accidental": "natural",
        "fullName": "F Natural",
    }, {
        "label": "F#",
        "accidental": "Sharp",
        "fullName": "F Sharp",


        // G
        "label": "Gb",
        "accidental": "flat",
        "fullName": "G Flat",
    }, {
        "label": "G",
        "accidental": "natural",
        "fullName": "G Natural",
    }, {
        "label": "G#",
        "accidental": "Sharp",
        "fullName": "G Sharp",
    }];

    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;

    /*
     * Constructor
     */
    this.construct = function(){
    };

    /* Private function to return all possible chord qualities. */
    var getChordQualities = function() {

        var storedChordQualities = {};
        storedChordQualities = JSON.parse(localStorage.getItem('chordQualities'));

        // Load store if exists, otherwise load defaults.
        chordQualities = {};
        if (getPropertyCount(storedChordQualities) > 0) {
            chordQualities = storedChordQualities;
        }
        else {
            chordQualities = defaultChordQualities;

            // If using defaults, set the storage to the defaults.
            localStorage.setItem('chordQualities', JSON.stringify(chordQualities));
        }

        // TODO: filter chordQualities by 'allowed qualities' from settings form.

        return chordQualities;
    }


    /* Private function to return all possible chord root notes. */
    var getChordRootNotes = function() {

        var storedChordRootNotes = {};
        storedChordRootNotes = JSON.parse(localStorage.getItem('chordRootNotes'));

        // Load store if exists, otherwise load defaults.
        chordRootNotes = {};
        if (getPropertyCount(storedChordRootNotes) > 0) {
            chordRootNotes = storedChordRootNotes;
        }
        else {
            chordRootNotes = defaultChordRootNotes;

            // If using defaults, set the storage to the defaults.
            localStorage.setItem('chordRootNotes', JSON.stringify(chordRootNotes));
        }
        // TODO: filter chordRootNotes by 'allowed qualities' from settings form.
        return chordRootNotes;
    }

    /* Public function to get a random chord */
    this.getRandomChord = function() {
        rootNotes = getChordRootNotes();
        qualities = getChordQualities();

        randomRootNote = rootNotes[Math.floor(Math.random() * rootNotes.length)]['label'];
        randomQuality = qualities[Math.floor(Math.random() * qualities.length)]['label'];
        randomChord = {
            'label': randomRootNote + randomQuality,
            'value': '',
        };

        return randomChord;
    }

    /* Public function to get a random circle. */
    this.getRandomCircle = function(numSlices) {
        randomCircleData = {};
        randomCircleData['chordData'] = [];
        randomCircleData['homeChord'] = {};
        for (i = 0; i < numSlices; i++) {
            randomCircleData['chordData'][i] = this.getRandomChord();
        }
        randomCircleData['homeChord']['label'] = this.getRandomChord()['label'];
        randomCircleData['homeChord']['value'] = "";

        return randomCircleData;
    }
}
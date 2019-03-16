/* Random Chord Generator */

/* Function to return all possible chord qualities. */
function getChordQualities() {
    var chordQualities = {}
    chordQualities = [{
        "label" : "",
        "id" : "major",
        "fullName": "Major",
    }, {
        "label": "m",
        "id" : "minor",
        "fullName": "Minor",
    }, {
        "label": "7",
        "id" : "7",
        "fullName": "Dominant 7",
    }, {
        "label": "maj7",
        "id" : "maj7",
        "fullName": "Major 7",
    }, {
        "label": "m7",
        "id" : "m7",
        "fullName": "Minor 7",
    }];

    return chordQualities;
}

/* Function to return all possible chord root notes. */
function getChordRootNotes() {
    var chordRootNotes = {}
    chordRootNotes = [{

        // A
        "label": "Ab",
        "accidental" : "flat",
        "fullName": "A Flat",
    }, {
        "label": "A",
        "accidental" : "natural",
        "fullName": "A Natural",
    }, {
        "label": "A#",
        "accidental" : "Sharp",
        "fullName": "A Sharp",
    }, {

        // B
        "label": "Ab",
        "accidental" : "flat",
        "fullName": "A Flat",
    }, {
        "label": "A",
        "accidental" : "natural",
        "fullName": "A Natural",
    }, {
        "label": "A#",
        "accidental" : "Sharp",
        "fullName": "A Sharp",


        // B
        "label": "Bb",
        "accidental" : "flat",
        "fullName": "B Flat",
    }, {
        "label": "B",
        "accidental" : "natural",
        "fullName": "B Natural",
    }, {


        // C
        "label": "C",
        "accidental" : "natural",
        "fullName": "C Natural",
    }, {
        "label": "C#",
        "accidental" : "Sharp",
        "fullName": "C Sharp",


        // D
        "label": "Db",
        "accidental" : "flat",
        "fullName": "D Flat",
    }, {
        "label": "D",
        "accidental" : "natural",
        "fullName": "D Natural",
    }, {
        "label": "D#",
        "accidental" : "Sharp",
        "fullName": "D Sharp",


        // E
        "label": "Eb",
        "accidental" : "flat",
        "fullName": "E Flat",
    }, {
        "label": "E",
        "accidental" : "natural",
        "fullName": "E Natural",
    }, {


        // F
        "label": "F",
        "accidental" : "natural",
        "fullName": "F Natural",
    }, {
        "label": "F#",
        "accidental" : "Sharp",
        "fullName": "F Sharp",


        // G
        "label": "Gb",
        "accidental" : "flat",
        "fullName": "G Flat",
    }, {
        "label": "G",
        "accidental" : "natural",
        "fullName": "G Natural",
    }, {
        "label": "G#",
        "accidental" : "Sharp",
        "fullName": "G Sharp",
    }];

    return chordRootNotes;
}


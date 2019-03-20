/* Random Chord Generator */

const RandomChordGenerator = function() {

    /*
     * Variables accessible
     * in the class
     */
    const settingShortcuts = [{

        // rootNote Shortcuts.
        "type" : "rootNote",
        "label" : "Naturals",
        "associated-class" : "natural",
    }, {
        "type" : "rootNote",
        "label" : "Flats",
        "associated-class" : "flat",
    }, {
        "type" : "rootNote",
        "label" : "Sharps",
        "associated-class" : "sharp",
    }, {

        // chordQuality Shortcuts.
        "type" : "chordQuality",
        "label" : "Major",
        "associated-class" : "major",
    }, {
        "type" : "chordQuality",
        "label" : "Minor",
        "associated-class" : "minor",
    }, {
        "type" : "chordQuality",
        "label" : "Suspended",
        "associated-class" : "sus",
    }, {
        "type" : "chordQuality",
        "label" : "7",
        "associated-class" : "7",
    }];

    const allChordQualities = [{
        "label": "",
        "quality": "major",
        "fullName": "Major",
    }, {
        "label": "m",
        "quality": "minor",
        "fullName": "Minor",
    }, {
        "label": "7",
        "quality": "7",
        "fullName": "Dominant 7",
    }, {
        "label": "maj7",
        "quality": "maj7",
        "fullName": "Major 7",
    }, {
        "label": "m7",
        "quality": "m7",
        "fullName": "Minor 7",
    }];

    const allChordRootNotes = [{

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
        "accidental": "sharp",
        "fullName": "A Sharp",
    }, {


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
        "accidental": "sharp",
        "fullName": "C Sharp",
    }, {

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
        "accidental": "sharp",
        "fullName": "D Sharp",
    }, {

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
        "accidental": "sharp",
        "fullName": "F Sharp",

    }, {
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
        "accidental": "sharp",
        "fullName": "G Sharp",
    }];

    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    const root = this;

    /*
     * Constructor
     */
    this.construct = function(){
    };

    /* Private function to return all possible chord qualities. */
    const getChordQualities = function() {

        var storedChordQualities = {};
        storedChordQualities = JSON.parse(localStorage.getItem('chordQualities'));

        // Load store if exists, otherwise load defaults.
        chordQualities = {};
        if (getPropertyCount(storedChordQualities) > 0) {
            chordQualities = storedChordQualities;
        }
        else {
            chordQualities = allChordQualities;

            // If using defaults, set the storage to the defaults.
            localStorage.setItem('chordQualities', JSON.stringify(chordQualities));
        }

        // TODO: filter chordQualities by 'allowed qualities' from settings form.

        return chordQualities;
    }


    /* Private function to return all possible chord root notes. */
    const getChordRootNotes = function() {

        var storedChordRootNotes = {};
        storedChordRootNotes = JSON.parse(localStorage.getItem('chordRootNotes'));

        // Load store if exists, otherwise load defaults.
        chordRootNotes = {};
        if (getPropertyCount(storedChordRootNotes) > 0) {
            chordRootNotes = storedChordRootNotes;
        }
        else {
            chordRootNotes = allChordRootNotes;

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

    /* Public function to build settings form */
    this.getSettingsForm = function() {
        settingsFormContainer = $('<div></div>')
            .addClass("");

        //Build source data object.
        var sourceData = {};
        sourceData['rootNotes'] = {};
        sourceData['rootNotes']['type'] = 'root-note';
        sourceData['rootNotes']['header'] = 'Chord Root Notes';
        sourceData['rootNotes']['data'] = allChordRootNotes;

        sourceData['chordQualities'] = {};
        sourceData['chordQualities']['type'] = 'chord-quality';
        sourceData['chordQualities']['header'] = 'Chord Qualities';
        sourceData['chordQualities']['data'] = allChordQualities;

        // Build form elements
        $.each(sourceData, function (dataSetKey, dataSet) {
            // Build and append header.
            header = $('<h2></h2>')
                .addClass("settings-form-header")
                .html(dataSet['header']);
            settingsFormContainer.append(header);

            $.each(dataSet['data'], function (key, option) {
                // Create input container.
                inputContainer = $('<div></div>');

                label = this['label'];
                fullName = this['fullName'];

                // Add specific attributes.
                accidental = "";
                quality = "";
                if (dataSetKey == 'rootNotes') {
                    accidental = this['accidental'];
                    checkboxLabel = label;
                }
                // Chord Quality specific attributes.
                else if (dataSetKey == 'chordQualities') {
                    quality = this['quality'];
                    checkboxLabel = fullName;
                }

                // Append classes to container.
                containerClasses = [
                    'settings-form-input-container',
                    dataSet['type'] + "-setting-container",
                    accidental,
                    quality
                ];
                inputContainer.addClass(containerClasses.join(' '));

                // Build the checkbox
                inputClasses = [
                    'setting-checkbox',
                    dataSet['type'] + "-setting",
                    accidental,
                    quality
                ];

                input = $('<input>', {
                    type: "checkbox",
                    id: dataSet['type'] + "-setting-" + key,
                    name: dataSet['type'] + "-setting-" + key,
                    value: checkboxLabel,
                    class: inputClasses.join(' '),
                    "fullName": fullName,
                    "checked": "checked", // TODO: Determined checked-ness by comparing to localStorage.
                });

                // Append click event to link container and input clicks.
                inputContainer.on('click', (el) => {
                    var chkbox = $(el.currentTarget).find('.setting-checkbox');
                    if ($(chkbox).prop('checked') == true) {
                        $(chkbox).prop('checked', false);
                    }
                    else {
                        $(chkbox).prop('checked', true);
                    }
                });

                // Append label to checkbox
                label = $('<label>', {
                    'for': input.attr('id')
                }).html(input.attr('value'));

                // Append input to container.
                inputContainer.append(input);

                // Append label to container.
                inputContainer.append(label);

                // Append input container to form container.
                settingsFormContainer.append(inputContainer);

            });
        });
        return settingsFormContainer;
    }
}
/* Random Chord Generator */

//TODO: Graceful fail when no elements are selected for a setting group.
//TODO: RCG memory that will be maintained through browser refresh.
//TODO: Link checkbox and checkbox container to un/check box on click of container.

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

    /* Class attribute for current Root Notes */
    var currentChordRootNotes = [];

    /* Class attribute for current Qualities */
    var currentChordQualities = [];

    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    const root = this;

    /*
     * Constructor
     */
    this.construct = function(chordRootNotes, chordQualities){
        setChordRootNotes(allChordRootNotes);
        setChordQualities(allChordQualities);
        if (chordRootNotes) {
            setChordRootNotes(chordRootNotes);
        }
        if (chordQualities) {
            setChordQualities(chordQualities);
        }
        localStorage.setItem('chordRootNotes', JSON.stringify(getChordRootNotes()));
        localStorage.setItem('chordQualities', JSON.stringify(getChordQualities()));
    };

    /* Private function to return all possible chord qualities. */
    const getChordQualities = function() {
        return currentChordQualities;
    }

    /* Private function to return all possible chord root notes. */
    const getChordRootNotes = function() {
        return currentChordRootNotes;
    }

    /* Private function to set Chord Qualities */
    const setChordQualities = function (newChordQualities) {
        currentChordQualities = newChordQualities;
        localStorage.setItem('chordQualities', JSON.stringify(currentChordQualities));
    }

    /* Private function to set Chord Root Notes */
    const setChordRootNotes = function (newChordRootNotes) {
        currentChordRootNotes = newChordRootNotes;
        localStorage.setItem('chordRootNotes', JSON.stringify(currentChordRootNotes));
    }

    /* Public function to get a random chord */
    this.getRandomChord = function() {
        let rootNotes = getChordRootNotes();
        let qualities = getChordQualities();
        let randomRootNote = rootNotes[Math.floor(Math.random() * rootNotes.length)]['label'];
        let randomQuality = qualities[Math.floor(Math.random() * qualities.length)]['label'];
        let randomChord = {
            'label': randomRootNote + randomQuality,
            'value': '',
        };

        return randomChord;
    }

    /* Public function to get a random circle. */
    this.getRandomCircle = function(numSlices) {
        let randomCircleData = {};
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
        let settingsFormContainer = $('<div></div>')
            .addClass("");

        //Build source data object.
        let sourceData = {};
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
            let header = $('<h2></h2>')
                .addClass("settings-form-header")
                .html(dataSet['header']);
            settingsFormContainer.append(header);

            $.each(dataSet['data'], function (key, optionObj) {
                // Create input container.
                let inputContainer = $('<div></div>');
                let label = this['label'];
                let fullName = this['fullName'];
                let accidental = "";
                let quality = "";

                // Set Root Note specific settings.
                if (dataSetKey == 'rootNotes') {
                    accidental = this['accidental'];
                    checkboxLabel = label;
                    selectedElements = currentChordRootNotes;
                }
                // Set Chord Quality specific settings.
                else if (dataSetKey == 'chordQualities') {
                    quality = this['quality'];
                    checkboxLabel = fullName;
                    selectedElements = currentChordQualities;
                }

                // Append classes to container.
                let containerClasses = [
                    'settings-form-input-container',
                    dataSet['type'] + "-setting-container",
                    accidental,
                    quality
                ];
                inputContainer.addClass(containerClasses.join(' '));

                // Build the checkbox
                let inputClasses = [
                    'setting-checkbox',
                    dataSet['type'] + "-setting",
                    accidental,
                    quality
                ];

                let checked = checkValue(optionObj, selectedElements);
                let input = $('<input>', {
                    type: "checkbox",
                    id: dataSet['type'] + "-setting-" + key,
                    name: dataSet['type'] + "-setting-" + key,
                    value: checkboxLabel,
                    label: label,
                    class: inputClasses.join(' '),
                    "fullName": fullName,
                    //"checked": "", // TODO: Determined checked-ness by comparing to localStorage.
                });

                // Add the checked attribute if the item exists in the source array.
                if(checked > -1) {
                    $(input).attr("checked", "checked");
                }

                // Append click even to update localStorage when a checkbox is checked.
                input.on('change', (el) => {

                    // Get the current elements to change based on click.
                    let chkbox = el.currentTarget;
                    let currentElements = [];
                    let newElements = [];
                    let settingFunctionName = "";
                    if ($(chkbox).hasClass('chord-quality-setting')) {
                        currentElements = getChordQualities();
                        settingFunctionName = 'setChordQualities';
                    }
                    else if ($(chkbox).hasClass('root-note-setting')) {
                        currentElements = getChordRootNotes();
                        settingFunctionName = 'setChordRootNotes';
                    }


                    // Add or Remove the clicked obj to the class var.
                    newElements = currentElements;
                    if($(chkbox).prop('checked')) {
                        newElements.push(optionObj);
                    }
                    else {
                        newElements = removeFilter(currentElements, optionObj);
                    }

                    // TODO: Use something akin to call_user_func() in PHP to call the the settingFunctionName
                    // without the following conditional. something like:
                    // $(window)['settingFunctionName'](newElements), I think.
                    if ($(chkbox).hasClass('chord-quality-setting')) {
                        setChordQualities(newElements);
                    }
                    else if ($(chkbox).hasClass('root-note-setting')) {
                        setChordRootNotes(newElements);
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

    function removeFilter(array, element) {
        return array.filter(el => el['label'] !== element['label']);
    }

    function checkValue(value,arr){
        var status = -1;

        for(var i=0; i<arr.length; i++){
            var name = arr[i];
            if(name['label'] == value['label']){
                status = i;
                break;
            }
        }

        return status;
    }

    // Get saved chordRootNotes and chord Qualities
    // and call constructor.
    // TODO: Use 'correct' constructor syntax.
    var storedChordRootNotes = JSON.parse(localStorage.getItem('chordRootNotes'));
    var storedChordQualities = JSON.parse(localStorage.getItem('chordQualities'));
    this.construct(storedChordRootNotes, storedChordQualities);
}
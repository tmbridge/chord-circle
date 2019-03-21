var rcg = new RandomChordGenerator();

function getPropertyCount(obj) {
    var count = 0,
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            count++;
        }
    }

    return count;
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout( () => {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function populateInputsFromStorage() {

    // Define defaults for when there is no store.
    const defaultCircleData = {};
    defaultCircleData['homeChord'] = {"label" : "C", "value" : 25};
    defaultCircleData['chordData'] = [{
        "label": "A",
        "value": 25,
    }, {
        "label": "Am",
        "value": 25,
    }, {
        "label": "B",
        "value": 25,
    }, {
        "label": "Bm",
        "value": 25,
    }, {
        "label": "C",
        "value": 25,
    }, {
        "label": "Cm",
        "value": 25,
    }, {
        "label": "D",
        "value": 25,
    }, {
        "label": "Dm",
        "value": 25,
    }, {
        "label": "E",
        "value": 25,
    }, {
        "label": "Em",
        "value": 25,
    }, {
        "label": "F",
        "value": 25,
    }, {
        "label": "Fm",
        "value": 25,
    }, {
        "label": "G",
        "value": 25,
    }, {
        "label": "Gm",
        "value": 25,
    },];

    const storedCircleData = JSON.parse(localStorage.getItem('circleData'));

    // Load store if exists, otherwise load defaults.
    if(getPropertyCount(storedCircleData) > 0) {
        circleData = storedCircleData;
        chordData = storedCircleData['chordData'];
    }
    else {
        circleData = defaultCircleData;
        chordData = defaultCircleData['chordData'];

        // If using defaults, set the storage to the defaults.
        localStorage.setItem('circleData', JSON.stringify(circleData));
    }

    // Add as many chord inputs as there are in storage
    while ((chordData.length) > ($('.slice-input').length)) {
        $("#home-chord-input").val(circleData['homeChord']['label']);
        $(".repeater-add-btn").click();
    }

    // Set Chords Input
    chordsForm = $(".slice-input");
    $(chordsForm).each(function (key, value) {
        chordLabel = chordData[key]['label'];
        $(this).val(chordLabel);
    });

    // Set Home Chord Input.
    $("#home-chord-input").val(circleData['homeChord']['label']);
}

function drawCircle()
{

    var circleData = JSON.parse(localStorage.getItem('circleData'));
    // Define size & radius of donut pie chart
    var width = 800,
        height = 800,
        radius = Math.min(width, height) / 2;

    // Define arc colours
    var colour = d3.scaleOrdinal(d3.schemeCategory20);

    // Define arc ranges
    var arcText = d3.scaleOrdinal()
        .range([0, width]);

    // Determine size of arcs
    var arc = d3.arc()
        .innerRadius(radius - 115)
        .outerRadius(radius - 10);

    // Create the donut pie chart layout
    var pie = d3.pie()
        .value(function (d) {
            return d["value"];
        })
        .sort(null);

    // Append SVG attributes and append g to the SVG
    var svg = d3.select("#donut-chart").selectAll("*").remove();
    svg = d3.select("#donut-chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    // Define inner circle
    svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 100)
        .attr("fill", "#fff");

    // Calculate SVG paths and fill in the colours
    var g = svg.selectAll(".arc")
        .data(pie(circleData['chordData']))
        .enter().append("g")
        .attr("class", "arc")

        // Make each arc clickable
        .on("click", function (d, i) {
            //window.location = circleData['chordData'][i].link;
        });

    // Append the path to each g
    g.append("path")
        .attr("d", arc)
        .attr("fill", function (d, i) {
            return colour(i);
        });

    // Append text labels to each arc
    g.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .attr("fill", "#fff")
        .text(function (d, i) {
            return circleData['chordData'][i].label;
        })

    // Append text to the inner circle
    svg.append("text")
        .attr("dy", "-1.2em")
        .style("text-anchor", "middle")
        .attr("class", "inner-circle")
        .attr("fill", "#36454f")
        .text(function (d) {
            return 'Home Chord';
        });

    svg.append("text")
        .attr("dy", "1.0em")
        .style("text-anchor", "middle")
        .attr("class", "inner-circle")
        .attr("fill", "#36454f")
        .text(function (d) {
            return circleData['homeChord']['label'];
        });

    // Wrap function to handle labels with longer text
    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > 90) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }
}

function populateStorageFromInputs(){
    circleData = {};
    circleData['chordData'] = [];
    circleData['homeChord'] = {};

    // Redraw Home Chord
    value = $("#home-chord-input").val();
    if (typeof value == "undefined" || value == "") {
        value = "";
    }
    circleData['homeChord']['label'] = value;
    circleData['homeChord']['value'] = "";

    // Populate localeStorage from inputs.
    $.each($(".slice-input"), function (key, value) {
        value = $(this).val();
        if (!(typeof value == "undefined") && !(value == "")) {
            circleData['chordData'][key] = {
                "label": value,
                "value": 25,
            };
        }
    });

    localStorage.setItem('circleData', JSON.stringify(circleData));
    drawCircle();
}

function bindInputListeners() {
    // TODO: Set circleData from localStorage here.
    circleData = JSON.parse(localStorage.getItem('circleData'));

    $(".slice-input").on('keyup', function () {
        populateStorageFromInputs();
    });

    $('#home-chord-input').on('keyup', function () {
        populateStorageFromInputs();
    });

    // Redraw when remove or add is clicked.
    $(".repeater-add-btn, #repeater-remove-btn").on('click', () => {
        bindInputListeners();
        populateStorageFromInputs()
    });

    // Bind random chord generator.
    $(".random-chord-button").on('click', function () {
        randomChord = rcg.getRandomChord();
        circleData = JSON.parse(localStorage.getItem('circleData'));
        index = $( ".random-chord-button" ).index( this );
        circleData['chordData'][index] = randomChord;
        localStorage.setItem('circleData', JSON.stringify(circleData));
        populateInputsFromStorage();
        populateStorageFromInputs();
    });

    // Bind random home chord generator.
    $(".random-home-chord-button").on('click', function () {
        randomChord = rcg.getRandomChord();
        circleData = JSON.parse(localStorage.getItem('circleData'));
        index = $( ".random-home-chord-button" ).index( this );
        circleData['homeChord'] = randomChord;
        localStorage.setItem('circleData', JSON.stringify(circleData));
        populateInputsFromStorage();
        populateStorageFromInputs();
    });

    // Bind home-swapper click event.
    $("#donut-chart").on('click', '.arc', (function (slice) {
        // Get index of clicked slice.
        sliceText = $(this).find("text");
        index = $( "text" ).index( sliceText );

        // Swap chords form inputs index to home, home to index.
        temp = circleData['homeChord'];
        circleData['homeChord'] = circleData['chordData'][index];
        circleData['chordData'][index] = temp;

        // Redraw.
        localStorage.setItem('circleData', JSON.stringify(circleData));
        populateInputsFromStorage();
        populateStorageFromInputs();
    }));
}

/* Bind input-to-slice function */
function bindSlices() {
    circleData = {};
    circleData['chordData'] = [];

    bindInputListeners();

    // Always redraw
    populateStorageFromInputs();
}

$(document).ready(function () {

    // Clear localStorage if there is a new version.
    thisVersion = 1;
    storedVersion = localStorage.getItem('version');
    if(storedVersion != thisVersion) {
        localStorage.setItem('circleData', JSON.stringify({}));
        localStorage.setItem('version', thisVersion);
    }

    // Initializations.
    flyout = $("#left-fly-out-container");
    form = $("#chord-circle-settings-form");
    formWidth = form.width();
    targetLeft = -(formWidth+5)+'px';
    flyout.css('left', targetLeft)
    // Populate Inputs.
    populateInputsFromStorage();

    // Bind listeners.
    bindInputListeners();


    $(".flyout-expander").on('click', (el) => {
        target = el.currentTarget;
        // Hide flyout when showing if not switching panes
        if (flyout.css('left') == "0px") {
            if($(el).hasClass('clicked')) {
                flyout.animate({left: targetLeft}, 200, "swing", () => {
                    // If closing, remove all clicked classes.
                    $(".flyout-expander").removeClass('clicked');
                });
                // Toggle arrow image
                $('.arrow').toggle(200, 'swing');
            }
        }
        //Show flyout when hidden
        else {
            flyout.animate({left: '0px'}, 200, "swing", () => {
            });
            // Toggle arrow image
            $('.arrow').toggle(200, 'swing');
        }

        // Track which icon was used to expand flyout.
        var clickedId = $(target).attr('id');

        // Add clicked class to element to track which one was used to open the flyout.
        $(".flyout-expander").removeClass('clicked');
        $(target).addClass('clicked');

        if(clickedId == "chords-expand-link") {
            $("#chord-circle-chords-form").show();
            $("#chord-circle-settings-form").hide();
        }
        else if(clickedId == "settings-expand-link") {
            $("#chord-circle-chords-form").hide();
            $("#chord-circle-settings-form").show();
        }
    });

    // Bind random circle generator.
    $("#random-circle-btn").on("click", () => {
        circleData = rcg.getRandomCircle($(".items").length);
        localStorage.setItem('circleData', JSON.stringify(circleData));
        populateInputsFromStorage();
        populateStorageFromInputs();
    });

    // Show flyout if setting is set to show on load.
    showChordsFlyoutOnLoad = 1;
    if(showChordsFlyoutOnLoad == 1) {
        $("#chords-expand-link").addClass('clicked');
        flyout.css('left', "0px");
    }

    // Add home swap help dialog.
    if (localStorage.getItem('dialogs-home-swap') != 1) {
        $('#home-chord-swap-dialog').first().dialog({
            title: "Home Chord Swapping",
            autoOpen : true,
            classes: {
                "ui-dialog": "ui-corner-all",
                "ui-dialog-titlebar": "ui-corner-all",
            },
            buttons: [
                {
                    text: "OK",
                    icon: "ui-icon-heart",
                    click: function() {
                        $( this ).dialog( "close" );
                        localStorage.setItem("dialogs-home-swap", 1);
                    }

                    // Uncommenting the following line would hide the text,
                    // resulting in the label being used as a tooltip
                    //showText: false
                }
            ]
        });
    }

    // Add Settings Form.
    const settingsForm = rcg.getSettingsForm();
    $("#chord-circle-settings-form").html(settingsForm);

    // Draw Circle.
    drawCircle(circleData);
});
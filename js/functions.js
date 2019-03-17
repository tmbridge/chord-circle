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

function populateInputsFromStorage() {

    // Define defaults for when there is no store.
    var defaultCircleData = {};
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
    },];

    var storedCircleData = {};
    storedCircleData = JSON.parse(localStorage.getItem('circleData'));

    // Load store if exists, otherwise load defaults.
    if(getPropertyCount(storedCircleData) > 0) {
        circleData = storedCircleData;
        chordData = storedCircleData['chordData'];
    }
    else {
        circleData = defaultCircleData;
        chordData = defaultCircleData['chordData'];
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

function drawCircle(circleData)
{

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

function redrawSlices(){
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

    // Redraw slices
    $.each($(".slice-input"), function (key, value) {
        value = $(this).val();
        if (!(typeof value == "undefined") && !(value == "")) {
            circleData['chordData'][key] = {
                "label": value,
                "value": 25,
            };
        }
    });
    drawCircle(circleData);
}

function bindInputListeners() {
    // TODO: Set circleData from localStorage here.
    circleData = JSON.parse(localStorage.getItem('circleData'));

    $(".slice-input").keyup(function () {
        $.each($(".slice-input"), function (key, value) {
            redrawSlices();
            localStorage.setItem('circleData', JSON.stringify(circleData));
        });
    });

    // Redraw when remove or add is clicked.
    $(".btn").click(redrawSlices());

    $('#home-chord-input').keyup(function () {
        redrawSlices();
        localStorage.setItem('circleData', JSON.stringify(circleData));
    });

    // Bind random chord generator.
    $(".random-chord-button").click(function () {
        randomChord = getRandomChord();
        circleData = JSON.parse(localStorage.getItem('circleData'));
        index = $( ".random-chord-button" ).index( this );
        circleData['chordData'][index] = randomChord;
        localStorage.setItem('circleData', JSON.stringify(circleData));
        populateInputsFromStorage();
        redrawSlices();
    });

    // Bind home-swapper click event.
    //$(".arc").click(function () {
    $("#donut-chart").on('click', '.arc', (function (slice) {
        // Get index of clicked slice.
        sliceText = $(this).find("text");
        index = $( "text" ).index( sliceText );

        // Swap chords form inputs index to home, home to index.
        // Not yet sure why this click even runs multiple times
        // but ever subsequent run after the first the index is -1.
        if (index > -1) {
            temp = circleData['homeChord'];
            circleData['homeChord'] = circleData['chordData'][index];
            circleData['chordData'][index] = temp;

            // Redraw.
            localStorage.setItem('circleData', JSON.stringify(circleData));
            populateInputsFromStorage();
            redrawSlices();
        }
    }));
}

/* Bind input-to-slice function */
function bindSlices() {
    circleData = {};
    circleData['chordData'] = [];

    bindInputListeners();

    // Always redraw
    redrawSlices();
}

$(document).ready(function () {

    // Initializations.
    flyout = $("#left-fly-out-container");
    form = $("#chord-circle-settings-form");
    formWidth = form.width();
    targetLeft = -(formWidth+5)+'px';
    flyout.css('left', targetLeft)
    populateInputsFromStorage();

    // Bind listeners.
    bindInputListeners();

    $("#chords-expand-link").click(function () {
        // Hide form when showing
        if(flyout.css('left') == "0px") {
            flyout.animate({left: targetLeft}, 200,"swing",function () {
            });
        }
        //Show form when hidden
        else {
            flyout.animate({left: '0px'}, 200,"swing",function () {
            });
        }
        // Toggle arrow image
        $('.arrow').toggle(200, 'swing');
    });

    // Bind random circle generator.
    $("#random-circle-btn").click(function () {
        circleData = getRandomCircle($(".items").length);
        localStorage.setItem('circleData', JSON.stringify(circleData));
        populateInputsFromStorage();
        redrawSlices();
    });

    // Show flyout if setting is set to show on load.
    showFlyoutOnLoad = 1;
    if(showFlyoutOnLoad == 1) {
        flyout.css('left', "0px");
    }

});
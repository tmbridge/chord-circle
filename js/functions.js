function drawCircle(circleData)
{
            /*if (typeof circleData === "undefined") {
            var circleData = [];
            circleData['homeChord'] = "C";
            circleData['chordData'] = [{
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
            }*/

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
            window.location = circleData['chordData'][i].link;
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

    g.selectAll(".arc text").call(wrap, arcText.range([0, width]));

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
            return circleData['homeChord'];
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
    circleData = [];
    circleData['chordData'] = [];

    // Redraw Home Chord
    value = $("#home-chord-input").val();
    if (typeof value == "undefined" || value == "") {
        value = "";
    }
    circleData['homeChord'] = value;

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

}

function bindInputListeners() {
    $(".slice-input").keyup(function () {
        $.each($(".slice-input"), function (key, value) {
            redrawSlices();
        });
    });

    // Redraw when remove or add is clicked.
    $(".btn").click(redrawSlices());

    $('#home-chord-input').keyup(function () {
        redrawSlices();
    });
}

/* Bind input-to-slice function */
function bindSlices() {
    circleData = [];
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

    // Bind listeners.
    bindInputListeners();

    $("#chords-expand-link").click(function () {
        console.log($("#left-fly-out-container").css("left"));
        flyout = $("#left-fly-out-container");
        form = $("#chord-circle-settings-form");
        formWidth = form.width();
        targetLeft = -(formWidth+5)+'px';

        // Hide form when showing
        if(flyout.css('left') == "0px") {
            flyout.animate({left: targetLeft}, 1000,"swing",function () {
            });

        }
        //Show form when hidden
        else {
            flyout.animate({left: '0px'}, 1000);
        }

    });
});
$(document).ready(function () {
    var start_fields    = 12;
    var min_fields      = 2;
    var max_fields      = 20; //maximum input boxes allowed
    var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID

    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })

    $("div#chord-circle-settings-form").append(

// Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
        $("<h3/>").text("Settings"), $("<p/>").text("Enter the chords to use in your chord circle."),
        $("<form/>", {
            action: '#',
            method: '#'
        }).append(

            // Home Chord
            $("<label for='home-chord'>Home Chord</label>"),
            $("<input/>", {
                label: "Home Chord",
                type: 'text',
                id: 'home-chord',
                name: 'home-chord',
                placeholder: ''
            }),
        )
    )

    for (i = 0; i < start_fields; i++) {
        $("div#chord-circle-settings-form").append(
            // Chord fields
            $("<br/>"), $("<input/>", {
                type: 'text',
                id: 'slice[]',
                name: 'slice[]'
            })
        )
    }

    // Append add more fields button
    $("div#chord-circle-settings-form").append(
        '<div class="input_fields_wrap">
            <button class="add_field_button">Add Another Chord</button>
            <div><input type="text" name="slice[]"></div>
        </div>'
);

    $("div#chord-circle-settings-form").append(
        // Submit button
        $("<br/>"), $("<input/>", {
            type: 'submit',
            id: 'submit',
            value: 'Submit'
        })
    )
});
$(document).ready(function () {
    $("div#chord-circle-settings-form").append(

// Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
        $("<h3/>").text("Settings"), $("<p/>").text("Enter the chords to use in your chord circle."),
            $("<form/>", {
                action: '#',
                method: '#'
            }).append(

                $("<input/>", {
                    type: 'text',
                    id: 'home-chord',
                    name: 'home-chord',
                    placeholder: 'C'
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-1',
                    name: 'slice-1',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-1',
                    name: 'slice-1',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-2',
                    name: 'slice-2',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-3',
                    name: 'slice-3',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-4',
                    name: 'slice-5',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-5',
                    name: 'slice-5',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-6',
                    name: 'slice-6',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-7',
                    name: 'slice-7',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-8',
                    name: 'slice-8',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-9',
                    name: 'slice-9',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-10',
                    name: 'slice-10',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-11',
                    name: 'slice-11',
                    placeholder: ''
                }),
                $("<input/>", {
                    type: 'text',
                    id: 'slice-12',
                    name: 'slice-12',
                    placeholder: ''
                }),
                $("<br/>"), $("<input/>", {
                    type: 'submit',
                    id: 'submit',
                    value: 'Submit'
                })
            )
    )
});
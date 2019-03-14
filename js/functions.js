/* Bind input-to-slice function */
function bindSlices() {
    $(".slice-input").keyup(function () {
        $.each($(".slice-input"), function (key, value) {
            console.log($(this).context.value);
            value = $(this).context.value;
            //alert( key + ": " + value );
            seedData[key]= [{
                "label": value,
                "value": 25,
            }];
        });
    });
    // console.log(seedData);
}

$(document).ready(function () {
});
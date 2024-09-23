$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();

        $.ajaxSetup({
            contentType: "application/json",
            dataType: "json"
        });

        $.ajax({
            type: "POST",
            url: "process.php",
            data: formData
        }).done(function(data) {
            console.log(JSON.stringify(data, null, 2));
        });
    });
});
$(document).ready(function() {
    window.setInterval(getStatus, 3000);
});


function getStatus() {
    $.getJSON('/status/donwb', function(json) {
        var status = json.user.status;
        console.log(status);

        if(status === 'in') {
            $('#donwb').addClass('home').removeClass('away');
        }
    });
}

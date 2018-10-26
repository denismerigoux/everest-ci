// This function is responsible to check the state of a container.
function checkContainerStatus() {

    var containerText = $('#containerText').text();
    var ipPos = containerText.indexOf('@');
    var ip = containerText.substring(ipPos + 1);
    var url = "https://" + ip;

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        timeout: 10000,
        headers: { "Access-Control-Allow-Origin": "*" },
        error: function(xmlhttprequest, textStatus, message) {
            if(textStatus === "timeout") {
                // Check if container was already destroyed.
                var dateTime = $('#buildDataTime').text();
                var startTime = moment.utc(dateTime, 'MM/DD/YYYY HH:mm:ss');
                var currentTime = moment.utc();

                var duration = moment.duration(currentTime.diff(startTime));
                var hours = duration.asHours();
                if (hours >= 12) {
                    $('#containerStatus').text('Destroyed!');
                    return;
                }

                // Still deploying
                $('#containerStatus').text('Deploying...');
                setTimeout(checkContainerStatus(), 300000);
            } else {
                // Container is running
                $('#containerStatus').text('Running');
                $('#containerStatus').css({ "font-weight" : "Bold" });
            }
        }
    });
}

// On Document ready
$(document).ready(function () {

    var offendersText = $('#offendersText').text();
    if (offendersText.indexOf('Offenders') === -1) {
        $('#Offenders').show();
    }

    var containerText = $('#containerText').text();
    if (containerText.indexOf('ContainerIP') != -1) {
        return;
    }

    $('#ContainerTable').show();
    checkContainerStatus();
});

$(document).ready(function () {
    $("#sms-btn").on('click', function () {
        let txt = $("#sms").val();

        if (txt == null || txt.trim() == '')
            alert('Please Enter the sms')
        else {
            txt= txt.trim();
            $.ajax({
                url: '/pred',
                type: 'POST',
                data: { 'txt': txt },
                success: function (res) {
                    if (res == 'ham')
                        data = `<p class="alert alert-success text-center p-2 fs-2">${res}</p>`;

                    else
                        data = `<p class="alert alert-danger text-center p-2 fs-2">${res}</p>`;

                    $('#res').html(data);
                }

            })
        }

    })
})
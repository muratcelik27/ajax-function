function startLoading(message){
    /* Your custom startLoading  function body */
}


function stopLoading(){
     /* Your custom stopLoading  function body */
}

function displayMessage(){
     /* Your custom displayMessage  function body*/
}

var ajaxStatus = true;
function ajax(url, data, callBack, loading, isHtml) {
    if (ajaxStatus = true) {
        
        ajaxStatus = false;

        if (loading != 'undefined' && loading != undefined){
            if(loading == true)         startLoading();
            else if(loading.length > 0) startLoading(loading);
        }

        $.ajax({
            method: "POST",
            url: url,
            data: $.isPlainObject(data) ? $.extend({ 'ajax': 1 }, data) : data +"&ajax=1",
            dataType: (isHtml != 'undefined' && isHtml == true)  ? 'HTML' : 'JSON',
            complete: function () { ajaxStatus = true; stopLoading();},
            success: function (response) {

                if (isHtml != 'undefined' && isHtml == true) {
                    callBack(response);
                } else if (response.status == 1) {
                    callBack(response.data);
                } else {
                    if (response.message !='undefined' && response.message != "") {
                        displayMessage(response.message);
                    } else {
                        displayMessage('Your custom error message !');
                    }
                }

            },
            error: function (xhr) { ajaxStatus = true; stopLoading();}
        });
    }
}
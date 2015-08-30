/*var options = {
    method: null,
    url: null,
    data: null,
    async: null,
    successCallback: null,
    error: null
};
*/
(function playVideo () {
    var playButton = document.getElementsByClassName('controls__play-button')[0];

    playButton.addEventListener('click', function () {
        alert('Powinienem odtworzyć video, ale tego nie zrobie!');
    })
})();

        //  options: method, url, data, async (defualt: true), requestHeader (Object), success, error
function ajax(options) {
    'use strict';
    var type, httpRequest, method, url, data, async,
        requestHeaderContentType, requestHeaderContentDesc,
        success, error;

    type = {}.toString.apply(options);
    if (type !== '[object Object]') {
        console.log('Bad options type [expected Object]');
        return 'Bad options type [expected Object]';
    }

    method = options.method || 'GET';
    url = options.url || null;
    data = options.data || null;
    async = options.async || true;
    if (options.requestHeader) {
        requestHeaderContentType = options.requestHeader.contentType;
        requestHeaderContentDesc = options.requestHeaderContentDesc;
    } else {
        requestHeaderContentType = 'Content-Type';
        requestHeaderContentDesc = 'application/json; charset=UTF-8';
    }

    success = options.success;
    error = options.error;


    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
        httpRequest.overrideMimeType('application/json'); // text/xml
    } else if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    if (!httpRequest) {
        return 'XMLHttp creation failed';
    }

    httpRequest.onreadystatechange = checkResult;
    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader(requestHeaderContentType, requestHeaderContentDesc);
    httpRequest.send(data);

    function checkResult() {
        var isOk;
        if (httpRequest.readyState === 4) {
            isOk = httpRequest.status >= 200 && httpRequest.status < 300;
            if (isOk) {
                success(httpRequest.responseText);
            } else {
                error(httpRequest.status);
            }
        } else {
            return 'Http request in progress';
        }
    }
}

function successFn(response) {
    console.log(response);
}

function errorFn(status) {
    console.log('Błąd przy połączeniu. Serwer zwrócił status: ' + status);
}


function sendData() {
    var dataToSend = {
        name: "Łukasz Guzek",
        birthDate: "1985-12-23"
    }

    dataToSend = JSON.stringify(dataToSend);
    console.log(dataToSend);
    ajax({
        method: 'POST',
        url: 'http://localhost:3000/contacts',
        data: dataToSend,
        success: successFn,
        error: errorFn
    })
}
// form id - string
// toJson - boolean | default: true
// skipEmpty - boolean | default: true
function formToObject(formId, toJson, skipEmpty) {
    var form, errorMessage, tagCheck, formInputs, elementType, resultObject;

    form = document.getElementById(formId);
    if (form === null) {
        errorMessage = 'No element with id [' + formId + '] found.';
        return errorMessage;
    }

    tagCheck = form.tagName;
    if (tagCheck != 'FORM') {
        errorMessage = 'Passed element is ' + tagCheck + '. Form is expected.';
        return errorMessage;
    }

    formInputs = form.querySelectorAll('input');
    for (var i = 0, l = formInputs.length; i < l; i++) {
        
    };

}

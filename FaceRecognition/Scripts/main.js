function trainFirst(event) {
    var url = "http://localhost:51470/api/Algorithm/PCA";
    apiCall(url);
}

function trainSecond (event) {
    debugger
}

function trainThird (event) {
    debugger
}

function apiCall(url) {
    fetch(url, {
        method: 'get',
        contentType: "json",
        dataType: "json"
    }).then(function (response) {
        debugger;
    }).catch(function (err) {
        
    });
}
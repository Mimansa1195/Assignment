var misSession = {
    userabrhs: sessionStorage['misSession.userabrhs'],
    token: sessionStorage['misSession.token'],
    logout: function () {
        sessionStorage.removeItem('misSession.userabrhs');
        misSession.userabrhs = null;

        sessionStorage.removeItem('misSession.username');
        misSession.username = null;
    }
};

function calltoAjax(url, type, data, successCallback, errorCallback, doneCallback, cType) {
    var token = misSession.token ?? "";
    var userAbrhs = misSession.userabrhs ?? "";
        callToAjaxWithHeader(url, type, data, { 'Token': token, 'UserAbrhs': userAbrhs }, successCallback, errorCallback, doneCallback, cType)
}

function callToAjaxWithHeader(url, type, data, headers, successCallback, errorCallback, doneCallback, cType) {
    $.ajax({
        type: type,
        contentType: cType || "application/json; charset=utf-8",
        url: url,
        headers: headers || {},
        data: (typeof data !== 'undefined' && data !== null && data !== '') ? JSON.stringify(data) : {},
        dataType: "json",
        beforeSend: function () {
            //$.blockUI();
        },
        success: function (data, status, xhr) {
            if (typeof successCallback === 'function') {
                successCallback(data, status, xhr);
            }
            //$.unblockUI();
        },
        error: function (xhr, status, errorThrown) {
           
        }
    }).done(function (data, status, xhr) {
        if (typeof doneCallback === 'function') {
            doneCallback(data, status, xhr);
        }
       // $.unblockUI();
    });
}


var misApiRootUrl = 'https://localhost:44337/';
var misApiBaseUrl = misApiRootUrl + 'api/';
var misAppBaseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

var misApiUrl = function () {
    return {
        'authenticate': misApiBaseUrl + 'Authenticate/Authenticate',
        'getAllBlogs': misApiBaseUrl + 'Blogs/GetAllBlogs',
        'addBlog': misApiBaseUrl + 'Blogs/AddBlog',
        'deleteBlog': misApiBaseUrl + 'Blogs/DeleteBlogs',
        'getBlogById': misApiBaseUrl + 'Blogs/GetBlogById'
    };
}();
var misAppUrl = function () {
    return {
        //Dashboard
        'dashboard': misAppBaseUrl + '/Dashboard/Index'
    }
}();
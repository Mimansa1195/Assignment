
var misLogin = function () {
    var showAlert = function (msg) {
        if (msg) {
            $('.alert-danger .message').html(msg);
        }
        $('.alert-danger').show();
    }
    var hideAlert = function () {
        $('.alert-danger').hide();
    }

    var validateLoginForm = function () {
        return $('.login-form').validate().form();
    }

    return {
        init: function () {
            // handleLogin();
            //misSession.login();
        },
        isFormValid: function () {
            return validateLoginForm();
        },
        authenticateUser: function () {
            if (!validateLoginForm()) {
                return false;
            }

            hideAlert();
            misSession.login($("#username").val(), $("#password").val(), function (xhr, status, errorThrown) {
                if (xhr.responseJSON && !isEmpty(xhr.responseJSON) && !xhr.responseJSON.IsSuccessful) {
                    var response = xhr.responseJSON;
                    if (xhr.status === 302) {
                        misCountdownAlert('Your password has expired. Please change it now and login again. Redirecting', response.Message, 'warning', function () {
                            if (!isEmpty(response.Result) && response.Result.IsRedirect === true) {
                                redirectToURL(misAppUrl.passwordReset + response.Result.PasswordResetCode);
                            }
                            else {
                                redirectToURL(misAppUrl.login);
                            }
                        }, false, 10);
                    }
                    else if (xhr.status === 401) {//wrong password
                        if (!isEmpty(response.Result) && response.Result.LeftAttempts > 0) {
                            var message = 'The username or password you entered is not valid. ' + response.Result.LeftAttempts + ' attempts left.'
                            showAlert(message);
                        }
                        else {
                            showAlert('The username or password you entered is not valid. Please try again.');
                        }
                    }
                    else if (xhr.status === 410 || xhr.status === 403) {
                        misAlert(response.Message, response.Message, 'warning');
                    }
                    else {
                        showAlert('The username or password you entered is not valid. Please try again.');
                        return false;
                    }
                }
                else {
                    showAlert('The username or password you entered is not valid. Please try again.');
                    return false;
                }
            });
        },
        showAlert: function (msg) {
            showAlert(msg);
        },
        hideAlert: function () {
            hideAlert();
        }
    };
}();

//$(document).keypress(function (e) {
//    if (e.which === 13) {
//        if ($("#btnLogin").attr("onclick").indexOf('userLogin') > -1) {
//            misLogin.authenticateUser();
//        }
//        else {
//            misLogin.showAlert('Invalid login form, contact to MIS team for further assistance.');
//        }
//    }
//});

$(function () {
    // fetchClientInfo();
    misLogin.init();
    var imagepath = typeof misSession.imagePath === "undefined" ? "../img/avatar-sign.png" : misSession.imagePath;
    $("#user-avatar").attr("src", imagepath);
});

function userLogin() {
    var jsonObject = {
        username: $("#username").val(),
        password: $("#password").val(),
    }
    if (jsonObject.username != "" && jsonObject.password != "") {
        calltoAjax(misApiUrl.authenticate, 'POST', jsonObject,
            function (data, status, xhr) {
                //clear session
                misSession.logout();
                debugger;
                if (xhr.status == 200) {
                    //set token
                    misSession.token = data.Token;//xhr.getResponseHeader("Token");
                    sessionStorage['misSession.token'] = misSession.token;

                    misSession.userabrhs = data.UserId;
                    sessionStorage['misSession.userabrhs'] = misSession.userabrhs;

                    //var tokenExpiry = xhr.getResponseHeader('TokenExpiry');
                    //successfn(data);
                    window.location.href = misAppUrl.dashboard;
                }
            },
            function (xhr, status, errorThrown) {
                if (typeof errorCallback === 'function') {
                    errorCallback(xhr, status, errorThrown);
                }
                else {
                    console.log(errorThrown + ': ' + (typeof xhr.responseJSON != 'undefined' ? xhr.responseJSON.MessageDetail : errorThrown));
                }
            });
    }
  
}



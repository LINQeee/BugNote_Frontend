function getUsersWithStringInName(containsString, callback) {
    $.ajax ({
        url: "http://localhost:3000/users-contains",
        method: "POST",
        data: containsString,
        contentType: "text/plain",
        dataType: "json",
        success: function (response) {
            callback(response);
        },
        error: function (error) {
            console.error(error);
        }
    });
}
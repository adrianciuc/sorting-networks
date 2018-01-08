Service = function () {
    self = {};

    self.Get = function (url) {
        return $.ajax({
            type: "GET",
            url: url
        });
    };

    self.Delete = function (url, csrfTokenName, csrfTokenValue) {
        var headers = {};
        headers[csrfTokenName] = csrfTokenValue;
        return $.ajax({
            type: "DELETE",
            url: url,
            headers: headers
        });
    };

    self.Post = function (url, data, csrfTokenName, csrfTokenValue) {
        var headers = {};
        headers[csrfTokenName] = csrfTokenValue;
        return $.ajax({
            type: "POST",
            url: url,
            headers: headers,
            contentType: "application/json",
            data: JSON.stringify(data),
            error: function (xhr) {
                debugger;
                alert(xhr.responseText);
            }
        });
    };

    self.PostUpload = function(url, data) {
        return $.ajax({
            type: "POST",
            url: url,
            data: data,
            contentType: false,
            processData: false
        });
    };

    return self;
}();
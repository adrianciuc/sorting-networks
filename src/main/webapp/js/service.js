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

    self.Post = function (url, data) {
        return $.ajax({
            type: "POST",
            url: url,
            data: data,
            error: function (xhr) {
                debugger;
                alert(xhr.error().responseText);
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
SortingNetworkService = function () {
    self = {};

    self.url = window.location.protocol + "//"
        + window.location.hostname + ":"
        + window.location.port
        + "/api/sorting-networks";

    self.GetAll = function (func) {
        Service.Get(this.url).done(function (data) {
            func(data);
        });
    };

    return self;
}();
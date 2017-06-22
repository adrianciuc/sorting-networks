SortingNetworkService = function () {
    self = {};

    self.url = "http://localhost:8080/api/sorting-networks";

    self.GetAll = function (func) {
        Service.Get(this.url).done(function (data) {
            func(data);
        });
    };

    return self;
}();
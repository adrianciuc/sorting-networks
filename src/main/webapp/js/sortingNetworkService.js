SortingNetworkService = function () {
    self = {};

    self.baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

    self.getAllUrl = self.baseUrl + "/api/sorting-networks";

    self.getAllCurrentUserUrl = self.getAllUrl + "/current";

    self.GetAll = function (func) {
        Service.Get(this.getAllUrl).done(function (data) {
            func(data);
        });
    };

    self.GetAllForLoggedInUser = function(func) {
        Service.Get(this.getAllCurrentUserUrl).done(function(data) {
            func(data);
        })
    };

    return self;
}();
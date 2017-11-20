SortingNetworkService = function () {
    self = {};

    self.baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

    self.getAllUrl = self.baseUrl + "/api/sorting-networks";

    self.getAllCurrentUserUrl = self.getAllUrl + "/current";

    self.GetAll = function (func, snList, snPillList, renderSNOwner) {
        Service.Get(this.getAllUrl).done(function (data) {
            func(data, snList, snPillList, renderSNOwner);
        });
    };

    self.GetAllForLoggedInUser = function(func, snList, snPillList, renderSNOwner) {
        Service.Get(this.getAllCurrentUserUrl).done(function(data) {
            func(data, snList, snPillList, renderSNOwner);
        })
    };

    return self;
}();
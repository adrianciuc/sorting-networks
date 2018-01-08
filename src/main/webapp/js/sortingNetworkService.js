SortingNetworkService = function () {
    self = {};

    self.baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

    self.getAllUrl = self.baseUrl + "/api/sorting-networks";

    self.deleteSnUrl = self.getAllUrl + "/";

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

    self.DeleteSortingNetwork = function(snId, csrfTokenName, csrfTokenValue, func) {
        Service.Delete(self.deleteSnUrl + snId, csrfTokenName, csrfTokenValue).done(function() {
            func();
        });
    };

    self.SaveSortingNetwork = function(sn, csrfTokenName, csrfTokenValue, func) {
        Service.Post(self.getAllUrl, sn, csrfTokenName, csrfTokenValue).done(function() {
            func();
        });
    };

    return self;
}();
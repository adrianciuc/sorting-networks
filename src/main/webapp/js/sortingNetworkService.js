SortingNetworkService = function () {
    self = {};

    self.baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

    self.getAllFinishedUrl = self.baseUrl + "/api/sorting-networks";

    self.getOneCurrentUserUrl = self.getAllFinishedUrl + "/";

    self.deleteSnUrl = self.getOneCurrentUserUrl;

    self.getAllCurrentUserUrl = self.getAllFinishedUrl + "/current";

    self.checkSortingNetworkUrl = self.getAllFinishedUrl + "/checks";

    self.GetAllFinished = function (func) {
        Service.Get(this.getAllFinishedUrl).done(function (data) {
            func(data);
        });
    };

    self.GetAllForLoggedInUser = function(func) {
        Service.Get(this.getAllCurrentUserUrl).done(function(data) {
            func(data);
        })
    };

    self.GetOneForLoggedInUser = function(snId, func) {
        Service.Get(this.getOneCurrentUserUrl + snId).done(function(data) {
            func(data);
        })
    };

    self.DeleteSortingNetwork = function(snId, csrfTokenName, csrfTokenValue, func) {
        Service.Delete(self.deleteSnUrl + snId, csrfTokenName, csrfTokenValue).done(function() {
            func();
        });
    };

    self.SaveSortingNetwork = function(sn, csrfTokenName, csrfTokenValue, func) {
        Service.Post(self.getAllFinishedUrl, sn, csrfTokenName, csrfTokenValue).done(function() {
            func();
        });
    };

    self.SaveEditedSortingNetwork = function(sn, csrfTokenName, csrfTokenValue, func) {
        Service.Post(self.getOneCurrentUserUrl + sn.id, sn, csrfTokenName, csrfTokenValue).done(function() {
            func();
        });
    };

    self.CheckSortingNetwork = function(sn, csrfTokenName, csrfTokenValue, func) {
        Service.Post(self.checkSortingNetworkUrl, sn, csrfTokenName, csrfTokenValue).done(function(data) {
            func(data);
        });
    };

    return self;
}();
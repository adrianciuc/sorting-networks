package com.fii.sorting.networks.controller

import com.fii.sorting.networks.beans.SortingNetworkBean
import com.fii.sorting.networks.security.CustomUserDetails
import com.fii.sorting.networks.service.SortingNetworkService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

import static org.springframework.http.HttpStatus.OK
import static org.springframework.web.bind.annotation.RequestMethod.DELETE
import static org.springframework.web.bind.annotation.RequestMethod.GET

@RestController
@RequestMapping('/api/sorting-networks')
class SortingNetworkController {

    private final SortingNetworkService sortingNetworkService

    @Autowired
    SortingNetworkController(SortingNetworkService sortingNetworkService) {
        this.sortingNetworkService = sortingNetworkService
    }

    @RequestMapping(method = GET)
    List<SortingNetworkBean> getAll() {
        this.sortingNetworkService.all
    }

    @RequestMapping(method = GET, path = "/current")
    List<SortingNetworkBean> getAllForUser(@AuthenticationPrincipal CustomUserDetails user) {
        sortingNetworkService.getAllForUser(user)
    }

    @RequestMapping(method = DELETE, path = "/{snId}")
    @ResponseStatus(value = OK)
    void deleteSortingNetwork(@AuthenticationPrincipal CustomUserDetails user,
                                 @PathVariable("snId") Integer snId) {
        sortingNetworkService.deleteSortingNetwork(user, snId)
    }
}

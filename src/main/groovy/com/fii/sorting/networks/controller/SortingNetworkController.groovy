package com.fii.sorting.networks.controller

import com.fii.sorting.networks.beans.SortingNetworkBean
import com.fii.sorting.networks.security.CustomUserDetails
import com.fii.sorting.networks.service.SortingNetworkService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import static org.springframework.web.bind.annotation.RequestMethod.*

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

    @RequestMapping(method = GET, path = "/{snId}")
    SortingNetworkBean getSortingNetwork(@AuthenticationPrincipal CustomUserDetails user,
                              @PathVariable("snId") Integer snId) {
        sortingNetworkService.getSortingNetwork(user, snId)
    }

    @RequestMapping(method = POST, path = "/{snId}")
    void updateSortingNetwork(@AuthenticationPrincipal CustomUserDetails user,
                              @PathVariable("snId") Integer snId,
                              @RequestBody SortingNetworkBean sortingNetworkToUpdate) {
        sortingNetworkService.updateSortingNetwork(user, snId, sortingNetworkToUpdate)
    }

    @RequestMapping(method = POST, consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(value = CREATED)
    void saveSortingNetwork(@AuthenticationPrincipal CustomUserDetails user,
                            @RequestBody SortingNetworkBean sortingNetworkToSave) {
        sortingNetworkService.saveSortingNetwork(user, sortingNetworkToSave)
    }
}

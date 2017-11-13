package com.fii.sorting.networks.controller

import com.fii.sorting.networks.beans.SortingNetworkBean
import com.fii.sorting.networks.security.CustomUserDetails
import com.fii.sorting.networks.service.SortingNetworkService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

import static org.springframework.web.bind.annotation.RequestMethod.GET

@Controller
@RequestMapping('/api/sorting-networks')
class SortingNetworkController {

    private final SortingNetworkService sortingNetworkService

    @Autowired
    SortingNetworkController(SortingNetworkService sortingNetworkService) {
        this.sortingNetworkService = sortingNetworkService
    }

    @RequestMapping(method = GET)
    @ResponseBody
    List<SortingNetworkBean> getAll() {
        this.sortingNetworkService.all
    }

    @RequestMapping(method = GET, path = "/current")
    @ResponseBody
    List<SortingNetworkBean> getAllForUser(@AuthenticationPrincipal CustomUserDetails user) {
        sortingNetworkService.getAllForUser(user)
    }
}

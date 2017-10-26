package com.fii.sorting.networks.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

import static org.springframework.web.bind.annotation.RequestMethod.GET


@Controller
class ProfileController {

    @RequestMapping(method = GET, path = '/profile')
    String getProfilePage() {
        throw new NullPointerException()
        'profile'
    }
}

package com.fii.sorting.networks.controller

import com.fii.sorting.networks.security.CustomUserDetails
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping

import static org.springframework.web.bind.annotation.RequestMethod.GET

@Controller
class ProfileController {

    @RequestMapping(method = GET, path = '/profile')
    String getProfilePage(Model model, @AuthenticationPrincipal CustomUserDetails user) {
        model.addAttribute('firstName', user.firstName)
        model.addAttribute('lastName', user.lastName)
        'profile'
    }
}

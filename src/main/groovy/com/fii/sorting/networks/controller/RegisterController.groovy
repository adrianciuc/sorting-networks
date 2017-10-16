package com.fii.sorting.networks.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

import static org.springframework.web.bind.annotation.RequestMethod.GET

@Controller
class RegisterController {

    @RequestMapping(method = GET, value = '/register')
    String getRegistrationPage() {
        'register'
    }
}

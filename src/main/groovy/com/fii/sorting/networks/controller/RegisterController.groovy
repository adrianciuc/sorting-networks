package com.fii.sorting.networks.controller

import com.fii.sorting.networks.beans.UserBean
import com.fii.sorting.networks.service.RegisterService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

import static org.springframework.web.bind.annotation.RequestMethod.GET
import static org.springframework.web.bind.annotation.RequestMethod.POST

@Controller
class RegisterController {

    @Autowired
    RegisterService registerService

    @RequestMapping(method = GET, value = '/register')
    String getRegistrationPage() {
        'register'
    }

    @RequestMapping(method = POST, value = '/register')
    String registerNewUser(UserBean userBean) {
        registerService.registerNewUser(userBean)
        'login'
    }
}

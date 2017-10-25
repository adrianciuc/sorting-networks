package com.fii.sorting.networks.controller

import com.fii.sorting.networks.beans.UserBean
import com.fii.sorting.networks.service.RegisterService
import com.fii.sorting.networks.service.exceptions.UserAlreadyExistsException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView

import javax.servlet.http.HttpServletRequest

import static org.springframework.web.bind.annotation.RequestMethod.GET
import static org.springframework.web.bind.annotation.RequestMethod.POST

@Controller
class RegisterController {

    static final Logger LOGGER = LoggerFactory.getLogger(RegisterController.class)

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

    @ExceptionHandler(UserAlreadyExistsException.class)
    ModelAndView handleExceptions(HttpServletRequest request, Exception exception) {
        LOGGER.error(exception.message)
        new ModelAndView(
                'register',
                ['alreadyExistsMessage': exception.shortMessage,
                 'firstName': request.getParameter('firstName'),
                'lastName': request.getParameter('lastName'),
                'email': request.getParameter('email')])
    }
}

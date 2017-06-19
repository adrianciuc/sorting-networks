package com.fii.sorting.networks.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

import static org.springframework.web.bind.annotation.RequestMethod.GET

@Controller
class ProductPresentationController {

    @RequestMapping(method = GET, value = '/')
    String getPresentationPage() {
        'productPresentation'
    }
}

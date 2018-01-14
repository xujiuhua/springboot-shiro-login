package com.jtech.twel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * <p>
 *
 * </p>
 *
 * @author jiuhua.xu
 * @version 1.0
 * @since JDK 1.7
 */
@Controller
public class HomeController {

    @GetMapping(value = {"/home", "/"})
    public String viewHome() {
        return "home";
    }

}

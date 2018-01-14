package com.jtech.twel.controller.sys;


import com.baomidou.mybatisplus.mapper.EntityWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jtech.twel.sys.domain.User;
import com.jtech.twel.sys.service.IUserService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author jtech
 * @since 2018-01-14
 */
@Controller
@RequestMapping("/sys/user/")
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(
            final IUserService userService
    ) {
        this.userService = userService;
    }

    @GetMapping("/list")
    public ResponseEntity list() {
        return ResponseEntity.ok(userService.selectList(new EntityWrapper<User>()));
    }

}

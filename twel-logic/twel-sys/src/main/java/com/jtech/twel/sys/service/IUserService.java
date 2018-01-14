package com.jtech.twel.sys.service;

import com.google.common.base.Optional;

import com.baomidou.mybatisplus.service.IService;

import com.jtech.twel.sys.domain.User;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jtech
 * @since 2018-01-14
 */
public interface IUserService extends IService<User> {
    /**
     * 根据用户名称，获取用户信息
     *
     * @param username 用户名称，一般为登录帐号
     * @return 用户信息
     */
    Optional<User> findByUsername(String username);
}

package com.jtech.twel.sys.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.jtech.twel.sys.domain.User;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author jtech
 * @since 2018-01-14
 */
public interface UserMapper extends BaseMapper<User> {

    /**
     * 根据用户名称，获取用户信息
     *
     * @param username 用户名称，一般为登录帐号
     * @return 用户信息
     */
    User selectByUsername(String username);
}
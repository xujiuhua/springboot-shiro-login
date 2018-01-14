package com.jtech.twel.sys.service.impl;

import com.google.common.base.Optional;
import com.google.common.base.Strings;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jtech.twel.sys.dao.UserMapper;
import com.jtech.twel.sys.domain.User;
import com.jtech.twel.sys.service.IUserService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jtech
 * @since 2018-01-14
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);


    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        if (Strings.isNullOrEmpty(username)) {
            return Optional.absent();
        }
        User user = baseMapper.selectByUsername(username);
        if (user == null) {
            LOGGER.warn("用户名称{} 查询用户不存在！", username);
            return Optional.absent();
        }
        return Optional.of(user);
    }
}

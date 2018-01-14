/*
 * The Hefei JingTong RDC(Research and Development Centre) Group.
 * __________________
 *
 *    Copyright 2015-2017
 *    All Rights Reserved.
 *
 *    NOTICE:  All information contained herein is, and remains
 *    the property of JingTong Company and its suppliers,
 *    if any.
 */

package com.jtech.twel.config.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.util.HashMap;
import java.util.Map;

import com.jtech.marble.freemarker.layout.BlockDirective;
import com.jtech.marble.freemarker.layout.ExtendsDirective;
import com.jtech.marble.freemarker.layout.OverrideDirective;
import com.jtech.marble.freemarker.layout.SuperDirective;
import com.jtech.marble.listener.ConfigListener;
import com.jtech.marble.shiro.freemarker.ShiroTags;
import com.jtech.twel.config.properties.OaProperties;

/**
 * <p> </p>
 *
 * @author jiuhua.xu
 * @version 1.0
 * @since JDK 1.7
 */
@Configuration
@DependsOn("configListenerRegistration")
public class FreemarkerConfig extends FreeMarkerAutoConfiguration.FreeMarkerWebConfiguration {

    private final OaProperties oaProperties;

    @Value("${war.context-path}")
    private String warCtx;

    @Autowired
    public FreemarkerConfig(OaProperties oaProperties) {
        this.oaProperties = oaProperties;
    }

    @Override
    public FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer configurer = super.freeMarkerConfigurer();

        Map<String, Object> sharedVariables = new HashMap();
        sharedVariables.put("block", new BlockDirective());

        sharedVariables.put("extends", new ExtendsDirective());
        sharedVariables.put("override", new OverrideDirective());
        sharedVariables.put("super", new SuperDirective());
        if (oaProperties.isShiro()) {
            sharedVariables.put("shiro", new ShiroTags());
        }
        final Map<String, String> conf = ConfigListener.getConf();

        // war包启动顺序不同，war包部署ctx使用配置文件获取
        String ctx = conf.get("ctx");
        if(null == ctx) {
            sharedVariables.put("ctx", warCtx);
        }else {
            sharedVariables.put("ctx", ctx);
        }
        configurer.setFreemarkerVariables(sharedVariables);

        return configurer;
    }
}

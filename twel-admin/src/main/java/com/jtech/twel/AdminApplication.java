package com.jtech.twel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * <p>
 *
 * </p>
 *
 * @author jiuhua.xu
 * @version 1.0
 * @since JDK 1.7
 */
@SpringBootApplication
@EnableCaching
public class AdminApplication extends WebMvcConfigurerAdapter{
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }
}

/*
 * The Hefei JingTong RDC(Research and Development Centre) Group.
 * __________________
 *
 *    Copyright 2015-2017
 *    All Rights Reserved.
 *
 *    NOTICE:  All information contained herein is, and remains
 *    the property of JingTong Company and its suppliers, if any.
 */

package com.jtech.twel.config.properties;

import com.google.common.io.Files;

import com.xiaoleilu.hutool.io.FileUtil;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

/**
 * <p> </p>
 *
 * @author jiuhua.xu
 * @version 1.0
 * @since JDK 1.7
 */
@Component
@ConfigurationProperties(prefix = OaProperties.PREFIX)
public class OaProperties {

    private static final Logger LOGGER = LoggerFactory.getLogger(OaProperties.class);

    public static final String PREFIX = "oa";

    private Boolean kaptchaOpen = false;

    private String fileUploadPath;

    private String excelOutPath;

    private Boolean haveCreatePath = false;

    /**
     * session 失效时间（默认为30分钟 单位：秒）
     */
    private Integer sessionInvalidateTime = 30 * 60;
    /**
     * session 验证失效时间（默认为15分钟 单位：秒）
     */
    private Integer sessionValidationInterval = 15 * 60;

    private boolean shiro = false;
    /**
     * TOKEN过期时间
     */
    private int tokenExpiresDay = 30;
    /**
     * 管理系统的后台资源ID
     */
    private Integer adminResource = 2;
    /**
     * 门户系统的后台资源ID
     */
    private Integer portalResource = 1;
    /**
     * 图片地址
     */
    private String imageUrl;

    public String getFileUploadPath() {
        //如果没有写文件上传路径,保存到临时目录
        if (StringUtils.isEmpty(fileUploadPath)) {
            return System.getProperty("java.io.tmpdir");
        } else {
            //判断有没有结尾符,没有得加上
            if (!fileUploadPath.endsWith(File.separator)) {
                fileUploadPath = fileUploadPath + File.separator;
            }
            haveCreatePath = FileUtil.exist(fileUploadPath);
            //判断目录存不存在,不存在得加上
            if (!haveCreatePath) {
                File file = new File(fileUploadPath + "cp.txt");
                try {
                    Files.createParentDirs(file);
                } catch (IOException e) {
                    return System.getProperty("java.io.tmpdir");
                }
                haveCreatePath = true;
            }
            return fileUploadPath;
        }
    }

    public void setFileUploadPath(String fileUploadPath) {
        this.fileUploadPath = fileUploadPath;
    }

    public Boolean getKaptchaOpen() {
        return kaptchaOpen;
    }

    public void setKaptchaOpen(Boolean kaptchaOpen) {
        this.kaptchaOpen = kaptchaOpen;
    }

    public Integer getSessionInvalidateTime() {
        return sessionInvalidateTime;
    }

    public void setSessionInvalidateTime(Integer sessionInvalidateTime) {
        this.sessionInvalidateTime = sessionInvalidateTime;
    }

    public Integer getSessionValidationInterval() {
        return sessionValidationInterval;
    }

    public void setSessionValidationInterval(Integer sessionValidationInterval) {
        this.sessionValidationInterval = sessionValidationInterval;
    }

    public Integer getAdminResource() {
        return adminResource;
    }

    public void setAdminResource(Integer adminResource) {
        this.adminResource = adminResource;
    }

    public Integer getPortalResource() {
        return portalResource;
    }

    public void setPortalResource(Integer portalResource) {
        this.portalResource = portalResource;
    }

    public boolean isShiro() {
        return shiro;
    }

    public boolean getShiro() {
        return shiro;
    }

    public void setShiro(boolean shiro) {
        this.shiro = shiro;
    }

    public int getTokenExpiresDay() {
        return tokenExpiresDay;
    }

    public void setTokenExpiresDay(int tokenExpiresDay) {
        this.tokenExpiresDay = tokenExpiresDay;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getExcelOutPath() {
        return excelOutPath;
    }

    public void setExcelOutPath(String excelOutPath) {
        this.excelOutPath = excelOutPath;
    }
}

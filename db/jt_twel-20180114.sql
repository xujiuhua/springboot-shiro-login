/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100118
Source Host           : localhost:3306
Source Database       : jt_twel

Target Server Type    : MYSQL
Target Server Version : 100118
File Encoding         : 65001

Date: 2018-01-14 18:39:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_resource`;
CREATE TABLE `sys_resource` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '资源名称',
  `pid` bigint(20) NOT NULL DEFAULT '0' COMMENT '上级资源ID',
  `url` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '资源地址',
  `icon_css` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '图标样式',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `creater` bigint(20) NOT NULL COMMENT '创建人',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `updater` bigint(20) NOT NULL COMMENT '更新人',
  `delete_flag` tinyint(1) NOT NULL DEFAULT '0' COMMENT '删除标识:0-未删除;1-已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sys_resource
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL,
  `code` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '角色编码',
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '角色名称',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `creater` bigint(20) NOT NULL COMMENT '创建人',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `updater` bigint(20) NOT NULL COMMENT '更新人',
  `delete_flag` tinyint(1) NOT NULL DEFAULT '0' COMMENT '删除标识:0-未删除;1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sys_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_resource`;
CREATE TABLE `sys_role_resource` (
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `resource_id` bigint(20) NOT NULL COMMENT '资源ID',
  PRIMARY KEY (`role_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sys_role_resource
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL COMMENT 'id',
  `username` varchar(180) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `password` char(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `salt` char(16) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码盐值',
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '姓名',
  `sex` smallint(1) DEFAULT NULL COMMENT '性别:1-男;2-女;9-其它',
  `phone` char(11) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机号',
  `freeze_flag` tinyint(1) NOT NULL DEFAULT '0' COMMENT '冻结标识:0-未冻结;1-已冻结',
  `delete_flag` tinyint(1) NOT NULL DEFAULT '0' COMMENT '删除标识:0-未删除;1-已删除',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `creater` bigint(20) NOT NULL COMMENT '创建人',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `updater` bigint(20) NOT NULL COMMENT '更新人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `AK_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', '752358086e0b69570e69093a26a49ef804d845e1', '00a2b7cfb2d0e1ac', null, null, null, '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;

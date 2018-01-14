package com.jtech.twel.sys.domain;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author jtech
 * @since 2018-01-14
 */
@TableName("sys_user")
public class User extends Model<User> {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
	private Long id;
    /**
     * 用户名
     */
	private String username;
    /**
     * 密码
     */
	private String password;
    /**
     * 密码盐值
     */
	private String salt;
    /**
     * 姓名
     */
	private String name;
    /**
     * 性别:1-男;2-女;9-其它
     */
	private Integer sex;
    /**
     * 手机号
     */
	private String phone;
    /**
     * 冻结标识:0-未冻结;1-已冻结
     */
	@TableField("freeze_flag")
	private Integer freezeFlag;
    /**
     * 删除标识:0-未删除;1-已删除
     */
	@TableField("delete_flag")
	private Integer deleteFlag;
    /**
     * 创建时间
     */
	@TableField("create_time")
	private Integer createTime;
    /**
     * 创建人
     */
	private Long creater;
    /**
     * 更新时间
     */
	@TableField("update_time")
	private Integer updateTime;
    /**
     * 更新人
     */
	private Long updater;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getFreezeFlag() {
		return freezeFlag;
	}

	public void setFreezeFlag(Integer freezeFlag) {
		this.freezeFlag = freezeFlag;
	}

	public Integer getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public Integer getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Integer createTime) {
		this.createTime = createTime;
	}

	public Long getCreater() {
		return creater;
	}

	public void setCreater(Long creater) {
		this.creater = creater;
	}

	public Integer getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Integer updateTime) {
		this.updateTime = updateTime;
	}

	public Long getUpdater() {
		return updater;
	}

	public void setUpdater(Long updater) {
		this.updater = updater;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "User{" +
			"id=" + id +
			", username=" + username +
			", password=" + password +
			", salt=" + salt +
			", name=" + name +
			", sex=" + sex +
			", phone=" + phone +
			", freezeFlag=" + freezeFlag +
			", deleteFlag=" + deleteFlag +
			", createTime=" + createTime +
			", creater=" + creater +
			", updateTime=" + updateTime +
			", updater=" + updater +
			"}";
	}
}

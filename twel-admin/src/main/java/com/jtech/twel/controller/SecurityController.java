package com.jtech.twel.controller;

import com.google.common.base.Strings;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.jtech.marble.shiro.ShiroUser;
import com.jtech.marble.shiro.ShiroUtil;
import com.jtech.twel.Const;

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
public class SecurityController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityController.class);


    @GetMapping("/login")
    public String viewLogin(
            @RequestParam(value = "username", required = false) String username,
            Model model
    ) {

        if (StringUtils.isNotEmpty(username)) {
            model.addAttribute("username", username);
        }

        return "login";
    }

    /**
     * 用户登录请求
     *
     * @param username           登录账号
     * @param password           登录密码
     * @param remember           是否记住密码
     * @param redirectAttributes falsh  attribute
     * @return 登录失败返回当前界面 如果登录成功，则跳转主界面.
     */
    @PostMapping("/login")
    public String login(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam(value = "remember", required = false) String remember,
            RedirectAttributes redirectAttributes
    ) {

        if (StringUtils.isEmpty(username)) {
            redirectAttributes.addFlashAttribute(Const.MESSAGE, "请输入用户名称");
            return "redirect:/login";
        }
        redirectAttributes.addFlashAttribute("username", username);

        if (StringUtils.isEmpty(password)) {
            redirectAttributes.addFlashAttribute(Const.MESSAGE, "请输入登录密码");
            return "redirect:/login";
        }

        boolean rememberMe = !Strings.isNullOrEmpty(remember) && BooleanUtils.toBoolean(remember);

        UsernamePasswordToken token = new UsernamePasswordToken(username, password, rememberMe);
        //获取当前的Subject
        Subject currentUser = SecurityUtils.getSubject();

        LOGGER.info("准备登陆用户 => {}", username);
        try {
            LOGGER.info("对用户[" + username + "]进行登录验证..验证开始");
            currentUser.login(token);
            LOGGER.info("对用户[" + username + "]进行登录验证..验证通过");
        } catch (UnknownAccountException uae) {
            LOGGER.info("对用户[" + username + "]进行登录验证..验证未通过,未知账户");
            redirectAttributes.addFlashAttribute(Const.MESSAGE, "未知账户");
        } catch (IncorrectCredentialsException ice) {
            LOGGER.info("对用户[" + username + "]进行登录验证..验证未通过,错误的凭证");
            redirectAttributes.addFlashAttribute(Const.MESSAGE, "密码不正确");
        } catch (LockedAccountException lae) {
            LOGGER.info("对用户[" + username + "]进行登录验证..验证未通过,账户已锁定");
            redirectAttributes.addFlashAttribute(Const.MESSAGE, "账户已锁定");
        } catch (ExcessiveAttemptsException eae) {
            LOGGER.info("对用户[" + username + "]进行登录验证..验证未通过,错误次数过多");
            redirectAttributes.addFlashAttribute(Const.MESSAGE, "用户名或密码错误次数过多");
        } catch (AuthenticationException ae) {
            //通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
            LOGGER.info("对用户[" + username + "]进行登录验证..验证未通过,堆栈轨迹如下");
            ae.printStackTrace();
            redirectAttributes.addFlashAttribute(Const.MESSAGE, "用户名或密码不正确");
        }
        //验证是否登录成功
        if (currentUser.isAuthenticated()) {
            LOGGER.info("用户[" + username + "]登录认证通过(这里可以进行一些认证通过后的一些系统参数初始化操作)");
            final ShiroUser user = ShiroUtil.getUser();

            Session session = currentUser.getSession();

//            List<DataOrgVo> allDataOrgList= iUserDataService.findAllDataOrg(0L,user.getId());
//            List<DataOrgVo> dataOrgVoList=iUserDataService.findByUserLoginId(user.getId(),1);
//            if(null!=dataOrgVoList&&dataOrgVoList.size()>0){
//                for(DataOrgVo dataOrgVo:dataOrgVoList){
//                    allDataOrgList.add(dataOrgVo);
//                }
//            }
            session.setAttribute("userPermission", "");
            return "redirect:/home";
        } else {
            token.clear();
            return "redirect:/login";
        }

    }
}

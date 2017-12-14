package com.github.chen0040.bootslingshot.controllers;

import com.github.chen0040.bootslingshot.components.SpringAuthentication;
import com.github.chen0040.bootslingshot.models.SpringUser;
import com.github.chen0040.bootslingshot.services.SpringUserService;
import com.github.chen0040.bootslingshot.viewmodels.SpringIdentity;
import com.github.chen0040.bootslingshot.viewmodels.SpringUserViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProtectedApiController {

    @Autowired
    private SpringAuthentication springAuthentication;

    @Autowired
    private SpringUserService userService;

    @RequestMapping(value = "/users/get-account", method = RequestMethod.GET)
    public @ResponseBody
    SpringUser getAccount() {
        return springAuthentication.getUser();
    }

    @RequestMapping(value="/users/get-account-by-username", method = RequestMethod.POST, consumes = "application/json")
    public @ResponseBody SpringUser getAccount(@RequestBody SpringIdentity request) {
        String username = request.getUsername();
        return userService.findUserByUsername(username).orElse(new SpringUserViewModel());
    }


}

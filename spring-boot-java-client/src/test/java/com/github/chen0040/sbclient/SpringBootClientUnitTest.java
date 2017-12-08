package com.github.chen0040.sbclient;

import org.testng.annotations.Test;

public class SpringBootClientUnitTest {
    @Test
    public void testLogin() {
        SpringBootClient client = new SpringBootClient();
        client.login("http://localhost:8080/erp/login-api-json", "admin", "admin");

        System.out.println(client.getSecured("http://localhost:8080/users/get-account"));
    }
}

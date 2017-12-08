# spring-security-angular-4-demo

This project contains demo codes on how to communicate an angular 4 project with a spring boot application that has spring security enabled.

# Setup

To use this project create a database named spring_boot_slingshot in your mysql database (make sure it is running at localhost:3306)

```sql
CREATE DATABASE spring_boot_slingshot CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```

Note that the default username and password for the mysql is configured to 

* username: root
* password: chen0469

If your mysql or mariadb does not use these configuration, please change the settings in src/resources/config/application-default.properties

For the spring security configuration, the CSRF is enabled. The configuration in the spring-boot-application as follows:

```java
http
.authorizeRequests()
.antMatchers("/js/client/**").hasAnyRole("USER", "ADMIN")
.antMatchers("/js/admin/**").hasAnyRole("ADMIN")
.antMatchers("/admin/**").hasAnyRole("ADMIN")
.antMatchers("/html/**").hasAnyRole("USER", "ADMIN")
.antMatchers("/js/commons/**").permitAll()
.antMatchers("/css/**").permitAll()
.antMatchers("/jslib/**").permitAll()
.antMatchers("/webjars/**").permitAll()
.antMatchers("/bundle/**").permitAll()
.antMatchers("/locales").permitAll()
.antMatchers("/locales/**").permitAll()
.anyRequest().authenticated()
.and()
.formLogin()
.loginPage("/login")
.defaultSuccessUrl("/home")
.successHandler(authenticationSuccessHandler)
.permitAll()
.and()
.logout()
.permitAll()
.and()
.csrf()
.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
```

which can be found in the com.github.chen0040.bootslingshot.configs.WebSecurityConfig

And the class implementation for the autowired authenticationSuccessHandler is shown below:

```java
@Component
public class SpringAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

   @Override
   public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
           throws IOException, ServletException {


      String ajax = request.getParameter("ajax");

      String username = authentication.getName();

      System.out.println("User: "+username);

      if(ajax != null && ajax.equalsIgnoreCase("true"))
      {
         CsrfToken csrf = (CsrfToken)request.getAttribute(CsrfToken.class
                 .getName());
         response.getWriter().println("APP-AJAX-LOGIN-SUCCESS;"+csrf.getToken());
      }
      else
      {
         super.onAuthenticationSuccess(request, response, authentication);
      }
   }
}
```

which can be found in the com.github.chen0040.bootslingshot.components.SpringAuthenticationSuccessHandler .

# Usage

### Build the applications

Run the "./make.ps1" (windows environment) and "./make.sh" (unix environment). which will compile and stores the built
jars in the "bin" folder.

* spring-boot-application: the spring boot application that has csrf-enabled spring security configuration
* spring-boot-client: a java client that can login the spring-boot-application via restful web api.
* spring-boot-client-sample-app: a sample swing application that uses the spring-boot-client to login to the spring-boot-application

### Start the spring-boot-application

```bash
java -jar bin/spring-boot-application.jar
```

This will start the spring-boot-application that is at http://localhost:8080

The application can be authenticated using any one of the accounts below:

ADMIN:

* username: admin
* password: admin

DEMO:

* username: demo
* password: demo

### Use spring-boot-client in your project:

The following are the excerpt from spring-boot-client unit test to show how to login to the spring-boot-application:

```java
String username = "admin";
String password = "admin";
SpringBootClient.getSingleton().setBaseUrl("http://localhost:8080");
SpringBootClient.getSingleton().login(username, password, (authenticationResult)->{

    if(authenticationResult.isAuthenticated()){
        System.out.println("user successfully login");
    }
});
SpringBootClient.getSingleton().isAuthenticated();
SpringBootClient.getSingleton().getToken();
```











package com.jasan.infraeureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class InfraEurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfraEurekaApplication.class, args);
    }

}

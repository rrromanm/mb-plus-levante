package com.mbpluslevante.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MbPlusLevanteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MbPlusLevanteApplication.class, args);
	}

}

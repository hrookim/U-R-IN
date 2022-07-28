package com.dongpop.urin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class UrinApplication {

	public static void main(String[] args) {
		SpringApplication.run(UrinApplication.class, args);
	}

}

package com.fii.sorting.networks

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.web.support.SpringBootServletInitializer
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
class SortingNetworksApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SortingNetworksApplication.class);
    }

	static void main(String[] args) {
		SpringApplication.run SortingNetworksApplication, args
	}
}

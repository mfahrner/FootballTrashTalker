package com.theironyard.charlotte;

import com.theironyard.charlotte.services.GameUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class FootballTrashTalkerApplication extends AsyncConfigurerSupport {
	public static void main(String[] args) {
		SpringApplication.run(FootballTrashTalkerApplication.class, args);
	}

	// customizes async variables
	@Override
	public Executor getAsyncExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(5);
		executor.setMaxPoolSize(16);
		executor.setQueueCapacity(100);
		executor.setThreadNamePrefix("GameUpdater-");
		executor.initialize();
		return executor;
	}

}

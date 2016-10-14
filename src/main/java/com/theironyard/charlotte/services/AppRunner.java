package com.theironyard.charlotte.services;

import com.theironyard.charlotte.entities.Game;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.concurrent.Future;

/**
 * Created by mfahrner on 10/13/16.
 */
@Component
public class AppRunner implements CommandLineRunner {

    private final GameUpdateService gameUpdateService;

    public AppRunner(GameUpdateService gameUpdateService) {
        this.gameUpdateService = gameUpdateService;
    }

    @Override
    public void run(String... args) throws Exception {
        long start = System.currentTimeMillis();

        while (true) {
            Future<Game> someGame = gameUpdateService.findGame();

            while (!(someGame.isDone())) {
                Thread.sleep(10);
            }

            Thread.sleep(1000);
        }
    }
}


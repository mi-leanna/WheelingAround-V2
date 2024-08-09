function GameOver() {
    var oGame;

    this.setup = function() {
        // find a different scene using the SceneManager
        oGame = this.sceneManager.findScene(Game).oScene;
    }

    this.draw = function() {
        // read the injected bkImage property
        // image(this.sceneManager.bkImage, 0, 0);
        // image(this.sceneManager.bkImage, 0, 0);

        // invoke a method from a different scene
        // oGame.displayGlobalBalls();

        textFont('Press Start 2P');
        fill("black");
        textSize(map(sin(frameCount * 0.1), 0, 1, 24, 32));
        textAlign(CENTER);
        textSize(36);
        text("GAME OVER", width / 2, height / 2);

        textSize(12);
        text("Score: " + oGame.getScore(), width / 2, height / 2 + 100);

        text("Press any key to restart game...", width / 2, height - 20);
    }

    this.keyPressed = function() {
        this.sceneManager.showScene(Intro);
    }
}
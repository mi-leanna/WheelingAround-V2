function Intro() {
    let startButton;

    this.setup = function() {
        startButton = new Sprite();
        startButton.image = 'assets/img/startButton.png';
        startButton.image.offset.y = 80;
        // Add collider with offset
        startButton.addCollider(0, 80, 194, 87);
    }

    this.draw = function() {
        image(this.sceneManager.bkImage, 0, 0);
    
        if (startButton.mouse.hovering()){
            mouse.cursor = 'grab';
            startButton.image = 'assets/img/startButtonHovered.png';
            startButton.image.offset.y = 80;

        if (startButton.mouse.pressing()){
            console.log('start button pressed!');
            startButton.visible = false;
            this.sceneManager.bkImage = bkImage; // inject bkImage property
            // this.sceneManager.wire();
            this.sceneManager.showScene(Game, 1);
            mouse.cursor = 'default';
        }

        } else {
            mouse.cursor = 'default';
            startButton.image = 'assets/img/startButton.png';
            startButton.image.offset.y = 80;
        }
    
    }


}
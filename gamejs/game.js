function Game() {
    // how many side walks have you fixed
    let sidewalk_fixed_count = 0;
    let curb_fixed_count = 0;


    // tool bar variables
    const toolBarHeight = 64;
    const toolBarWidth = 128;
    const toolBarStart = -64;
    const toolBarYOffSet = -100;
    let currentToolIndex = 0;
    let tools = [toolFixSideWalk, toolBuildCurb];

    // 0 = forward, 1 = backward, 2 = left, 3 = right.
    let direction = 0;

    // Four numbers that define the transform, i hat and j hat
    const i_x = 1;
    const i_y = 0.5;
    const j_x = -1;
    const j_y = 0.5;

    // Symmetric 2D array to store instances of TileClass
    const tile_arr_size = 20;  // Originally 12
    let tileArr = new Array(tile_arr_size).fill(null).map(() => new Array(tile_arr_size).fill(null));

    // Variables for the game objective tile
    // Hardcoding tile placement for the first level
    // x and y here are just the grid coordinates
    // let floatingArrowAni;
    // const startingTileIndex = {  // For 12 x 12
    //     x: 3,
    //     y: 0
    // };
    // const endingTileIndex = {
    //     x: 11,
    //     y: 8
    // };
    const startingTileIndex = {  // For 20 x 20
        x: 7,
        y: 3  // 4
    };
    const endingTileIndex = {
        x: 17,
        y: 12
    };

    // Variables for the wheelchair player
    let playerSprite;
    let playerSprite_curTgc; // the current tgc coordinates that the player is at
    let playerSprite_curTileType; // The tile type that the player is currently sitting on

    // Variables to store the current position of the character
    let characterX = startingTileIndex.x;
    let characterY = startingTileIndex.y;

    // 0 --> facing up
    // 1 --> facing left
    // 2 --> facing down
    // 3 --> facing right
    /*
        Picture this compass:
                    0
                    |
                1 -- -- 3
                    |
                    2
    */
    let curDirection = 2; 

    // Constants for controlling the wheelchair player
    let lastKeyPressTime = 0;
    let keyPressInterval = 2000; // Adjust this value to change the movement speed

    // Sprite size
    // 1x size
    const w = 64;
    const h = 64;

    // 2x size
    // const w = 128;
    // const h = 128;

    // 1.5x size
    // const w = 96;
    // const h = 96;

    // what the current cursor calculation is based off
    let maxWinWidth = 1920;
    let maxWinHeight = 1080;

    // TODO: replace

    /**** Variables for Pose Classifier */
    let video;
    let poseNet;
    let pose;
    let skeleton;

    let brain;
    let poseLabel = "";  // The current poseLabel

    let state = 'waiting';
    let targetLabel;

    // The keypoints we actually care about
    // Any keypoints below the hip we don't care about
    const first_keypoint_index = 5;
    const last_keypoint_index = 10;

    /*
        0 --> grass block (use for where houses go for now)
        1 --> road tile
        2 --> sidewalk tile
        3 --> sidewalk rotated 180 degrees
        4 --> broken sidewalk
        5 --> broken sidewalk rotated 180 degrees
        6 --> sidewalk corner topLeft (no curb ramp)
        7 --> sidewalk corner botLeft (no curb ramp)
        8 --> sidewalk corner botRight (no curb ramp)
        9 --> sidewalk corner topRight (no curb ramp)
    */

    // const levelOne = [
    //     [0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
    //     [0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
    //     [0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
    //     [3, 3, 5, 6, 1, 1, 1, 1, 9, 3, 5, 3],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [3, 5, 3, 7, 1, 1, 1, 1, 8, 3, 3, 3],
    //     [0, 0, 0, 2, 1, 1, 1, 1, 4, 0, 0, 0],
    //     [0, 0, 0, 2, 1, 1, 1, 1, 4, 0, 0, 0],
    //     [0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
    // ]; // Currently 12 by 12

    const levelOne = [
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        [3, 3, 3, 3, 5, 5, 3, 5, 6, 1, 1, 1, 1, 9, 3, 5, 3, 3, 3, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [3, 3, 3, 3, 3, 5, 3, 7, 1, 1, 1, 1, 8, 3, 3, 3, 3, 3, 3, 3],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
    ]; // Currently 20 by 20


    this.setup = function() {
        // createCanvas(maxWinWidth, maxWinHeight);
        new Canvas(maxWinWidth, maxWinHeight);
        imageMode(CENTER);

        // Setup our pose classifier
        /****** CODE FOR THE POSE CLASSIFER! UNCOMMENT TO HAVE THE MODEL RUNNING */
        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on('pose', gotPoses);

        let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
        }
        brain = ml5.neuralNetwork(options);

        // LOAD PRETRAINED MODEL:
        const modelInfo = {
        model: 'model2/model.json',
        metadata: 'model2/model_meta.json',
        weights: 'model2/model.weights.bin',
        };
        brain.load(modelInfo, brainLoaded);

        // Now loop through our tile map and draw
        // each tile accoridng to our levelOne matrix
        // mapping
        for (let i = 0; i < tile_arr_size; i++) {
            for (let j = 0; j < tile_arr_size; j++) {
                let tile_type = levelOne[i][j];
                let tsc = toScreenCoords({
                    x: i,
                    y: j
                });

                switch (tile_type) {
                    case 0: // grass block (use for where houses go for now)
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "city", "none");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, grassTile, "decoration", "normal");
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 1: // road tile
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "vertical");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, roadTile, "road", "normal");
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 2: // sidewalk tile
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "horizontal");
                        if (i === endingTileIndex.x && j === endingTileIndex.y) {
                            tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkEndpoint, "endpoint", "normal");
                        } else {
                            tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalk, "sidewalk", "normal");
                        }
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 3: // sidewalk rotated 180 degrees
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "4way");
                        // If this is the ending tile, then replace it with the ending sidewalk tile
                        if (i === endingTileIndex.x && j === endingTileIndex.y) {
                            tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkEndpointRotated180, "endpoint", "rotated180");
                        } else {
                            tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkRotated180, "sidewalk", "rotated180");
                        }
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 4: // broken sidewalk
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "4way");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkBroken, "broken_sidewalk", "normal");
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        break;
                    case 5: // broken sidewalk rotated 180 degrees
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "4way");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkBrokenRotated180, "broken_sidewalk", "rotated180");
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 6: // sidewalk corner topLeft (no curb ramp)
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "4way");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkCornerTopLeft, "sidewalk_corner", "normal");
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 7: // sidewalk corner botLeft (no curb ramp)
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "4way");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkCornerBotLeft, "sidewalk_corner", "rotated90"); // TODO: Replace with rotated versions
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 8: // sidewalk corner botRight (no curb ramp)
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "4way");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkCornerBotRight, "sidewalk_corner", "rotated180"); // TODO: Replace with rotated versions
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    case 9: // sidewalk corner topRight (no curb ramp)
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "road", "4way");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, sidewalkCornerTopRight, "sidewalk_corner", "rotated270"); // TODO: Replace with rotated versions
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                        break;
                    default:
                        // Otherwise, default to road
                        // grid[i][j] = new GridTile(j * gridSize, i * gridSize, gridSize, "city", "none");
                        tileArr[i][j] = new TileClass(i, j, tsc.x, tsc.y, roadTile, "road", "normal");
                        tileArr[i][j].display(tileArr[i][j].sprite);
                        tileArr[i][j].visible = false;
                }
            }
        }
    }

    this.draw = function() {
        // background('#588dbe');  // Old background color
        background('#aae3ff');
        translate(width / 2, height / 3);
        // image(bkClouds, 0, 0);

        // For now, use simple text to show which
        // tool you have selected
        // Top-left corner
        // textAlign(LEFT, TOP);
        textSize(16);
        // fill(255);
        // stroke(0);
        // strokeWeight(4);

        let tgc = screenToGridCoords({
            x: mouseX,
            y: mouseY
        });

        // Check if the player is on the ending tile.
        // If they are, then end the game
        if (characterX === endingTileIndex.x && characterY === endingTileIndex.y) {
            this.sceneManager.bkImage = bkImageWCharacter; // inject bkImage property
            this.sceneManager.wire();
            this.sceneManager.showScene(GameOver);
        }


        let newCharacterX = characterX;
        let newCharacterY = characterY;

        // Move the character based on WASD keys
        // if (keyIsDown(65) && millis() - lastKeyPressTime > keyPressInterval) { // 'A' key
        //     newCharacterX = constrain(characterX - 1, 0, tile_arr_size - 1);
        //     direction = 1; // left
        //     lastKeyPressTime = millis();
        // } else if (keyIsDown(68) && millis() - lastKeyPressTime > keyPressInterval) { // 'D' key
        //     newCharacterX = constrain(characterX + 1, 0, tile_arr_size - 1);
        //     direction = 3; // right
        //     lastKeyPressTime = millis();
        // } else if (keyIsDown(87) && millis() - lastKeyPressTime > keyPressInterval) { // 'W' key
        //     newCharacterY = constrain(characterY - 1, 0, tile_arr_size - 1);
        //     direction = 0; // backward
        //     lastKeyPressTime = millis();
        // } else if (keyIsDown(83) && millis() - lastKeyPressTime > keyPressInterval) { // 'S' key
        //     newCharacterY = constrain(characterY + 1, 0, tile_arr_size - 1);
        //     direction = 2; // forward
        //     lastKeyPressTime = millis();
        // }

        // OR based on poses
        if (poseLabel === "F" && millis() - lastKeyPressTime > keyPressInterval) { // Move forward
            if (curDirection === 0) {  // Move 1 up
                newCharacterY = constrain(characterY - 1, 0, tile_arr_size - 1);
            } else if (curDirection === 1) {  // Move 1 left 
                newCharacterX = constrain(characterX - 1, 0, tile_arr_size - 1);
            } else if (curDirection === 2) {  // Move 1 down
                newCharacterY = constrain(characterY + 1, 0, tile_arr_size - 1);
            } else if (curDirection === 3) {  // Move 1 right
                newCharacterX = constrain(characterX + 1, 0, tile_arr_size - 1);
            }
            lastKeyPressTime = millis();
        } else if (poseLabel === "L" && millis() - lastKeyPressTime > keyPressInterval) { // Turn left
            // Turn the character's sprite to face the direction to the left
            curDirection = (curDirection + 1) % 4;
            lastKeyPressTime = millis();
        } else if (poseLabel === "R" && millis() - lastKeyPressTime > keyPressInterval) { // Turn right
            // Turn the character's sprite to face the direction to the right
            curDirection = (curDirection - 1);
            if (curDirection === -1) {
                // Loop back around to 3
                curDirection = 3;
            }
            lastKeyPressTime = millis();
        }

        // First loop: display the tiles
        for (let i = 0; i < tile_arr_size; i++) {
            for (let j = 0; j < tile_arr_size; j++) {
                tileArr[i][j].display(tileArr[i][j].sprite);

                // Hover highlighting
                if (tgc.x == i && tgc.y == j && tileArr[i][j].sprite == roadTile) {
                    tileArr[i][j].display(roadHighlightedTile);
                } else {
                    tileArr[i][j].display(tileArr[i][j].sprite);
                }
            }
        }

        // Check to make sure that the new position of the character does not
        // violate game rules (e.g. character cannot go onto broken sidewalk tiles)
        if (movementIsValid(characterX, characterY, newCharacterX, newCharacterY)) {
            characterX = newCharacterX;
            characterY = newCharacterY;
        }

        // console.log(`characterX: ${characterX}`);
        // console.log(`characterY: ${characterY}`);

        // Second loop: display the character
        let tsc = tileArr[characterX][characterY];

        if (tsc.sprite !== null && tsc.sprite !== undefined) {
            let tsc = tileArr[characterX][characterY];
            // console.log(`Inside the if tsc is: ${tsc}`);

            switch (curDirection) {
                case 0:
                    image(backward, tsc.x_screen, tsc.y_screen);
                    break;
                case 1:
                    image(left, tsc.x_screen, tsc.y_screen);
                    break;
                case 2:
                    image(forward, tsc.x_screen, tsc.y_screen);
                    break;
                case 3:
                    image(right, tsc.x_screen, tsc.y_screen);
                    break;
            }
        }

        /****** Draw the goal tile with a arrow sprite floating over it ******/
        let endingTile = tileArr[endingTileIndex.x][endingTileIndex.y];
        animation(floatingArrowAni, endingTile.x_screen, endingTile.y_screen - 32);

        drawPopUp();

        /**** For debugging the pose classifier *****/
        // Uncomment for seeing each prediction drawn on the screen
        // for easy debugging
        push();
        translate(video.width, 0);
        scale(-1, 1);

        // For debugging the pose classifier:
        if (pose) {
          for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(0);

            line(a.position.x, a.position.y, b.position.x, b.position.y);
          }
          for (let i = first_keypoint_index; i <= last_keypoint_index; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0);
            stroke(255);
            ellipse(x, y, 16, 16);
          }
        }
        pop();

        toolBar();
    }

    function movementIsValid(prevX, prevY, nextX, nextY) {
        /*
            Checks to see if the character moving from (prevX, prevY) to (nextX, nextY)
            is valid for the wheelchair character to move to
        */

        // Check to make sure that the new coords are valid, if not, then don't
        // allow the player to move to that tile
        let tileType_playerIsOn = tileArr[prevX][prevY].type;
        let tileType_nextTile = tileArr[nextX][nextY].type;

        // check redundancy later here
        if (tileType_nextTile == "road" && tileType_playerIsOn == "sidewalk_corner_curbRamp") {
            return true;
        }

        if (tileType_nextTile == "sidewalk_corner_curbRamp" && tileType_playerIsOn == "road") {
            return true;
        }

        if (tileType_nextTile == "road" && tileType_playerIsOn == "road") {
            return true;
        }

        if (tileType_nextTile == "sidewalk_corner_curbRamp") {
            return true;
        }

        // If the next tile is the ending tile, that
        if (tileType_nextTile == "sidewalk_corner_curbRamp") {
            return true;
        }

        // I think we only want to walk on sidwalk no?
        if (tileType_playerIsOn != "road" &&
            (tileType_nextTile === "sidewalk" || tileType_nextTile === "sidewalk_corner")
            || tileType_nextTile === "endpoint") {
            return true;
        }

        // If we got here, then the movement is not allowed
        return false;
    }

    this.mouseClicked = function() {
        let {
            x: tgc_x,
            y: tgc_y
        } = screenToGridCoords({
            x: mouseX,
            y: mouseY
        });
        if (!isValidGridCoords(tgc_x, tgc_y)) {
            return;
        }

        /* Type can either be
            - decoration (grass, house, etc)
            - road
            - sidewalk
            - broken_sidewalk
            - sidewalk_corner
            - sidewalk_corner_curbRamp
        */
        /* Orientation can either be
            - normal (rotated 0 degrees)
            - rotated90
            - rotated180
            - rotated270
        */
        // TODO: Make a fixed_sidewalk sprite
        tile_type = tileArr[tgc_x][tgc_y].type;
        tile_orientation = tileArr[tgc_x][tgc_y].orientation;

        // Depending on what type of tile you clicked on,
        // update the sprite accordingly
        if (tile_type === "broken_sidewalk" && tools[currentToolIndex] === toolFixSideWalk) {
            // If broken sidewalk is clicked, then
            // repair to make fixed sidewalk
            updateTileType(tgc_x, tgc_y, "sidewalk");

            sidewalk_fixed_count += 1;

            // Check to see this tile's orientation to make sure we
            // place down the right sprite
            if (tile_orientation === "normal") {
                updateTileSprite(tgc_x, tgc_y, sidewalk);
            } else if (tile_orientation === "rotated180") {
                updateTileSprite(tgc_x, tgc_y, sidewalkRotated180);
            }
        } else if (tile_type === "sidewalk_corner" && tools[currentToolIndex] === toolBuildCurb) {
            // If sidewalk corner is clicked, then
            // replace with curb ramp
            updateTileType(tgc_x, tgc_y, "sidewalk_corner_curbRamp");

            curb_fixed_count += 1;

            // Check to see this tile's orientation to make sure we
            // place down the right sprite
            if (tile_orientation === "normal") {
                updateTileSprite(tgc_x, tgc_y, sidewalkCurbRampTopLeft);
            } else if (tile_orientation === "rotated90") {
                updateTileSprite(tgc_x, tgc_y, sidewalkCurbRampBotLeft);
            } else if (tile_orientation === "rotated180") {
                updateTileSprite(tgc_x, tgc_y, sidewalkCurbRampBotRight);
            } else {
                updateTileSprite(tgc_x, tgc_y, sidewalkCurbRampTopRight);
            }
        }
    }


    this.keyPressed = function() {
        // FUTURE FEATURE: rotation
        // if (key === 'r') {
        //     tileArr = rotateMatrixClockwise(tileArr);
        // }

        if (key === 't') {
            // Cycle to the next tool in our tools array (and wrap back around if
            // we have reached the end of our tools array)
            currentToolIndex = (currentToolIndex + 1) % tools.length;

            // TODO: Change the cursor to an image that matches the current tool
            // type can either be predefined image or path to image
            // cursor(type, x, y)

        }
    }

    // this.keyReleased = function() {

    //     // why is the player not showing up?

    //     // it seems to be a reference issue
    //     let playerSprite_newTcgCords_x = playerSprite_curTgc.x;
    //     let playerSprite_newTcgCords_y = playerSprite_curTgc.y;
    //     if (key === 'w') {
    //         playerSprite_newTcgCords_y -= 1;
    //     } else if (key === 's') {
    //         playerSprite_newTcgCords_y += 1;
    //     } else if (key === 'a') {
    //         playerSprite_newTcgCords_x -= 1;
    //     } else if (key === 'd') {
    //         playerSprite_newTcgCords_x += 1;
    //     }

        // // Check to make sure that the new coords are valid, if not, then don't
        // // allow the player to move to that tile
        // let tileType_playerIsOn = tileArr[playerSprite_curTgc.x][playerSprite_curTgc.y].type;
        // let tileType_nextTile = tileArr[playerSprite_newTcgCords_x][playerSprite_newTcgCords_y].type;

    //     // console.log(`\nCurrent tile: ${tileType_playerIsOn}`);
    //     // console.log(`Next tile: ${tileType_nextTile}`);

    //     // console.log(`tileType_nextTile !== "broken_sidewalk": ${tileType_nextTile !== "broken_sidewalk"}`);
    //     // console.log(`tileType_nextTile !== "grass": ${tileType_nextTile !== "grass"}`);
    //     // console.log(`(tileType_nextTile !== "road" && tileType_playerIsOn !== "sidewalk_corner") : ${(tileType_nextTile !== "road" && tileType_playerIsOn !== "sidewalk_corner") }`);
    //     // console.log(`(tileType_nextTile !== "sidewalk_corner" && tileType_playerIsOn !== "road"): ${(tileType_nextTile !== "sidewalk_corner" && tileType_playerIsOn !== "road")}`);
    //     // console.log(`(tileType_nextTile !== "sidewalk" && tileType_playerIsOn !== "road"): ${(tileType_nextTile !== "sidewalk" && tileType_playerIsOn !== "road")}`);


    //     // check redundancy later here
    //     if (tileType_nextTile == "road" && tileType_playerIsOn == "sidewalk_corner_curbRamp") {
    //         playerSprite_curTgc.x = playerSprite_newTcgCords_x;
    //         playerSprite_curTgc.y = playerSprite_newTcgCords_y;
    //         return;
    //     }

    //     if (tileType_nextTile == "sidewalk_corner_curbRamp" && tileType_playerIsOn == "road") {
    //         playerSprite_curTgc.x = playerSprite_newTcgCords_x;
    //         playerSprite_curTgc.y = playerSprite_newTcgCords_y;
    //         return;
    //     }

    //     if (tileType_nextTile == "road" && tileType_playerIsOn == "road") {
    //         playerSprite_curTgc.x = playerSprite_newTcgCords_x;
    //         playerSprite_curTgc.y = playerSprite_newTcgCords_y;
    //         return;
    //     }

    //     if (tileType_nextTile == "sidewalk_corner_curbRamp") {
    //         playerSprite_curTgc.x = playerSprite_newTcgCords_x;
    //         playerSprite_curTgc.y = playerSprite_newTcgCords_y;
    //         return;
    //     }

    //     // I think we only want to walk on sidwalk no?
    //     if (tileType_playerIsOn != "road" &&
    //         (tileType_nextTile == "sidewalk" || tileType_nextTile == "sidewalk_corner")) {
    //         console.log("The movement has been allowed...");
    //         playerSprite_curTgc.x = playerSprite_newTcgCords_x;
    //         playerSprite_curTgc.y = playerSprite_newTcgCords_y;
    //     }
    // }

    function rotateMatrixClockwise(matrix) {
        let rotatedMatrix = new Array(tile_arr_size).fill(null).map(() => new Array(tile_arr_size).fill(null));

        for (let i = 0; i < tile_arr_size; i++) {
            for (let j = 0; j < tile_arr_size; j++) {
                let newX = j;
                let newY = tile_arr_size - 1 - i;
                let tile = matrix[i][j];
                let screenCoord = toScreenCoords({
                    x: newX,
                    y: newY
                });
                rotatedMatrix[newX][newY] = new TileClass(newX, newY, screenCoord.x, screenCoord.y, tile.sprite);
            }
        }
        return rotatedMatrix;
    }

    // Helper function to check if grid coordinates are within bounds
    function isValidGridCoords(tgc_x, tgc_y) {
        return tgc_x >= 0 && tgc_x < tile_arr_size && tgc_y >= 0 && tgc_y < tile_arr_size;
    }

    // Helper function to update tile sprite
    function updateTileSprite(tgc_x, tgc_y, sprite) {
        tileArr[tgc_x][tgc_y].sprite = sprite;
    }

    // Helper function to update tile type
    function updateTileType(tgc_x, tgc_y, type) {
        tileArr[tgc_x][tgc_y].type = type;
    }

    function invertMatrix(a, b, c, d) {
        /*
          Invert a 2d matrix, with a, b, c, and d being
          [ a  b ]
          [ c  d ]
        */
        const det = (1 / (a * d - b * c));

        return {
            a: det * d,
            b: det * -b,
            c: det * -c,
            d: det * a,
        }
    }

    function toGridCoords(screen) {
        const a = i_x * 0.5 * w;
        const b = j_x * 0.5 * w;
        const c = i_y * 0.5 * h;
        const d = j_y * 0.5 * h;

        const inv = invertMatrix(a, b, c, d);

        return {
            // offset mouse cursor to align with block
            x: screen.x * inv.a + screen.y * inv.b - 25.75,
            y: screen.x * inv.c + screen.y * inv.d + 4.15,
        }
    }

    function toScreenCoords(tile) {
        return {
            x: tile.x * i_x * 0.5 * w + tile.y * j_x * 0.5 * w,
            y: tile.x * i_y * 0.5 * h + tile.y * j_y * 0.5 * h,
        }
    }

    // Helper function to convert screen coordinates to grid coordinates
    function screenToGridCoords(screen) {
        let tgc = toGridCoords(screen);
        return {
            x: Math.floor(tgc.x),
            y: Math.floor(tgc.y)
        };
    }

    /****** POSE CLASSIFIER HELPER FUNCTIONS ******/
    function brainLoaded() {
        console.log('pose classification ready!');
        classifyPose();
    }

    function classifyPose() {
        // console.log("We are in classifyPose");
        if (pose) {
        // console.log("We got a pose to classify!");
        // console.log(pose);
        let inputs = [];
        for (let i = first_keypoint_index; i <= last_keypoint_index; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
        }
        brain.classify(inputs, gotResult);
        } else {
        setTimeout(classifyPose, 100);
        }
    }

    function gotResult(error, results) {
        if (results[0].confidence > 0.75) {
            poseLabel = results[0].label.toUpperCase();
        }
        // console.log("Do we ever call gotResult?");
        console.log(poseLabel);
        classifyPose();
    }

    function gotPoses(poses) {
        // console.log("Did we get any poses??");
        // console.log(poses);
        if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
        if (state == 'collecting') {
            let inputs = [];
            for (let i = first_keypoint_index; i <= last_keypoint_index; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
            }
            let target = [targetLabel];
            brain.addData(inputs, target);
        }
        }
    }

    function modelLoaded() {
        console.log('poseNet ready');
    }

    function toolBar() {
        // console.log(currentToolIndex);
        fill(20, 100, 88);
        noStroke();
        rect(toolBarStart, toolBarYOffSet, toolBarWidth, toolBarHeight);
        stroke(0, 0, 0);
        strokeWeight(2);
        noFill();
        square(toolBarStart + 64 * currentToolIndex, toolBarYOffSet, toolBarHeight);
        imageMode(CENTER);
        for (let i = 0; i < tools.length; i++) {
            image(tools[i], toolBarStart + 32 + 64 * i, toolBarHeight / 2 + toolBarYOffSet, 64, 64);
        }
    }
    function drawPopUp() {
        // depending on how many side walks / curb ramps have been placed down
        // you can go ahead and try to figure out which text / facts you should
        // display


        // TODO: popuolate with facts here
        scene1Text = "wow";
        scene2Text = "zers";

        if (sidewalk_fixed_count == 1) {
            textLength = scene1Text.length;
            textSize(50);
            rect(-600, -100, 100, 100);

            text(scene1Text, -600, -100, 200, 200)
        } 

        if (curb_fixed_count == 1) {
            textLength = scene2Text.length;
            textSize(50);
            rect(-600, -100, 100, 100);

            text(scene2Text, -600, -100, 200, 200)
        }

        return;
    }

}

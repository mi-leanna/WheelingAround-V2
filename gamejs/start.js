function preload() {
    bkImageWCharacter = loadImage("assets/img/bk.png");
    bkImage = loadImage("assets/img/bkNoCharacter.png");
    bkClouds = loadImage("assets/img/cloudsBackground.jpeg");
    grassTile = loadImage("assets/tile_pngs/grass.png");  // Road
    grassTile = loadImage("assets/tile_pngs/grass.png");  // Road
    roadTile = loadImage("assets/tile_pngs/TileDefault.png");  // Road
    roadHighlightedTile = loadImage("assets/tile_pngs/TileHighlight.png");  // Highlighted Road
    sidewalk = loadImage("assets/tile_pngs/side_walk_normal.png");  // Sidewalk
    sidewalkRotated180 = loadImage("assets/tile_pngs/side_walk_rotated180.png");  // Sidewalk rotated 180
    sidewalkBroken = loadImage("assets/tile_pngs/side_walkBroken_normal.png");  // Broken sidewalk
    sidewalkBrokenRotated180 = loadImage("assets/tile_pngs/side_walkBroken_rotated180.png");  // Broken sidewalk rotated 180
    sidewalkCornerTopLeft = loadImage("assets/tile_pngs/sidewalkCorner_down.png");  // Corner Top Left
    sidewalkCornerBotLeft = loadImage("assets/tile_pngs/sidewalkCorner_left.png");  // Corner Bot Left (rot 90)
    sidewalkCornerBotRight = loadImage("assets/tile_pngs/sidewalkCorner_up.png");  // Corner Bot Right (rot 180)
    sidewalkCornerTopRight = loadImage("assets/tile_pngs/sidewalkCorner_right.png");  // Corner Top Right (rot 270)
    sidewalkCurbRampTopLeft = loadImage("assets/tile_pngs/sidewalkCornerCurbRamp_down.png");  // Corner w Curb Ramp Top Left
    sidewalkCurbRampBotLeft = loadImage("assets/tile_pngs/sidewalkCornerCurbRamp_left.png");  // Corner w Curb Ramp Bot Left (rot 90)
    sidewalkCurbRampBotRight = loadImage("assets/tile_pngs/sidewalkCornerCurbRamp_up.png");  // Corner w Curb Ramp Bot Right (rot 180)
    sidewalkCurbRampTopRight = loadImage("assets/tile_pngs/sidewalkCornerCurbRamp_right.png");  // Corner w Curb Ramp Top Right (rot 270)
    sidewalkEndpoint = loadImage("assets/tile_pngs/side_walkEndpoint_normal.png");
    sidewalkEndpointRotated180 = loadImage("assets/tile_pngs/side_walkEndpoint_rotated180.png");
    roundaboutTile = loadImage("assets/tile_pngs/RoundBout280.png");
    // toolFixSideWalk = loadImage("assets/tile_pngs/sidewalk_fix_tool.png");
    toolFixSideWalk = loadImage("assets/tile_pngs/cement_mixer.png");
    toolBuildCurb = loadImage("assets/tile_pngs/curb_build.png");

    // Player sprite
    forward = loadImage('assets/forward.png');
    backward = loadImage('assets/backward.png');
    left = loadImage('assets/left.png');
    right = loadImage('assets/right.png');

    // Animations
    floatingArrowAni = loadAnimation('assets/sprite_sheets/GoalArrow.png', {frameSize: [64, 64], frames: 15, frameDelay: 5});
}

function setup() {
    bkImage.resize(1920,1080);
    bkClouds.resize(1920, 1080);
    bkImageWCharacter.resize(1920,1080);
    grassTile.resize(64, 64);
    roadTile.resize(64, 64);
    roadHighlightedTile.resize(64, 64);
    sidewalk.resize(64, 64);
    sidewalkRotated180.resize(64, 64);
    sidewalkBroken.resize(64, 64);
    sidewalkBrokenRotated180.resize(64, 64);
    sidewalkCornerTopLeft.resize(64, 64);
    sidewalkCornerBotLeft.resize(64, 64);
    sidewalkCornerBotRight.resize(64, 64);
    sidewalkCornerTopRight.resize(64, 64);
    roundaboutTile.resize(252, 252);
    sidewalkCurbRampTopLeft.resize(64, 64);
    sidewalkCurbRampBotLeft.resize(64, 64);
    sidewalkCurbRampBotRight.resize(64, 64);
    sidewalkCurbRampTopRight.resize(64, 64);
    sidewalkEndpoint.resize(64, 64);
    sidewalkEndpointRotated180.resize(64, 64);
    roundaboutTile.resize(64, 64);
    toolFixSideWalk.resize(64, 64);
    toolBuildCurb.resize(64, 64);

    // 2x size
    // grassTile.resize(128, 128);
    // roadTile.resize(128, 128);
    // roadHighlightedTile.resize(128, 128);
    // sidewalk.resize(128, 128);
    // sidewalkRotated180.resize(128, 128);
    // sidewalkBroken.resize(128, 128);
    // sidewalkBrokenRotated180.resize(128, 128);
    // sidewalkCornerTopLeft.resize(128, 128);
    // sidewalkCornerBotLeft.resize(128, 128);
    // sidewalkCornerBotRight.resize(128, 128);
    // sidewalkCornerTopRight.resize(128, 128);
    // roundaboutTile.resize(252, 252);
    // sidewalkCurbRampTopLeft.resize(128, 128);
    // sidewalkCurbRampBotLeft.resize(128, 128);
    // sidewalkCurbRampBotRight.resize(128, 128);
    // sidewalkCurbRampTopRight.resize(128, 128);
    // sidewalkEndpoint.resize(128, 128);
    // sidewalkEndpointRotated180.resize(128, 128);
    // roundaboutTile.resize(128, 128);
    // toolFixSideWalk.resize(64, 64);
    // toolBuildCurb.resize(64, 64);

    // 1.5x size
    // grassTile.resize(96, 96);
    // roadTile.resize(96, 96);
    // roadHighlightedTile.resize(96, 96);
    // sidewalk.resize(96, 96);
    // sidewalkRotated180.resize(96, 96);
    // sidewalkBroken.resize(96, 96);
    // sidewalkBrokenRotated180.resize(96, 96);
    // sidewalkCornerTopLeft.resize(96, 96);
    // sidewalkCornerBotLeft.resize(96, 96);
    // sidewalkCornerBotRight.resize(96, 96);
    // sidewalkCornerTopRight.resize(96, 96);
    // roundaboutTile.resize(252, 252);
    // sidewalkCurbRampTopLeft.resize(96, 96);
    // sidewalkCurbRampBotLeft.resize(96, 96);
    // sidewalkCurbRampBotRight.resize(96, 96);
    // sidewalkCurbRampTopRight.resize(96, 96);
    // sidewalkEndpoint.resize(96, 96);
    // sidewalkEndpointRotated180.resize(96, 96);
    // roundaboutTile.resize(96, 96);
    // toolFixSideWalk.resize(64, 64);
    // toolBuildCurb.resize(64, 64);

    // player sprite
    // 1x size
    // forward.resize(64, 128);
    // backward.resize(64, 128);
    // left.resize(64, 128);
    // right.resize(64, 128);
    
    // 1.5x size
    // forward.resize(96, 192);
    // backward.resize(96, 192);
    // left.resize(96, 192);
    // right.resize(96, 192);

    createCanvas(bkImage.width, bkImage.height);

    var mgr = new SceneManager();
    mgr.bkImage = bkImageWCharacter; // inject bkImage property
    mgr.wire();
    mgr.showScene(Intro);
}
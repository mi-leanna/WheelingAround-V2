// Class representing the properties of an isometric
// game tile. x/y grid represent coordinates in the matrix
// while x/y screen represent coordinates in relation to the
// computer screen resolution
class TileClass {
    constructor(x_grid, y_grid, x_screen, y_screen, sprite, type, orientation) {
        // Grid coordinates of the tile
        this.x_grid = x_grid;
        this.y_grid = y_grid;

        // Screen coordinates of the tile
        this.x_screen = x_screen;
        this.y_screen = y_screen;

        // The sprite representing the tile
        this.sprite = sprite;

        /* Type of the tile, can be:
            - decoration (grass, house, etc)
            - road
            - sidewalk
            - broken_sidewalk
            - sidewalk_corner
            - sidewalk_corner_curbRamp
        */
        this.type = type;

        /* Orientation of the tile, can be:
            - normal (rotated 0 degrees)
            - rotated90
            - rotated180
            - rotated270
        */
        this.orientation = orientation;

        // Flag to track the visibility of the character on the tile
        this.visible = true;
    }

    // Display the tile's sprite at its screen coordinates
    display() {
        image(this.sprite, this.x_screen, this.y_screen);
    }

    // Display the character sprite on top of the tile's sprite if visible
    displayCharacter(characterSprite) {
        if (this.visible) {
            image(characterSprite, this.x_screen, this.y_screen);
        }
    }

    // Toggle the visibility of the character on the tile
    toggleVisibility() {
        this.visible = !this.visible;
    }
}

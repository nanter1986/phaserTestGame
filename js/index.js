/// <reference path="phaser.d.ts" />
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'content', {
            preload: this.preload, create: this.create, update: this.update,
            render: this.render
        });
    }
    SimpleGame.prototype.collectStar = function (s, star) {
    };
    SimpleGame.prototype.preload = function () {
        this.game.load.tilemap("myMap", "assets/myMap.csv", null, Phaser.Tilemap.CSV);
        this.game.load.image("tiles", "assets/tiles.png");
        this.game.load.image("man", "assets/man.png");
        this.game.load.image("sky", "assets/sky.jpg");
        this.game.load.image("coin", "assets/coin.png");
        this.game.load.image("house", "assets/house.png");
        this.game.load.spritesheet('characters', 'assets/characters.png', 32, 32);
    };
    SimpleGame.prototype.create = function () {
        this.map = this.game.add.tilemap("myMap", 8, 8);
        this.map.addTilesetImage("tiles");
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(54, 83);
        this.game.world.setBounds(0, 0, 10000, 10000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.game.add.sprite(0, 0, "sky");
        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 120; i++) {
            var star = this.stars.create(i * 70, 0, 'coin');
            //star.body.gravity.y = 12;
            //star.body.bounce.y = 0.7 + Math.random() * 0.2;
            star.scale.setTo(0.1, 0.1);
            star.body.collideWorldBounds = true;
        }
        this.s = this.game.add.sprite(0, 0, "characters");
        //this.s.scale.setTo(3, 3);
        this.s.anchor.setTo(0.5, 1);
        this.game.physics.arcade.enable(this.s);
        this.s.body.setSize(10, 14, 5, 7);
        //this.s.body.bounce.y = 0.2;
        //this.s.body.gravity.y = 300;
        this.s.body.collideWorldBounds = true;
        this.s.animations.add('move', [24, 25], 15, true);
        this.s.animations.add('stay', [23], 15, true);
        this.houses = this.game.add.group();
        for (var i = 0; i < 12; i++) {
            this.houses.enableBody = true;
            var house = this.houses.create(i * 500, this.game.world.height, "house");
            house.anchor.setTo(0, 1);
            house.body.immovable = true;
            house.scale.setTo(Math.random() * 0.5, Math.random() * 0.5);
        }
        this.score = 0;
        this.scoreText = this.game.add.text(16, 16, 'score:0', {
            //fontsize: '32px',
            fill: '#000'
        });
        this.game.camera.follow(this.s);
    };
    SimpleGame.prototype.update = function () {
        var _this = this;
        this.game.physics.arcade.collide(this.s, this.layer);
        var hitHouse = this.game.physics.arcade.collide(this.s, this.houses);
        this.s.body.velocity.x = 0;
        this.s.body.velocity.y = 0;
        if (!this.cursors.left.isDown &&
            !this.cursors.down.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.right.isDown) {
            this.s.animations.play("stay");
        }
        if (this.cursors.left.isDown) {
            console.log("forward");
            this.s.body.velocity.x = -150;
            //this.s.scale.setTo(-3, 3);
            this.s.animations.play("move");
        }
        else if (this.cursors.right.isDown) {
            console.log("back");
            this.s.body.velocity.x = 150;
            //this.s.scale.setTo(3, 3);
            this.s.animations.play("move");
        }
        if (this.cursors.up.isDown) {
            console.log("jump");
            this.s.body.velocity.y = -150;
            //this.s.scale.setTo(3, 3);
            this.s.animations.play("move");
        }
        else if (this.cursors.down.isDown) {
            //this.s.scale.setTo(3, 3);
            this.s.animations.play("move");
            console.log("jump");
            this.s.body.velocity.y = 150;
        }
        // else {
        //   this.s.animations.play("stay");
        // }
        this.game.physics.arcade.overlap(this.s, this.stars, function (s, star) {
            star.kill();
            _this.score += 10;
            _this.scoreText.text = 'score: ' + _this.score;
        }, null, this);
    };
    SimpleGame.prototype.render = function () {
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};

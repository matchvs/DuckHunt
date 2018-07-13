var mvs = require("Matchvs");
var GLB = require("Glb");

cc.Class({

    extends: cc.Component,
    properties: {
        health: 0,
        score: 0,
        speed: 0,
        failSpeed: 0,
        audioSource: {
            default: null,
            type: cc.AudioSource
        },
    },

    onLoad() {
        this.anim = this.node.getComponent(cc.Animation);
        this.duckState = DuckState.Fly;
    },

    initData: function(startPos) {
        // todo  飞行路线
        this.node.position = startPos;
    },

    hurt: function(point) {
        this.health -= point;
        if (this.health <= 0) {
            this.dead();
        }
    },

    dead: function() {
        this.anim.stop();
        this.anim.play("dead");
        this.duckState = DuckState.Dead;
        this.getScore();
        this.audioSource.play();

    },

    getScore: function() {
        var msg = {
            action: GLB.SCORE_EVENT,
            score: this.score
        };
        Game.GameManager.sendEventEx(msg);
    },

    update: function(dt) {
        if (this.duckState === DuckState.Dead) {
            this.node.y -= this.failSpeed * dt;
            if (this.node.y < -200) {
                console.log("y destroy");
                this.node.destroy();
            }
        } else {
            this.node.x += Game.DuckManger.flySpeedDelat * this.speed * dt;
            if (Math.abs(this.node.x) > 1200) {
                console.log("x destroy");
                this.node.destroy();
            }
        }
    }
});

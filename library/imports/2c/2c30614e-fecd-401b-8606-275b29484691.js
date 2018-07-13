"use strict";
cc._RF.push(module, '2c306FO/s1AG4YGJ1spSEaR', 'duck');
// common/script/duck.js

"use strict";

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
        }
    },

    onLoad: function onLoad() {
        this.anim = this.node.getComponent(cc.Animation);
        this.duckState = DuckState.Fly;
    },


    initData: function initData(startPos) {
        // todo  飞行路线
        this.node.position = startPos;
    },

    hurt: function hurt(point) {
        this.health -= point;
        if (this.health <= 0) {
            this.dead();
        }
    },

    dead: function dead() {
        this.anim.stop();
        this.anim.play("dead");
        this.duckState = DuckState.Dead;
        this.getScore();
        this.audioSource.play();
    },

    getScore: function getScore() {
        var msg = {
            action: GLB.SCORE_EVENT,
            score: this.score
        };
        Game.GameManager.sendEventEx(msg);
    },

    update: function update(dt) {
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

cc._RF.pop();
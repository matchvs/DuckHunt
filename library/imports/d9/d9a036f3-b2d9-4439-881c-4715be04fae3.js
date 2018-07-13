"use strict";
cc._RF.push(module, 'd9a03bzstlEOYgcRxW+BPrj', 'player');
// game/script/player.js

"use strict";

var mvs = require("Matchvs");
var GLB = require("Glb");
cc.Class({
    extends: cc.Component,
    properties: {
        label: cc.Label
    },
    init: function init(userId) {
        var _this = this;

        this.playerId = userId;
        this.score = 0;
        if (GLB.userInfo.id === this.playerId) {
            var self = this;
            this.rotateID = setInterval(function () {
                if (Game.GameManager.gameState === GameState.Over) {
                    clearInterval(_this.rotateID);
                } else {
                    if (Game.GameManager.gameState === GameState.Play) {
                        mvs.engine.sendFrameEvent(JSON.stringify({
                            action: GLB.PLAYER_ROTATION_EVENT,
                            rotation: self.node.rotation
                        }));
                    }
                }
            }, 200);
        }
    },

    start: function start() {
        this.targetRotation = this.node.rotation;
    },

    setRotation: function setRotation(rotation) {
        this.targetRotation = rotation;
    },
    addScore: function addScore(score) {
        this.score += score;
        this.label.string = this.score;
    },
    update: function update(dt) {
        if (GLB.userInfo.id !== this.playerId) {
            this.node.rotation = cc.lerp(this.node.rotation, this.targetRotation, 10 * dt);
        }
    },
    onDestroy: function onDestroy() {
        clearInterval(this.rotateID);
    }
});

cc._RF.pop();
var mvs = require("Matchvs");
var GLB = require("Glb");
cc.Class({
    extends: cc.Component,
    properties: {
        label: cc.Label
    },
    init: function(userId) {
        this.playerId = userId;
        this.score = 0;
        if (GLB.userInfo.id === this.playerId) {
            var self = this;
            this.rotateID = setInterval(() => {
                if (Game.GameManager.gameState === GameState.Over) {
                    clearInterval(this.rotateID);
                } else {
                    if(Game.GameManager.gameState === GameState.Play) {
                        mvs.engine.sendFrameEvent(JSON.stringify({
                            action: GLB.PLAYER_ROTATION_EVENT,
                            rotation: self.node.rotation
                        }));
                    }
                }
            }, 200);
        }
    },

    start: function() {
        this.targetRotation = this.node.rotation;
    },

    setRotation(rotation) {
        this.targetRotation = rotation;
    },

    addScore(score) {
        this.score += score;
        this.label.string = this.score;
    },

    update(dt) {
        if (GLB.userInfo.id !== this.playerId) {
            this.node.rotation = cc.lerp(this.node.rotation, this.targetRotation, 10 * dt);
        }
    },

    onDestroy() {
        clearInterval(this.rotateID);
    }

});

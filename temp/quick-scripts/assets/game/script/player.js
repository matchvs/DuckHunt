(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/game/script/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd9a03bzstlEOYgcRxW+BPrj', 'player', __filename);
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
            this.node.rotation = this.lerp(this.node.rotation, this.targetRotation, 10 * dt);
        }
    },
    lerp: function lerp(a, b, r) {
        return a + (b - a) * r;
    },
    onDestroy: function onDestroy() {
        clearInterval(this.rotateID);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=player.js.map
        
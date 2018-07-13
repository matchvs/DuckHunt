"use strict";
cc._RF.push(module, '5abc5w9mw1LQ4nMtJOjaNP1', 'playerManager');
// game/script/playerManager.js

"use strict";

var mvs = require("Matchvs");
var GLB = require("Glb");
cc.Class({
    extends: cc.Component,

    properties: {
        playerNodes: [cc.Node],
        scoreLbs: [cc.Node]
    },

    onLoad: function onLoad() {
        Game.PlayerManager = this;
        this.players = [];
        clientEvent.on(clientEvent.eventType.gameStart, this.initPlayers, this);
    },


    // 初始化玩家--
    initPlayers: function initPlayers() {
        var uiGamePanel = uiFunc.findUI("uiGamePanel");
        if (!uiGamePanel) {
            return;
        }

        for (var i = 0; i < this.playerNodes.length; i++) {
            var player = this.playerNodes[i];
            if (GLB.playerUserIds.length > i) {
                var playerScript = player.getComponent("player");
                if (playerScript) {
                    playerScript.init(GLB.playerUserIds[i]);
                }
                this.players.push(player);
                this.scoreLbs[i].active = true;
            } else {
                player.active = false;
                this.scoreLbs[i].active = false;
            }
        }
    },

    getPlayerByUserId: function getPlayerByUserId(userId) {
        for (var i = 0; i < GLB.playerUserIds.length; i++) {
            if (GLB.playerUserIds[i] === userId && this.players && this.players[i]) {
                return this.players[i].getComponent("player");
            }
        }
        return null;
    },

    onDestroy: function onDestroy() {
        clientEvent.off(clientEvent.eventType.gameStart, this.initPlayers, this);
    }
});

cc._RF.pop();
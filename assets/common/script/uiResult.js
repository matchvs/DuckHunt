var uiPanel = require("uiPanel");
var mvs = require("Matchvs");
var GLB = require("Glb");
cc.Class({
    extends: uiPanel,

    properties: {
        winAudio: {
            default: null,
            url: cc.AudioClip
        },

        loseAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    onLoad() {
        this._super();

        this.player1 = this.nodeDict["player1"].getComponent("resultPlayerIcon");
        this.player1.node.active = false;
        this.player2 = this.nodeDict["player2"].getComponent("resultPlayerIcon");
        this.player2.node.active = false;
        this.player3 = this.nodeDict["player3"].getComponent("resultPlayerIcon");
        this.player3.node.active = false;
        this.nodeDict["quit"].on("click", this.quit, this);
    },

    setData: function(data) {
        if (data.length > 0) {
            this.player1.setData(data[0]);
            this.player1.node.active = true;
            if (data.length > 1) {
                this.player2.setData(data[1]);
                this.player2.node.active = true;
            }
            if (data.length > 2) {
                this.player3.setData(data[2]);
                this.player3.node.active = true;
            }
        }

        if (data[0] === GLB.userInfo.id) {
            cc.audioEngine.play(this.winAudio, false, 1);
            // 发送胜局记录--
            Game.GameManager.loginServer();
        } else {
            cc.audioEngine.play(this.loseAudio, false, 1);
        }
    },


    quit: function() {
        mvs.engine.leaveRoom("");
        var gamePanel = uiFunc.findUI("uiGamePanel");
        if (gamePanel) {
            uiFunc.closeUI("uiGamePanel");
            gamePanel.destroy();
        }
        uiFunc.closeUI(this.node.name);
        this.node.destroy();


        Game.GameManager.lobbyShow();
    }
});

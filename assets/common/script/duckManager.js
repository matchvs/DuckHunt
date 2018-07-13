// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var mvs = require("Matchvs");
var GLB = require("Glb");
const duck = require('duck');

cc.Class({

    extends: cc.Component,
    properties: {
        accCd: 10,
        accPercent: 1.1,
        ducks: [cc.Prefab],
        spawnPos: [cc.Vec2]
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Game.DuckManger = this;
        this.curAccCd = this.accCd;
        this.flySpeedDelat = 1;
        this.duckId = setInterval(this.spawnDuck.bind(this), 2000);
    },

    spawnDuck: function() {
        if (Game.GameManager.gameState === GameState.Play) {
            var randomType = dataFunc.randomNum(0, this.ducks.length - 1);
            var duckTemp = cc.instantiate(this.ducks[randomType]);
            duckTemp.parent = this.node;
            var duckComp = duckTemp.getComponent(duck);
            if (duckComp) {
                duckComp.initData(this.spawnPos[randomType]);
            }
        }
    },

    update(dt) {
        this.curAccCd -= dt;
        if (this.curAccCd < 0) {
            this.curAccCd = this.accCd;
            this.flySpeedDelat *= this.accPercent;
        }
    },

    onDestroy() {
        clearInterval(this.duckId);
    }
});

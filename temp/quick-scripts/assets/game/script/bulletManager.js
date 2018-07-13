(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/game/script/bulletManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '07e38UCzDFNWLMtMQvOMZOA', 'bulletManager', __filename);
// game/script/bulletManager.js

"use strict";

var mvs = require("Matchvs");
var GLB = require("Glb");
cc.Class({

    extends: cc.Component,
    properties: {
        smallBulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        bigBulletPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function onLoad() {
        Game.BulletManager = this;
        this.smallBulletCnt = 10;
        // 子弹池--
        this.smallBulletPool = new cc.NodePool();
        this.bigBulletPool = new cc.NodePool();
    },


    loadBullet: function loadBullet() {
        this.smallBulletCnt = 10;
    },

    spawnSmallBullet: function spawnSmallBullet(host, pos) {
        var temp = this.smallBulletPool.get();
        if (!temp) {
            temp = cc.instantiate(this.smallBulletPrefab);
        }
        var bulletComponent = temp.getComponent("bullet");
        if (bulletComponent) {
            bulletComponent.initData(host, pos);
        }
    },

    spawnBigBullet: function spawnBigBullet(host, pos) {
        var temp = this.bigBulletPool.get();
        if (!temp) {
            temp = cc.instantiate(this.bigBulletPrefab);
        }
        var bulletComponent = temp.getComponent("bullet");
        if (bulletComponent) {
            bulletComponent.initData(host, pos);
        }
    },

    recycleBullet: function recycleBullet(bullet) {
        if (bullet.bType === BulletType.Normal) {
            this.smallBulletPool.put(bullet.node);
        } else {
            this.bigBulletPool.put(bullet.node);
        }
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
        //# sourceMappingURL=bulletManager.js.map
        
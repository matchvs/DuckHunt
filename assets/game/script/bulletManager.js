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


    onLoad() {
        Game.BulletManager = this;
        this.smallBulletCnt = 10;
        // 子弹池--
        this.smallBulletPool = new cc.NodePool();
        this.bigBulletPool = new cc.NodePool();

    },

    loadBullet: function() {
        this.smallBulletCnt = 10;
    },

    spawnSmallBullet: function(host, pos) {
        var temp = this.smallBulletPool.get()
        if (!temp) {
            temp = cc.instantiate(this.smallBulletPrefab);
        }
        var bulletComponent = temp.getComponent("bullet");
        if (bulletComponent) {
            bulletComponent.initData(host, pos);
        }
    },

    spawnBigBullet: function(host, pos) {
        var temp = this.bigBulletPool.get()
        if (!temp) {
            temp = cc.instantiate(this.bigBulletPrefab);
        }
        var bulletComponent = temp.getComponent("bullet");
        if (bulletComponent) {
            bulletComponent.initData(host, pos);
        }
    },

    recycleBullet: function(bullet) {
        if (bullet.bType === BulletType.Normal) {
            this.smallBulletPool.put(bullet.node);
        } else {
            this.bigBulletPool.put(bullet.node);
        }
    },
});

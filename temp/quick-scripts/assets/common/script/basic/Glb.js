(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/common/script/basic/Glb.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '27c7bfdkgdEMoYQr2pit3ne', 'Glb', __filename);
// common/script/basic/Glb.js

"use strict";

var obj = {
    RANDOM_MATCH: 1, // 随机匹配
    PROPERTY_MATCH: 2, // 属性匹配
    MAX_PLAYER_COUNT: 3,
    PLAYER_COUNTS: [1, 2, 3],
    COOPERATION: 1,
    COMPETITION: 2,
    GAME_START_EVENT: "gameStart",
    GAME_TIME: "gameTime",
    PLAYER_FIRE_EVENT: "playerFire",
    PLAYER_ROTATION_EVENT: "playerRotation",
    GAME_OVER_EVENT: "gameOver",
    SCORE_EVENT: "score",
    ROUND_START: "roundStart",
    READY: "ready",
    channel: 'MatchVS',
    platform: 'alpha',
    IP: "wxrank.matchvs.com",
    PORT: "3010",
    gameId: 201331,
    gameVersion: 1,
    appKey: '17ffc6d5f1e14a04b99c4bf17addc411',
    secret: '4cc0d042cd5547e98860728bb3207650',

    gameType: 1,
    matchType: 1,
    tagsInfo: { "title": "A" },
    userInfo: null,
    playerUserIds: [],
    playerSet: new Set(),
    isRoomOwner: false,
    events: {},

    syncFrame: true,
    FRAME_RATE: 5,
    roomId: 0,
    playertime: 180,
    isGameOver: false
};
module.exports = obj;

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
        //# sourceMappingURL=Glb.js.map
        
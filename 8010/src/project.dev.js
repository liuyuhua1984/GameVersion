require = function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n || e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = "function" == typeof require && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }
  return e;
}()({
  BJLSlideshow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6aad6AxxUpHjbGJ6CEbSqZF", "BJLSlideshow");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BJLSlideshow = function(_super) {
      __extends(BJLSlideshow, _super);
      function BJLSlideshow() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._message = null;
        _this._isCarouselSuccess = null;
        _this._width = 0;
        return _this;
      }
      BJLSlideshow.prototype.onLoad = function() {};
      BJLSlideshow.prototype.init = function() {
        this._message = [];
        this._isCarouselSuccess = true;
        this._width = 0;
      };
      BJLSlideshow.prototype.show = function() {
        this.node.active = true;
      };
      BJLSlideshow.prototype.hide = function() {
        this.node.active = false;
      };
      BJLSlideshow.prototype.setData = function(d) {
        this._message || this.init();
        this._width = this.node.getContentSize().width;
        this._message.push(d.content);
        this.show();
        this._isCarouselSuccess && this.createLabel();
      };
      BJLSlideshow.prototype.createLabel = function() {
        var _this = this;
        this._isCarouselSuccess = false;
        var text = this._message.shift();
        var label = this.node.getChildByName("mask").getChildByName("serviceinfor");
        label.setPositionX(.5 * this._width);
        label.getComponent(cc.RichText).string = text;
        var showLen = .5 * this._width + label.width;
        var time = showLen / 100;
        var moveBy = cc.moveTo(time, cc.p(-showLen, 0));
        var callback = cc.callFunc(function() {
          if (_this._message.length < 1) {
            _this.hide();
            _this._isCarouselSuccess = true;
          } else _this.createLabel();
        });
        label.runAction(cc.sequence(moveBy, cc.delayTime(.01), callback));
      };
      BJLSlideshow = __decorate([ ccclass ], BJLSlideshow);
      return BJLSlideshow;
    }(cc.Component);
    exports.default = BJLSlideshow;
    cc._RF.pop();
  }, {} ],
  ChipLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c982e+ONBD+aNe4WvW9LWt", "ChipLayout");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChipLayout = function(_super) {
      __extends(ChipLayout, _super);
      function ChipLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._callback = null;
        _this._chipIdx = 0;
        _this._betsArr = null;
        _this._chipBtnLen = null;
        _this._enterMoney = null;
        return _this;
      }
      ChipLayout.prototype.onLoad = function() {
        this._betsArr = [];
      };
      ChipLayout.prototype.show = function(callback, chipLen) {
        callback && (this._callback = callback);
        this._chipBtnLen = 5;
        chipLen && (this._chipBtnLen = chipLen);
        this.createChipBtn();
      };
      ChipLayout.prototype.idWatch = function(num) {
        num >= 0 && (this._enterMoney = num);
        if (this._enterMoney > cc.PlayerData.getMoney()) {
          this.node.getChildByName("chip_btn").active = false;
          this.node.getChildByName("tis").active = true;
          this.node.getChildByName("tis").getComponent(cc.Label).string = this._enterMoney;
          return true;
        }
        this.node.getChildByName("chip_btn").active = true;
        this.node.getChildByName("tis").active = false;
        return false;
      };
      ChipLayout.prototype.setTis = function(isBanker) {
        if (this.idWatch(-1)) return;
        if (isBanker) {
          this.node.getChildByName("chip_btn").active = false;
          this.node.getChildByName("tis").active = true;
          this.node.getChildByName("tis").getComponent(cc.Label).string = "您正在当庄";
        } else {
          this.node.getChildByName("chip_btn").active = true;
          this.node.getChildByName("tis").active = false;
        }
      };
      ChipLayout.prototype.createChipBtn = function() {
        var me = this;
        me._chipIdx = 0;
        var chipBtn = me.node.getChildByName("chip_btn");
        var selectImg = chipBtn.getChildByName("selected");
        var _loop_1 = function(i) {
          var btn = chipBtn.getChildByName("btn_" + i);
          btn.on(cc.Node.EventType.TOUCH_END, function() {
            if (me._chipIdx === i) return;
            var gameID = cc.Utils.getGameIdByRoomId(cc.PlayerData.getRoomID());
            cc.AudioManager.playSFX("resources/" + gameID + "/audio/clip_chip_btn.wav");
            selectImg.setPosition(cc.p(this.x, this.y + 4));
            me._chipIdx = i;
            me._callback && me._callback({
              idx: i
            });
          }, btn);
          btn.getComponent(cc.Button).interactable = false;
        };
        for (var i = 0; i < me._chipBtnLen; i++) _loop_1(i);
      };
      ChipLayout.prototype.getChipIdx = function() {
        return this._chipIdx;
      };
      ChipLayout.prototype.setChipBtnNum = function(arr) {
        this._betsArr = arr;
        var chipBtn = this.node.getChildByName("chip_btn");
        for (var i = 0; i < this._chipBtnLen; i++) {
          chipBtn.getChildByName("btn_" + i).getChildByName("num").getComponent(cc.Label).string = this.changeNumType(arr[i]);
          if (Number(cc.PlayerData.getMoney()) >= Number(arr[i])) {
            var pos = chipBtn.getChildByName("btn_" + i).getPosition();
            chipBtn.getChildByName("selected").setPosition(cc.p(pos.x, pos.y + 4));
            this._chipIdx = i;
          }
        }
      };
      ChipLayout.prototype.startBet = function() {
        if (this._enterMoney > cc.PlayerData.getMoney()) return this.idWatch(0);
        this.isShowChipBtn(0);
        this.isShowCX(true);
        this.isShowXY(true);
        return false;
      };
      ChipLayout.prototype.stopBet = function() {
        this.isShowChipBtn(-1);
        this.isShowCX(false);
        this.isShowXY(false);
      };
      ChipLayout.prototype.isShowXY = function(isShow) {
        isShow || (isShow = false);
        this.node.getChildByName("chip_btn").getChildByName("bt_replay").getComponent(cc.Button).interactable = isShow;
      };
      ChipLayout.prototype.isShowCX = function(isShow) {
        isShow || (isShow = false);
        this.node.getChildByName("chip_btn").getChildByName("bt_revoke").getComponent(cc.Button).interactable = isShow;
      };
      ChipLayout.prototype.isShowChipBtn = function(num) {
        var chipBtn = this.node.getChildByName("chip_btn");
        -1 !== num && (num = cc.PlayerData.getMoney());
        Number(num) >= Number(this._betsArr[0]) ? chipBtn.getChildByName("selected").active = true : chipBtn.getChildByName("selected").active = false;
        for (var i = this._betsArr.length - 1; i >= 0; i--) {
          if (!chipBtn.getChildByName("btn_" + i)) continue;
          if (num < Number(this._betsArr[i])) {
            chipBtn.getChildByName("btn_" + i).getComponent(cc.Button).interactable = false;
            if (this._chipIdx === i && 0 !== i && -1 !== num) {
              this._chipIdx = i - 1;
              var pos = chipBtn.getChildByName("btn_" + (i - 1)).getPosition();
              chipBtn.getChildByName("selected").setPosition(cc.p(pos.x, pos.y + 4));
            }
          } else chipBtn.getChildByName("btn_" + i).getComponent(cc.Button).interactable = true;
        }
      };
      ChipLayout.prototype.changeNumType = function(num) {
        num = Number(num);
        return num < 1e3 ? num : num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(0) + "k" : (num / 1e4).toFixed(0) + "w";
      };
      ChipLayout.prototype.clientBtn = function(event) {
        switch (event.target.name) {
         case "bt_addcoin":
          break;

         default:
          this._callback && this._callback({
            btn: event.target.name
          });
        }
      };
      ChipLayout.prototype.getCurChipIndex = function() {
        return this._chipIdx;
      };
      ChipLayout = __decorate([ ccclass ], ChipLayout);
      return ChipLayout;
    }(cc.Component);
    exports.default = ChipLayout;
    cc._RF.pop();
  }, {} ],
  ChipNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25e8ctGDuNNm5OSSSZ8NdgE", "ChipNode");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bjlUtils_1 = require("./bjlUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChipNode = function(_super) {
      __extends(ChipNode, _super);
      function ChipNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chipPlist = null;
        _this._idx = 0;
        return _this;
      }
      ChipNode.prototype.onLoad = function() {};
      ChipNode.prototype.set = function(idx, pos) {
        this.node["rotate"] = 360 * Math.random();
        this.node.scale = .4;
        pos && this.node.setPosition(pos);
        this.setChipValue(idx);
      };
      ChipNode.prototype.setChipValue = function(idx) {
        if (idx >= 0) {
          this._idx = idx;
          this.node.getComponent(cc.Sprite).spriteFrame = this.chipPlist.getSpriteFrame("chip_" + idx);
        }
      };
      ChipNode.prototype.getChipValue = function() {
        return this._idx;
      };
      ChipNode.prototype.flyOut = function(endPos, callback, speed) {
        if (!endPos) return;
        this.node.active = true;
        var pos = this.node.getPosition();
        var dis = Math.abs(cc.pDistance(endPos, pos));
        var time = .0012 * dis;
        speed && (time = dis * speed);
        var moveTo = cc.moveTo(time, endPos);
        moveTo.easing(cc.easeExponentialOut());
        var scaleTo = cc.scaleTo(time, .7);
        var angle = bjlUtils_1.default.getInstance().random(-50, 50);
        var action = cc.spawn(moveTo, scaleTo, cc.rotateBy(time, angle));
        var rotate = cc.rotateBy(.2, angle);
        rotate.easing(cc.easeExponentialOut());
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(action, rotate, cc.callFunc(function() {
          callback && callback();
        })));
      };
      ChipNode.prototype.flyIn = function(pos, speed, callback) {
        var me = this;
        var dis = Math.abs(cc.pDistance(this.node.position, pos));
        var time = .0015 * dis;
        speed && -1 !== speed && (time = dis * speed);
        var moveTo = cc.moveTo(time, pos);
        var scaleTo = cc.scaleTo(time, .5);
        var spawn = cc.spawn(moveTo, scaleTo);
        var waitTime = cc.delayTime(.02);
        var callFunc = cc.callFunc(function() {
          callback ? callback() : me.move();
        });
        var seq = cc.sequence(spawn, waitTime, callFunc);
        this.node.stopAllActions();
        this.node.runAction(seq);
      };
      ChipNode.prototype.flyInWithCallback = function(pos, callback, speed) {
        var me = this;
        var dis = Math.abs(cc.pDistance(this.node.position, pos));
        var time = .0015 * dis;
        speed && (time = dis * speed);
        var moveTo = cc.moveTo(time, pos);
        var scaleTo = cc.scaleTo(time, .5);
        var spawn = cc.spawn(moveTo, scaleTo);
        var waitTime = cc.delayTime(.02);
        var callFunc = cc.callFunc(function() {
          callback && callback();
        });
        var seq = cc.sequence(spawn, waitTime, callFunc);
        this.node.stopAllActions();
        this.node.runAction(seq);
      };
      ChipNode.prototype.move = function() {
        this.node.destroy();
      };
      __decorate([ property(cc.SpriteAtlas) ], ChipNode.prototype, "chipPlist", void 0);
      ChipNode = __decorate([ ccclass ], ChipNode);
      return ChipNode;
    }(cc.Component);
    exports.default = ChipNode;
    cc._RF.pop();
  }, {
    "./bjlUtils": "bjlUtils"
  } ],
  GameBarrage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50eb36zBctGOrfUM8FgnFNX", "GameBarrage");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameBarrage = function(_super) {
      __extends(GameBarrage, _super);
      function GameBarrage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemWaitting = [];
        _this.itemList = [];
        _this.messageList = [];
        _this.showStep = .3;
        return _this;
      }
      GameBarrage.prototype.onLoad = function() {
        var listitem = this.node.getChildByName("list");
        for (var index = 0; index < listitem.children.length; index++) {
          var items = listitem.children[index];
          this.itemWaitting.push(items);
        }
        Number(cc.sys.localStorage.getItem("barrageState")) > 0 || this.switchBarrage(false);
      };
      GameBarrage.prototype.switchBarrage = function(switchs) {
        void 0 === switchs && (switchs = true);
        var bg = this.node.getChildByName("bg");
        if (!switchs) {
          bg.active = false;
          this.unschedule(this.performBarrage);
          this.showMoveBarrage(false);
          this.messageList = [];
        }
        this.node.active = switchs;
      };
      GameBarrage.prototype.wsReceived = function(d) {
        Number(cc.sys.localStorage.getItem("barrageState")) > 0 ? this.switchBarrage(true) : this.switchBarrage(false);
        if (!this.node.active) return;
        var voiced = d.voice.split("_");
        var gameID = cc.Utils.getGameIdByRoomId(cc.PlayerData.getRoomID());
        var url = "resources/" + gameID + "/audio/voice/voice_" + voiced[1] + "_" + voiced[0] + ".mp3";
        cc.AudioManager.playSFX(url);
        this.messageList.push(d.textContent);
        var bg = this.node.getChildByName("bg");
        if (!bg.active) {
          bg.active = true;
          this.schedule(this.performBarrage, this.showStep);
        }
      };
      GameBarrage.prototype.performBarrage = function() {
        var nodeItem = null;
        cc.log("performBarrage");
        if (this.itemWaitting.length > 0 && this.messageList.length > 0) {
          var str = this.messageList.pop();
          var starIdx = parseInt(100 * Math.random() % this.itemWaitting.length + "");
          for (var index = 0; index < this.itemWaitting.length; index++) {
            var idx = starIdx + index;
            idx = idx >= this.itemWaitting.length ? idx % this.itemWaitting.length : idx;
            this.itemWaitting[idx].getComponent(cc.RichText).string = str;
            this.itemWaitting[idx].pauseSystemEvents(true);
            var isOK = true;
            for (var j = 0; j < this.itemList.length; j++) if (this.itemWaitting[idx].getBoundingBox().intersects(this.itemList[j].getBoundingBox())) {
              isOK = false;
              break;
            }
            if (isOK) {
              nodeItem = this.itemWaitting[idx];
              this.itemWaitting.splice(idx, 1);
              this.itemList.push(nodeItem);
              break;
            }
          }
        }
        nodeItem && this.showMoveBarrage(nodeItem);
        if (0 == this.itemList.length) {
          var bg = this.node.getChildByName("bg");
          bg.active = false;
          this.unschedule(this.performBarrage);
        }
      };
      GameBarrage.prototype.showMoveBarrage = function(node) {
        var _this = this;
        if (node) {
          var listn = this.node.getChildByName("list").getContentSize();
          var listw = listn.width;
          var nodew = node.getContentSize().width;
          var speed = 150;
          var time1 = nodew / speed;
          var time2 = listw / speed;
          var moveby1 = cc.moveBy(time1, cc.p(-nodew, 0));
          var moveby2 = cc.moveBy(time2, cc.p(-listw, 0));
          var callfunc = cc.callFunc(function() {
            _this.restoreTheInitial(node);
          });
          node.runAction(cc.sequence(moveby1, moveby2, callfunc));
        } else for (var index = 0; index < this.itemList.length; index++) {
          this.itemList[index].stopAllActions();
          this.restoreTheInitial(this.itemList[index]);
        }
      };
      GameBarrage.prototype.restoreTheInitial = function(itemNode) {
        itemNode.getComponent(cc.RichText).string = "";
        var listw = this.node.getChildByName("list").getContentSize().width;
        itemNode.setPositionX(.5 * listw);
        for (var idx = 0; idx < this.itemList.length; idx++) if (this.itemList[idx] == itemNode) {
          this.itemList.splice(idx, 1);
          this.itemWaitting.push(itemNode);
          break;
        }
      };
      GameBarrage = __decorate([ ccclass ], GameBarrage);
      return GameBarrage;
    }(cc.Component);
    exports.default = GameBarrage;
    cc._RF.pop();
  }, {} ],
  GameDefine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6ea03F94ClNboiWsIjIPSM/", "GameDefine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var VoiceText;
    (function(VoiceText) {
      VoiceText["voice_1"] = "20倍下注，直接让你爆庄";
      VoiceText["voice_2"] = "哎，输光了，洗洗睡吧";
      VoiceText["voice_3"] = "安全第一，我先撤了";
      VoiceText["voice_4"] = "别弃牌，我们拼到底";
      VoiceText["voice_5"] = "不怕神一样的对手，就怕猪一样的队友";
      VoiceText["voice_6"] = "不要崇拜哥，哥只是个传说";
      VoiceText["voice_7"] = "不要偷鸡，我的牌很大";
      VoiceText["voice_8"] = "不要一把全下哟，要细水长流";
      VoiceText["voice_9"] = "不要走,决战到天亮";
      VoiceText["voice_10"] = "风吹鸡蛋壳，牌去人安乐";
      VoiceText["voice_11"] = "还是这个公平，全靠人品";
      VoiceText["voice_12"] = "和你合作真是太愉快了";
      VoiceText["voice_13"] = "和我斗，你还嫩了点";
      VoiceText["voice_14"] = "很高兴认识各位";
      VoiceText["voice_15"] = "今天运气不好，我明日再来";
      VoiceText["voice_16"] = "开个好牌呀";
      VoiceText["voice_17"] = "看牌看牌，看你妹";
      VoiceText["voice_18"] = "看我通杀全场，这些钱都是我的";
      VoiceText["voice_19"] = "看我坐庄，大杀四方";
      VoiceText["voice_20"] = "快点吧，我等到花儿都谢了";
      VoiceText["voice_21"] = "来吧ALLIN，我们一把定胜负";
      VoiceText["voice_22"] = "来来来，不信邪你就上";
      VoiceText["voice_23"] = "冷静，冲动是魔鬼";
      VoiceText["voice_24"] = "你的牌打得实在是太好了";
      VoiceText["voice_25"] = "牌运来了挡都挡不住";
      VoiceText["voice_26"] = "求跟注，求加注";
      VoiceText["voice_27"] = "人有多大胆，地有多大产";
      VoiceText["voice_28"] = "人在江湖飘，哪能不挨刀";
      VoiceText["voice_29"] = "天空一声巨响，大爷闪亮登场";
      VoiceText["voice_30"] = "我就不信不来一个满堂红";
      VoiceText["voice_31"] = "我预祝你早点爆庄";
      VoiceText["voice_32"] = "辛辛苦苦几十年，一把回到解放前";
      VoiceText["voice_33"] = "押红中红，押黑中黑";
      VoiceText["voice_34"] = "一手烂牌臭到底";
      VoiceText["voice_35"] = "这把是押平倍还是翻倍？这是一个问题";
      VoiceText["voice_36"] = "这把我有信心，跟我一起下";
      VoiceText["voice_37"] = "只要比庄大，我就赢了";
      VoiceText["voice_38"] = "只要继续押，纵横四海就到家";
      VoiceText["voice_39"] = "转庄转庄，该轮到我坐庄了吧";
      VoiceText["voice_40"] = "输了不投降，竞争意识强！";
      VoiceText["voice_41"] = "要想富，下重注！";
      VoiceText["voice_42"] = "祝我这局好运！";
      VoiceText["voice_43"] = "不是不爆，时候未到！";
      VoiceText["voice_44"] = "任性到底，一路惊喜！";
      VoiceText["voice_45"] = "跟着我压，打爆庄家！";
      VoiceText["voice_46"] = "连压，不信不出！";
      VoiceText["voice_47"] = "小手一抖，金币全拿走！";
      VoiceText["voice_48"] = "没钱乖乖当闲，看庄家挣大钱！";
      VoiceText["voice_49"] = "小压小胜，大压大胜！";
      VoiceText["voice_50"] = "安静下注，文明游戏！";
      VoiceText["voice_51"] = "赌一赌，摩托变路虎！";
      VoiceText["voice_52"] = "拼一拼，粪土变黄金！";
      VoiceText["voice_53"] = "男人要有钱，和谁都有缘";
      VoiceText["voice_54"] = "不要崇拜姐，姐只是个传说";
    })(VoiceText = exports.VoiceText || (exports.VoiceText = {}));
    var DirectionType;
    (function(DirectionType) {
      DirectionType[DirectionType["direction_Left"] = 0] = "direction_Left";
      DirectionType[DirectionType["direction_Right"] = 1] = "direction_Right";
    })(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
    cc._RF.pop();
  }, {} ],
  GameVoice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dba1c3VFb1KTJwr/9aYXKN5", "GameVoice");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameVoice = function(_super) {
      __extends(GameVoice, _super);
      function GameVoice() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.voiceItem = null;
        _this.voiceIdMap = {
          8002: [ 43, 45, 18, 31, 29, 27, 51, 32, 42, 38 ],
          8003: [ 41, 46, 36, 35, 8, 47, 49, 50, 51, 52 ],
          8004: [],
          8005: [],
          8006: [ 17, 22, 7, 25, 47, 26, 23, 3, 20, 32 ],
          8007: [ 28, 33, 15, 29, 53, 40, 41, 46, 47, 49 ],
          8008: [ 29, 27, 19, 25, 48, 1, 2, 23, 16, 37 ],
          8009: [ 20, 24, 14, 9, 12, 10, 13, 25, 5, 34 ],
          8010: [ 43, 45, 18, 31, [ 6, 54 ], 28, 29, 27, 51, 32 ],
          8011: [ 20, 25, 4, 23, 21, 22, 3, 13, 30, 16 ],
          8012: [],
          8013: [ 42, 44, 53, 40, 41, 46, 47, 49, 32, 27 ],
          8014: [ 29, 25, 28, 39, 19, 37, 9, 11, 15, 2 ],
          8015: [ [ 6, 54 ], 28, 29, 27, 51, 32, 42, 44, 41, 46 ],
          8016: [ 28, 46, 32, 15, 29, 53, 42, 44, 40, 41 ],
          8017: [],
          8018: []
        };
        return _this;
      }
      GameVoice.prototype.onLoad = function() {
        this.initVoiceShow();
      };
      GameVoice.prototype.setPlanPosition = function(vec2) {
        this.node.getChildByName("voiceBg_ScrollView").setPosition(vec2);
      };
      GameVoice.prototype.initVoiceShow = function() {
        var gameId = Number(cc.PlayerData.getRoomID().toString().substring(0, 4));
        var list = this.voiceIdMap[gameId];
        for (var index = 0; index < list.length; index++) {
          var id = 0;
          id = "number" == typeof list[index] ? list[index] : list[index][cc.PlayerData.getSex()];
          var item = cc.instantiate(this.voiceItem);
          this.node.getChildByName("voiceBg_ScrollView").getComponent(cc.ScrollView).content.addChild(item);
          item.getComponent("VoiceItem").setVoiceItem(id, this);
        }
      };
      GameVoice.prototype.voiceButton = function(event) {
        this.closeOrOpenVoice(false);
      };
      GameVoice.prototype.closeOrOpenVoice = function(ifShow) {
        void 0 === ifShow && (ifShow = false);
        if (ifShow && 1 != Number(cc.sys.localStorage.getItem("barrageState"))) {
          cc.Utils.setTis("语音未开启");
          this.node.active = false;
          return;
        }
        this.node.active = ifShow;
      };
      __decorate([ property({
        type: cc.Prefab
      }) ], GameVoice.prototype, "voiceItem", void 0);
      GameVoice = __decorate([ ccclass ], GameVoice);
      return GameVoice;
    }(cc.Component);
    exports.default = GameVoice;
    cc._RF.pop();
  }, {} ],
  HeadLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2cafHI69FBMYFHzAa8lQ67", "HeadLayout");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bjlUtils_1 = require("./bjlUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeadLayout = function(_super) {
      __extends(HeadLayout, _super);
      function HeadLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.headPlist = null;
        _this._callback = null;
        _this._data = null;
        _this._callData = null;
        return _this;
      }
      HeadLayout.prototype.onLoad = function() {};
      HeadLayout.prototype.show = function(data, callback) {
        callback && (this._callback = callback);
        if (data) {
          this._data = data;
          this._data.isFull = data.isFull || false;
          this.setHead(data);
        }
      };
      HeadLayout.prototype.setHead = function(data) {
        var self = this;
        self.setHeadPic(data.headImg, null);
        self.setGoldNum(data.gold);
        self.setHeadName(data.name);
        self.setHeadId(data.userId);
      };
      HeadLayout.prototype.headBtn = function(event) {
        var me = this;
        switch (event.target.name) {
         case "btn":
         case "head_btn":
          me._callback && me._callback();
        }
      };
      HeadLayout.prototype.setHeadPic = function(url, sex) {
        var self = this;
        var node = self.node.getChildByName("head_btn");
        null == node && (node = self.node.getChildByName("mask").getChildByName("head_btn"));
        node.getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(cc.PlayerData.getHeadPngName(url, sex));
      };
      HeadLayout.prototype.setGoldNum = function(num) {
        var gold = this.node.getChildByName("gold");
        if (!gold) return;
        if (null == num || num < 0) {
          gold.active = false;
          return;
        }
        gold.active = true;
        gold.getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(num);
      };
      HeadLayout.prototype.setCardNum = function(num) {
        var card = this.node.getChildByName("card");
        if (!card) return;
        if (null == num || num < 0) {
          card.active = false;
          return;
        }
        card.active = true;
        this._data.isFull ? card.getChildByName("num").getComponent(cc.Label).string = num : card.getChildByName("num").getComponent(cc.Label).string = Number(num).toFixed(2);
      };
      HeadLayout.prototype.setTicketNum = function(num) {
        var ticket = this.node.getChildByName("ticket");
        if (!ticket) return;
        if (null == num || num < 0) {
          ticket.active = false;
          return;
        }
        ticket.active = true;
        this._data.isFull ? ticket.getChildByName("num").getComponent(cc.Label).string = num : ticket.getChildByName("num").getComponent(cc.Label).string = Number(num).toFixed(2);
      };
      HeadLayout.prototype.setHeadName = function(str) {
        if (!str) return;
        str || (str = "");
        this.node.getChildByName("name").getComponent(cc.Label).string = str;
      };
      HeadLayout.prototype.setHeadId = function(str) {
        var id = this.node.getChildByName("id");
        if (!id) return;
        if (!str) {
          id.active = false;
          return;
        }
        id.active = true;
        Number(str) < 0 ? id.getComponent(cc.Label).string = "" : id.getComponent(cc.Label).string = "ID:" + str;
      };
      __decorate([ property(cc.SpriteAtlas) ], HeadLayout.prototype, "headPlist", void 0);
      HeadLayout = __decorate([ ccclass ], HeadLayout);
      return HeadLayout;
    }(cc.Component);
    exports.default = HeadLayout;
    cc._RF.pop();
  }, {
    "./bjlUtils": "bjlUtils"
  } ],
  SettingLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9c75BrAJ9JrLOgS02A+T8v", "SettingLayout");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bjlUtils_1 = require("./bjlUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SettingLayout = function(_super) {
      __extends(SettingLayout, _super);
      function SettingLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._callback = null;
        _this.musicValue = 0;
        _this.videoValue = 0;
        _this.barrageState = "";
        return _this;
      }
      SettingLayout.prototype.onLoad = function() {};
      SettingLayout.prototype.initAttr = function() {
        var self = this;
        self.musicValue = cc.AudioManager.getAudioValue("music");
        self.videoValue = cc.AudioManager.getAudioValue("video");
        this.barrageState = cc.sys.localStorage.getItem("barrageState") || "1";
        this.setBarrageShow(Number(this.barrageState));
        self.initSetting("music", self.musicValue);
        self.initSetting("video", self.videoValue);
      };
      SettingLayout.prototype.init = function(callback) {
        callback && (this._callback = callback);
        this.setActive(false);
      };
      SettingLayout.prototype.initSetting = function(str, value) {
        this.setSliderPos(str, value);
        this.setAudio(str, value);
        value > 0 ? this.setBtnInterAcTable(str, true) : this.setBtnInterAcTable(str, null);
      };
      SettingLayout.prototype.setAudio = function(str, value) {
        "video" == str ? cc.AudioManager.setAudioVolume(value) : cc.AudioManager.setMusicVolume(value);
      };
      SettingLayout.prototype.setActive = function(isShow) {
        this.node.active = isShow;
        this.initAttr();
      };
      SettingLayout.prototype.setBarrageShow = function(state) {
        var sprite = this.node.getChildByName("bg").getChildByName("barrage_button");
        var gameID = cc.Utils.getGameIdByRoomId(cc.PlayerData.getRoomID());
        state > 0 ? bjlUtils_1.default.getInstance().updataSpritetext(sprite, "resources/" + gameID + "/image/setting/btn_barrage_open.png") : bjlUtils_1.default.getInstance().updataSpritetext(sprite, "resources/" + gameID + "/image/setting/btn_barrage_close.png");
        cc.sys.localStorage.setItem("barrageState", state);
      };
      SettingLayout.prototype.isShowBtnBack = function(isShow) {
        this.node.getChildByName("bg").getChildByName("btn_back").active = false;
        this.node.getChildByName("bg").getChildByName("btn_layout").active = false;
        this.node.getChildByName("bg").getChildByName("barrage").active = isShow;
        this.node.getChildByName("bg").getChildByName("barrage_button").active = isShow;
      };
      SettingLayout.prototype.isShowBarrageButton = function(isShow) {
        this.node.getChildByName("bg").getChildByName("barrage").active = isShow;
        this.node.getChildByName("bg").getChildByName("barrage_button").active = isShow;
      };
      SettingLayout.prototype.setBtnInterAcTable = function(str, isShow) {
        var slider = this.node.getChildByName("bg").getChildByName("slider_" + str);
        slider.getChildByName("bt_" + str).getComponent(cc.Button).interactable = isShow;
        isShow || this.setSliderPos(str, 0);
      };
      SettingLayout.prototype.setSliderPos = function(str, value) {
        var slider = this.node.getChildByName("bg").getChildByName("slider_" + str);
        slider.getComponent(cc.Slider).progress = value;
        this.setAudio(str, value);
        var img = slider.getChildByName("img");
        img.getComponent(cc.Sprite).fillRange = value;
        slider.getChildByName("handle").x = (1 * value - .5) * img.width;
      };
      SettingLayout.prototype.onClickBtn = function(event) {
        var self = this;
        switch (event.target.name) {
         case "close":
          self.node.active = false;
          break;

         case "bt_video":
         case "bt_music":
          var str = event.target.name.slice(-5);
          self.setBtnInterAcTable(str, null);
          break;

         case "left_btn":
         case "center_btn":
         case "qinsuan_btn":
         case "btn_back":
         case "right_btn":
          self._callback && self._callback(event.target.name);
          break;

         case "barrage_button":
          this.barrageState = cc.sys.localStorage.getItem("barrageState");
          if (Number(this.barrageState) > 0) {
            cc.sys.localStorage.setItem("barrageState", 0);
            cc.Utils.setTis("互动语音已关闭！");
          } else {
            cc.sys.localStorage.setItem("barrageState", 1);
            cc.Utils.setTis("互动语音已开启！");
          }
          this.barrageState = cc.sys.localStorage.getItem("barrageState");
          this.setBarrageShow(Number(this.barrageState));
          break;

         case "bt_changeMan":
          this.setMenAndWomen(0);
          break;

         case "bt_changeWeman":
          this.setMenAndWomen(1);
        }
      };
      SettingLayout.prototype.showMenAndWomen = function(isShow) {
        this.node.getChildByName("bg").getChildByName("menOrwomen").active = isShow;
      };
      SettingLayout.prototype.setMenAndWomen = function(sex) {};
      SettingLayout.prototype.onClickSlider = function(sender) {
        var self = this;
        sender.node.getChildByName("img").getComponent(cc.Sprite).fillRange = sender.progress;
        sender.progress > 0 ? self.setBtnInterAcTable(sender.node.name.slice(-5), true) : self.setBtnInterAcTable(sender.node.name.slice(-5), null);
        switch (sender.node.name) {
         case "slider_video":
          cc.AudioManager.setAudioVolume(sender.progress);
          break;

         case "slider_music":
          cc.AudioManager.setMusicVolume(sender.progress);
        }
      };
      SettingLayout = __decorate([ ccclass ], SettingLayout);
      return SettingLayout;
    }(cc.Component);
    exports.default = SettingLayout;
    cc._RF.pop();
  }, {
    "./bjlUtils": "bjlUtils"
  } ],
  VoiceItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca75a5tBslHfZ78d2DpsrRd", "VoiceItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDefine_1 = require("./GameDefine");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var VoiceItem = function(_super) {
      __extends(VoiceItem, _super);
      function VoiceItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.voiceId = 0;
        _this.voiceSex = 0;
        _this.voiceText = "";
        _this.parentVoice = null;
        return _this;
      }
      VoiceItem.prototype.onLoad = function() {};
      VoiceItem.prototype.setVoiceItem = function(vid, parent) {
        void 0 === vid && (vid = 0);
        void 0 === parent && (parent = null);
        if (vid) {
          this.voiceId = vid;
          this.voiceSex = cc.PlayerData.getSex();
          this.voiceText = GameDefine_1.VoiceText["voice_" + vid];
          this.parentVoice = parent;
          this.initItem();
        }
      };
      VoiceItem.prototype.initItem = function() {
        this.node.getChildByName("voice_Label").getComponent(cc.Label).string = this.voiceText;
      };
      VoiceItem.prototype.buttonCallBack = function(event) {
        var senddata = {
          voice: this.voiceId + "_" + this.voiceSex,
          textContent: this.voiceText,
          userId: cc.PlayerData.getUserId()
        };
        cc.NetWork.sendMsg(senddata, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraVoiceRequest, cc["BaccaraCommand"].S_C_BACCARA_VOICE_REQUEST);
        this.parentVoice.closeOrOpenVoice(false);
      };
      VoiceItem = __decorate([ ccclass ], VoiceItem);
      return VoiceItem;
    }(cc.Component);
    exports.default = VoiceItem;
    cc._RF.pop();
  }, {
    "./GameDefine": "GameDefine"
  } ],
  bjlAnalysisChart: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0f4bEEZDlIboZMow4HjEz5", "bjlAnalysisChart");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bjlUtils_1 = require("./bjlUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bjlAnalysisChart = function(_super) {
      __extends(bjlAnalysisChart, _super);
      function bjlAnalysisChart() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._dlArr = null;
        _this._dyzArr = null;
        _this._xlArr = null;
        _this._yyArr = null;
        _this._chartNode = null;
        return _this;
      }
      bjlAnalysisChart.prototype.onLoad = function() {
        this.init();
        this.oneInit();
        this._chartNode = this.node.getChildByName("chart_node");
      };
      bjlAnalysisChart.prototype.oneInit = function() {
        this._dlArr = {
          arr: [],
          minX: 0,
          x: 0,
          y: 0
        };
        this._dyzArr = {
          arr: [],
          minX: 0,
          x: 0,
          y: 0
        };
        this._xlArr = {
          arr: [],
          minX: 0,
          x: 0,
          y: 0
        };
        this._yyArr = {
          arr: [],
          minX: 0,
          x: 0,
          y: 0
        };
      };
      bjlAnalysisChart.prototype.init = function() {};
      bjlAnalysisChart.prototype.show = function(d) {
        this.oneInit();
        this.setRightDownView(d.historyRecord);
      };
      bjlAnalysisChart.prototype.setRightDownView = function(d) {
        var rightDown = this.node.getChildByName("right_down");
        var rightContent = rightDown.getChildByName("right").getChildByName("panel").getChildByName("view").getChildByName("content");
        var firstRightItem = rightContent.getChildByName("item");
        rightContent.removeAllChildren(true);
        firstRightItem.active = false;
        rightContent.addChild(firstRightItem);
        var zplContent = this._chartNode.getChildByName("view_1").getChildByName("view").getChildByName("content");
        var zplItem = zplContent.getChildByName("item");
        zplContent.removeAllChildren(true);
        zplContent.addChild(zplItem);
        zplItem.active = false;
        var leftContent = rightDown.getChildByName("left").getChildByName("panel").getChildByName("view").getChildByName("content");
        var item = leftContent.getChildByName("item");
        leftContent.removeAllChildren(true);
        item.active = false;
        leftContent.addChild(item);
        var view2 = this._chartNode.getChildByName("view_2");
        var content2 = view2.getChildByName("view").getChildByName("content");
        var item2 = content2.getChildByName("item");
        item2.active = false;
        content2.removeAllChildren(true);
        content2.addChild(item2);
        var view3 = this._chartNode.getChildByName("view_3");
        var content3 = view3.getChildByName("view").getChildByName("content");
        var item3 = content3.getChildByName("item");
        item3.active = false;
        content3.removeAllChildren(true);
        content3.addChild(item3);
        var view4 = this._chartNode.getChildByName("view_4");
        var content4 = view4.getChildByName("view").getChildByName("content");
        var item4 = content4.getChildByName("item");
        item4.active = false;
        content4.removeAllChildren(true);
        content4.addChild(item4);
        var view5 = this._chartNode.getChildByName("view_5");
        var content5 = view5.getChildByName("view").getChildByName("content");
        var item5 = content5.getChildByName("item");
        item5.active = false;
        content5.removeAllChildren(true);
        content5.addChild(item5);
        if (d.length > 0) for (var i = 0; i < d.length; i++) this.addOneAnalyze(d[i], i);
      };
      bjlAnalysisChart.prototype.setScrollShowPoint = function() {
        var scroll1 = this.node.getChildByName("right_down").getChildByName("right").getChildByName("panel");
        var content1 = scroll1.getChildByName("view").getChildByName("content");
        var scroll2 = this.node.getChildByName("right_down").getChildByName("left").getChildByName("panel");
        var content2 = scroll2.getChildByName("view").getChildByName("content");
        this.scheduleOnce(function() {
          scroll1.width < content1.width ? scroll1.getComponent(cc.ScrollView).scrollToRight(.01) : scroll1.getComponent(cc.ScrollView).scrollToLeft(.01);
          scroll2.width < content2.width ? scroll2.getComponent(cc.ScrollView).scrollToRight(.001) : scroll2.getComponent(cc.ScrollView).scrollToLeft(.001);
        }, .001);
        for (var i = 1; i < 6; i++) {
          var scroll = this._chartNode.getChildByName("view_" + i);
          var content = scroll.getChildByName("view").getChildByName("content");
          scroll.width < content.width ? scroll.getComponent(cc.ScrollView).scrollToPercentHorizontal(content.getChildByName("item") * content.children.length / content.width) : scroll.getComponent(cc.ScrollView).scrollToLeft(.01);
        }
      };
      bjlAnalysisChart.prototype.addOneAnalyze = function(d, idx) {
        var rightDown = this.node.getChildByName("right_down");
        var rightContent = rightDown.getChildByName("right").getChildByName("panel").getChildByName("view").getChildByName("content");
        var firstRightItem = rightContent.getChildByName("item");
        var rightItem = cc.instantiate(firstRightItem);
        rightItem.active = true;
        rightContent.addChild(rightItem);
        var zplContent = this._chartNode.getChildByName("view_1").getChildByName("view").getChildByName("content");
        var zplItem = zplContent.getChildByName("item");
        var zpItem = cc.instantiate(zplItem);
        zpItem.active = true;
        zplContent.addChild(zpItem);
        this.addRightViewItem(zpItem, rightItem, d);
        var leftContent = rightDown.getChildByName("left").getChildByName("panel").getChildByName("view").getChildByName("content");
        var content2 = this._chartNode.getChildByName("view_2").getChildByName("view").getChildByName("content");
        var arr = this._dlArr["arr"];
        var str = this.judgeZorXWin(d);
        if ("2" !== str) {
          if (idx > 0 && arr[arr.length - 1]) {
            var arrArr = arr[arr.length - 1];
            arrArr && arrArr.length && arrArr[arrArr.length - 1] !== str && arr.push([]);
          } else arr.push([]);
          arr[arr.length - 1].push(str);
          arr && arr.length > 0 && this.trendChartSort(leftContent, "_dl", content2);
          this.analyzeChart(arr);
        } else {
          var itemIdx = this._dlArr["minX"] + this._dlArr["x"];
          if (leftContent.children.length > 0) {
            var item = null;
            this._dlArr["x"] < 1 && this._dlArr["y"] > 0 ? leftContent.children[itemIdx] && leftContent.children[itemIdx].children && leftContent.children[itemIdx].children[this._dlArr["y"] - 1] && (item = leftContent.children[itemIdx].children[this._dlArr["y"] - 1]) : leftContent.children[itemIdx - 1] && leftContent.children[itemIdx - 1].children && leftContent.children[itemIdx - 1].children[this._dlArr["y"]] && (item = leftContent.children[itemIdx - 1].children[this._dlArr["y"]]);
            if (item && item.active && item.getChildByName("label")) {
              var label = item.getChildByName("label");
              label.active || (label.getComponent(cc.Label).string = 0);
              label.active = true;
              label.getComponent(cc.Label).string = Number(label.getComponent(cc.Label).string) + 1;
            }
          }
          if (content2.children.length > 0) {
            var item = null;
            this._dlArr["x"] < 1 && this._dlArr["y"] > 0 ? content2.children[itemIdx] && content2.children[itemIdx].children && content2.children[itemIdx].children[this._dlArr["y"] - 1] && (item = content2.children[itemIdx].children[this._dlArr["y"] - 1]) : content2.children[itemIdx - 1] && content2.children[itemIdx - 1].children && content2.children[itemIdx - 1].children[this._dlArr["y"]] && (item = content2.children[itemIdx - 1].children[this._dlArr["y"]]);
            if (item && item.active && item.getChildByName("label")) {
              var label = item.getChildByName("label");
              label.active || (label.getComponent(cc.Label).string = 0);
              label.active = true;
              label.getComponent(cc.Label).string = Number(label.getComponent(cc.Label).string) + 1;
            }
          }
        }
        this.setScrollShowPoint();
      };
      bjlAnalysisChart.prototype.analyzeChart = function(arr) {
        if (arr.length < 2) return;
        if (arr.length >= 2) {
          var dyArr = this._dyzArr["arr"];
          if (dyArr.length < 1) {
            if (arr[1][1] || arr[2] && arr[2].length >= 1) {
              dyArr.push([]);
              arr[1] && arr[1][1] && arr[0] && arr[0][1] || arr[2] && arr[2][0] && arr[1] && [ 0 ] ? dyArr[0].push("1") : dyArr[0].push("0");
            }
          } else {
            var len = arr.length;
            var iLen = arr[arr.length - 1].length - 1;
            if (arr[len - 1][iLen] && arr[len - 2][iLen]) {
              var newLen = dyArr[dyArr.length - 1].length - 1;
              "1" !== dyArr[dyArr.length - 1][newLen] && dyArr.push([]);
              dyArr[dyArr.length - 1].push("1");
            } else {
              var newLen = dyArr[dyArr.length - 1].length - 1;
              "0" !== dyArr[dyArr.length - 1][newLen] && dyArr.push([]);
              dyArr[dyArr.length - 1].push("0");
            }
          }
          if (dyArr.length > 0) {
            var view3 = this._chartNode.getChildByName("view_3");
            var content3 = view3.getChildByName("view").getChildByName("content");
            this.trendChartSort(content3, "_dyz", null);
          }
        }
        if (arr.length >= 3) {
          var xlArr = this._xlArr["arr"];
          if (xlArr.length < 1) {
            if (arr[2][1] || arr[3] && arr[3].length >= 1) {
              xlArr.push([]);
              arr[2] && arr[2][1] && arr[1] && arr[1][1] || arr[3] && arr[3][0] && arr[2] && arr[2][0] ? xlArr[0].push("1") : xlArr[0].push("0");
            }
          } else {
            var len = arr.length;
            var iLen = arr[arr.length - 1].length - 1;
            if (arr[len - 1][iLen] && arr[len - 2][iLen] && arr[len - 3][iLen]) {
              var newLen = xlArr[xlArr.length - 1].length - 1;
              "1" !== xlArr[xlArr.length - 1][newLen] && xlArr.push([]);
              xlArr[xlArr.length - 1].push("1");
            } else {
              var newLen = xlArr[xlArr.length - 1].length - 1;
              "0" !== xlArr[xlArr.length - 1][newLen] && xlArr.push([]);
              xlArr[xlArr.length - 1].push("0");
            }
          }
          if (xlArr.length > 0) {
            var view4 = this._chartNode.getChildByName("view_4");
            var content4 = view4.getChildByName("view").getChildByName("content");
            this.trendChartSort(content4, "_xl", null);
          }
        }
        if (arr.length >= 4) {
          var yyArr = this._yyArr["arr"];
          if (yyArr.length < 1) {
            if (arr[3][1] || arr[4] && arr[4].length >= 1) {
              yyArr.push([]);
              arr[3] && arr[3][1] && arr[2] && arr[2][1] && arr[1] && arr[1][1] || arr[4] && arr[4][0] && arr[3] && arr[3][0] && arr[2] && arr[2][0] ? yyArr[0].push("1") : yyArr[0].push("0");
            }
          } else {
            var len = arr.length;
            var iLen = arr[arr.length - 1].length - 1;
            if (arr[len - 1][iLen] && arr[len - 2][iLen] && arr[len - 3][iLen] && arr[len - 4][iLen]) {
              var newLen = yyArr[yyArr.length - 1].length - 1;
              "1" !== yyArr[yyArr.length - 1][newLen] && yyArr.push([]);
              yyArr[yyArr.length - 1].push("1");
            } else {
              var newLen = yyArr[yyArr.length - 1].length - 1;
              "0" !== yyArr[yyArr.length - 1][newLen] && yyArr.push([]);
              yyArr[yyArr.length - 1].push("0");
            }
          }
          if (yyArr.length > 0) {
            var view5 = this._chartNode.getChildByName("view_5");
            var content5 = view5.getChildByName("view").getChildByName("content");
            this.trendChartSort(content5, "_yy", null);
          }
        }
      };
      bjlAnalysisChart.prototype.addRightViewItem = function(item1, item2, d) {
        var imgName = "2";
        1 === d.banker ? imgName = "1" : 1 === d.idle && (imgName = "0");
        bjlUtils_1.default.getInstance().updataSpritetext(item1.getChildByName("img"), "resources/8010/image/wz_img_" + imgName + ".png");
        bjlUtils_1.default.getInstance().updataSpritetext(item2.getChildByName("img"), "resources/8010/image/wz_img_" + imgName + ".png");
        if (1 === d.bankerCorrect) {
          item1.getChildByName("left").active = true;
          item2.getChildByName("left").active = true;
        } else {
          item1.getChildByName("left").active = false;
          item2.getChildByName("left").active = false;
        }
        if (1 === d.idleCorrect) {
          item1.getChildByName("right").active = true;
          item2.getChildByName("right").active = true;
        } else {
          item1.getChildByName("right").active = false;
          item2.getChildByName("right").active = false;
        }
      };
      bjlAnalysisChart.prototype.isSuccessionWin = function(d, idx) {
        if (!d[idx - 1] || idx <= 0) return false;
        if (1 === d[idx - 1].banker && 1 === d[idx].banker || 1 === d[idx - 1].idle && 1 === d[idx].idle) return true;
        for (var i = idx - 1; i > 0; i--) if (d[i] && 0 === d[i].and) return 1 === d[idx].banker && 1 === d[i].banker || 1 === d[idx].idle && 1 === d[i].idle;
        return false;
      };
      bjlAnalysisChart.prototype.trendChartSort = function(content, str, content2) {
        var map = this[str + "Arr"];
        var arr = map["arr"];
        var arrArr = arr[arr.length - 1];
        if (arr.length < 1 || !content || content.children.length < 1) return;
        "_dyz" === str || "_dl" === str ? str = "quan_" : "_yy" === str ? str = "line_" : "_xl" === str && (str = "yuan_");
        if (arr.length > 1 && 1 === arrArr.length) {
          map["minX"]++;
          map["x"] = 0;
          map["y"] = 0;
        }
        var curItemIdx = map["minX"] + map["x"];
        var item = null, item2 = null;
        if (content.children[curItemIdx]) {
          item = content.children[curItemIdx];
          content2 && (item2 = content2.children[curItemIdx]);
        } else {
          item = cc.instantiate(content.children[0]);
          if (content2) {
            item2 = cc.instantiate(content2.children[0]);
            content2.addChild(item2);
          }
          content.addChild(item);
          for (var i = 0; i < item.children.length; i++) {
            item.children[i].active = false;
            item.children[i].getChildByName("label") && (item.children[i].getChildByName("label").active = false);
            if (item2) {
              item2.children[i].active = false;
              item2.children[i].getChildByName("label") && (item2.children[i].getChildByName("label").active = false);
            }
          }
        }
        item.active = true;
        item2 && (item2.active = true);
        var curItemChildren = item.children[map["y"]];
        var curItemChildren2 = null;
        item2 && (curItemChildren2 = item2.children[map["y"]]);
        curItemChildren.active = true;
        item2 && (curItemChildren2.active = true);
        !item.children[map["y"] + 1] && item.children[map["y"]].active || item.children[map["y"] + 1] && item.children[map["y"] + 1].active ? map["x"]++ : map["y"]++;
        var imgName = str + arrArr[arrArr.length - 1];
        if (curItemChildren && imgName) {
          bjlUtils_1.default.getInstance().updataSpritetext(curItemChildren, "resources/8010/image/" + imgName + ".png");
          curItemChildren2 && bjlUtils_1.default.getInstance().updataSpritetext(curItemChildren2, "resources/8010/image/" + imgName + ".png");
        }
      };
      bjlAnalysisChart.prototype.clearJl = function(d) {
        if (1 === d.isClear) {
          var rightDown = this.node.getChildByName("right_down");
          var rightContent = rightDown.getChildByName("right").getChildByName("panel").getChildByName("view").getChildByName("content");
          if (rightContent.children.length > 0) {
            var item = rightContent.getChildByName("item");
            rightContent.removeAllChildren(true);
            item.active = false;
            rightContent.addChild(item);
          }
          var zplContent = this._chartNode.getChildByName("view_1").getChildByName("view").getChildByName("content");
          if (zplContent.children.length > 0) {
            var item = zplContent.getChildByName("item");
            zplContent.removeAllChildren(true);
            item.active = false;
            zplContent.addChild(item);
          }
          var leftContent = rightDown.getChildByName("left").getChildByName("panel").getChildByName("view").getChildByName("content");
          if (leftContent.children.length > 0) {
            var item = leftContent.getChildByName("item");
            leftContent.removeAllChildren(true);
            item.active = false;
            leftContent.addChild(item);
          }
          for (var i = 2; i < 6; i++) {
            var content = this._chartNode.getChildByName("view_" + i).getChildByName("view").getChildByName("content");
            if (content.children.length > 0) {
              var item = content.getChildByName("item");
              content.removeAllChildren(true);
              item.active = false;
              content.addChild(item);
            }
          }
          this.oneInit();
        }
      };
      bjlAnalysisChart.prototype.judgeZorXWin = function(d) {
        if (1 === d.banker) return "1";
        if (1 === d.idle) return "0";
        if (1 === d.and) return "2";
      };
      bjlAnalysisChart = __decorate([ ccclass ], bjlAnalysisChart);
      return bjlAnalysisChart;
    }(cc.Component);
    exports.default = bjlAnalysisChart;
    cc._RF.pop();
  }, {
    "./bjlUtils": "bjlUtils"
  } ],
  bjlLogic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1946YesxJMz4WZE8ePjTal", "bjlLogic");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bjlUtils_1 = require("./bjlUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bjlLogic = function(_super) {
      __extends(bjlLogic, _super);
      function bjlLogic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pokerPlist = null;
        _this._downTime = 0;
        _this._openCardTime = 0;
        _this._cardData = null;
        _this._recordTurn = [];
        _this._dlArrMap = null;
        _this._turnPokerNum = 0;
        _this._bjlUi = null;
        _this._bjlAnalysisChart = null;
        _this._xPanel = null;
        _this._zPanel = null;
        _this._chartNode = null;
        _this.addDtTime = null;
        _this._resultInfo = null;
        return _this;
      }
      bjlLogic.prototype.onLoad = function() {
        this.init();
        this._bjlUi = this.node.getComponent("bjlUi");
        this._bjlAnalysisChart = this.node.getComponent("bjlAnalysisChart");
        this._xPanel = this.node.getChildByName("poker").getChildByName("panel_x");
        this._zPanel = this.node.getChildByName("poker").getChildByName("panel_z");
        this._chartNode = this.node.getChildByName("chart_node");
      };
      bjlLogic.prototype.init = function() {
        this.addDtTime = 0;
        this._downTime = -1;
      };
      bjlLogic.prototype.initOnce = function() {
        this._cardData = null;
        this._resultInfo = null;
        this._openCardTime = 0;
        this._turnPokerNum = 0;
        this._recordTurn = [];
      };
      bjlLogic.prototype.show = function(d) {
        this.resultInfo(d);
        this.setDownTime(d.status.endTime);
        this.setJsRecord(d);
      };
      bjlLogic.prototype.setDownTime = function(time) {
        if (!time) return;
        this._downTime = parseInt(time);
        this.setTimeString(null);
        2 === bjlUtils_1.default.getInstance().getStage() && (this._openCardTime = time);
      };
      bjlLogic.prototype.pokerAction = function(node, value, idx) {
        var me = this;
        value = Number(value);
        node.active = true;
        var scaleTo1 = cc.scaleTo(.2, 0, 1);
        var scaleTo2 = cc.scaleTo(.2, 1, 1);
        var callFunc = cc.callFunc(function() {
          me._recordTurn.push(idx);
          var pngName = bjlUtils_1.default.getInstance().analysisCardNew(value, null).cardName;
          node.getComponent(cc.Sprite).spriteFrame = me.pokerPlist.getSpriteFrame(pngName);
        });
        node.runAction(cc.sequence(scaleTo1, callFunc, scaleTo2));
      };
      bjlLogic.prototype.initPoker = function() {
        if (this._xPanel && this._xPanel.children) for (var i = 0; i < this._xPanel.children.length; i++) {
          this._xPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.pokerPlist.getSpriteFrame("pai_55");
          this._xPanel.children[i].active = false;
        }
        if (this._zPanel && this._zPanel.children) for (var j = 0; j < this._zPanel.children.length; j++) {
          this._zPanel.children[j].getComponent(cc.Sprite).spriteFrame = this.pokerPlist.getSpriteFrame("pai_55");
          this._zPanel.children[j].active = false;
        }
      };
      bjlLogic.prototype.pokerInfo = function(d) {
        this._cardData = d;
      };
      bjlLogic.prototype.showWin = function() {
        var me = this;
        var img = "resources/8010/image/img_win_h.png", win = "h";
        if (me._cardData.rightCardVal > me._cardData.leftCardVal) {
          img = "resources/8010/image/img_win_z.png";
          win = "z";
        } else if (me._cardData.rightCardVal < me._cardData.leftCardVal) {
          img = "resources/8010/image/img_win_x.png";
          win = "x";
        }
        bjlUtils_1.default.getInstance().updataSpritetext(me.node.getChildByName("poker").getChildByName("winning"), img);
        me.node.getChildByName("poker").getChildByName("winning").active = true;
        cc.AudioManager.playSFX("resources/8010/audio/" + win + "_win.wav");
        for (var i = 0; i < me._cardData.stage.length; i++) {
          1 === me._cardData.stage[i] && (me.node.getChildByName("bet_num_node").getChildByName("node_" + i).getChildByName("win").active = true);
          1 === me._cardData.stage[0] && 0 === i ? "resources/8010/audio/x_both.wav" : 1 === me._cardData.stage[4] && 4 === i && cc.AudioManager.playSFX("resources/8010/audio/z_both.wav");
        }
      };
      bjlLogic.prototype.openPoker = function(time) {
        if (!this._cardData) return;
        var cardData = this._cardData.cardData;
        var audio = false, audioName = "";
        if (!time) {
          time = this._downTime;
          audio = true;
        }
        switch (time) {
         case 14:
          if (cardData.leftCardList[0]) {
            audioName = "resources/8010/audio/x.wav";
            this.pokerAction(this._xPanel.getChildByName("1"), cardData.leftCardList[0], 0);
          }
          break;

         case 13:
          if (cardData.rightCardList[0]) {
            audioName = "resources/8010/audio/z.wav";
            this.pokerAction(this._zPanel.getChildByName("1"), cardData.rightCardList[0], 1);
          }
          break;

         case 12:
          if (cardData.leftCardList[1]) {
            audioName = "resources/8010/audio/x.wav";
            this.pokerAction(this._xPanel.getChildByName("2"), cardData.leftCardList[1], 2);
          }
          break;

         case 11:
          if (cardData.rightCardList[1]) {
            audioName = "resources/8010/audio/z.wav";
            this.pokerAction(this._zPanel.getChildByName("2"), cardData.rightCardList[1], 3);
          }
          break;

         case 10:
          if (cardData.leftCardList.length > 2 && cardData.leftCardList[2]) {
            audioName = "resources/8010/audio/x_add.wav";
            this.pokerAction(this._xPanel.getChildByName("3"), cardData.leftCardList[2], 4);
          }
          break;

         case 9:
          if (cardData.rightCardList.length > 2 && cardData.rightCardList[2]) {
            audioName = "resources/8010/audio/z_add.wav";
            this.pokerAction(this._zPanel.getChildByName("3"), cardData.rightCardList[2], 5);
          }
          break;

         case 8:
          this.node.getChildByName("poker").getChildByName("label_x").getComponent(cc.Label).string = this._cardData.leftCardVal + "\n点";
          audioName = "resources/8010/audio/x_" + this._cardData.leftCardVal + ".wav";
          this.node.getChildByName("poker").getChildByName("label_x").active = true;
          break;

         case 7:
          this.node.getChildByName("poker").getChildByName("label_z").getComponent(cc.Label).string = this._cardData.rightCardVal + "\n点";
          this.node.getChildByName("poker").getChildByName("label_z").active = true;
          audioName = "resources/8010/audio/z_" + this._cardData.rightCardVal + ".wav";
          break;

         case 6:
          this.showWin();
          break;

         case 5:
          this._cardData.stage.length > 0 && this._bjlUi.regainChip(this._cardData.stage);
          break;

         case 4:
          this._cardData.stage.length > 0 && this._bjlUi.bankerPayForChip(this._cardData.stage);
          break;

         case 3:
          this._cardData.stage.length > 0 && this._bjlUi.playerRegainChip(this._cardData.stage);
          this._resultInfo && this._resultInfo.seatPlayerList && this._bjlUi.seatFlyMoney(this._resultInfo.seatPlayerList);
          this.resultLayout(true);
        }
        audio && audioName && cc.AudioManager.playSFX(audioName);
      };
      bjlLogic.prototype.resultInfo = function(d) {
        this._resultInfo = d;
      };
      bjlLogic.prototype.resultLayout = function(isShow) {
        var resultLayout = this.node.getChildByName("result_layout");
        resultLayout.active = isShow;
        if (!isShow || !this._resultInfo) return;
        if (!this._resultInfo) return;
        var d = this._resultInfo.roundResult;
        resultLayout.getChildByName("me").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(d.myWinMoney);
        resultLayout.getChildByName("banker").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(d.bankerWinMoney);
        cc.PlayerData.setMoney(bjlUtils_1.default.getInstance().convertToFixed(d.money));
        this.setJsRecord(this._resultInfo);
        var idx = this._resultInfo.historyRecord.length - 1;
        this._bjlAnalysisChart.addOneAnalyze(this._resultInfo.historyRecord[idx], idx);
        this._bjlUi.setResultInfo(this._resultInfo);
      };
      bjlLogic.prototype.setJsRecord = function(d) {
        var label = this._chartNode.getChildByName("label");
        d.curRound >= 0 && (label.getChildByName("js_num").getComponent(cc.Label).string = d.curRound);
        d.dayCard >= 0 && (label.getChildByName("tp_num").getComponent(cc.Label).string = d.dayCard);
        d.bankerCorrect >= 0 && (label.getChildByName("zd_num").getComponent(cc.Label).string = d.bankerCorrect);
        d.idle >= 0 && (label.getChildByName("x_num").getComponent(cc.Label).string = d.idle);
        d.idleCorrect >= 0 && (label.getChildByName("xd_num").getComponent(cc.Label).string = d.idleCorrect);
        d.banker >= 0 && (label.getChildByName("z_num").getComponent(cc.Label).string = d.banker);
        d.and >= 0 && (label.getChildByName("h_num").getComponent(cc.Label).string = d.and);
      };
      bjlLogic.prototype.clear = function() {
        this.initPoker();
        this.resultLayout(false);
        this.initOnce();
        this.node.getChildByName("poker").getChildByName("label_x").active = false;
        this.node.getChildByName("poker").getChildByName("label_z").active = false;
        this.node.getChildByName("poker").getChildByName("winning").active = false;
        var node = this.node.getChildByName("bet_num_node");
        for (var i = 0; i < node.children.length; i++) node.children[i].getChildByName("win").active = false;
        this._bjlUi.clear();
      };
      bjlLogic.prototype.secondUpdate = function() {
        if (2 === bjlUtils_1.default.getInstance().getStage()) {
          if (this._openCardTime < 15) {
            for (var i = 15; i > this._openCardTime - 1; i--) this.openPoker(i);
            this._openCardTime = 15;
          }
          this.openPoker(null);
        }
        this._downTime >= 0 && this.setTimeString(null);
      };
      bjlLogic.prototype.setTimeString = function(time) {
        this.node.getChildByName("down_time").getChildByName("time").getComponent(cc.Label).string = time || this._downTime;
        this.addDtTime = 0;
      };
      bjlLogic.prototype.update = function(dt) {
        this.addDtTime += dt;
        if (this.addDtTime >= 1) {
          this.addDtTime = 0;
          if (this._downTime > 0) {
            this._downTime--;
            this.secondUpdate();
          }
        }
      };
      __decorate([ property(cc.SpriteAtlas) ], bjlLogic.prototype, "pokerPlist", void 0);
      bjlLogic = __decorate([ ccclass ], bjlLogic);
      return bjlLogic;
    }(cc.Component);
    exports.default = bjlLogic;
    cc._RF.pop();
  }, {
    "./bjlUtils": "bjlUtils"
  } ],
  bjlRcv: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b34dqGUJVLq6Zm/kOre6Mf", "bjlRcv");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bjlUtils_1 = require("./bjlUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bjlRcv = function(_super) {
      __extends(bjlRcv, _super);
      function bjlRcv() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._bjlUi = null;
        _this._bjlLogic = null;
        _this._bjlAnalysisChart = null;
        return _this;
      }
      bjlRcv.prototype.onLoad = function() {
        cc.NetWork.addDelegate(this);
        this.constant();
        this.startRcv();
      };
      bjlRcv.prototype.onDestroy = function() {
        cc.NetWork.removeDelegate(this);
      };
      bjlRcv.prototype.startRcv = function() {
        cc.NetWork.loadProtoFile("resources/8010/proto/BaccaraRoom.proto", "com.lyh.protocol", "BaccaraRoom");
        cc.NetWork.loadProtoFile("resources/8010/proto/BaccaraCommand.proto", "com.lyh.protocol", "BaccaraCommand");
        cc["BaccaraCommand"] = cc.NetWork.getProtoFile("BaccaraCommand").CmdType;
        cc.NetWork.sendMsg({
          roomCode: cc.PlayerData.getRoomID().toString(),
          userId: cc.PlayerData.getUserId()
        }, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraJoinTableRequest, cc["BaccaraCommand"].C_S_BACCARA_JOIN_TABLE_REQUEST);
      };
      bjlRcv.prototype.constant = function() {
        this._bjlUi = this.node.getComponent("bjlUi");
        this._bjlLogic = this.node.getComponent("bjlLogic");
        this._bjlAnalysisChart = this.node.getComponent("bjlAnalysisChart");
      };
      bjlRcv.prototype.byStageSetUI = function(d) {
        bjlUtils_1.default.getInstance().setStage(Number(d.status));
        this._bjlLogic.setDownTime(d.endTime);
        bjlUtils_1.default.getInstance().updataSpritetext(this.node.getChildByName("down_time").getChildByName("img"), "resources/8010/image/wzimg_ts_" + bjlUtils_1.default.getInstance().getStage() + ".png");
        switch (Number(d.status)) {
         case 1:
          this._bjlUi.startBet();
          break;

         case 2:
          this._bjlUi.stopBet();
          break;

         case 3:
          this._bjlLogic.clear();
        }
      };
      bjlRcv.prototype.onMsg = function(message) {
        switch (message.command) {
         case cc["BaccaraCommand"].S_C_BACCARA_JOIN_TABLE_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraJoinTableResponse.decode(message.body);
          cc.log("返回加入桌子" + JSON.stringify(d));
          bjlUtils_1.default.getInstance().setStage(d.status.status);
          this._bjlLogic.show(d);
          this._bjlUi.show(d);
          this._bjlAnalysisChart.show(d);
          this.byStageSetUI(d.status);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_TABLE_SEAT_PLAYER_INFO_LIST_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraTableSeatPlayerInfoListResponse.decode(message.body);
          cc.log("座位上玩家的信息" + JSON.stringify(d));
          this._bjlUi.updateSite(d.playerList);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_TABLE_PLAYER_INFO_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraTablePlayerInfoResponse.decode(message.body);
          cc.log("加入桌子的玩家信息" + JSON.stringify(d));
          this._bjlUi.setMyInfo(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_UPDATE_PLAYER_NUM_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraUpdataPlayerNumResponse.decode(message.body);
          this._bjlUi.updateOnLineNum(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_BANKER_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraBankerResponse.decode(message.body);
          cc.log("下发庄家信息" + JSON.stringify(d));
          this._bjlUi.setBankerInfo(d.bankerInfo);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_SEAT_DOWN_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSeatDownResponse.decode(message.body);
          cc.log("返回申请坐下和离开" + JSON.stringify(d));
          this._bjlUi.leaveOrSitDownSeat(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_SEAT_REMAINING_MONEY:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSeatRemainingMoneyResponse.decode(message.body);
          cc.log("座位上的金币更新" + JSON.stringify(d));
          this._bjlUi.updateSiteMoney(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_CLEAR_HISTORY_COUNT:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraClearHistoryCountResponse.decode(message.body);
          cc.log("清理记录" + JSON.stringify(d));
          this._bjlAnalysisChart.clearJl(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_BET_MONEY_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraBetMoneyReponse.decode(message.body);
          cc.log("返回下注消息" + JSON.stringify(d));
          this._bjlUi.playerBet(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_SNED_CARD_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSendCardResponse.decode(message.body);
          cc.log("返回发牌信息" + JSON.stringify(d));
          this._bjlLogic.pokerInfo(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_ROUND_RESULT_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraRoundResultResonse.decode(message.body);
          cc.log("返回游戏结果" + JSON.stringify(d));
          this._bjlLogic.resultInfo(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_TABLE_STATUS_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraTableStatusResponse.decode(message.body);
          cc.log("桌子 状态" + JSON.stringify(d));
          this.byStageSetUI(d.status);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_LEAVE_TABLE_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraLeaveTableResponse.decode(message.body);
          cc.log("离开返回" + JSON.stringify(d));
          this._bjlUi.leave(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_CONTINUE_BET_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraContinueBetResponse.decode(message.body);
          cc.log("返回续押" + JSON.stringify(d));
          this._bjlUi.btnXy(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_CANCEL_BET_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraCancleBetResponse.decode(message.body);
          cc.log("返回撤消的金币" + JSON.stringify(d));
          this._bjlUi.backoutBet(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_FIGHT_BANKER_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraFightBankerRespone.decode(message.body);
          cc.log("返回申请上庄结果" + JSON.stringify(d));
          if (1 === d.result) {
            this._bjlUi.setShowSz(true);
            cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSeeBankerListRequest, cc["BaccaraCommand"].C_S_BACCARA_FIGHT_BANKER_LIST);
          }
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_FIGHT_BANKER_LIST:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSeeBankerListResponse.decode(message.body);
          cc.log("查看上庄列表" + JSON.stringify(d));
          this._bjlUi.setSZLayout(d);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_FIGHT_BANKER_CANCEL:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraCancelBankerResponse.decode(message.body);
          cc.log("取消申请返回" + JSON.stringify(d));
          1 === d.result && cc.Utils.setTis("取消申请上庄成功!");
          this._bjlUi.setShowSz(1 !== d.result);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_FIGHT_BANKER_DOWN:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraDownBankerResponse.decode(message.body);
          cc.log("下庄返回" + JSON.stringify(d));
          1 === d.result && cc.Utils.setTis("申请下庄成功!");
          this._bjlUi.setShowSz(1 !== d.result);
          return true;

         case cc["BaccaraCommand"].S_C_JUDGERE_RECONNECTION_PLAYER:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraJudgereReConnectionResponse.decode(message.body);
          cc.log("断线重连" + JSON.stringify(d));
          this._bjlLogic.clear();
          return true;

         case cc["CmdType"].S_C_REGISTER_TABLE_RESPONSE:
          var gameId = cc.Utils.getGameIdByRoomId(cc.PlayerData.getRoomID());
          gameId == cc["gameType"].gameType_BACCARAT ? cc.NetWork.sendMsg({
            roomCode: cc.PlayerData.getRoomID().toString(),
            userId: cc.PlayerData.getUserId()
          }, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraJoinTableRequest, cc["BaccaraCommand"].C_S_BACCARA_JOIN_TABLE_REQUEST) : cc.Utils.jumpToGame(gameId);
          return true;

         case cc["BaccaraCommand"].S_C_BACCARA_VOICE_RESPONSE:
          var d = cc.NetWork.getProtoFile("BaccaraRoom").BaccaraVoiceResponse.decode(message.body);
          cc.log("房间内聊天返回" + JSON.stringify(d));
          this.node.getChildByName("gameBarrage").getComponent("GameBarrage").wsReceived(d);
          return true;

         case cc["CmdType"].S_C_ROUND_BROADCAST_RESPONSE:
          var d = cc.NetWork.getProtoFile(cc.protoType.protoType_GameSystem).RoundBroadcastRespone.decode(message.body);
          cc.log("轮播" + JSON.stringify(d));
          this.node.getChildByName("inforbase").getComponent("BJLSlideshow").setData(d, 640);
          return true;
        }
        return false;
      };
      bjlRcv = __decorate([ ccclass ], bjlRcv);
      return bjlRcv;
    }(cc.Component);
    exports.default = bjlRcv;
    cc._RF.pop();
  }, {
    "./bjlUtils": "bjlUtils"
  } ],
  bjlUi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3acb3hU3BhDMaYp8/3dVtCH", "bjlUi");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bjlUtils_1 = require("./bjlUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bjlUi = function(_super) {
      __extends(bjlUi, _super);
      function bjlUi() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chipPreform = null;
        _this.headPlist = null;
        _this._bankerHeadPos = null;
        _this._meHeadPos = null;
        _this._onLinePos = null;
        _this._betArr = null;
        _this._settingLayer = null;
        _this._siteInfo = null;
        _this._siteMove = null;
        _this._szMoney = null;
        _this._isBanker = null;
        _this._maxBetMoney = null;
        _this._minBetMoney = 0;
        _this._minEnterMoney = 0;
        _this._isGuard = false;
        _this._saveChipMap = {};
        _this._bjlAnalysisChart = null;
        _this._chip = null;
        _this._chipLayout = null;
        _this._topNode = null;
        _this._chipNode = null;
        return _this;
      }
      bjlUi.prototype.onLoad = function() {
        this.init();
        this.constant();
        this.addPreform();
        this.siteOnTouchClient();
        cc.AudioManager.playSFX("resources/8010/audio/welcomeToGame.mp3");
        cc.AudioManager.playBGM("resources/8010/audio/bjl_bg.mp3");
      };
      bjlUi.prototype.init = function() {
        this._bankerHeadPos = null;
        this._meHeadPos = null;
        this._onLinePos = null;
        this._betArr = null;
        this._maxBetMoney = null;
        this._minBetMoney = 0;
        this._minEnterMoney = 0;
        this._siteInfo = {};
        this._siteMove = {};
        this._isGuard = false;
        this._isBanker = false;
        this._saveChipMap = {
          myChip: {},
          otherChip: {},
          siteChip: {}
        };
        for (var i = 0; i < 5; i++) {
          this._saveChipMap["myChip"][i] = {
            node: [],
            value: 0
          };
          this._saveChipMap["otherChip"][i] = {
            node: [],
            value: 0
          };
          for (var j = 0; j < 6; j++) {
            this._saveChipMap["siteChip"][j] || (this._saveChipMap["siteChip"][j] = {});
            this._saveChipMap["siteChip"][j][i] = {
              node: [],
              value: 0
            };
          }
        }
      };
      bjlUi.prototype.constant = function() {
        this._bjlAnalysisChart = this.node.getComponent("bjlAnalysisChart");
        this._chip = this.node.getChildByName("chip");
        var chipLayout = this._chip.getChildByName("chip_layout");
        this._chipLayout = chipLayout.getComponent("ChipLayout");
        this._topNode = this._chip.getChildByName("top_node");
        this._chipNode = this._chip.getChildByName("chip_node");
        var meHeadPos = this._chip.getChildByName("me_head").convertToWorldSpaceAR(cc.p(0, 0));
        this._meHeadPos = this._chip.getChildByName("chip_node").convertToNodeSpaceAR(meHeadPos);
        this._onLinePos = this._chip.getChildByName("btn_on_line").getPosition();
        var bankerHead = this._topNode.getChildByName("banker_bg").getChildByName("head_banker");
        var bankerPos = bankerHead.convertToWorldSpaceAR(bankerHead.getChildByName("gold").getPosition());
        this._bankerHeadPos = this._chip.getChildByName("chip_node").convertToNodeSpaceAR(bankerPos);
      };
      bjlUi.prototype.chipPos = function() {
        return [ cc.p(-227, 26), cc.p(-157, -128), cc.p(0, 14), cc.p(157, -128), cc.p(227, 26) ];
      };
      bjlUi.prototype.getDiffXOrY = function(area, isX) {
        if (isX) {
          if (0 === area || 4 === area) return 40;
          if (1 === area || 3 === area) return 120;
          if (2 === area) return 40;
        } else {
          if (0 === area || 4 === area) return 30;
          if (1 === area || 3 === area) return 50;
          if (2 === area) return 30;
        }
      };
      bjlUi.prototype.show = function(d) {
        this._betArr = d.jettons;
        this._betArr.length < 1 && cc.Utils.setTis("筹码数组值错误!!!");
        this._chipLayout.setChipBtnNum(this._betArr);
        this._minEnterMoney = Number(d.minEnterMoney);
        this._minBetMoney = Number(d.minBetMoney);
        this._maxBetMoney = bjlUtils_1.default.getInstance().convertToWan(d.maxBetMoney);
        this.setShowSz(0 !== d.ownStatus);
        this.setMaxMin();
        this.setRightDown("right");
        this.initBet(d.betListsData);
        if (d.bankerInfo) {
          this.setBankerInfo(d.bankerInfo, d.minBanker ? d.minBanker : null);
          this._szMoney = d.minBanker;
        }
      };
      bjlUi.prototype.initBet = function(d) {
        var betInfo = d.betList;
        if (betInfo) for (var i = 0; i < betInfo.length; i++) {
          var meBet = bjlUtils_1.default.getInstance().allotChipValue(this._betArr, betInfo[i].myBetMoey);
          for (var j in meBet) {
            var value = parseInt(j);
            for (var m = 0; m < meBet[j]; m++) {
              var chip = this.createChip(i, value, this._meHeadPos, true);
              this._saveChipMap["myChip"][i]["node"].push(chip);
            }
          }
          for (var k = 0; k < betInfo[i].seatBetMoney.length; k++) {
            if (!betInfo[i].seatBetMoney[k].userId) continue;
            var seatBet = bjlUtils_1.default.getInstance().allotChipValue(this._betArr, betInfo[i].seatBetMoney[k]);
            for (var g in seatBet) {
              if (!seatBet[g]) continue;
              var value = parseInt(g);
              for (var m = 0; m < seatBet[g]; m++) {
                var p = this.node.getChildByName("site_layout").getChildByName("site_" + i).getPosition();
                var chip = this.createChip(i, value, p, true);
                this._saveChipMap["siteChip"][i]["node"].push(chip);
              }
            }
          }
          var otherBet = bjlUtils_1.default.getInstance().allotChipValue(this._betArr, betInfo[i].totalBetMoney);
          for (var n in otherBet) {
            var value = parseInt(n);
            for (var m = 0; m < otherBet[n]; m++) {
              var chip = this.createChip(i, value, this._onLinePos, true);
              this._saveChipMap["otherChip"][i]["node"].push(chip);
            }
          }
          this.node.getChildByName("bet_num_node").getChildByName("node_" + i).getChildByName("img_x").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(d.posTotalBetMoney[i]);
          this.node.getChildByName("bet_num_node").getChildByName("node_" + i).getChildByName("label").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(betInfo[i].myBetMoey);
        }
      };
      bjlUi.prototype.setMaxMin = function() {
        var maxMin = this._topNode.getChildByName("banker_bg").getChildByName("min_max");
        maxMin.getChildByName("min").getComponent(cc.Label).string = this._minBetMoney;
        maxMin.getChildByName("max").getComponent(cc.Label).string = this._maxBetMoney;
      };
      bjlUi.prototype.addPreform = function() {
        this.createChipBtn();
        this.createSettingLayer();
      };
      bjlUi.prototype.updateOnLineNum = function(d) {
        this._chip && this._chip.getChildByName("btn_on_line") && this._chip.getChildByName("btn_on_line").getChildByName("num") && (this._chip.getChildByName("btn_on_line").getChildByName("num").getComponent(cc.Label).string = d.num);
      };
      bjlUi.prototype.setMyInfo = function(d) {
        var info = d.playerInfo;
        if (info.userId !== cc.PlayerData.getUserId()) return;
        cc.PlayerData.setMoney(bjlUtils_1.default.getInstance().convertToFixed(info.money));
        this._isGuard = this._chipLayout.idWatch(this._minEnterMoney);
        this._isBanker || this._isGuard || 1 !== bjlUtils_1.default.getInstance().getStage() || (this._isGuard = this._chipLayout.startBet());
        var meHead = this._chip.getChildByName("me_head");
        var pngName = cc.PlayerData.getHeadPngName(cc.PlayerData.getHeadIndex(), cc.PlayerData.getSex());
        meHead.getChildByName("mask").getChildByName("head_btn").getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(pngName);
        meHead.getChildByName("name").getComponent(cc.Label).string = info.name;
        meHead.getChildByName("gold_pic").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(cc.PlayerData.getMoney());
      };
      bjlUi.prototype.updateMyMoney = function(d) {
        if (d && d.myWinMoney && 0 !== Number(d.myWinMoney)) {
          var addMinus = cc.instantiate(this._chip.getChildByName("me_head").getChildByName("minus"));
          Number(d.myWinMoney) > 0 && (addMinus = cc.instantiate(this._chip.getChildByName("me_head").getChildByName("add")));
          this._chip.getChildByName("me_head").addChild(addMinus);
          addMinus.getComponent(cc.Label).string = "/" + bjlUtils_1.default.getInstance().convertToFixed(Math.abs(Number(d.myWinMoney)));
          bjlUtils_1.default.getInstance().moneyAction(addMinus);
        }
        var money = d && d.money ? bjlUtils_1.default.getInstance().convertToFixed(Number(d.money)) : 0;
        d && money && cc.PlayerData.setMoney(money);
        var meHead = this._chip.getChildByName("me_head");
        meHead.getChildByName("gold_pic").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(cc.PlayerData.getMoney());
        this.updateMySeatMoney();
      };
      bjlUi.prototype.updateMySeatMoney = function() {
        if (this._siteInfo && bjlUtils_1.default.getInstance().strIsInArr(cc.PlayerData.getUserId(), this._siteInfo)) {
          var site = this.node.getChildByName("site_layout").getChildByName("site_" + bjlUtils_1.default.getInstance().strInMap(cc.PlayerData.getUserId(), this._siteInfo));
          site.getChildByName("head").getChildByName("headLayout").getChildByName("gold_num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(cc.PlayerData.getMoney());
        }
      };
      bjlUi.prototype.setBankerInfo = function(d, szMoney) {
        var bankerHead = this._topNode.getChildByName("banker_bg").getChildByName("head_banker");
        if (d.userId === cc.PlayerData.getUserId()) this._isBanker = true; else {
          this._isBanker && !this._isGuard;
          this.setShowSz(false);
          this._isBanker = false;
        }
        this._isGuard || this._chipLayout.setTis(this._isBanker);
        var pngName = cc.PlayerData.getHeadPngName(d.head, d.sex);
        bankerHead.getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(pngName);
        bankerHead.getChildByName("name").getComponent(cc.Label).string = d.name;
        szMoney && (bankerHead.getChildByName("need").getComponent(cc.Label).string = "上庄需要" + bjlUtils_1.default.getInstance().convertToWan(szMoney) + "金币");
        this.updateBankerGold(d.money);
      };
      bjlUi.prototype.updateBankerGold = function(num) {
        if (!num) return;
        this._topNode.getChildByName("banker_bg").getChildByName("head_banker").getChildByName("gold").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(num);
      };
      bjlUi.prototype.setResultInfo = function(d) {
        cc.log("---bjl resultInfo money = " + d.roundResult.money);
        this.updateMyMoney(d.roundResult);
        this.updateBankerGold(d.roundResult.bankerMoney);
        this.resultUpdateSeat(d.seatPlayerList);
      };
      bjlUi.prototype.startBet = function() {
        cc.AudioManager.playSFX("resources/8010/audio/kaishixiazhu.wav");
        this._isBanker || this._isGuard || 1 !== bjlUtils_1.default.getInstance().getStage() || (this._isGuard = this._chipLayout.startBet());
      };
      bjlUi.prototype.stopBet = function() {
        cc.AudioManager.playSFX("resources/8010/audio/tingzhixiazhu.wav");
        this._isBanker || this._isGuard || this._chipLayout.stopBet();
      };
      bjlUi.prototype.meBet = function(dir) {
        if (this._isBanker) {
          cc.Utils.setTis("庄家不能下注!");
          return;
        }
        if (1 !== bjlUtils_1.default.getInstance().getStage()) {
          cc.Utils.setTis("亲，还未到下注时间!!!");
          return;
        }
        if (this._isGuard) {
          cc.Utils.setTis("您的金币不足" + this._minEnterMoney + "，现在处于观看模式!");
          return;
        }
        if (this._betArr[this._chipLayout.getChipIdx()] <= 0) {
          cc.Utils.setTis("请选择押注金额!");
          return;
        }
        var box = this.node.getChildByName("bet_num_node").getChildByName("node_" + dir).getChildByName("box");
        box.active = true;
        box.runAction(cc.sequence(cc.delayTime(.08), cc.callFunc(function() {
          box.active = false;
        })));
        cc.NetWork.sendMsg({
          betMoneyIndex: this._chipLayout.getChipIdx(),
          area: dir
        }, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraBetMoneyRequest, cc["BaccaraCommand"].C_S_BACCARA_BET_MONEY_REQUEST);
      };
      bjlUi.prototype.regainChip = function(areaArr) {
        for (var i = 0; i < areaArr.length; i++) !areaArr[2] || 1 !== areaArr[2] || 1 !== i && 3 !== i ? 0 === areaArr[i] && this.traversalMap(i, true) : this.traversalMap(i, null);
      };
      bjlUi.prototype.bankerPayForChip = function(areaArr) {
        for (var i = 0; i < areaArr.length; i++) 0 !== areaArr[i] && this.payForChip(i);
      };
      bjlUi.prototype.playerRegainChip = function(areaArr) {
        for (var i = 0; i < areaArr.length; i++) 0 !== areaArr[i] && this.traversalMap(i, null);
      };
      bjlUi.prototype.traversalMap = function(area, isBanker) {
        if (area < 0) return;
        var p1, p2;
        if (isBanker) p1 = p2 = this._bankerHeadPos; else {
          p1 = this._meHeadPos;
          p2 = this._onLinePos;
        }
        var isPlayAudio = this._saveChipMap["myChip"][area]["node"].length > 0 || this._saveChipMap["otherChip"][area]["node"].length > 0;
        var _loop_1 = function() {
          var myNode = this_1._saveChipMap["myChip"][area]["node"].pop();
          myNode.getComponent("ChipNode").flyIn(p1, -1, function() {
            bjlUtils_1.default.getInstance().setPoolChild(myNode);
          });
        };
        var this_1 = this;
        while (this._saveChipMap["myChip"][area]["node"].length > 0) _loop_1();
        var _loop_2 = function() {
          var otherNode = this_2._saveChipMap["otherChip"][area]["node"].pop();
          otherNode.getComponent("ChipNode").flyIn(p2, -1, function() {
            bjlUtils_1.default.getInstance().setPoolChild(otherNode);
          });
        };
        var this_2 = this;
        while (this._saveChipMap["otherChip"][area]["node"].length > 0) _loop_2();
        var siteLayout = this.node.getChildByName("site_layout");
        for (var j = 0; j < siteLayout.children.length; j++) {
          var p = siteLayout.children[j].getPosition();
          isBanker && (p = p1);
          isPlayAudio = isPlayAudio || this._saveChipMap["siteChip"][j][area]["node"].length > 0;
          var _loop_3 = function() {
            var siteNode = this_3._saveChipMap["siteChip"][j][area]["node"].pop();
            siteNode.getComponent("ChipNode").flyIn(p, -1, function() {
              bjlUtils_1.default.getInstance().setPoolChild(siteNode);
            });
          };
          var this_3 = this;
          while (this._saveChipMap["siteChip"][j][area]["node"].length > 0) _loop_3();
        }
        isPlayAudio && cc.AudioManager.playSFX("resources/8010/audio/bet_chip.wav");
      };
      bjlUi.prototype.payForChip = function(area) {
        var isPlayAudio = false, chipTemplate = null;
        if (this._saveChipMap && this._saveChipMap["myChip"] && this._saveChipMap["myChip"][area]["node"].length > 0) {
          var meChipLen = this._saveChipMap["myChip"][area]["node"].length;
          var meLen = meChipLen;
          for (var i = 0; i < meLen; i++) {
            chipTemplate = this._saveChipMap["myChip"][area]["node"][meChipLen - meLen + i];
            var chipNode = this.createChip(area, chipTemplate.getComponent("ChipNode").getChipValue(), this._bankerHeadPos, false, .005);
            this._saveChipMap["myChip"][area]["node"].push(chipNode);
          }
          isPlayAudio = true;
        }
        if (this._saveChipMap && this._saveChipMap["otherChip"] && this._saveChipMap["otherChip"][area]["node"].length > 0) {
          var otherChipLen = this._saveChipMap["otherChip"][area]["node"].length;
          var otherLen = otherChipLen;
          for (var j = 0; j < otherLen; j++) {
            chipTemplate = this._saveChipMap["otherChip"][area]["node"][otherChipLen - otherLen + j];
            var chipNode = this.createChip(area, chipTemplate.getComponent("ChipNode").getChipValue(), this._bankerHeadPos, false, .005);
            this._saveChipMap["otherChip"][area]["node"].push(chipNode);
          }
          isPlayAudio = true;
        }
        var siteLayout = this.node.getChildByName("site_layout");
        for (var m = 0; m < siteLayout.children.length; m++) if (this._saveChipMap && this._saveChipMap["siteChip"] && this._saveChipMap["siteChip"][m][area]["node"].length > 0) {
          var siteChipLen = this._saveChipMap["siteChip"][m][area]["node"].length;
          var siteLen = siteChipLen;
          for (var n = 0; n < siteLen; n++) {
            chipTemplate = this._saveChipMap["siteChip"][m][area]["node"][siteChipLen - siteLen + n];
            var chipNode = this.createChip(area, chipTemplate.getComponent("ChipNode").getChipValue(), this._bankerHeadPos, false, .005);
            this._saveChipMap["siteChip"][m][area]["node"].push(chipNode);
          }
          isPlayAudio = true;
        }
        isPlayAudio && cc.AudioManager.playSFX("resources/8010/audio/bet_chip.wav");
      };
      bjlUi.prototype.playerBet = function(d) {
        var betInfo = d.betInfo;
        if (betInfo.length > 0) {
          var chipDataNode = this.node.getChildByName("bet_num_node");
          for (var k = 0; k < betInfo.length; k++) {
            var btn = chipDataNode.getChildByName("node_" + betInfo[k].pos);
            var money = Number(betInfo[k].myBetMoey);
            money > 0 && (btn.getChildByName("label").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(betInfo[k].myBetMoey));
            betInfo[k].totalBetMoney && (btn.getChildByName("img_x").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(betInfo[k].totalBetMoney));
          }
        }
        var chipArr = d.jetton;
        if (chipArr.length > 0) {
          var isSumChip = false, siteChip = -1, isBet = false;
          for (var i = 0; i < chipArr.length; i++) if (chipArr[i].jettonNum > 0) for (var j = 0; j < Number(chipArr[i].jettonNum); j++) {
            var area = chipArr[i].area;
            if (d.userId === cc.PlayerData.getUserId()) {
              isBet = true;
              var chip = this.createChip(area, chipArr[i].jettonVal, this._meHeadPos, null);
              this._saveChipMap["myChip"][area]["node"].push(chip);
              1 === d.isContinueBet ? isSumChip = true : cc.AudioManager.playSFX("resources/8010/audio/chip.wav");
              bjlUtils_1.default.getInstance().limitChipNum(this._saveChipMap["myChip"][area]["node"], 100);
            } else {
              var siteIdx = bjlUtils_1.default.getInstance().isHaveSeat(this._siteInfo, d.userId);
              if (-1 !== siteIdx) {
                siteChip = siteIdx;
                var p = this.node.getChildByName("site_layout").getChildByName("site_" + siteIdx).getPosition();
                var chip = this.createChip(area, chipArr[i].jettonVal, p, null);
                1 === d.isContinueBet ? isSumChip = true : cc.AudioManager.playSFX("resources/8010/audio/chip.wav");
                this._saveChipMap["siteChip"][siteIdx][area]["node"].push(chip);
                bjlUtils_1.default.getInstance().limitChipNum(this._saveChipMap["siteChip"][siteIdx][area]["node"], 80);
              } else {
                isSumChip = true;
                var chip = this.createChip(area, chipArr[i].jettonVal, this._onLinePos, null);
                this._saveChipMap["otherChip"][area]["node"].push(chip);
                bjlUtils_1.default.getInstance().limitChipNum(this._saveChipMap["otherChip"][area]["node"], 200);
              }
            }
          }
          isSumChip && cc.AudioManager.playSFX("resources/8010/audio/bet_chip.wav");
          if (isBet) {
            cc.PlayerData.setMoney(bjlUtils_1.default.getInstance().convertToFixed(d.remainingMoney));
            this._chipLayout.isShowChipBtn();
          }
          siteChip >= 0 && this.siteMove(siteChip);
        }
        this.updateMyMoney(null);
      };
      bjlUi.prototype.siteMove = function(idx) {
        if (this._siteMove[idx]) return;
        var me = this;
        var siteLayout = this.node.getChildByName("site_layout");
        var site = siteLayout.getChildByName("site_" + idx);
        var diffX = -20;
        idx % 2 === 0 && (diffX = 20);
        var p = site.getPosition();
        var move = cc.moveTo(.05, cc.p(1 * p.x + diffX, 1 * p.y));
        var move1 = cc.moveTo(.05, p);
        me._siteMove[idx] = true;
        site.runAction(cc.sequence(move, move1, cc.callFunc(function() {
          me._siteMove[idx] = false;
        })));
      };
      bjlUi.prototype.siteOnTouchClient = function() {
        var me = this, isTouch = true;
        var siteLayout = this.node.getChildByName("site_layout");
        var _loop_4 = function(i) {
          var site = siteLayout.getChildByName("site_" + i);
          var siteBtn = site.getChildByName("site_btn");
          siteBtn.on(cc.Node.EventType.TOUCH_END, function() {
            if (!isTouch) return;
            isTouch = false;
            me.scheduleOnce(function() {
              isTouch = true;
            }, .5);
            cc.NetWork.sendMsg({
              pos: i,
              type: 0
            }, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSeatDownRequest, cc["BaccaraCommand"].C_S_BACCARA_SEAT_DOWN_REQUEST);
          });
          var head = site.getChildByName("head");
          head.on(cc.Node.EventType.TOUCH_END, function() {
            if (!isTouch) return;
            isTouch = false;
            me.scheduleOnce(function() {
              isTouch = true;
            }, .5);
            if (me._siteInfo[i] !== cc.PlayerData.getUserId()) return;
            cc.NetWork.sendMsg({
              pos: i,
              type: 1
            }, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSeatDownRequest, cc["BaccaraCommand"].C_S_BACCARA_SEAT_DOWN_REQUEST);
          });
        };
        for (var i = 0; i < siteLayout.children.length; i++) _loop_4(i);
      };
      bjlUi.prototype.leaveOrSitDownSeat = function(d) {
        if (0 !== d.pos && !d.pos) return;
        if (0 === d.type && d.playerInfo) this.setSiteInfo(d.playerInfo); else {
          var siteLayout = this.node.getChildByName("site_layout");
          var site = siteLayout.getChildByName("site_" + d.pos);
          site.getChildByName("head").active = false;
          site.getChildByName("site_btn").active = true;
          if (this._siteInfo[d.pos]) {
            this._siteInfo[d.pos] = null;
            this._siteMove[d.pos] = false;
          }
          for (var i = 0; i < 5; i++) if (this._saveChipMap["siteChip"][d.pos] && this._saveChipMap["siteChip"][d.pos][i] && this._saveChipMap["siteChip"][d.pos][i]["node"]) while (this._saveChipMap["siteChip"][d.pos][i]["node"].length > 0) {
            var node = this._saveChipMap["siteChip"][d.pos][i]["node"].pop();
            this._saveChipMap["otherChip"][i]["node"].push(node);
          }
        }
      };
      bjlUi.prototype.updateSite = function(d) {
        var siteLayout = this.node.getChildByName("site_layout");
        for (var i = 0; i < d.length; i++) if (d[i].userId <= 0) {
          var site = siteLayout.getChildByName("site_" + i);
          site.getChildByName("head").active = false;
          site.getChildByName("site_btn").active = true;
          if (this._siteInfo[i]) {
            this._siteInfo[i] = null;
            this._siteMove[i] = false;
          }
        } else this.setSiteInfo(d[i]);
      };
      bjlUi.prototype.resultUpdateSeat = function(d) {
        for (var i = 0; i < d.length; i++) d[i].userId <= 0 || !bjlUtils_1.default.getInstance().strIsInArr(d[i].userId, this._siteInfo) || this.setSiteInfo(d[i]);
      };
      bjlUi.prototype.updateSiteMoney = function(d) {
        if (!d || !d.seat && 0 !== d.seat || !this._siteInfo || !this._siteInfo[d.seat]) return;
        if (this._siteInfo[d.seat] === d.userId) {
          var site = this.node.getChildByName("site_layout").getChildByName("site_" + d.seat);
          site.getChildByName("head").getChildByName("headLayout").getChildByName("gold_num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(d.remainingMoney);
        }
      };
      bjlUi.prototype.seatFlyMoney = function(d) {
        if (!d) return;
        var seat = this.node.getChildByName("site_layout");
        for (var i = 0; i < d.length; i++) {
          var offset = bjlUtils_1.default.getInstance().convertToFixed(d[i].breakEvenMoney);
          if (d[i].userId !== this._siteInfo[d[i].seat] || 0 === offset) continue;
          var flyMoney = seat.getChildByName("site_" + i).getChildByName("minus");
          offset > 0 && (flyMoney = seat.getChildByName("site_" + i).getChildByName("add"));
          var money = cc.instantiate(flyMoney);
          seat.getChildByName("site_" + i).addChild(money);
          money.getComponent(cc.Label).string = "/" + offset;
          bjlUtils_1.default.getInstance().moneyAction(money);
        }
      };
      bjlUi.prototype.setSiteInfo = function(info) {
        if (!info || !info.seat && 0 !== info.seat || info.seat < 0 || info.userId <= 0) return;
        var siteLayout = this.node.getChildByName("site_layout");
        var site = siteLayout.getChildByName("site_" + info.seat);
        if (!site) return;
        site.getChildByName("head").active = true;
        site.getChildByName("site_btn").active = false;
        var headLayout = site.getChildByName("head").getChildByName("headLayout");
        var pngName = cc.PlayerData.getHeadPngName(info.head, info.sex);
        headLayout.getChildByName("head_btn").getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(pngName);
        headLayout.getChildByName("gold_num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(info.money);
        headLayout.getChildByName("name").getComponent(cc.Label).string = info.name;
        this._siteInfo[info.seat] || (this._siteInfo[info.seat] = null);
        this._siteInfo[info.seat] = info.userId;
      };
      bjlUi.prototype.btnOnClient = function(event) {
        switch (event.target.name) {
         case "btn_0":
         case "btn_1":
         case "btn_2":
         case "btn_3":
         case "btn_4":
          this.meBet(Number(event.target.name.substr(-1)));
          break;

         case "bt_qx":
          cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraCancelBankerRequest, cc["BaccaraCommand"].C_S_BACCARA_FIGHT_BANKER_CANCEL);
          break;

         case "bt_xz":
          cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraDownBankerRequest, cc["BaccaraCommand"].C_S_BACCARA_FIGHT_BANKER_DOWN);
          break;

         case "btn_sz":
          cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraFightBankerRequest, cc["BaccaraCommand"].C_S_BACCARA_FIGHT_BANKER_REQUEST);
          break;

         case "btn_szlb":
          cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraSeeBankerListRequest, cc["BaccaraCommand"].C_S_BACCARA_FIGHT_BANKER_LIST);
          break;

         case "bt_close_sz":
          this.node.getChildByName("shangz_panel").active = false;
          break;

         case "btn_fh":
          cc.NetWork.sendMsg({
            leaveType: 1
          }, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraLeaveTableRequest, cc["BaccaraCommand"].C_S_BACCARA_LEAVE_TABLE_REQUEST);
          break;

         case "btn_setting":
          this._settingLayer.setActive(true);
          break;

         case "btn_help":
          this.node.getChildByName("help_layer").active = true;
          this.node.getChildByName("help_layer").getChildByName("scroll_view").getComponent(cc.ScrollView).scrollToTop(.01);
          break;

         case "head_banker":
          cc.log("--头像");
          break;

         case "trend_chart":
          this.node.getChildByName("chart_node").active = true;
          this._bjlAnalysisChart.setScrollShowPoint();
          break;

         case "chart_close":
          this.node.getChildByName("chart_node").active = false;
          break;

         case "left":
          this.setRightDown("left");
          break;

         case "right":
          this.setRightDown("right");
          break;

         case "btn_close":
          this.node.getChildByName("help_layer").active = false;
        }
      };
      bjlUi.prototype.setRightDown = function(area) {
        var isShow = false;
        "left" === area && (isShow = true);
        this.node.getChildByName("right_down").getChildByName("left").getChildByName("panel").active = isShow;
        this.node.getChildByName("right_down").getChildByName("left").getComponent(cc.Button).interactable = !isShow;
        this.node.getChildByName("right_down").getChildByName("right").getChildByName("panel").active = !isShow;
        this.node.getChildByName("right_down").getChildByName("right").getComponent(cc.Button).interactable = isShow;
        var panel = this.node.getChildByName("right_down").getChildByName("" + area).getChildByName("panel");
        this.scheduleOnce(function() {
          panel.width < panel.getChildByName("view").getChildByName("content").width && panel.getComponent(cc.ScrollView).scrollToRight(.01);
        }, .001);
      };
      bjlUi.prototype.createChip = function(area, value, pos, noFly, speed) {
        void 0 === speed && (speed = .0012);
        value = Number(value);
        if (value <= 0) return;
        var chipNode = null;
        chipNode = bjlUtils_1.default.getInstance()._chipPoolArr && bjlUtils_1.default.getInstance()._chipPoolArr.length > 0 ? bjlUtils_1.default.getInstance().getPoolChild() : cc.instantiate(this.chipPreform);
        var chipLayer = chipNode.getComponent("ChipNode");
        this._chipNode.addChild(chipNode);
        var diffX = this.getDiffXOrY(area, true), diffY = this.getDiffXOrY(area, null);
        var p = this.chipPos()[area];
        if (noFly) {
          chipNode.active = true;
          chipLayer.set(value, bjlUtils_1.default.getInstance().getAreaRange(p, -diffX, diffX, -diffY, diffY));
          chipNode.scale = .7;
        } else {
          chipNode.active = false;
          chipLayer.set(value, pos);
          chipLayer.flyOut(bjlUtils_1.default.getInstance().getAreaRange(p, -diffX, diffX, -diffY, diffY), function() {}, speed);
        }
        return chipNode;
      };
      bjlUi.prototype.leave = function(d) {
        0 === d.leaveType && cc.PlayerData.getUserId() === d.userId ? cc.Utils.jumpToMainUI() : this._settingLayer.setActive(false);
      };
      bjlUi.prototype.setShowSz = function(isShow) {
        this._topNode.getChildByName("banker_bg").getChildByName("head_banker").getChildByName("btn_szlb").active = isShow;
        this._topNode.getChildByName("banker_bg").getChildByName("head_banker").getChildByName("btn_sz").active = !isShow;
        isShow || (this.node.getChildByName("shangz_panel").active = false);
      };
      bjlUi.prototype.setSZLayout = function(d) {
        var szPanel = this.node.getChildByName("shangz_panel");
        szPanel.active = true;
        szPanel.getChildByName("num").getComponent(cc.Label).string = this._szMoney ? this._szMoney : 0;
        var content = szPanel.getChildByName("scroll_view").getChildByName("view").getChildByName("content");
        var firstItem = content.getChildByName("item");
        content.removeAllChildren(true);
        if (1 === d.status) {
          szPanel.getChildByName("bt_qx").active = true;
          szPanel.getChildByName("bt_xz").active = false;
        } else if (2 === d.status) {
          szPanel.getChildByName("bt_qx").active = false;
          szPanel.getChildByName("bt_xz").active = true;
        }
        var info = d.waitBankerQueue;
        if (info.length < 1) {
          firstItem.active = false;
          content.addChild(firstItem);
          return;
        }
        for (var i = 0; i < info.length; i++) {
          if (!info[i]) continue;
          var item = cc.instantiate(firstItem);
          item.active = true;
          content.addChild(item);
          1 === info[i].status ? item.getChildByName("rankbg").active = true : item.getChildByName("rankbg").active = false;
          item.getChildByName("rank").getComponent(cc.Label).string = (i + 1).toString();
          item.getChildByName("id").getComponent(cc.Label).string = "ID: " + info[i].userId;
          item.getChildByName("name").getComponent(cc.Label).string = info[i].fullName;
          item.getChildByName("coin_bg").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(info[i].money);
          var pngName = cc.PlayerData.getHeadPngName(info[i].headImg, info[i].sex);
          item.getChildByName("head_btn").getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(pngName);
        }
      };
      bjlUi.prototype.createSettingLayer = function() {
        var _this = this;
        this._settingLayer || cc.loader.loadRes("8010/prafeb/settinggame", function(err, prefab) {
          if (err) {
            cc.error("load setting error. " + err);
            return;
          }
          var node = cc.instantiate(prefab);
          node.parent = _this.node;
          node.setLocalZOrder(210);
          _this._settingLayer = node.getComponent("SettingLayout");
          _this._settingLayer.init();
          _this._settingLayer.isShowBtnBack(true);
        });
      };
      bjlUi.prototype.backoutBet = function(d) {
        if (d.userId !== cc.PlayerData.getUserId()) return;
        cc.PlayerData.setMoney(bjlUtils_1.default.getInstance().convertToFixed(d.remainingMoney));
        this._chipLayout.isShowChipBtn();
        for (var i = 0; i < 5; i++) {
          var _loop_5 = function() {
            var myNode = this_4._saveChipMap["myChip"][i]["node"].pop();
            myNode.getComponent("ChipNode").flyIn(this_4._meHeadPos, -1, function() {
              bjlUtils_1.default.getInstance().setPoolChild(myNode);
            });
          };
          var this_4 = this;
          while (this._saveChipMap["myChip"][i]["node"].length > 0) _loop_5();
          var betNode = this.node.getChildByName("bet_num_node").getChildByName("node_" + i);
          betNode.getChildByName("img_x").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(d.betMoneysList.betList[i].totalBetMoney);
          betNode.getChildByName("label").getChildByName("num").getComponent(cc.Label).string = bjlUtils_1.default.getInstance().convertToFixed(d.betMoneysList.betList[i].myBetMoey);
        }
        this.updateMyMoney(null);
      };
      bjlUi.prototype.btnXy = function(d) {};
      bjlUi.prototype.createChipBtn = function() {
        var me = this;
        me._chipLayout.show(function(d) {
          if (!d.btn) return;
          switch (d.btn) {
           case "bt_replay":
            if (1 !== bjlUtils_1.default.getInstance().getStage()) {
              cc.Utils.setTis("亲，还未到下注时间!!!");
              return;
            }
            cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraContinueBetRequest, cc["BaccaraCommand"].C_S_BACCARA_CONTINUE_BET_REQUEST);
            break;

           case "bt_revoke":
            if (1 !== bjlUtils_1.default.getInstance().getStage()) {
              cc.Utils.setTis("亲，还未到下注时间!!!");
              return;
            }
            cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("BaccaraRoom").BaccaraCancelBetRequest, cc["BaccaraCommand"].C_S_BACCARA_CANCEL_BET_REQUEST);
            break;

           case "audio_btn":
            me.node.getChildByName("gameVoice").getComponent("GameVoice").closeOrOpenVoice(true);
          }
        });
      };
      bjlUi.prototype.clear = function() {
        this._chip.getChildByName("chip_node").removeAllChildren(true);
        var touchBetNode = this.node.getChildByName("bet_num_node");
        for (var i = 0; i < touchBetNode.children.length; i++) {
          if (this._saveChipMap["myChip"][i]["node"]) {
            while (this._saveChipMap["myChip"][i]["node"].length > 0) bjlUtils_1.default.getInstance().setPoolChild(this._saveChipMap["myChip"][i]["node"].pop());
            this._saveChipMap["myChip"][i]["node"] = [];
          }
          if (this._saveChipMap["otherChip"][i]["node"]) {
            while (this._saveChipMap["otherChip"][i]["node"].length > 0) bjlUtils_1.default.getInstance().setPoolChild(this._saveChipMap["otherChip"][i]["node"].pop());
            this._saveChipMap["otherChip"][i]["node"] = [];
          }
          for (var j = 0; j < 6; j++) if (this._saveChipMap["siteChip"][j][i]["node"]) {
            while (this._saveChipMap["siteChip"][j][i]["node"].length > 0) bjlUtils_1.default.getInstance().setPoolChild(this._saveChipMap["siteChip"][j][i]["node"].pop());
            this._saveChipMap["siteChip"][j][i]["node"] = [];
          }
          touchBetNode.children[i].getChildByName("img_x").getChildByName("num").getComponent(cc.Label).string = "0.00";
          touchBetNode.children[i].getChildByName("label").getChildByName("num").getComponent(cc.Label).string = "0.00";
          touchBetNode.children[i].getChildByName("box").active = false;
          touchBetNode.children[i].getChildByName("win").active = false;
        }
      };
      bjlUi.prototype.clearPoolNode = function() {
        if (!bjlUtils_1.default.getInstance()._chipPoolArr || bjlUtils_1.default.getInstance()._chipPoolArr.length < 1) return;
        bjlUtils_1.default.getInstance()._chipPoolArr.pop().destroy();
      };
      bjlUi.prototype.update = function(dt) {
        bjlUtils_1.default.getInstance().clearPoolNode();
      };
      __decorate([ property(cc.Prefab) ], bjlUi.prototype, "chipPreform", void 0);
      __decorate([ property(cc.SpriteAtlas) ], bjlUi.prototype, "headPlist", void 0);
      bjlUi = __decorate([ ccclass ], bjlUi);
      return bjlUi;
    }(cc.Component);
    exports.default = bjlUi;
    cc._RF.pop();
  }, {
    "./bjlUtils": "bjlUtils"
  } ],
  bjlUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d6301CAjzVN3IkVkbz/Goi8", "bjlUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MASK_COLOR = 240;
    var MASK_VALUE = 15;
    var bjlUtils = function() {
      function bjlUtils() {
        this._chipPoolArr = [];
        this.stage = 0;
      }
      bjlUtils_1 = bjlUtils;
      bjlUtils.getInstance = function() {
        this.m_sInstance || (this.m_sInstance = new bjlUtils_1());
        return this.m_sInstance;
      };
      bjlUtils.prototype.getStage = function() {
        return this.stage;
      };
      bjlUtils.prototype.setStage = function(stage) {
        this.stage = stage;
      };
      bjlUtils.prototype.updataSpritetext = function(sBase, fileurl) {
        var realurl = cc.url.raw(fileurl);
        var texture = cc.textureCache.addImage(realurl, null, null);
        var sSf = new cc.SpriteFrame();
        sSf.setTexture(texture);
        sBase.getComponent("cc.Sprite").spriteFrame = sSf;
      };
      bjlUtils.prototype.convertToFixed = function(num) {
        num = Number(num);
        num = num ? num.toFixed(2) : 0;
        return num;
      };
      bjlUtils.prototype.convertToWan = function(num) {
        num = Number(num);
        if (num > 1e4) return num / 1e4 + "万";
        return parseInt(num);
      };
      bjlUtils.prototype.allotChipValue = function(chipArr, num) {
        if (num <= 0) return null;
        var betInfo = {}, sum = num;
        for (var i = chipArr.length - 1; i >= 0; i--) {
          var chipNum = Number(chipArr[i]);
          if (chipNum > sum || sum / chipNum === 0) continue;
          betInfo["" + chipNum] = (sum / chipNum).toFixed(0);
          sum %= chipNum;
        }
        return betInfo;
      };
      bjlUtils.prototype.getCardValue = function(card) {
        return card & MASK_VALUE;
      };
      bjlUtils.prototype.getCardColor = function(card) {
        return (card & MASK_COLOR) >> 4;
      };
      bjlUtils.prototype.analysisCardNew = function(card, startIdx) {
        var values = this.getCardValue(card);
        var colors = this.getCardColor(card);
        startIdx || (startIdx = 0);
        var cardNumber = 0;
        switch (colors) {
         case 0:
          cardNumber = 13 + revalue(values);
          break;

         case 1:
          cardNumber = revalue(values);
          break;

         case 2:
          cardNumber = 39 + revalue(values);
          break;

         case 3:
          cardNumber = 26 + revalue(values);
          break;

         case 4:
          cardNumber = 39 + values;
        }
        function revalue(value) {
          return (value + startIdx) % 14 + parseInt((value + startIdx) / 14 + "");
        }
        return {
          cardName: "pai_" + cardNumber,
          color: colors,
          value: values
        };
      };
      bjlUtils.prototype.moneyAction = function(node) {
        if (!node) return;
        node.active = true;
        var pos = node.getPosition();
        var moveTo = cc.moveTo(1.2, cc.p(pos.x, pos.y + 60));
        var scaleTo = cc.scaleTo(1.2, 1);
        node.runAction(cc.sequence(cc.spawn(moveTo, scaleTo), cc.delayTime(.6), cc.callFunc(function() {
          node.destroy();
        })));
      };
      bjlUtils.prototype.strIsInArr = function(str, arr) {
        for (var i in arr) if (Number(str) === Number(arr[i])) return true;
        return false;
      };
      bjlUtils.prototype.strInMap = function(str, map) {
        for (var i in map) if (str === map[i]) return i;
        return -1;
      };
      bjlUtils.prototype.isHaveSeat = function(map, userId) {
        for (var i in map) if (map[i] === userId) return Number(i);
        return -1;
      };
      bjlUtils.prototype.setPoolChild = function(node) {
        node.active = false;
        node.parent = null;
        this._chipPoolArr.push(node);
      };
      bjlUtils.prototype.getPoolChild = function() {
        if (!this._chipPoolArr || this._chipPoolArr.length < 1) return;
        return this._chipPoolArr.pop();
      };
      bjlUtils.prototype.clearPoolNode = function() {
        this._chipPoolArr && this._chipPoolArr.length > 1200 && this._chipPoolArr.pop().destroy();
      };
      bjlUtils.prototype.limitChipNum = function(arr, limitLen) {
        if (arr.length < limitLen) return;
        for (var i = 0; i < arr.length - limitLen; i++) {
          var node = arr[0];
          arr.splice(0, 1);
          node.destroy();
        }
      };
      bjlUtils.prototype.random = function(min, max) {
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min);
        return re;
      };
      bjlUtils.prototype.getAreaRange = function(pos, xMin, xMax, yMin, yMax) {
        if (!pos) return;
        xMin || (xMin = -50);
        xMax || (xMax = 50);
        yMin || (yMin = -60);
        yMax || (yMax = 60);
        return cc.p(pos.x + this.random(xMin, xMax), pos.y + this.random(yMin, yMax));
      };
      bjlUtils.m_sInstance = null;
      bjlUtils = bjlUtils_1 = __decorate([ ccclass ], bjlUtils);
      return bjlUtils;
      var bjlUtils_1;
    }();
    exports.default = bjlUtils;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BJLSlideshow", "ChipLayout", "ChipNode", "GameBarrage", "GameDefine", "GameVoice", "HeadLayout", "SettingLayout", "VoiceItem", "bjlAnalysisChart", "bjlLogic", "bjlRcv", "bjlUi", "bjlUtils" ]);
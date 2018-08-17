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
  HHChipLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c982e+ONBD+aNe4WvW9LWt", "HHChipLayout");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HHChipLayout = function(_super) {
      __extends(HHChipLayout, _super);
      function HHChipLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._callback = null;
        _this._chipIdx = 0;
        _this._betsArr = null;
        _this._chipBtnLen = null;
        _this._enterMoney = null;
        return _this;
      }
      HHChipLayout.prototype.onLoad = function() {
        this._betsArr = [];
      };
      HHChipLayout.prototype.show = function(callback, chipLen) {
        callback && (this._callback = callback);
        this._chipBtnLen = 5;
        chipLen && (this._chipBtnLen = chipLen);
        this.createChipBtn();
      };
      HHChipLayout.prototype.idWatch = function(num) {
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
      HHChipLayout.prototype.setTis = function(isBanker) {
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
      HHChipLayout.prototype.createChipBtn = function() {
        var me = this;
        me._chipIdx = 0;
        var chipBtn = me.node.getChildByName("chip_btn");
        var selectImg = chipBtn.getChildByName("selected");
        var _loop_1 = function(i) {
          var btn = chipBtn.getChildByName("btn_" + i);
          btn.on(cc.Node.EventType.TOUCH_END, function() {
            if (me._chipIdx === i) return;
            cc.AudioManager.playSFX("resources/8007/audio/clip_chip_btn.wav");
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
      HHChipLayout.prototype.getChipIdx = function() {
        return this._chipIdx;
      };
      HHChipLayout.prototype.setChipBtnNum = function(arr) {
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
      HHChipLayout.prototype.startBet = function() {
        if (this._enterMoney > cc.PlayerData.getMoney()) return this.idWatch(0);
        this.isShowChipBtn(0);
        this.isShowCX(true);
        this.isShowXY(true);
        return false;
      };
      HHChipLayout.prototype.stopBet = function() {
        this.isShowChipBtn(-1);
        this.isShowCX(false);
        this.isShowXY(false);
      };
      HHChipLayout.prototype.isShowXY = function(isShow) {
        isShow || (isShow = false);
        this.node.getChildByName("chip_btn").getChildByName("bt_replay").getComponent(cc.Button).interactable = isShow;
      };
      HHChipLayout.prototype.isShowCX = function(isShow) {
        isShow || (isShow = false);
        this.node.getChildByName("chip_btn").getChildByName("bt_revoke").getComponent(cc.Button).interactable = isShow;
      };
      HHChipLayout.prototype.isShowChipBtn = function(num) {
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
      HHChipLayout.prototype.changeNumType = function(num) {
        num = Number(num);
        return num < 1e3 ? num : num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(0) + "k" : (num / 1e4).toFixed(0) + "w";
      };
      HHChipLayout.prototype.clientBtn = function(event) {
        switch (event.target.name) {
         case "bt_addcoin":
          break;

         default:
          this._callback && this._callback({
            btn: event.target.name
          });
        }
      };
      HHChipLayout.prototype.getCurChipIndex = function() {
        return this._chipIdx;
      };
      HHChipLayout = __decorate([ ccclass ], HHChipLayout);
      return HHChipLayout;
    }(cc.Component);
    exports.default = HHChipLayout;
    cc._RF.pop();
  }, {} ],
  HHChipNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25e8ctGDuNNm5OSSSZ8NdgE", "HHChipNode");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var hhGameData_1 = require("./hhGameData");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HHChipNode = function(_super) {
      __extends(HHChipNode, _super);
      function HHChipNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chipPlist = null;
        _this._idx = 0;
        return _this;
      }
      HHChipNode.prototype.onLoad = function() {};
      HHChipNode.prototype.set = function(idx, pos) {
        this.node["rotate"] = 360 * Math.random();
        this.node.scale = .4;
        pos && this.node.setPosition(pos);
        this.setChipValue(idx);
      };
      HHChipNode.prototype.setChipValue = function(idx) {
        if (idx >= 0) {
          this._idx = idx;
          this.node.getComponent(cc.Sprite).spriteFrame = this.chipPlist.getSpriteFrame("chip_" + idx);
        }
      };
      HHChipNode.prototype.getChipValue = function() {
        return this._idx;
      };
      HHChipNode.prototype.flyOut = function(endPos, callback, speed) {
        if (!endPos) return;
        this.node.active = true;
        var pos = this.node.getPosition();
        var dis = Math.abs(cc.pDistance(endPos, pos));
        var time = .0012 * dis;
        speed && (time = dis * speed);
        var moveTo = cc.moveTo(time, endPos);
        moveTo.easing(cc.easeExponentialOut());
        var scaleTo = cc.scaleTo(time, .7);
        var angle = hhGameData_1.default.getInstance().random(-50, 50);
        var action = cc.spawn(moveTo, scaleTo, cc.rotateBy(time, angle));
        var rotate = cc.rotateBy(.2, angle);
        rotate.easing(cc.easeExponentialOut());
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(action, rotate, cc.callFunc(function() {
          callback && callback();
        })));
      };
      HHChipNode.prototype.flyIn = function(pos, speed, callback) {
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
      HHChipNode.prototype.flyInWithCallback = function(pos, callback, speed) {
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
      HHChipNode.prototype.move = function() {
        this.node.destroy();
      };
      __decorate([ property(cc.SpriteAtlas) ], HHChipNode.prototype, "chipPlist", void 0);
      HHChipNode = __decorate([ ccclass ], HHChipNode);
      return HHChipNode;
    }(cc.Component);
    exports.default = HHChipNode;
    cc._RF.pop();
  }, {
    "./hhGameData": "hhGameData"
  } ],
  HHGameBarrage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50eb36zBctGOrfUM8FgnFNX", "HHGameBarrage");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HHGameBarrage = function(_super) {
      __extends(HHGameBarrage, _super);
      function HHGameBarrage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemWaitting = [];
        _this.itemList = [];
        _this.messageList = [];
        _this.showStep = .3;
        return _this;
      }
      HHGameBarrage.prototype.onLoad = function() {
        var listitem = this.node.getChildByName("list");
        for (var index = 0; index < listitem.children.length; index++) {
          var items = listitem.children[index];
          this.itemWaitting.push(items);
        }
        Number(cc.sys.localStorage.getItem("barrageState")) > 0 || this.switchBarrage(false);
      };
      HHGameBarrage.prototype.switchBarrage = function(switchs) {
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
      HHGameBarrage.prototype.wsReceived = function(d) {
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
      HHGameBarrage.prototype.performBarrage = function() {
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
      HHGameBarrage.prototype.showMoveBarrage = function(node) {
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
      HHGameBarrage.prototype.restoreTheInitial = function(itemNode) {
        itemNode.getComponent(cc.RichText).string = "";
        var listw = this.node.getChildByName("list").getContentSize().width;
        itemNode.setPositionX(.5 * listw);
        for (var idx = 0; idx < this.itemList.length; idx++) if (this.itemList[idx] == itemNode) {
          this.itemList.splice(idx, 1);
          this.itemWaitting.push(itemNode);
          break;
        }
      };
      HHGameBarrage = __decorate([ ccclass ], HHGameBarrage);
      return HHGameBarrage;
    }(cc.Component);
    exports.default = HHGameBarrage;
    cc._RF.pop();
  }, {} ],
  HHGameDefine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6ea03F94ClNboiWsIjIPSM/", "HHGameDefine");
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
  HHGameVoice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dba1c3VFb1KTJwr/9aYXKN5", "HHGameVoice");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HHGameVoice = function(_super) {
      __extends(HHGameVoice, _super);
      function HHGameVoice() {
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
      HHGameVoice.prototype.onLoad = function() {
        this.initVoiceShow();
      };
      HHGameVoice.prototype.setPlanPosition = function(vec2) {
        this.node.getChildByName("voiceBg_ScrollView").setPosition(vec2);
      };
      HHGameVoice.prototype.initVoiceShow = function() {
        var gameId = cc.Utils.getGameIdByRoomId(cc.PlayerData.getRoomID());
        var list = this.voiceIdMap[gameId];
        for (var index = 0; index < list.length; index++) {
          var id = 0;
          id = "number" == typeof list[index] ? list[index] : list[index][cc.PlayerData.getSex()];
          var item = cc.instantiate(this.voiceItem);
          this.node.getChildByName("voiceBg_ScrollView").getComponent(cc.ScrollView).content.addChild(item);
          item.getComponent("HHVoiceItem").setVoiceItem(id, this);
        }
      };
      HHGameVoice.prototype.voiceButton = function(event) {
        this.closeOrOpenVoice(false);
      };
      HHGameVoice.prototype.closeOrOpenVoice = function(ifShow) {
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
      }) ], HHGameVoice.prototype, "voiceItem", void 0);
      HHGameVoice = __decorate([ ccclass ], HHGameVoice);
      return HHGameVoice;
    }(cc.Component);
    exports.default = HHGameVoice;
    cc._RF.pop();
  }, {} ],
  HHSettingLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9c75BrAJ9JrLOgS02A+T8v", "HHSettingLayout");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var hhGameData_1 = require("./hhGameData");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HHSettingLayout = function(_super) {
      __extends(HHSettingLayout, _super);
      function HHSettingLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._callback = null;
        _this.musicValue = 0;
        _this.videoValue = 0;
        _this.barrageState = "";
        return _this;
      }
      HHSettingLayout.prototype.onLoad = function() {};
      HHSettingLayout.prototype.initAttr = function() {
        var self = this;
        self.musicValue = cc.AudioManager.getAudioValue("music");
        self.videoValue = cc.AudioManager.getAudioValue("video");
        this.barrageState = cc.sys.localStorage.getItem("barrageState") || "1";
        this.setBarrageShow(Number(this.barrageState));
        self.initSetting("music", self.musicValue);
        self.initSetting("video", self.videoValue);
      };
      HHSettingLayout.prototype.init = function(callback) {
        callback && (this._callback = callback);
        this.setActive(false);
      };
      HHSettingLayout.prototype.initSetting = function(str, value) {
        this.setSliderPos(str, value);
        this.setAudio(str, value);
        value > 0 ? this.setBtnInterAcTable(str, true) : this.setBtnInterAcTable(str, null);
      };
      HHSettingLayout.prototype.setAudio = function(str, value) {
        "video" == str ? cc.AudioManager.setAudioVolume(value) : cc.AudioManager.setMusicVolume(value);
      };
      HHSettingLayout.prototype.setActive = function(isShow) {
        this.node.active = isShow;
        this.initAttr();
      };
      HHSettingLayout.prototype.setBarrageShow = function(state) {
        var sprite = this.node.getChildByName("bg").getChildByName("barrage_button");
        state > 0 ? hhGameData_1.default.getInstance().updataSpritetext(sprite, "resources/8007/image/setting/btn_barrage_open.png") : hhGameData_1.default.getInstance().updataSpritetext(sprite, "resources/8007/image/setting/btn_barrage_close.png");
        cc.sys.localStorage.setItem("barrageState", state);
      };
      HHSettingLayout.prototype.isShowBtnBack = function(isShow) {
        this.node.getChildByName("bg").getChildByName("btn_back").active = false;
        this.node.getChildByName("bg").getChildByName("btn_layout").active = false;
        this.node.getChildByName("bg").getChildByName("barrage").active = isShow;
        this.node.getChildByName("bg").getChildByName("barrage_button").active = isShow;
      };
      HHSettingLayout.prototype.isShowBarrageButton = function(isShow) {
        this.node.getChildByName("bg").getChildByName("barrage").active = isShow;
        this.node.getChildByName("bg").getChildByName("barrage_button").active = isShow;
      };
      HHSettingLayout.prototype.setBtnInterAcTable = function(str, isShow) {
        var slider = this.node.getChildByName("bg").getChildByName("slider_" + str);
        slider.getChildByName("bt_" + str).getComponent(cc.Button).interactable = isShow;
        isShow || this.setSliderPos(str, 0);
      };
      HHSettingLayout.prototype.setSliderPos = function(str, value) {
        var slider = this.node.getChildByName("bg").getChildByName("slider_" + str);
        slider.getComponent(cc.Slider).progress = value;
        this.setAudio(str, value);
        var img = slider.getChildByName("img");
        img.getComponent(cc.Sprite).fillRange = value;
        slider.getChildByName("handle").x = (1 * value - .5) * img.width;
      };
      HHSettingLayout.prototype.onClickBtn = function(event) {
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
      HHSettingLayout.prototype.showMenAndWomen = function(isShow) {
        this.node.getChildByName("bg").getChildByName("menOrwomen").active = isShow;
      };
      HHSettingLayout.prototype.setMenAndWomen = function(sex) {
        var img = "resources/8007/image/img_setting_" + sex + ".png";
        hhGameData_1.default.getInstance().updataSpritetext(this.node.getChildByName("bg").getChildByName("menOrwomen").getChildByName("change_img"), img);
      };
      HHSettingLayout.prototype.onClickSlider = function(sender) {
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
      HHSettingLayout = __decorate([ ccclass ], HHSettingLayout);
      return HHSettingLayout;
    }(cc.Component);
    exports.default = HHSettingLayout;
    cc._RF.pop();
  }, {
    "./hhGameData": "hhGameData"
  } ],
  HHSlideshow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6aad6AxxUpHjbGJ6CEbSqZF", "HHSlideshow");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BJLSlideshow = function(_super) {
      __extends(BJLSlideshow, _super);
      function BJLSlideshow() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._message = [];
        _this._isCarouselSuccess = true;
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
        cc.log(text);
        var label = this.node.getChildByName("mask").getChildByName("serviceinfor");
        label.setPositionX(.5 * this._width);
        label.active = true;
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
  HHVoiceItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca75a5tBslHfZ78d2DpsrRd", "HHVoiceItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HHGameDefine_1 = require("./HHGameDefine");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HHVoiceItem = function(_super) {
      __extends(HHVoiceItem, _super);
      function HHVoiceItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.voiceId = 0;
        _this.voiceSex = 0;
        _this.voiceText = "";
        _this.parentVoice = null;
        return _this;
      }
      HHVoiceItem.prototype.onLoad = function() {};
      HHVoiceItem.prototype.setVoiceItem = function(vid, parent) {
        void 0 === vid && (vid = 0);
        void 0 === parent && (parent = null);
        if (vid) {
          this.voiceId = vid;
          this.voiceSex = cc.PlayerData.getSex();
          this.voiceText = HHGameDefine_1.VoiceText["voice_" + vid];
          this.parentVoice = parent;
          this.initItem();
        }
      };
      HHVoiceItem.prototype.initItem = function() {
        this.node.getChildByName("voice_Label").getComponent(cc.Label).string = this.voiceText;
      };
      HHVoiceItem.prototype.buttonCallBack = function(event) {
        cc.NetWork.sendMsg({
          textContent: this.voiceText,
          userId: cc.PlayerData.getUserId(),
          voice: this.voiceId + "_" + this.voiceSex
        }, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackVoiceRequest, cc["RedBlackCommand"].C_S_REDBLACK_VOICE_REQUEST);
        this.parentVoice.closeOrOpenVoice(false);
      };
      HHVoiceItem = __decorate([ ccclass ], HHVoiceItem);
      return HHVoiceItem;
    }(cc.Component);
    exports.default = HHVoiceItem;
    cc._RF.pop();
  }, {
    "./HHGameDefine": "HHGameDefine"
  } ],
  HeadLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2cafHI69FBMYFHzAa8lQ67", "HeadLayout");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var hhGameData_1 = require("./hhGameData");
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
        gold.getChildByName("num").getComponent(cc.Label).string = hhGameData_1.default.getInstance().convertToFixed(num);
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
    "./hhGameData": "hhGameData"
  } ],
  hhGameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23b3eVCMctDX6DjVKCqmu/p", "hhGameData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MASK_COLOR = 240;
    var MASK_VALUE = 15;
    var hhGameData = function(_super) {
      __extends(hhGameData, _super);
      function hhGameData() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stage = 0;
        _this._chipPoolArr = [];
        return _this;
      }
      hhGameData_1 = hhGameData;
      hhGameData.getInstance = function() {
        this.m_sInstance || (this.m_sInstance = new hhGameData_1());
        return this.m_sInstance;
      };
      hhGameData.prototype.setStage = function(stage) {
        this.stage = stage;
      };
      hhGameData.prototype.getStage = function() {
        return this.stage;
      };
      hhGameData.prototype.getCardValue = function(card) {
        return card & MASK_VALUE;
      };
      hhGameData.prototype.getCardColor = function(card) {
        return (card & MASK_COLOR) >> 4;
      };
      hhGameData.prototype.analysisCardNew = function(card, startIdx) {
        var values = this.getCardValue(card);
        var colors = this.getCardColor(card);
        startIdx || (startIdx = 0);
        var cardNumber = 0;
        function revalue(value) {
          return (value + startIdx) % 14 + parseInt((value + startIdx) / 14 + "");
        }
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
        return {
          cardName: "pai_" + cardNumber,
          color: colors,
          value: values
        };
      };
      hhGameData.prototype.updataSpritetext = function(sBase, fileurl) {
        var realurl = cc.url.raw(fileurl);
        var texture = cc.textureCache.addImage(realurl, null, null);
        var sSf = new cc.SpriteFrame();
        sSf.setTexture(texture);
        sBase.getComponent("cc.Sprite").spriteFrame = sSf;
      };
      hhGameData.prototype.getHeadName = function(sex, idx) {
        sex || 0 == sex || (sex = 1);
        idx || 0 == idx || (idx = 1);
        return "head_" + sex + "_" + idx;
      };
      hhGameData.prototype.getHeadImg = function(name, sex, idx) {
        name || (name = this.getHeadName(sex, idx));
        var img = "resources/headicon/" + name + ".png";
        return img;
      };
      hhGameData.prototype.convertToFixed = function(num) {
        num = Number(num);
        num = num ? num.toFixed(2) : 0;
        return num;
      };
      hhGameData.prototype.allotChipValue = function(chipArr, num) {
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
      hhGameData.prototype.strIsInArr = function(str, arr) {
        for (var i in arr) if (Number(str) === Number(arr[i])) return true;
        return false;
      };
      hhGameData.prototype.moneyAction = function(node) {
        if (!node) return;
        node.active = true;
        var pos = node.getPosition();
        var moveTo = cc.moveTo(1.2, cc.p(pos.x, pos.y + 60));
        var scaleTo = cc.scaleTo(1.2, 1);
        node.runAction(cc.sequence(cc.spawn(moveTo, scaleTo), cc.delayTime(.6), cc.callFunc(function() {
          node.destroy();
        })));
      };
      hhGameData.prototype.setPoolChild = function(node) {
        node.active = false;
        node.parent = null;
        this._chipPoolArr.push(node);
      };
      hhGameData.prototype.limitChipNum = function(arr, limitLen) {
        if (arr.length < limitLen) return;
        for (var i = 0; i < arr.length - limitLen; i++) {
          var node = arr[0];
          arr.splice(0, 1);
          node.destroy();
        }
      };
      hhGameData.prototype.isHaveSeat = function(map, userId) {
        for (var i in map) if (map[i] === userId) return parseInt(i);
        return -1;
      };
      hhGameData.prototype.strInMap = function(str, map) {
        for (var i in map) if (str === map[i]) return i;
        return -1;
      };
      hhGameData.prototype.getPoolChild = function() {
        if (!this._chipPoolArr || this._chipPoolArr.length < 1) return;
        return this._chipPoolArr.pop();
      };
      hhGameData.prototype.random = function(min, max) {
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min);
        return re;
      };
      hhGameData.prototype.getAreaRange = function(pos, xMin, xMax, yMin, yMax) {
        if (!pos) return;
        xMin || (xMin = -50);
        xMax || (xMax = 50);
        yMin || (yMin = -60);
        yMax || (yMax = 60);
        return cc.p(pos.x + this.random(xMin, xMax), pos.y + this.random(yMin, yMax));
      };
      hhGameData.prototype.clearPoolNode = function() {
        this._chipPoolArr && this._chipPoolArr.length > 1200 && this._chipPoolArr.pop().destroy();
      };
      hhGameData.m_sInstance = null;
      hhGameData = hhGameData_1 = __decorate([ ccclass ], hhGameData);
      return hhGameData;
      var hhGameData_1;
    }(cc.Component);
    exports.default = hhGameData;
    cc._RF.pop();
  }, {} ],
  hhLogic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3449Az/OxEvJ+7iV9d2tw2", "hhLogic");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var hhGameData_1 = require("./hhGameData");
    var cardTypeStr = [ "单牌", "对子", "顺子", "金花", "顺金", "豹子" ];
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var hhLogic = function(_super) {
      __extends(hhLogic, _super);
      function hhLogic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pokerTypeImgPlist = null;
        _this.headPlist = null;
        _this._addTime = 0;
        _this._times = 0;
        _this._openPokerTime = 0;
        _this._zstArr = null;
        _this._hhUi = null;
        _this._pokerPanel = null;
        _this._resultInfo = null;
        return _this;
      }
      hhLogic.prototype.onLoad = function() {
        this.init();
        this.initOnce();
        this.constant();
      };
      hhLogic.prototype.constant = function() {
        this._hhUi = this.node.getComponent("hhUi");
        this._pokerPanel = this.node.getChildByName("poker_panel").getChildByName("poker");
      };
      hhLogic.prototype.init = function() {
        this._addTime = 0;
        this._times = 0;
      };
      hhLogic.prototype.initOnce = function() {
        this._openPokerTime = 0;
        this._zstArr = {
          arr: [],
          minX: 0,
          x: 0,
          y: 0
        };
      };
      hhLogic.prototype.show = function(d) {
        this.initAnalysisChart();
        this.resultInfo(d);
        this.setDownTime(d.status);
        var idx = d.historyRecord.length > 20 ? d.historyRecord.length - 20 : 0;
        for (var i = idx; i < d.historyRecord.length; i++) this.analysisChart(d.historyRecord[i]);
        this.setRate(d);
      };
      hhLogic.prototype.byStageSetUI = function(d) {
        hhGameData_1.default.getInstance().setStage(Number(d.status));
        d.endTime && this.setDownTime(d.endTime);
        switch (Number(d.status)) {
         case 2:
          this._hhUi.startAction(d.endTime);
          break;

         case 3:
          this._hhUi.stopBet();
          break;

         case 4:
          this.clear();
        }
      };
      hhLogic.prototype.setDownTime = function(time) {
        if (!time) return;
        this._times = parseInt(time);
        this.setTimeString(null);
        3 === hhGameData_1.default.getInstance().getStage() && (this._openPokerTime = time);
      };
      hhLogic.prototype.resultInfo = function(d) {
        if (!d) return;
        this._resultInfo = d;
        d && d.money && cc.PlayerData.setMoney(d.money);
      };
      hhLogic.prototype.setPokerType = function(node, type) {
        node.active = true;
        node.getComponent(cc.Sprite).spriteFrame = this.pokerTypeImgPlist.getSpriteFrame("type_" + type);
      };
      hhLogic.prototype.openPoker = function(time) {
        if (!this._resultInfo || this._resultInfo === {}) return;
        var cards = this._resultInfo.cardData;
        var audio = false, audioName = "";
        if (!time) {
          time = this._times;
          audio = true;
        }
        switch (time) {
         case 12:
          var pokerArr = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "小王", "大王" ];
          var pokerType = [ "方", "梅", "红", "黑", "大王" ];
          var arr = [], arr1 = [], arr2 = [], arr3 = [];
          for (var i = 0; i < 3; i++) {
            arr.push(cards.leftCardList.cardList[i]);
            arr1.push(pokerType[hhGameData_1.default.getInstance().getCardColor(arr[i])] + pokerArr[hhGameData_1.default.getInstance().analysisCardNew(arr[i], 1).cardName.substr(-1)]);
            arr2.push(cards.rightCardList.cardList[i]);
            arr3.push(pokerType[hhGameData_1.default.getInstance().getCardColor(arr2[i])] + pokerArr[hhGameData_1.default.getInstance().analysisCardNew(arr2[i], 1).cardName.substr(-1)]);
          }
          var d = "userId:" + cc.PlayerData.getUserId() + "----红方: --类型：" + cards.leftCardList.cardType + "--接收到的card: -" + arr + "---" + arr1 + "---黑方: --类型：" + cards.rightCardList.cardType + "--接收到的card: -" + arr2 + "---" + arr3 + "---输赢：" + this._resultInfo.stage;
          var xhr = new XMLHttpRequest();
          var url = "http://log.kunbaow.com/file/write?content=" + d;
          xhr.open("GET", url, true);
          xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
          xhr.send();
          cards.leftCardList && cards.leftCardList.cardList[0] && this._hhUi.pokerAction(this._pokerPanel.getChildByName("5"), cards.leftCardList.cardList[0]);
          cards.leftCardList && cards.leftCardList.cardList[1] && this._hhUi.pokerAction(this._pokerPanel.getChildByName("3"), cards.leftCardList.cardList[1]);
          break;

         case 11:
          cards.rightCardList && cards.rightCardList.cardList[0] && this._hhUi.pokerAction(this._pokerPanel.getChildByName("0"), cards.rightCardList.cardList[0]);
          cards.rightCardList && cards.rightCardList.cardList[1] && this._hhUi.pokerAction(this._pokerPanel.getChildByName("2"), cards.rightCardList.cardList[1]);
          break;

         case 10:
          cards.leftCardList && cards.leftCardList.cardList[2] && this._hhUi.pokerAction(this._pokerPanel.getChildByName("1"), cards.leftCardList.cardList[2]);
          break;

         case 9:
          cards.rightCardList && cards.rightCardList.cardList[2] && this._hhUi.pokerAction(this._pokerPanel.getChildByName("4"), cards.rightCardList.cardList[2]);
          break;

         case 8:
          audioName = "resources/8007/audio/" + (cards.leftCardList.cardType - 1) + ".wav";
          this.setPokerType(this.node.getChildByName("poker_panel").getChildByName("red_type"), cards.leftCardList.cardType);
          break;

         case 7:
          audioName = "resources/8007/audio/" + (cards.rightCardList.cardType - 1) + ".wav";
          this.setPokerType(this.node.getChildByName("poker_panel").getChildByName("black_type"), cards.rightCardList.cardType);
          break;

         case 6:
          this._resultInfo.roundResult && this._hhUi.showWin(this._resultInfo.roundResult);
          break;

         case 5:
          this._resultInfo.stage && this._resultInfo.stage.length > 0 && this._hhUi.regainChip(this._resultInfo.stage);
          break;

         case 4:
          this._resultInfo.stage && this._resultInfo.stage.length > 0 && this._hhUi.bankerPayForChip(this._resultInfo.stage);
          break;

         case 3:
          this._resultInfo.stage && this._resultInfo.stage.length > 0 && this._hhUi.playerRegainChip(this._resultInfo.stage);
          this._resultInfo && this._resultInfo.seatPlayerList && this._hhUi.seatFlyMoney(this._resultInfo.seatPlayerList);
          this.resultLayout();
        }
        audio && audioName && cc.AudioManager.playSFX(audioName);
      };
      hhLogic.prototype.resultLayout = function() {
        this.node.getChildByName("win").active = true;
        cc.AudioManager.playSFX("resources/8007/audio/result_2.wav");
        var head = this.node.getChildByName("win").getChildByName("head");
        head.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(cc.PlayerData.getHeadPngName(this._resultInfo.winMaxUserInfo.head, this._resultInfo.winMaxUserInfo.sex));
        head.getChildByName("name").getComponent(cc.Label).string = this._resultInfo.winMaxUserInfo.name;
        head.getChildByName("money").getComponent(cc.Label).string = hhGameData_1.default.getInstance().convertToFixed(this._resultInfo.winMaxUserInfo.money);
        this.setRate(this._resultInfo);
        this._hhUi.setResultInfo(this._resultInfo);
        this.analysisChart(null);
      };
      hhLogic.prototype.setRate = function(d) {
        if (!d) return;
        this.node.getChildByName("chart_panel").getChildByName("red").getChildByName("label").getComponent(cc.Label).string = d.redRatio + "%";
        this.node.getChildByName("chart_panel").getChildByName("black").getChildByName("label").getComponent(cc.Label).string = d.blackRatio + "%";
      };
      hhLogic.prototype.initAnalysisChart = function() {
        this.initOnce();
        var content = this.node.getChildByName("chart_panel").getChildByName("scroll_view").getChildByName("view").getChildByName("content");
        var child = content.children[0];
        content.removeAllChildren();
        content.addChild(child);
      };
      hhLogic.prototype.analysisChart = function(info) {
        var arr = this._resultInfo.historyRecord;
        info || (info = arr[arr.length - 1]);
        var lucky = this.node.getChildByName("chart").getChildByName("1");
        if (lucky.children.length >= 6) for (var i = 0; i <= lucky.children.length - 6; i++) lucky.removeChild(lucky.children[0]);
        var item = cc.instantiate(lucky.children[0]);
        item.active = true;
        lucky.addChild(item);
        var pxzsLayout = this.node.getChildByName("chart_panel").getChildByName("pxzs_layout");
        if (pxzsLayout.children.length >= 20) for (var i = 0; i <= pxzsLayout.children.length - 20; i++) pxzsLayout.removeChild(pxzsLayout.children[0]);
        var pxzsItem = cc.instantiate(pxzsLayout.children[0]);
        pxzsItem.active = true;
        pxzsLayout.addChild(pxzsItem);
        for (var idx = 0; idx < pxzsLayout.children.length; idx++) idx === pxzsLayout.children.length - 1 ? pxzsLayout.children[idx].getChildByName("new").active = true : pxzsLayout.children[idx].getChildByName("new").active = false;
        if (info.lucky > 0) {
          item.getChildByName("img1").getChildByName("label").getComponent(cc.Label).string = cardTypeStr[info.luckyType - 1];
          item.getChildByName("img1").active = true;
          item.getChildByName("img2").active = false;
          pxzsItem.getChildByName("img1").getChildByName("label").getComponent(cc.Label).string = cardTypeStr[info.luckyType - 1];
          pxzsItem.getChildByName("img1").active = true;
          pxzsItem.getChildByName("img2").active = false;
        } else {
          item.getChildByName("img2").getChildByName("label").getComponent(cc.Label).string = cardTypeStr[info.luckyType - 1];
          item.getChildByName("img2").active = true;
          item.getChildByName("img1").active = false;
          pxzsItem.getChildByName("img2").getChildByName("label").getComponent(cc.Label).string = cardTypeStr[info.luckyType - 1];
          pxzsItem.getChildByName("img2").active = true;
          pxzsItem.getChildByName("img1").active = false;
        }
        var chart = this.node.getChildByName("chart").getChildByName("0");
        if (chart.children.length >= 12) for (var i = 0; i <= chart.children.length - 12; i++) chart.removeChild(chart.children[0]);
        var chartItem = cc.instantiate(chart.children[0]);
        chartItem.active = true;
        chart.addChild(chartItem);
        var layout = this.node.getChildByName("chart_panel").getChildByName("layout");
        if (layout.children.length >= 20) for (var i = 0; i <= layout.children.length - 20; i++) layout.removeChild(layout.children[0]);
        var layoutItem = cc.instantiate(layout.children[0]);
        layoutItem.active = true;
        layout.addChild(layoutItem);
        var isWin = "0";
        if (1 === info.red) {
          isWin = "1";
          hhGameData_1.default.getInstance().updataSpritetext(chartItem, "resources/8007/image/q_1.png");
          hhGameData_1.default.getInstance().updataSpritetext(layoutItem, "resources/8007/image/q_1.png");
        } else {
          hhGameData_1.default.getInstance().updataSpritetext(chartItem, "resources/8007/image/q_0.png");
          hhGameData_1.default.getInstance().updataSpritetext(layoutItem, "resources/8007/image/q_0.png");
        }
        var zstArr = this._zstArr["arr"];
        var zstArr1 = zstArr[zstArr.length - 1];
        (zstArr.length <= 0 || zstArr1 && zstArr1[zstArr1.length - 1] !== isWin) && zstArr.push([]);
        zstArr[zstArr.length - 1].push(isWin);
        if (zstArr.length > 1 && 1 === zstArr[zstArr.length - 1].length) {
          this._zstArr["minX"]++;
          this._zstArr["x"] = 0;
          this._zstArr["y"] = 0;
        }
        var content = this.node.getChildByName("chart_panel").getChildByName("scroll_view").getChildByName("view").getChildByName("content");
        if (content.children.length >= 20) for (var k = 0; k < content.children.length - 20 + 1; k++) content.removeChild(content.children[0]);
        var curItemIdx = this._zstArr["minX"] + this._zstArr["x"];
        var curItem = null;
        if (content.children[curItemIdx]) curItem = content.children[curItemIdx]; else {
          curItem = cc.instantiate(content.children[0]);
          content.addChild(curItem);
          for (var i = 0; i < curItem.children.length; i++) {
            curItem.children[i].active = false;
            curItem.children[i].getChildByName("label") && (curItem.children[i].getChildByName("label").active = false);
          }
        }
        curItem.active = true;
        var curItemChildren = curItem.children[this._zstArr["y"]];
        curItemChildren.active = true;
        !curItem.children[this._zstArr["y"] + 1] && curItem.children[this._zstArr["y"]].active || curItem.children[this._zstArr["y"] + 1] && curItem.children[this._zstArr["y"] + 1].active ? this._zstArr["x"]++ : this._zstArr["y"]++;
        var imgName = zstArr[zstArr.length - 1][zstArr[zstArr.length - 1].length - 1];
        curItemChildren && imgName && hhGameData_1.default.getInstance().updataSpritetext(curItemChildren, "resources/8007/image/yh_" + imgName + ".png");
      };
      hhLogic.prototype.secondUpdate = function() {
        if (3 === hhGameData_1.default.getInstance().getStage()) {
          if (this._openPokerTime < 15) {
            for (var i = 15; i > this._openPokerTime - 1; i--) this.openPoker(i);
            this._openPokerTime = 15;
          }
          this.openPoker(null);
        }
        this._times >= 0 && this.setTimeString(null);
      };
      hhLogic.prototype.getGameTime = function() {
        return this._times;
      };
      hhLogic.prototype.setTimeString = function(time) {
        this.node.getChildByName("clock").getChildByName("time").getComponent(cc.Label).string = time || this._times;
        this._addTime = 0;
      };
      hhLogic.prototype.update = function(dt) {
        this._addTime += dt;
        if (this._addTime >= 1) {
          this._addTime = 0;
          if (this._times > 0) {
            this._times--;
            this.secondUpdate();
          }
        }
      };
      hhLogic.prototype.clear = function() {
        this.node.getChildByName("win") && (this.node.getChildByName("win").active = false);
        this.node.getChildByName("poker_panel").getChildByName("red_type").active = false;
        this.node.getChildByName("poker_panel").getChildByName("black_type").active = false;
        this._hhUi.clear();
      };
      __decorate([ property(cc.SpriteAtlas) ], hhLogic.prototype, "pokerTypeImgPlist", void 0);
      __decorate([ property(cc.SpriteAtlas) ], hhLogic.prototype, "headPlist", void 0);
      hhLogic = __decorate([ ccclass ], hhLogic);
      return hhLogic;
    }(cc.Component);
    exports.default = hhLogic;
    cc._RF.pop();
  }, {
    "./hhGameData": "hhGameData"
  } ],
  hhRcv: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "435c7T/Rn1Gg74QicrXFfVn", "hhRcv");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var hhGameData_1 = require("./hhGameData");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var hhRcv = function(_super) {
      __extends(hhRcv, _super);
      function hhRcv() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._hhUi = null;
        _this._hhLogic = null;
        return _this;
      }
      hhRcv.prototype.onLoad = function() {
        cc.NetWork.addDelegate(this);
        this.init();
        this.constant();
        this.startRcv();
      };
      hhRcv.prototype.onDestroy = function() {
        cc.NetWork.removeDelegate(this);
      };
      hhRcv.prototype.startRcv = function() {
        cc.NetWork.loadProtoFile("resources/8007/proto/RedBlackCommand.proto", "com.lyh.protocol", "RedBlackCommand");
        cc["RedBlackCommand"] = cc.NetWork.getProtoFile("RedBlackCommand").CmdType;
        cc.NetWork.loadProtoFile("resources/8007/proto/RedBlackRoom.proto", "com.lyh.protocol", "RedBlackRoom");
        cc.NetWork.sendMsg({
          roomCode: cc.PlayerData.getRoomID().toString(),
          userId: cc.PlayerData.getUserId()
        }, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackJoinTableRequest, cc["RedBlackCommand"].C_S_REDBLACK_JOIN_TABLE_REQUEST);
      };
      hhRcv.prototype.constant = function() {
        this._hhUi = this.node.getComponent("hhUi");
        this._hhLogic = this.node.getComponent("hhLogic");
      };
      hhRcv.prototype.init = function() {};
      hhRcv.prototype.onMsg = function(message) {
        switch (message.command) {
         case cc["RedBlackCommand"].S_C_REDBLACK_JOIN_TABLE_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackJoinTableResponse.decode(message.body);
          cc.log("返回加入桌子" + JSON.stringify(d));
          hhGameData_1.default.getInstance().setStage(Number(d.status.status));
          this._hhLogic.show(d);
          this._hhUi.show(d);
          this._hhLogic.byStageSetUI(d.status);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_TABLE_SEAT_PLAYER_INFO_LIST_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackTableSeatPlayerInfoListResponse.decode(message.body);
          cc.log("座位上玩家的信息" + JSON.stringify(d));
          this._hhUi.updateSeat(d.playerList);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_TABLE_PLAYER_INFO_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackTablePlayerInfoResponse.decode(message.body);
          cc.log("加入桌子的玩家信息" + JSON.stringify(d));
          this._hhUi.setMyInfo(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_UPDATE_PLAYER_NUM_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackUpdataPlayerNumResponse.decode(message.body);
          this._hhUi.updatePlayerNum(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_SEAT_DOWN_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackSeatDownResponse.decode(message.body);
          cc.log("返回申请坐下和离开" + JSON.stringify(d));
          this._hhUi.leaveOrDownSeat(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_BET_MONEY_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackBetMoneyReponse.decode(message.body);
          cc.log("返回下注消息" + JSON.stringify(d));
          this._hhUi.playerBet(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_ROUND_RESULT_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackRoundResultResonse.decode(message.body);
          cc.log("返回游戏结果" + JSON.stringify(d));
          this._hhLogic.resultInfo(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_SNED_CARD_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackSendCardResponse.decode(message.body);
          cc.log("返回发牌信息" + JSON.stringify(d));
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_TABLE_STATUS_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackTableStatusResponse.decode(message.body);
          cc.log("桌子 状态" + JSON.stringify(d));
          this._hhLogic.byStageSetUI(d.status);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_LEAVE_TABLE_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackLeaveTableResponse.decode(message.body);
          cc.log("离开返回" + JSON.stringify(d));
          this._hhUi.leave(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_CONTINUE_BET_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackContinueBetResponse.decode(message.body);
          cc.log("返回续押" + JSON.stringify(d));
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_CANCEL_BET_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackCancleBetResponse.decode(message.body);
          cc.log("返回撤消的金币" + JSON.stringify(d));
          this._hhUi.repeal(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_SEAT_REMAINING_MONEY:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackSeatRemainingMoneyResponse.decode(message.body);
          cc.log("座位上的金币更新" + JSON.stringify(d));
          this._hhUi.updateSeatMoney(d);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_JUDGERE_RECONNECTION_PLAYER:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackJudgereReConnectionResponse.decode(message.body);
          cc.log("断线重连" + JSON.stringify(d));
          this._hhLogic.clear();
          return true;

         case cc["CmdType"].S_C_REGISTER_TABLE_RESPONSE:
          var gameId = cc.Utils.getGameIdByRoomId(cc.PlayerData.getRoomID());
          gameId == cc["gameType"].gameType_BACCARAT ? cc.NetWork.sendMsg({
            roomCode: cc.PlayerData.getRoomID().toString(),
            userId: cc.PlayerData.getUserId()
          }, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackJoinTableRequest, cc["RedBlackCommand"].C_S_REDBLACK_JOIN_TABLE_REQUEST) : cc.Utils.jumpToGame(gameId);
          return true;

         case cc["RedBlackCommand"].S_C_REDBLACK_VOICE_RESPONSE:
          var d = cc.NetWork.getProtoFile("RedBlackRoom").RedBlackVoiceResponse.decode(message.body);
          cc.log("弹幕消息" + JSON.stringify(d));
          this.node.getChildByName("gameBarrage").getComponent("HHGameBarrage").wsReceived(d);
          return true;

         case cc["CmdType"].S_C_ROUND_BROADCAST_RESPONSE:
          var d = cc.NetWork.getProtoFile(cc.protoType.protoType_GameSystem).RoundBroadcastRespone.decode(message.body);
          cc.log("轮播" + JSON.stringify(d));
          this.node.getChildByName("inforbase").getComponent("HHSlideshow").setData(d, 320);
          return true;
        }
        return false;
      };
      hhRcv = __decorate([ ccclass ], hhRcv);
      return hhRcv;
    }(cc.Component);
    exports.default = hhRcv;
    cc._RF.pop();
  }, {
    "./hhGameData": "hhGameData"
  } ],
  hhUi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9e48zI82lIeKPJWTPIjQ8g", "hhUi");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var hhGameData_1 = require("./hhGameData");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var hhUi = function(_super) {
      __extends(hhUi, _super);
      function hhUi() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chipPreform = null;
        _this.chipImgPlist = null;
        _this.pokerImgPlist = null;
        _this.headPlist = null;
        _this._chipArr = null;
        _this._seatInfo = null;
        _this._seatMove = null;
        _this._isBanker = false;
        _this._settingLayer = null;
        _this._minBetMoney = null;
        _this._minEnterMoney = null;
        _this._chipLayout = null;
        _this._hhLogic = null;
        _this._downPanel = null;
        _this._chipPanel = null;
        _this._meHeadPos = null;
        _this._onLinePos = null;
        _this._bankerPos = null;
        _this._isGuard = true;
        _this._saveChipMap = null;
        return _this;
      }
      hhUi.prototype.onLoad = function() {
        this.init();
        this.constant();
        this.node.getChildByName("spine_panel").active = false;
        this.addPreform();
        this.createChipBtn();
        this.initBtn();
        cc.AudioManager.playSFX("resources/8007/audio/welcomeToGame.mp3");
        cc.AudioManager.playBGM("resources/8007/audio/hedz_bg.mp3");
      };
      hhUi.prototype.constant = function() {
        this._hhLogic = this.node.getComponent("hhLogic");
        this._downPanel = this.node.getChildByName("down_panel");
        this._chipPanel = this.node.getChildByName("chip_panel");
        this._chipLayout = this._downPanel.getChildByName("chip_layout").getComponent("HHChipLayout");
        var meHeadPos = this._downPanel.getChildByName("head").convertToWorldSpaceAR(cc.p(20, -5));
        this._meHeadPos = this.node.getChildByName("chip_panel").convertToNodeSpaceAR(meHeadPos);
        this._onLinePos = this.node.getChildByName("btn_onLine").getPosition();
        this._bankerPos = cc.p(0, 312);
      };
      hhUi.prototype.init = function() {
        this._chipArr = null;
        this._seatInfo = {};
        this._seatMove = {};
        this._isBanker = false;
        this._isGuard = false;
        this._chipLayout = null;
        this._saveChipMap = {
          myChip: {},
          otherChip: {},
          seatChip: {}
        };
        for (var i = 0; i < 3; i++) {
          this._saveChipMap.myChip[i] = {
            node: [],
            value: 0
          };
          this._saveChipMap.otherChip[i] = {
            node: [],
            value: 0
          };
          for (var j = 0; j < 6; j++) {
            this._saveChipMap.seatChip[j] || (this._saveChipMap.seatChip[j] = {});
            this._saveChipMap.seatChip[j][i] = {
              node: [],
              value: 0
            };
          }
        }
      };
      hhUi.prototype.addPreform = function() {
        this.createSettingLayer();
      };
      hhUi.prototype.chipPos = function() {
        return [ cc.p(-193, 115), cc.p(192, 115), cc.p(0, -70) ];
      };
      hhUi.prototype.getDiffXOrY = function(area, isX) {
        return isX ? 0 === area || 1 === area ? 120 : 260 : 0 === area || 1 === area ? 40 : 30;
      };
      hhUi.prototype.pokerPos = function() {
        return [ cc.p(215.5, 4), cc.p(-214.5, 4), cc.p(275.5, 4), cc.p(-274.5, 4), cc.p(335.5, 4), cc.p(-334.5, 4) ];
      };
      hhUi.prototype.show = function(d) {
        this._chipArr = d.jettons;
        this.initChip(d.betListsData);
        3 === hhGameData_1.default.getInstance().getStage() && this.startAction(1);
        this._chipLayout.setChipBtnNum(this._chipArr);
        this._minBetMoney = Number(d.minBetMoney);
        this._minEnterMoney = Number(d.minEnterMoney);
        for (var idx = 0; idx < d.seatPlayerList.length; idx++) this.setSeatInfo(d.seatPlayerList[idx]);
      };
      hhUi.prototype.initChip = function(d) {
        if (!d) return;
        var betList = d.betList;
        for (var i = 0; i < betList.length; i++) {
          var meBet = hhGameData_1.default.getInstance().allotChipValue(this._chipArr, betList[i].myBetMoey);
          for (var j in meBet) {
            var value = parseInt(j);
            for (var m = 0; m < meBet[j]; m++) {
              var chip = this.createChip(i, value, this._meHeadPos, true);
              this._saveChipMap.myChip[i]["node"].push(chip);
            }
          }
          for (var k = 0; k < betList[i].seatBetMoney.length; k++) {
            if (!betList[i].seatBetMoney[k].userId) continue;
            var seatBet = hhGameData_1.default.getInstance().allotChipValue(this._chipArr, betList[i].seatBetMoney[k]);
            for (var g in seatBet) {
              if (!seatBet[g]) continue;
              var value = parseInt(g);
              for (var m = 0; m < seatBet[g]; m++) {
                var p = this.node.getChildByName("seat_panel").getChildByName("seat_" + i).getPosition();
                var chip = this.createChip(i, value, p, true);
                this._saveChipMap.seatChip[i]["node"].push(chip);
              }
            }
          }
          var otherBet = hhGameData_1.default.getInstance().allotChipValue(this._chipArr, betList[i].totalBetMoney);
          for (var n in otherBet) {
            var value = parseInt(n);
            for (var m = 0; m < otherBet[n]; m++) {
              var chip = this.createChip(i, value, this._onLinePos, true);
              this._saveChipMap.otherChip[i]["node"].push(chip);
            }
          }
          this.node.getChildByName("bet_chip").getChildByName("bet_" + i).getChildByName("sum").getComponent(cc.Label).string = d.posTotalBetMoney[i];
          this.node.getChildByName("bet_chip").getChildByName("bet_" + i).getChildByName("me").getComponent(cc.Label).string = betList[i].myBetMoey;
        }
      };
      hhUi.prototype.startAction = function(time) {
        var me = this;
        if (time < 18) {
          this.sendPoker(time);
          return;
        }
        var spineBg = this.node.getChildByName("spine_panel");
        spineBg.active = true;
        spineBg.getChildByName("spine").active = true;
        cc.AudioManager.playSFX("resources/8007/audio/pk.wav");
        var spine = spineBg.getChildByName("spine").getComponent(sp.Skeleton);
        spine.setToSetupPose();
        spine.setAnimation(0, "animation", false);
        spine.setCompleteListener(function() {
          spineBg.getChildByName("spine").active = false;
          me.sendPoker(null);
        });
      };
      hhUi.prototype.sendPoker = function(time) {
        var me = this;
        var pokerNode = this.node.getChildByName("poker_panel").getChildByName("poker");
        pokerNode.active = true;
        var _loop_1 = function(i) {
          if (time) {
            pokerNode.getChildByName("" + i).setPosition(me.pokerPos()[i]);
            pokerNode.getChildByName("" + i).scale = 1;
            return "continue";
          }
          me.scheduleOnce(function() {
            cc.AudioManager.playSFX("resources/8007/audio/send_poker.wav");
            pokerNode.getChildByName("" + i).runAction(cc.spawn(cc.scaleTo(.5, 1), cc.moveTo(.5, me.pokerPos()[i])));
          }, (5 - i) / 10);
        };
        for (var i = 5; i >= 0; i--) _loop_1(i);
        time || 0 === time ? this.node.getChildByName("spine_panel").active = false : me.scheduleOnce(function() {
          me.startBet();
        }, 1);
      };
      hhUi.prototype.startBet = function() {
        cc.AudioManager.playSFX("resources/8007/audio/kaishixiazhu.wav");
        this.updateStartOrStop("start");
        2 !== hhGameData_1.default.getInstance().getStage() || this._isGuard || (this._isGuard = this._chipLayout.startBet());
      };
      hhUi.prototype.stopBet = function() {
        cc.AudioManager.playSFX("resources/8007/audio/tingzhixiazhu.wav");
        this.updateStartOrStop("stop");
        this._isGuard || this._chipLayout.stopBet();
      };
      hhUi.prototype.updateStartOrStop = function(type) {
        var me = this;
        var actionPanel = this.node.getChildByName("spine_panel");
        if ("start" === type) {
          hhGameData_1.default.getInstance().updataSpritetext(actionPanel.getChildByName("action"), "resources/8007/image/bg_3.png");
          hhGameData_1.default.getInstance().updataSpritetext(actionPanel.getChildByName("action").getChildByName("wz"), "resources/8007/image/wzimg_ksxz.png");
        } else if ("stop" === type) {
          hhGameData_1.default.getInstance().updataSpritetext(actionPanel.getChildByName("action"), "resources/8007/image/bg_4.png");
          hhGameData_1.default.getInstance().updataSpritetext(actionPanel.getChildByName("action").getChildByName("wz"), "resources/8007/image/wzimg_tzxz.png");
        }
        actionPanel.getChildByName("action").active = true;
        actionPanel.active = true;
        actionPanel.getChildByName("action").getComponent(cc.Animation).play();
        actionPanel.getChildByName("action").getComponent(cc.Animation)["hideAction"] = function() {
          me.node.getChildByName("spine_panel").active = false;
          actionPanel.getChildByName("action").active = false;
        };
      };
      hhUi.prototype.showWin = function(d) {
        var betChip = this.node.getChildByName("bet_chip");
        if (1 === d.whoWin) {
          betChip.getChildByName("bet_0").getChildByName("box").active = true;
          betChip.getChildByName("bet_0").getChildByName("win").active = true;
          this.chipBoxBlink(betChip.getChildByName("bet_0").getChildByName("box"));
          cc.AudioManager.playSFX("resources/8007/audio/red.wav");
        } else if (2 === d.whoWin) {
          betChip.getChildByName("bet_1").getChildByName("box").active = true;
          betChip.getChildByName("bet_1").getChildByName("win").active = true;
          this.chipBoxBlink(betChip.getChildByName("bet_1").getChildByName("box"));
          cc.AudioManager.playSFX("resources/8007/audio/black.wav");
        }
        if (d.luckType > 0) {
          betChip.getChildByName("bet_2").getChildByName("box").active = true;
          this.chipBoxBlink(betChip.getChildByName("bet_2").getChildByName("box"));
        }
      };
      hhUi.prototype.chipBoxBlink = function(node) {
        node.runAction(cc.blink(2, 5));
      };
      hhUi.prototype.updatePlayerNum = function(d) {
        this.node.getChildByName("btn_onLine").getChildByName("num").getComponent(cc.Label).string = d.num;
      };
      hhUi.prototype.leaveOrDownSeat = function(d) {
        if (0 !== d.pos && !d.pos) return;
        if (0 === d.type) this.setSeatInfo(d.playerInfo); else {
          var seatPanel = this.node.getChildByName("seat_panel");
          var seat = seatPanel.getChildByName("seat_" + d.pos);
          seat.getChildByName("head").active = false;
          seat.getChildByName("seat").active = true;
          if (this._seatInfo[d.pos]) {
            this._seatInfo[d.pos] = null;
            this._seatMove[d.pos] = false;
          }
          for (var i = 0; i < 5; i++) if (this._saveChipMap.seatChip[d.pos] && this._saveChipMap.seatChip[d.pos][i] && this._saveChipMap.seatChip[d.pos][i]["node"]) while (this._saveChipMap.seatChip[d.pos][i]["node"].length > 0) {
            var node = this._saveChipMap.seatChip[d.pos][i]["node"].pop();
            this._saveChipMap.otherChip[i]["node"].push(node);
          }
        }
      };
      hhUi.prototype.updateSeatMoney = function(d) {
        if (!d || !d.seat && 0 !== d.seat || !this._seatInfo || !this._seatInfo[d.seat]) return;
        if (this._seatInfo[d.seat] === d.userId) {
          var seat = this.node.getChildByName("seat_panel").getChildByName("seat_" + d.seat);
          seat.getChildByName("head").getChildByName("money").getComponent(cc.Label).string = Number(d.remainingMoney).toFixed(2);
        }
      };
      hhUi.prototype.seatMove = function(idx) {
        if (this._seatMove[idx]) return;
        var me = this;
        var seatLayout = this.node.getChildByName("seat_panel");
        var seat = seatLayout.getChildByName("seat_" + idx);
        var diffX = -20;
        idx % 2 === 0 && (diffX = 20);
        var p = seat.getPosition();
        var move = cc.moveTo(.05, cc.p(p.x + diffX, p.y));
        var move1 = cc.moveTo(.05, p);
        me._seatMove[idx] = true;
        seat.runAction(cc.sequence(move, move1, cc.callFunc(function() {
          me._seatMove[idx] = false;
        })));
      };
      hhUi.prototype.updateSeat = function(d) {
        var seatPanel = this.node.getChildByName("seat_panel");
        for (var i = 0; i < d.length; i++) if (d[i].userId <= 0) {
          var seat = seatPanel.getChildByName("seat_" + i);
          seat.getChildByName("head").active = false;
          seat.getChildByName("seat").active = true;
          if (this._seatInfo[i]) {
            this._seatInfo[i] = null;
            this._seatMove[i] = false;
          }
        } else this.setSeatInfo(d[i]);
      };
      hhUi.prototype.resultUpdateSeat = function(d) {
        for (var i = 0; i < d.length; i++) d[i].userId <= 0 || !hhGameData_1.default.getInstance().strIsInArr(d[i].userId, this._seatInfo) ? cc.log("没得就不处理") : this.setSeatInfo(d[i]);
      };
      hhUi.prototype.seatFlyMoney = function(d) {
        if (!d) return;
        var seat = this.node.getChildByName("seat_panel");
        for (var i = 0; i < d.length; i++) {
          if (d[i].userId !== this._seatInfo[d[i].seat] || 0 === Number(d[i].breakEvenMoney)) continue;
          var flyMoney = seat.getChildByName("seat_" + i).getChildByName("minus");
          Number(d[i].breakEvenMoney) > 0 && (flyMoney = seat.getChildByName("seat_" + i).getChildByName("add"));
          var money = cc.instantiate(flyMoney);
          seat.getChildByName("seat_" + i).addChild(money);
          money.getComponent(cc.Label).string = "/" + hhGameData_1.default.getInstance().convertToFixed(d[i].breakEvenMoney);
          hhGameData_1.default.getInstance().moneyAction(money);
        }
      };
      hhUi.prototype.setSeatInfo = function(info) {
        if (!info || !info.seat && 0 !== info.seat || info.seat < 0 || info.userId <= 0) return;
        var seatPanel = this.node.getChildByName("seat_panel");
        var seat = seatPanel.getChildByName("seat_" + info.seat);
        if (!seat) return;
        seat.getChildByName("head").active = true;
        seat.getChildByName("seat").active = false;
        var head = seat.getChildByName("head");
        head.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(cc.PlayerData.getHeadPngName(info.head, info.sex));
        head.getChildByName("money").getComponent(cc.Label).string = hhGameData_1.default.getInstance().convertToFixed(info.money);
        head.getChildByName("name").getComponent(cc.Label).string = info.name;
        this._seatInfo[info.seat] || (this._seatInfo[info.seat] = null);
        this._seatInfo[info.seat] = info.userId;
      };
      hhUi.prototype.meBet = function(dir) {
        if (this._isBanker) {
          cc.Utils.setTis("还未到下注时间");
          return;
        }
        if (2 !== hhGameData_1.default.getInstance().getStage()) {
          cc.Utils.setTis("还未到下注时间");
          return;
        }
        if (this._hhLogic.getGameTime() > 18) return;
        if (this._isGuard) {
          cc.Utils.setTis("您的金币不足" + this._minEnterMoney + "，现在处于观看模式!");
          return;
        }
        if (this._chipArr[this._chipLayout.getChipIdx()] <= 0) {
          cc.Utils.setTis("请选择押注金额!");
          return;
        }
        cc.NetWork.sendMsg({
          betMoneyIndex: this._chipLayout.getChipIdx(),
          area: dir
        }, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackBetMoneyRequest, cc["RedBlackCommand"].C_S_REDBLACK_BET_MONEY_REQUEST);
      };
      hhUi.prototype.regainChip = function(areaArr) {
        for (var i = 0; i < areaArr.length; i++) 0 === areaArr[i] && this.traversalMap(i, true);
      };
      hhUi.prototype.bankerPayForChip = function(areaArr) {
        for (var i = 0; i < areaArr.length; i++) 0 !== areaArr[i] && this.payForChip(i);
      };
      hhUi.prototype.playerRegainChip = function(areaArr) {
        for (var i = 0; i < areaArr.length; i++) 0 !== areaArr[i] && this.traversalMap(i, null);
      };
      hhUi.prototype.traversalMap = function(area, isBanker) {
        if (area < 0) return;
        var me = this;
        var p1, p2;
        if (isBanker) p1 = p2 = this._bankerPos; else {
          p1 = this._meHeadPos;
          p2 = this._onLinePos;
        }
        var isPlayAudio = this._saveChipMap.myChip[area]["node"].length > 0 || this._saveChipMap.otherChip[area]["node"].length > 0;
        var _loop_2 = function() {
          var myNode = this_1._saveChipMap.myChip[area]["node"].pop();
          myNode.getComponent("HHChipNode").flyIn(p1, -1, function() {
            hhGameData_1.default.getInstance().setPoolChild(myNode);
          });
        };
        var this_1 = this;
        while (this._saveChipMap.myChip[area]["node"].length > 0) _loop_2();
        var _loop_3 = function() {
          var otherNode = this_2._saveChipMap.otherChip[area]["node"].pop();
          otherNode.getComponent("HHChipNode").flyIn(p2, -1, function() {
            hhGameData_1.default.getInstance().setPoolChild(otherNode);
          });
        };
        var this_2 = this;
        while (this._saveChipMap.otherChip[area]["node"].length > 0) _loop_3();
        var seatLayout = this.node.getChildByName("seat_panel");
        for (var j = 0; j < seatLayout.children.length; j++) {
          var p = seatLayout.children[j].getPosition();
          isBanker && (p = p1);
          isPlayAudio = isPlayAudio || this._saveChipMap.seatChip[j][area]["node"].length > 0;
          var _loop_4 = function() {
            var seatNode = this_3._saveChipMap.seatChip[j][area]["node"].pop();
            seatNode.getComponent("HHChipNode").flyIn(p, -1, function() {
              hhGameData_1.default.getInstance().setPoolChild(seatNode);
            });
          };
          var this_3 = this;
          while (this._saveChipMap.seatChip[j][area]["node"].length > 0) _loop_4();
        }
        isPlayAudio && cc.AudioManager.playSFX("resources/8007/audio/bet_chip.wav");
      };
      hhUi.prototype.payForChip = function(area) {
        var isPlayAudio = false, chipTemplate = null;
        if (this._saveChipMap.myChip[area]["node"].length > 0) {
          var meChipLen = this._saveChipMap.myChip[area]["node"].length;
          var meLen = meChipLen;
          for (var i = 0; i < meLen; i++) {
            chipTemplate = this._saveChipMap.myChip[area]["node"][meChipLen - meLen + i];
            var chipNode = this.createChip(area, chipTemplate.getComponent("HHChipNode").getChipValue(), this._bankerPos, false, .005);
            this._saveChipMap.myChip[area]["node"].push(chipNode);
          }
          isPlayAudio = true;
        }
        if (this._saveChipMap.otherChip[area]["node"].length > 0) {
          var otherChipLen = this._saveChipMap.otherChip[area]["node"].length;
          var otherLen = otherChipLen;
          for (var j = 0; j < otherLen; j++) {
            chipTemplate = this._saveChipMap.otherChip[area]["node"][otherChipLen - otherLen + j];
            var chipNode = this.createChip(area, chipTemplate.getComponent("HHChipNode").getChipValue(), this._bankerPos, false, .005);
            this._saveChipMap.otherChip[area]["node"].push(chipNode);
          }
          isPlayAudio = true;
        }
        var seatLayout = this.node.getChildByName("seat_panel");
        for (var m = 0; m < seatLayout.children.length; m++) if (this._saveChipMap.seatChip[m][area]["node"].length > 0) {
          var seatChipLen = this._saveChipMap.seatChip[m][area]["node"].length;
          var seatLen = seatChipLen;
          for (var n = 0; n < seatLen; n++) {
            chipTemplate = this._saveChipMap.seatChip[m][area]["node"][seatChipLen - seatLen + n];
            var chipNode = this.createChip(area, chipTemplate.getComponent("HHChipNode").getChipValue(), this._bankerPos, false, .005);
            this._saveChipMap.seatChip[m][area]["node"].push(chipNode);
          }
        }
        isPlayAudio && cc.AudioManager.playSFX("resources/8007/audio/bet_chip.wav");
      };
      hhUi.prototype.repeal = function(d) {
        if (d.userId !== cc.PlayerData.getUserId()) return;
        cc.PlayerData.setMoney(hhGameData_1.default.getInstance().convertToFixed(d.remainingMoney));
        this._chipLayout.isShowChipBtn();
        for (var i = 0; i < 3; i++) {
          var _loop_5 = function() {
            var myNode = this_4._saveChipMap.myChip[i]["node"].pop();
            myNode.getComponent("HHChipNode").flyIn(this_4._meHeadPos, -1, function() {
              hhGameData_1.default.getInstance().setPoolChild(myNode);
            });
          };
          var this_4 = this;
          while (this._saveChipMap.myChip[i]["node"].length > 0) _loop_5();
          var betNode = this.node.getChildByName("bet_chip").getChildByName("bet_" + i);
          betNode.getChildByName("me").getComponent(cc.Label).string = d.betMoneysList.betList[i].myBetMoey;
          betNode.getChildByName("sum").getComponent(cc.Label).string = d.betMoneysList.betList[i].totalBetMoney;
        }
        this.updateMyMoney(null);
      };
      hhUi.prototype.playerBet = function(d) {
        var betInfo = d.betInfo;
        if (betInfo.length > 0) {
          var betChipPanel = this.node.getChildByName("bet_chip");
          for (var k = 0; k < betInfo.length; k++) {
            var btn = betChipPanel.getChildByName("bet_" + betInfo[k].pos);
            -1 !== Number(betInfo[k].myBetMoey) && (btn.getChildByName("me").getComponent(cc.Label).string = "我的下注：" + hhGameData_1.default.getInstance().convertToFixed(betInfo[k].myBetMoey));
            betInfo[k].totalBetMoney && (btn.getChildByName("sum").getComponent(cc.Label).string = hhGameData_1.default.getInstance().convertToFixed(betInfo[k].totalBetMoney));
          }
        }
        var chipArr = d.jetton;
        if (chipArr.length > 0) {
          var isSumChip = false, seatChip = -1, isBet = false;
          for (var i = 0; i < chipArr.length; i++) if (chipArr[i].jettonNum > 0) {
            var area = chipArr[i].area;
            for (var j = 0; j < Number(chipArr[i].jettonNum); j++) if (d.userId === cc.PlayerData.getUserId()) {
              var chip = this.createChip(area, Number(chipArr[i].jettonVal), this._meHeadPos, null);
              this._saveChipMap.myChip[area]["node"].push(chip);
              isBet = true;
              1 === d.isContinueBet ? isSumChip = true : cc.AudioManager.playSFX("resources/8007/audio/chip.wav");
              hhGameData_1.default.getInstance().limitChipNum(this._saveChipMap.myChip[area]["node"], 100);
            } else {
              var seatIdx = hhGameData_1.default.getInstance().isHaveSeat(this._seatInfo, d.userId);
              if (-1 !== seatIdx) {
                seatChip = seatIdx;
                var p = this.node.getChildByName("seat_panel").getChildByName("seat_" + seatIdx).getPosition();
                var chip = this.createChip(area, chipArr[i].jettonVal, p, null);
                1 === d.isContinueBet ? isSumChip = true : cc.AudioManager.playSFX("resources/8007/audio/chip.wav");
                this._saveChipMap.seatChip[seatIdx][area]["node"].push(chip);
                hhGameData_1.default.getInstance().limitChipNum(this._saveChipMap.seatChip[seatIdx][area]["node"], 80);
              } else {
                isSumChip = true;
                var chip = this.createChip(area, chipArr[i].jettonVal, this._onLinePos, null);
                this._saveChipMap.otherChip[area]["node"].push(chip);
                hhGameData_1.default.getInstance().limitChipNum(this._saveChipMap.otherChip[area]["node"], 200);
              }
            }
          }
          if (isBet) {
            cc.PlayerData.setMoney(hhGameData_1.default.getInstance().convertToFixed(d.remainingMoney));
            this._chipLayout.isShowChipBtn();
          }
          isSumChip && cc.AudioManager.playSFX("resources/8007/audio/bet_chip.wav");
          seatChip >= 0 && this.seatMove(seatChip);
        }
        this.updateMyMoney(null);
      };
      hhUi.prototype.setResultInfo = function(d) {
        this.updateMyMoney(d.roundResult);
        this.resultUpdateSeat(d.seatPlayerList);
      };
      hhUi.prototype.updateMyMoney = function(d) {
        if (d && d.myWinMoney && 0 !== Number(d.myWinMoney)) {
          var addMinus = cc.instantiate(this._downPanel.getChildByName("head").getChildByName("minus"));
          Number(d.myWinMoney) > 0 && (addMinus = cc.instantiate(this._downPanel.getChildByName("head").getChildByName("add")));
          this._downPanel.getChildByName("head").addChild(addMinus);
          addMinus.getComponent(cc.Label).string = "/" + hhGameData_1.default.getInstance().convertToFixed(Math.abs(Number(d.myWinMoney)));
          hhGameData_1.default.getInstance().moneyAction(addMinus);
        }
        d && d.money && cc.PlayerData.setMoney(hhGameData_1.default.getInstance().convertToFixed(d.money));
        var meHead = this._downPanel.getChildByName("head");
        meHead.getChildByName("gold_pic").getChildByName("num").getComponent(cc.Label).string = hhGameData_1.default.getInstance().convertToFixed(cc.PlayerData.getMoney());
        this.updateMySeatMoney();
      };
      hhUi.prototype.updateMySeatMoney = function() {
        if (this._seatInfo && hhGameData_1.default.getInstance().strIsInArr(cc.PlayerData.getUserId(), this._seatInfo)) {
          var seat = this.node.getChildByName("seat_panel").getChildByName("seat_" + hhGameData_1.default.getInstance().strInMap(cc.PlayerData.getUserId(), this._seatInfo));
          seat.getChildByName("head").getChildByName("money").getComponent(cc.Label).string = hhGameData_1.default.getInstance().convertToFixed(cc.PlayerData.getMoney());
        }
      };
      hhUi.prototype.setMyInfo = function(d) {
        var info = d.playerInfo;
        if (info.userId != cc.PlayerData.getUserId()) return;
        cc.PlayerData.setMoney(hhGameData_1.default.getInstance().convertToFixed(info.money));
        this._isGuard = this._chipLayout.idWatch(this._minEnterMoney);
        2 !== hhGameData_1.default.getInstance().getStage() || this._isGuard || (this._isGuard = this._chipLayout.startBet());
        var meHead = this._downPanel.getChildByName("head");
        meHead.getChildByName("mask").getChildByName("head_btn").getComponent(cc.Sprite).spriteFrame = this.headPlist.getSpriteFrame(cc.PlayerData.getHeadPngName(info.head, info.sex));
        meHead.getChildByName("name").getComponent(cc.Label).string = info.name;
        meHead.getChildByName("gold_pic").getChildByName("num").getComponent(cc.Label).string = "" + cc.PlayerData.getMoney();
      };
      hhUi.prototype.createChip = function(area, value, pos, noFly, speed) {
        void 0 === speed && (speed = .0012);
        value = Number(value);
        if (value <= 0) return;
        var diffX = this.getDiffXOrY(area, true), diffY = this.getDiffXOrY(area, null);
        var chipNode = null;
        chipNode = hhGameData_1.default.getInstance()._chipPoolArr && hhGameData_1.default.getInstance()._chipPoolArr.length > 0 ? hhGameData_1.default.getInstance().getPoolChild() : cc.instantiate(this.chipPreform);
        var chipLayer = chipNode.getComponent("HHChipNode");
        this._chipPanel.addChild(chipNode);
        var p = this.chipPos()[area];
        if (noFly) {
          chipNode.active = true;
          chipLayer.set(value, hhGameData_1.default.getInstance().getAreaRange(p, -diffX, diffX, -diffY, diffY));
          chipNode.scale = .7;
        } else {
          chipNode.active = false;
          chipLayer.set(value, pos);
          chipLayer.flyOut(hhGameData_1.default.getInstance().getAreaRange(p, -diffX, diffX, -diffY, diffY), function() {}, speed);
        }
        return chipNode;
      };
      hhUi.prototype.pokerAction = function(node, value) {
        var me = this;
        node.active = true;
        var scaleTo1 = cc.scaleTo(.2, 0, 1);
        var scaleTo2 = cc.scaleTo(.2, 1, 1);
        var callFunc = cc.callFunc(function() {
          node.getComponent(cc.Sprite).spriteFrame = me.pokerImgPlist.getSpriteFrame(hhGameData_1.default.getInstance().analysisCardNew(value, 1).cardName);
        });
        node.runAction(cc.sequence(scaleTo1, callFunc, scaleTo2));
      };
      hhUi.prototype.clear = function() {
        var pokerNode = this.node.getChildByName("poker_panel").getChildByName("poker");
        pokerNode.active = false;
        for (var k = 5; k >= 0; k--) {
          pokerNode.children[k].stopAllActions();
          pokerNode.children[k].setPosition(cc.p(0, 35));
          pokerNode.children[k].scale = .5;
          pokerNode.children[k].getComponent(cc.Sprite).spriteFrame = this.pokerImgPlist.getSpriteFrame("pai_55");
        }
        this._chipPanel.removeAllChildren(true);
        for (var j = 0; j < 3; j++) {
          this.node.getChildByName("bet_chip").getChildByName("bet_" + j).getChildByName("box").active = false;
          j < 2 && this.node.getChildByName("bet_chip").getChildByName("bet_" + j).getChildByName("win") && (this.node.getChildByName("bet_chip").getChildByName("bet_" + j).getChildByName("win").active = false);
          this.node.getChildByName("bet_chip").getChildByName("bet_" + j).getChildByName("sum").getComponent(cc.Label).string = "0";
          this.node.getChildByName("bet_chip").getChildByName("bet_" + j).getChildByName("me").getComponent(cc.Label).string = "我的下注: 0";
          var i = j;
          if (this._saveChipMap.myChip[i]["node"]) {
            while (this._saveChipMap.myChip[i]["node"].length > 0) hhGameData_1.default.getInstance().setPoolChild(this._saveChipMap.myChip[i]["node"].pop());
            this._saveChipMap.myChip[i]["node"] = [];
          }
          if (this._saveChipMap.otherChip[i]["node"]) {
            while (this._saveChipMap.otherChip[i]["node"].length > 0) hhGameData_1.default.getInstance().setPoolChild(this._saveChipMap.otherChip[i]["node"].pop());
            this._saveChipMap.otherChip[i]["node"] = [];
          }
          for (var j_1 = 0; j_1 < 6; j_1++) if (this._saveChipMap.seatChip[j_1][i]["node"]) {
            while (this._saveChipMap.seatChip[j_1][i]["node"].length > 0) hhGameData_1.default.getInstance().setPoolChild(this._saveChipMap.seatChip[j_1][i]["node"].pop());
            this._saveChipMap.seatChip[j_1][i]["node"] = [];
          }
        }
      };
      hhUi.prototype.initBtn = function() {
        var me = this;
        var seatBtnNode = me.node.getChildByName("seat_panel"), isTouch = true;
        var _loop_6 = function(i) {
          seatBtnNode.children[i].getChildByName("seat").on(cc.Node.EventType.TOUCH_END, function() {
            if (!isTouch) return;
            isTouch = false;
            me.scheduleOnce(function() {
              isTouch = true;
            }, .5);
            cc.NetWork.sendMsg({
              pos: i,
              type: 0
            }, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackSeatDownRequest, cc["RedBlackCommand"].C_S_REDBLACK_SEAT_DOWN_REQUEST);
          });
          seatBtnNode.children[i].getChildByName("head").on(cc.Node.EventType.TOUCH_END, function() {
            if (!isTouch) return;
            isTouch = false;
            me.scheduleOnce(function() {
              isTouch = true;
            }, .5);
            if (cc.PlayerData.getUserId() !== me._seatInfo[i]) return;
            cc.NetWork.sendMsg({
              pos: i,
              type: 1
            }, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackSeatDownRequest, cc["RedBlackCommand"].C_S_REDBLACK_SEAT_DOWN_REQUEST);
          });
        };
        for (var i = 0; i < seatBtnNode.children.length; i++) _loop_6(i);
        var betChip = me.node.getChildByName("bet_chip");
        var _loop_7 = function(i) {
          betChip.getChildByName("bet_" + i).on(cc.Node.EventType.TOUCH_END, function() {
            me.meBet(i);
          });
        };
        for (var i = 0; i < 3; i++) _loop_7(i);
      };
      hhUi.prototype.leave = function(d) {
        0 === d.leaveType && cc.PlayerData.getUserId() === d.userId ? cc.Utils.jumpToMainUI() : this._settingLayer.setActive(false);
      };
      hhUi.prototype.createChipBtn = function() {
        var me = this;
        me._chipLayout.show(function(d) {
          if (!d.btn) return;
          switch (d.btn) {
           case "bt_replay":
            if (2 !== hhGameData_1.default.getInstance().getStage()) {
              cc.Utils.setTis("还未到下注时间!");
              return;
            }
            cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackContinueBetRequest, cc["RedBlackCommand"].C_S_REDBLACK_CONTINUE_BET_REQUEST);
            break;

           case "bt_revoke":
            if (2 !== hhGameData_1.default.getInstance().getStage()) {
              cc.Utils.setTis("还未到下注时间!");
              return;
            }
            cc.NetWork.sendMsg({}, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackCancelBetRequest, cc["RedBlackCommand"].C_S_REDBLACK_CANCEL_BET_REQUEST);
            break;

           case "audio_btn":
            me.node.getChildByName("gameVoice").getComponent("HHGameVoice").closeOrOpenVoice(true);
          }
        });
      };
      hhUi.prototype.createSettingLayer = function() {
        var _this = this;
        this._settingLayer || cc.loader.loadRes("8007/prafeb/HHsettinggame", function(err, prefab) {
          if (err) {
            cc.error("load setting error. " + err);
            return;
          }
          var node = cc.instantiate(prefab);
          node.parent = _this.node;
          node.setLocalZOrder(210);
          _this._settingLayer = node.getComponent("HHSettingLayout");
          _this._settingLayer.init();
          _this._settingLayer.isShowBtnBack(true);
        });
      };
      hhUi.prototype.onBtnClick = function(event) {
        switch (event.target.name) {
         case "btn_exit":
          cc.NetWork.sendMsg({
            leaveType: 1
          }, cc.NetWork.getProtoFile("RedBlackRoom").RedBlackLeaveTableRequest, cc["RedBlackCommand"].C_S_REDBLACK_LEAVE_TABLE_REQUEST);
          break;

         case "btn_help":
          this.node.getChildByName("help_panel").active = true;
          this.node.getChildByName("help_panel").getChildByName("scrollview").getComponent(cc.ScrollView).scrollToTop(.01);
          break;

         case "btn_setting":
          this._settingLayer.setActive(true);
          break;

         case "close_help":
          this.node.getChildByName("help_panel").active = false;
          break;

         case "btn_onLine":
          cc.log("---在线人数");
          break;

         case "btn_chart":
          this.node.getChildByName("chart_panel").active = true;
          break;

         case "close_chart":
          this.node.getChildByName("chart_panel").active = false;
        }
      };
      hhUi.prototype.update = function(dt) {
        hhGameData_1.default.getInstance().clearPoolNode();
      };
      __decorate([ property(cc.Prefab) ], hhUi.prototype, "chipPreform", void 0);
      __decorate([ property(cc.SpriteAtlas) ], hhUi.prototype, "chipImgPlist", void 0);
      __decorate([ property(cc.SpriteAtlas) ], hhUi.prototype, "pokerImgPlist", void 0);
      __decorate([ property(cc.SpriteAtlas) ], hhUi.prototype, "headPlist", void 0);
      hhUi = __decorate([ ccclass ], hhUi);
      return hhUi;
    }(cc.Component);
    exports.default = hhUi;
    cc._RF.pop();
  }, {
    "./hhGameData": "hhGameData"
  } ]
}, {}, [ "HHChipLayout", "HHChipNode", "HHGameBarrage", "HHGameDefine", "HHGameVoice", "HHSettingLayout", "HHSlideshow", "HHVoiceItem", "HeadLayout", "hhGameData", "hhLogic", "hhRcv", "hhUi" ]);
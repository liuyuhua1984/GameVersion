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
  AudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "59777j/Fs5Gdb02IzNLfFa1", "AudioManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AudioManager = function() {
      function AudioManager() {
        this.musicVolume = 1;
        this.videoVolume = 1;
        this.bgmAudioID = -1;
        this.sextype = 0;
        this.idArr = [];
      }
      AudioManager_1 = AudioManager;
      AudioManager.getInstance = function() {
        if (!this.m_sInstance) {
          this.m_sInstance = new AudioManager_1();
          this.m_sInstance.init();
        }
        return this.m_sInstance;
      };
      AudioManager.prototype.init = function() {
        this.idArr = [];
        var t = cc.sys.localStorage.getItem("musicVolume");
        this.musicVolume = null != t ? parseFloat(t) : .5;
        t = cc.sys.localStorage.getItem("videoVolume");
        this.videoVolume = null != t ? parseFloat(t) : 1;
        t = cc.sys.localStorage.getItem("sextype");
        this.sextype = null != t ? parseFloat(t) : 0;
      };
      AudioManager.prototype.saveSound = function() {
        cc.sys.localStorage.setItem("musicVolume", this.musicVolume);
        cc.sys.localStorage.setItem("videoVolume", this.videoVolume);
        cc.sys.localStorage.setItem("sextype", this.sextype);
      };
      AudioManager.prototype.getAudioId = function(path) {
        return cc.audioEngine.play(cc.url.raw(path), false, .5);
      };
      AudioManager.prototype.playBGM = function(audioUrl) {
        cc.log(audioUrl);
        this.bgmAudioID >= 0 && cc.audioEngine.stop(this.bgmAudioID);
        this.bgmAudioID = cc.audioEngine.play(cc.url.raw(audioUrl), true, this.musicVolume);
      };
      AudioManager.prototype.stopBackAudio = function() {
        this.bgmAudioID >= 0 && cc.audioEngine.stop(this.bgmAudioID);
        this.bgmAudioID = 0;
      };
      AudioManager.prototype.playSFX = function(audioUrl) {
        var me = this;
        if (this.videoVolume > 0) {
          if (this.idArr.length > 8) for (var i = 6; i < this.idArr.length; i++) cc.audioEngine.stop(this.idArr.pop());
          var audioId_1 = cc.audioEngine.play(cc.url.raw(audioUrl), false, this.videoVolume);
          this.idArr.push(audioId_1);
          cc.audioEngine.setFinishCallback(audioId_1, function() {
            if (me.idArr.indexOf(audioId_1) >= 0) for (var j = 0; j < me.idArr.length; j++) if (me.idArr[j] == audioId_1) {
              me.idArr.splice(j, 1);
              return;
            }
          });
        }
      };
      AudioManager.prototype.setSexType = function(type) {
        this.sextype = type;
      };
      AudioManager.prototype.setAudioVolume = function(v) {
        this.videoVolume = v;
        this.saveSound();
      };
      AudioManager.prototype.setMusicVolume = function(v) {
        if (v === this.musicVolume) return;
        this.musicVolume = v;
        cc.audioEngine.setVolume(this.bgmAudioID, this.musicVolume);
        this.bgmAudioID >= 0 && (v > 0 ? cc.audioEngine.resume(this.bgmAudioID) : cc.audioEngine.pause(this.bgmAudioID));
        this.saveSound();
      };
      AudioManager.prototype.setAudioStage = function(str, stage) {
        switch (str) {
         case "music":
          this.setMusicVolume(this.musicVolume);
        }
      };
      AudioManager.prototype.getAudioValue = function(str) {
        var value = 0;
        switch (str) {
         case "music":
          value = this.musicVolume;
          break;

         case "video":
          value = this.videoVolume;
          break;

         case "sex":
          value = this.sextype;
        }
        return value;
      };
      AudioManager.prototype.pauseAll = function() {
        cc.audioEngine.pauseAll();
      };
      AudioManager.prototype.resumeAll = function() {
        cc.audioEngine.resumeAll();
      };
      AudioManager.m_sInstance = null;
      AudioManager = AudioManager_1 = __decorate([ ccclass ], AudioManager);
      return AudioManager;
      var AudioManager_1;
    }();
    exports.default = AudioManager;
    cc._RF.pop();
  }, {} ],
  ChooseRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0dc14Q42dlLBrYLrwW2C3Be", "ChooseRoom");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeadDefine_1 = require("./../common/HeadDefine");
    var PlayerData_1 = require("./../common/PlayerData");
    var NetWork_1 = require("./../common/NetWork");
    var ChooseRoom = function(_super) {
      __extends(ChooseRoom, _super);
      function ChooseRoom() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gameTypePlist = null;
        _this._gameType = HeadDefine_1.gameType.gameType_NONE;
        _this._roomlist = [];
        _this.serverID = 0;
        return _this;
      }
      ChooseRoom.prototype.onLoad = function() {};
      ChooseRoom.prototype.show = function() {
        this.node.active = true;
        this.setTitlePic();
      };
      ChooseRoom.prototype.setTitlePic = function() {
        this.node.getChildByName("titleBG").getChildByName("gameType").getComponent(cc.Sprite).spriteFrame = this.gameTypePlist.getSpriteFrame("gameType_" + this._gameType);
      };
      ChooseRoom.prototype.quickStart = function() {
        var index = 0;
        for (var i = this._roomlist.length - 1; i >= 0; i--) if (PlayerData_1.default.getInstance().getMoney() >= this._roomlist[i].minMoney) {
          index = i;
          break;
        }
        this.roomClient(index);
      };
      ChooseRoom.prototype.roomClient = function(index) {
        var message = {
          serverId: this.serverID,
          roomId: this._roomlist[index].roomId
        };
        NetWork_1.NetWork.getInstance().sendMsg(message, NetWork_1.NetWork.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).RegisterTableRequest, NetWork_1.CmdType.C_S_REGISTER_TABLE_REQUEST);
      };
      ChooseRoom.prototype.ReceivedMessageManage = function(serverID, data) {
        var self = this;
        this.serverID = serverID;
        cc.log("serverID : " + serverID);
        this._roomlist = data;
        cc.log(data);
        this._gameType = Number(data[0].roomId.toString().substring(0, 4));
        if (1 == data.length) {
          this.roomClient(0);
          return;
        }
        this.show();
        var _loop_1 = function(i) {
          var item = this_1.node.getChildByName("roomLayout").getChildByName("item_" + (i + 1));
          item.getChildByName("tj11").getComponent(cc.Label).string = "入场资格：" + data[i].enterMoney;
          item.getChildByName("tj22").getComponent(cc.Label).string = "底注：" + data[i].baseBet;
          item.on(cc.Node.EventType.TOUCH_END, function(event) {
            self.roomClient(i);
          }, item);
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) _loop_1(i);
      };
      ChooseRoom.prototype.onClientBtn = function(event) {
        switch (event.target.name) {
         case "btn_quick":
          this.quickStart();
          break;

         case "btn_back":
          this.node.active = false;
        }
      };
      __decorate([ property({
        type: cc.SpriteAtlas
      }) ], ChooseRoom.prototype, "gameTypePlist", void 0);
      ChooseRoom = __decorate([ ccclass ], ChooseRoom);
      return ChooseRoom;
    }(cc.Component);
    exports.default = ChooseRoom;
    cc._RF.pop();
  }, {
    "./../common/HeadDefine": "HeadDefine",
    "./../common/NetWork": "NetWork",
    "./../common/PlayerData": "PlayerData"
  } ],
  CryptoJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a2391pEjyBJ4LPUmLVYqY7s", "CryptoJS");
    "use strict";
    var CryptoJS = CryptoJS || function(u, p) {
      var d = {}, l = d.lib = {}, s = function s() {}, t = l.Base = {
        extend: function extend(a) {
          s.prototype = this;
          var c = new s();
          a && c.mixIn(a);
          c.hasOwnProperty("init") || (c.init = function() {
            c.$super.init.apply(this, arguments);
          });
          c.init.prototype = c;
          c.$super = this;
          return c;
        },
        create: function create() {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function init() {},
        mixIn: function mixIn(a) {
          for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function clone() {
          return this.init.prototype.extend(this);
        }
      }, r = l.WordArray = t.extend({
        init: function init(a, c) {
          a = this.words = a || [];
          this.sigBytes = c != p ? c : 4 * a.length;
        },
        toString: function toString(a) {
          return (a || v).stringify(this);
        },
        concat: function concat(a) {
          var c = this.words, e = a.words, j = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (j % 4) for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - k % 4 * 8 & 255) << 24 - (j + k) % 4 * 8; else if (65535 < e.length) for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e);
          this.sigBytes += a;
          return this;
        },
        clamp: function clamp() {
          var a = this.words, c = this.sigBytes;
          a[c >>> 2] &= 4294967295 << 32 - c % 4 * 8;
          a.length = u.ceil(c / 4);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function random(a) {
          for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
          return new r.init(c, a);
        }
      }), w = d.enc = {}, v = w.Hex = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) {
            var k = c[j >>> 2] >>> 24 - j % 4 * 8 & 255;
            e.push((k >>> 4).toString(16));
            e.push((15 & k).toString(16));
          }
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - j % 8 * 4;
          return new r.init(e, c / 2);
        }
      }, b = w.Latin1 = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - j % 4 * 8 & 255));
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (255 & a.charCodeAt(j)) << 24 - j % 4 * 8;
          return new r.init(e, c);
        }
      }, x = w.Utf8 = {
        stringify: function stringify(a) {
          try {
            return decodeURIComponent(escape(b.stringify(a)));
          } catch (c) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function parse(a) {
          return b.parse(unescape(encodeURIComponent(a)));
        }
      }, q = l.BufferedBlockAlgorithm = t.extend({
        reset: function reset() {
          this._data = new r.init();
          this._nDataBytes = 0;
        },
        _append: function _append(a) {
          "string" == typeof a && (a = x.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function _process(a) {
          var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((0 | b) - this._minBufferSize, 0);
          a = b * k;
          j = u.min(4 * a, j);
          if (a) {
            for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
            q = e.splice(0, a);
            c.sigBytes -= j;
          }
          return new r.init(q, j);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0
      });
      l.Hasher = q.extend({
        cfg: t.extend(),
        init: function init(a) {
          this.cfg = this.cfg.extend(a);
          this.reset();
        },
        reset: function reset() {
          q.reset.call(this);
          this._doReset();
        },
        update: function update(a) {
          this._append(a);
          this._process();
          return this;
        },
        finalize: function finalize(a) {
          a && this._append(a);
          return this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function _createHelper(a) {
          return function(b, e) {
            return new a.init(e).finalize(b);
          };
        },
        _createHmacHelper: function _createHmacHelper(a) {
          return function(b, e) {
            return new n.HMAC.init(a, e).finalize(b);
          };
        }
      });
      var n = d.algo = {};
      return d;
    }(Math);
    (function() {
      var u = CryptoJS, p = u.lib.WordArray;
      u.enc.Base64 = {
        stringify: function stringify(d) {
          var l = d.words, p = d.sigBytes, t = this._map;
          d.clamp();
          d = [];
          for (var r = 0; r < p; r += 3) for (var w = (l[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | l[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, v = 0; 4 > v && r + .75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
          if (l = t.charAt(64)) for (;d.length % 4; ) d.push(l);
          return d.join("");
        },
        parse: function parse(d) {
          var l = d.length, s = this._map, t = s.charAt(64);
          t && (t = d.indexOf(t), -1 != t && (l = t));
          for (var t = [], r = 0, w = 0; w < l; w++) if (w % 4) {
            var v = s.indexOf(d.charAt(w - 1)) << w % 4 * 2, b = s.indexOf(d.charAt(w)) >>> 6 - w % 4 * 2;
            t[r >>> 2] |= (v | b) << 24 - r % 4 * 8;
            r++;
          }
          return p.create(t, r);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
    })();
    (function(u) {
      function p(b, n, a, c, e, j, k) {
        b = b + (n & a | ~n & c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function d(b, n, a, c, e, j, k) {
        b = b + (n & c | a & ~c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function l(b, n, a, c, e, j, k) {
        b = b + (n ^ a ^ c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function s(b, n, a, c, e, j, k) {
        b = b + (a ^ (n | ~c)) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
      r = r.MD5 = v.extend({
        _doReset: function _doReset() {
          this._hash = new w.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function _doProcessBlock(q, n) {
          for (var a = 0; 16 > a; a++) {
            var c = n + a, e = q[c];
            q[c] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          }
          var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]), f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f, m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m, E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]);
          a[0] = a[0] + f | 0;
          a[1] = a[1] + m | 0;
          a[2] = a[2] + g | 0;
          a[3] = a[3] + h | 0;
        },
        _doFinalize: function _doFinalize() {
          var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes;
          n[c >>> 5] |= 128 << 24 - c % 32;
          var e = u.floor(a / 4294967296);
          n[15 + (c + 64 >>> 9 << 4)] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          n[14 + (c + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
          b.sigBytes = 4 * (n.length + 1);
          this._process();
          b = this._hash;
          n = b.words;
          for (a = 0; 4 > a; a++) c = n[a], n[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
          return b;
        },
        clone: function clone() {
          var b = v.clone.call(this);
          b._hash = this._hash.clone();
          return b;
        }
      });
      t.MD5 = v._createHelper(r);
      t.HmacMD5 = v._createHmacHelper(r);
    })(Math);
    (function() {
      var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({
        cfg: d.extend({
          keySize: 4,
          hasher: p.MD5,
          iterations: 1
        }),
        init: function init(d) {
          this.cfg = this.cfg.extend(d);
        },
        compute: function compute(d, r) {
          for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q; ) {
            n && s.update(n);
            var n = s.update(d).finalize(r);
            s.reset();
            for (var a = 1; a < p; a++) n = s.finalize(n), s.reset();
            b.concat(n);
          }
          b.sigBytes = 4 * q;
          return b;
        }
      });
      u.EvpKDF = function(d, l, p) {
        return s.create(p).compute(d, l);
      };
    })();
    CryptoJS.lib.Cipher || function(u) {
      var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
        cfg: l.extend(),
        createEncryptor: function createEncryptor(e, a) {
          return this.create(this._ENC_XFORM_MODE, e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.create(this._DEC_XFORM_MODE, e, a);
        },
        init: function init(e, a, b) {
          this.cfg = this.cfg.extend(b);
          this._xformMode = e;
          this._key = a;
          this.reset();
        },
        reset: function reset() {
          t.reset.call(this);
          this._doReset();
        },
        process: function process(e) {
          this._append(e);
          return this._process();
        },
        finalize: function finalize(e) {
          e && this._append(e);
          return this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function _createHelper(e) {
          return {
            encrypt: function encrypt(b, k, d) {
              return ("string" == typeof k ? c : a).encrypt(e, b, k, d);
            },
            decrypt: function decrypt(b, k, d) {
              return ("string" == typeof k ? c : a).decrypt(e, b, k, d);
            }
          };
        }
      });
      d.StreamCipher = v.extend({
        _doFinalize: function _doFinalize() {
          return this._process(!0);
        },
        blockSize: 1
      });
      var b = p.mode = {}, x = function x(e, a, b) {
        var c = this._iv;
        c ? this._iv = u : c = this._prevBlock;
        for (var d = 0; d < b; d++) e[a + d] ^= c[d];
      }, q = (d.BlockCipherMode = l.extend({
        createEncryptor: function createEncryptor(e, a) {
          return this.Encryptor.create(e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.Decryptor.create(e, a);
        },
        init: function init(e, a) {
          this._cipher = e;
          this._iv = a;
        }
      })).extend();
      q.Encryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize;
          x.call(this, e, a, c);
          b.encryptBlock(e, a);
          this._prevBlock = e.slice(a, a + c);
        }
      });
      q.Decryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c);
          b.decryptBlock(e, a);
          x.call(this, e, a, c);
          this._prevBlock = d;
        }
      });
      b = b.CBC = q;
      q = (p.pad = {}).Pkcs7 = {
        pad: function pad(a, b) {
          for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
          c = s.create(l, c);
          a.concat(c);
        },
        unpad: function unpad(a) {
          a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2];
        }
      };
      d.BlockCipher = v.extend({
        cfg: v.cfg.extend({
          mode: b,
          padding: q
        }),
        reset: function reset() {
          v.reset.call(this);
          var a = this.cfg, b = a.iv, a = a.mode;
          if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, 
          this._minBufferSize = 1;
          this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function _doProcessBlock(a, b) {
          this._mode.processBlock(a, b);
        },
        _doFinalize: function _doFinalize() {
          var a = this.cfg.padding;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            a.pad(this._data, this.blockSize);
            var b = this._process(!0);
          } else b = this._process(!0), a.unpad(b);
          return b;
        },
        blockSize: 4
      });
      var n = d.CipherParams = l.extend({
        init: function init(a) {
          this.mixIn(a);
        },
        toString: function toString(a) {
          return (a || this.formatter).stringify(this);
        }
      }), b = (p.format = {}).OpenSSL = {
        stringify: function stringify(a) {
          var b = a.ciphertext;
          a = a.salt;
          return (a ? s.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(r);
        },
        parse: function parse(a) {
          a = r.parse(a);
          var b = a.words;
          if (1398893684 == b[0] && 1701076831 == b[1]) {
            var c = s.create(b.slice(2, 4));
            b.splice(0, 4);
            a.sigBytes -= 16;
          }
          return n.create({
            ciphertext: a,
            salt: c
          });
        }
      }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({
          format: b
        }),
        encrypt: function encrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          var l = a.createEncryptor(c, d);
          b = l.finalize(b);
          l = l.cfg;
          return n.create({
            ciphertext: b,
            key: c,
            iv: l.iv,
            algorithm: a,
            mode: l.mode,
            padding: l.padding,
            blockSize: a.blockSize,
            formatter: d.format
          });
        },
        decrypt: function decrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          b = this._parse(b, d.format);
          return a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function _parse(a, b) {
          return "string" == typeof a ? b.parse(a, this) : a;
        }
      }), p = (p.kdf = {}).OpenSSL = {
        execute: function execute(a, b, c, d) {
          d || (d = s.random(8));
          a = w.create({
            keySize: b + c
          }).compute(a, d);
          c = s.create(a.words.slice(b), 4 * c);
          a.sigBytes = 4 * b;
          return n.create({
            key: a,
            iv: c,
            salt: d
          });
        }
      }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({
          kdf: p
        }),
        encrypt: function encrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          d = l.kdf.execute(d, b.keySize, b.ivSize);
          l.iv = d.iv;
          b = a.encrypt.call(this, b, c, d.key, l);
          b.mixIn(d);
          return b;
        },
        decrypt: function decrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          c = this._parse(c, l.format);
          d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
          l.iv = d.iv;
          return a.decrypt.call(this, b, c, d.key, l);
        }
      });
    }();
    (function() {
      for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
      for (var e = 0, j = 0, c = 0; 256 > c; c++) {
        var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ 255 & k ^ 99;
        l[e] = k;
        s[k] = e;
        var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k;
        t[e] = y << 24 | y >>> 8;
        r[e] = y << 16 | y >>> 16;
        w[e] = y << 8 | y >>> 24;
        v[e] = y;
        y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
        b[k] = y << 24 | y >>> 8;
        x[k] = y << 16 | y >>> 16;
        q[k] = y << 8 | y >>> 24;
        n[k] = y;
        e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1;
      }
      var H = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], d = d.AES = p.extend({
        _doReset: function _doReset() {
          for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) if (j < d) e[j] = c[j]; else {
            var k = e[j - 1];
            j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k]) : (k = k << 8 | k >>> 24, 
            k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k], 
            k ^= H[j / d | 0] << 24);
            e[j] = e[j - d] ^ k;
          }
          c = this._invKeySchedule = [];
          for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>> 8 & 255]] ^ n[l[255 & k]];
        },
        encryptBlock: function encryptBlock(a, b) {
          this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l);
        },
        decryptBlock: function decryptBlock(a, c) {
          var d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
          this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
          d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
        },
        _doCryptBlock: function _doCryptBlock(a, b, c, d, e, j, l, f) {
          for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[255 & n] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[255 & g] ^ c[p++], t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[255 & h] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[255 & k] ^ c[p++], g = q, h = s, k = t;
          q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[255 & n]) ^ c[p++];
          s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[255 & g]) ^ c[p++];
          t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[255 & h]) ^ c[p++];
          n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[255 & k]) ^ c[p++];
          a[b] = q;
          a[b + 1] = s;
          a[b + 2] = t;
          a[b + 3] = n;
        },
        keySize: 8
      });
      u.AES = p._createHelper(d);
    })();
    CryptoJS.pad.ZeroPadding = {
      pad: function pad(a, c) {
        var b = 4 * c;
        a.clamp();
        a.sigBytes += b - (a.sigBytes % b || b);
      },
      unpad: function unpad(a) {
        for (var c = a.words, b = a.sigBytes - 1; !(c[b >>> 2] >>> 24 - b % 4 * 8 & 255); ) b--;
        a.sigBytes = b + 1;
      }
    };
    module.exports = CryptoJS;
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    (function(process) {
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if ("." === last) parts.splice(i, 1); else if (".." === last) {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) for (;up--; up) parts.unshift("..");
        return parts;
      }
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      var splitPath = function(filename) {
        return splitPathRe.exec(filename).slice(1);
      };
      exports.resolve = function() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : process.cwd();
          if ("string" !== typeof path) throw new TypeError("Arguments to path.resolve must be strings");
          if (!path) continue;
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = "/" === path.charAt(0);
        }
        resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
          return !!p;
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      };
      exports.normalize = function(path) {
        var isAbsolute = exports.isAbsolute(path), trailingSlash = "/" === substr(path, -1);
        path = normalizeArray(filter(path.split("/"), function(p) {
          return !!p;
        }), !isAbsolute).join("/");
        path || isAbsolute || (path = ".");
        path && trailingSlash && (path += "/");
        return (isAbsolute ? "/" : "") + path;
      };
      exports.isAbsolute = function(path) {
        return "/" === path.charAt(0);
      };
      exports.join = function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return exports.normalize(filter(paths, function(p, index) {
          if ("string" !== typeof p) throw new TypeError("Arguments to path.join must be strings");
          return p;
        }).join("/"));
      };
      exports.relative = function(from, to) {
        from = exports.resolve(from).substr(1);
        to = exports.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (;start < arr.length; start++) if ("" !== arr[start]) break;
          var end = arr.length - 1;
          for (;end >= 0; end--) if ("" !== arr[end]) break;
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      };
      exports.sep = "/";
      exports.delimiter = ":";
      exports.dirname = function(path) {
        var result = splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) return ".";
        dir && (dir = dir.substr(0, dir.length - 1));
        return root + dir;
      };
      exports.basename = function(path, ext) {
        var f = splitPath(path)[2];
        ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length));
        return f;
      };
      exports.extname = function(path) {
        return splitPath(path)[3];
      };
      function filter(xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) f(xs[i], i, xs) && res.push(xs[i]);
        return res;
      }
      var substr = "b" === "ab".substr(-1) ? function(str, start, len) {
        return str.substr(start, len);
      } : function(str, start, len) {
        start < 0 && (start = str.length + start);
        return str.substr(start, len);
      };
    }).call(this, require("_process"));
  }, {
    _process: 2
  } ],
  2: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  GameGameChoose: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f725eDk6d1JkZuC18U5SvU2", "GameGameChoose");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeadDefine_1 = require("./../common/HeadDefine");
    var NetWork_1 = require("../common/NetWork");
    var Utils_1 = require("../common/Utils");
    var updateApp_1 = require("../other/updateApp");
    var GameGameChoose = function(_super) {
      __extends(GameGameChoose, _super);
      function GameGameChoose() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gameItem = null;
        _this.gameSpriteAtlas = null;
        _this.indicator = null;
        _this.gamepageview = null;
        _this.gamelistdata = null;
        _this.onUpdateGameId = 0;
        return _this;
      }
      GameGameChoose.prototype.onLoad = function() {
        this.gamepageview = this.node.getChildByName("gamePageView").getComponent(cc.PageView);
        this.indicator = this.gamepageview.node.getChildByName("indicator");
      };
      GameGameChoose.prototype.ReceivedMessageManage = function(data) {
        this.updataGameShow(data);
      };
      GameGameChoose.prototype.updataGameShow = function(data) {
        this.gamelistdata = data;
        if (cc.sys.isNative) for (var idx = 0; idx < data.length; idx++) {
          var version = Utils_1.default.getInstance().getLocalVersionByGameID(data[idx].gameId);
          data[idx].localVersion = version;
          cc.log(data[idx].gameId + " : " + version);
        }
        this.updatapage(this.gamelistdata);
      };
      GameGameChoose.prototype.updatapage = function(listda) {
        if (listda) {
          var pageNum = 0;
          var itemindexs = 0;
          for (var index = 1; index < this.gamepageview.content.children.length; index++) this.gamepageview.content.children[index].active = false;
          var itemaddPage = this.gamepageview.content.children[1];
          for (var index = 0; index < listda.length; index++) if (index < 2) {
            var pageitem = this.gamepageview.content.children[0];
            var gameItem = pageitem.children[index];
            var sprite = gameItem.getComponent(cc.Sprite);
            sprite.spriteFrame = index < 1 ? this.gameSpriteAtlas.getSpriteFrame("icon_" + listda[index].gameId + "_2") : this.gameSpriteAtlas.getSpriteFrame("icon_" + listda[index].gameId + "_1");
            gameItem["gameId"] = listda[index].gameId;
            gameItem.on("click", this.btnClient, this);
            gameItem.getComponent(cc.Button).interactable = listda[index].status < 2;
          } else if (index < 4) {
            var pageitem = this.gamepageview.content.children[pageNum];
            var gameitem = pageitem.children[2];
            if (gameitem.children[index]) {
              var sprite = gameitem.children[index].getComponent(cc.Sprite);
              sprite.spriteFrame = this.gameSpriteAtlas.getSpriteFrame("icon_" + listda[index].gameId + "_0");
              gameitem.children[index]["gameId"] = listda[index].gameId;
              gameitem.children[index].on("click", this.btnClient, this);
              gameitem.children[index].getComponent(cc.Button).interactable = listda[index].status < 2;
            } else {
              var item = cc.instantiate(this.gameItem);
              gameitem.addChild(item);
              var sprite = item.getComponent(cc.Sprite);
              sprite.spriteFrame = this.gameSpriteAtlas.getSpriteFrame("icon_" + listda[index].gameId + "_0");
              item["gameId"] = listda[index].gameId;
              item.on("click", this.btnClient, this);
              item.getComponent(cc.Button).interactable = listda[index].status < 2;
            }
          } else {
            if (itemindexs >= 6) {
              itemindexs = 0;
              pageNum += 0 == pageNum ? 2 : 1;
              itemaddPage = this.gamepageview.content.children[pageNum];
              itemaddPage.removeAllChildren();
            }
            itemaddPage.active = true;
            if (itemaddPage.children.length >= 6) {
              var itemsd = itemaddPage.children[itemindexs];
              var sprite = itemsd.getComponent(cc.Sprite);
              sprite.spriteFrame = this.gameSpriteAtlas.getSpriteFrame("icon_" + listda[index].gameId + "_0");
              itemsd["gameId"] = listda[index].gameId;
              itemsd.on("click", this.btnClient, this);
              itemsd.getComponent(cc.Button).interactable = listda[index].status < 2;
              itemindexs++;
            } else {
              var items = cc.instantiate(this.gameItem);
              itemaddPage.addChild(items);
              var sprite = items.getComponent(cc.Sprite);
              sprite.spriteFrame = this.gameSpriteAtlas.getSpriteFrame("icon_" + listda[index].gameId + "_0");
              items["gameId"] = listda[index].gameId;
              items.on("click", this.btnClient, this);
              items.getComponent(cc.Button).interactable = listda[index].status < 2;
              itemindexs++;
            }
          }
        }
        this.indicator.active = true;
        this.indicator.getComponent("GameIndicator").addInd();
      };
      GameGameChoose.prototype.openSonGame = function(gameid) {
        var _this = this;
        if (0 == this.onUpdateGameId) {
          var gameData = null;
          for (var idx = 0; idx < this.gamelistdata.length; idx++) if (this.gamelistdata[idx].gameId == gameid) {
            gameData = this.gamelistdata[idx];
            break;
          }
          if (!gameData) {
            cc.error("gameData is null");
            cc.log(JSON.stringify(this.gamelistdata));
            return;
          }
          if (cc.sys.isNative && Utils_1.default.getInstance().checkVersion(gameData.gameVersion, gameData.localVersion) > 0) {
            this.onUpdateGameId = gameid;
            var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + gameid + "/";
            updateApp_1.updateApp.getInstance().updateSonApp(function(type, value) {
              switch (type) {
               case updateApp_1.UpdateCallBackType.UpdateCallBackType_CHECKED:
                break;

               case updateApp_1.UpdateCallBackType.UpdateCallBackType_ONUPDATE:
                cc.log("download " + value + "%");
                break;

               case updateApp_1.UpdateCallBackType.UpdateCallBackType_UPDATE_ERROR:
                break;

               case updateApp_1.UpdateCallBackType.UpdateCallBackType_UPDATE_END:
                for (var idx = 0; idx < _this.gamelistdata.length; idx++) if (_this.gamelistdata[idx].gameId == gameid) {
                  _this.gamelistdata[idx].localVersion = _this.gamelistdata[idx].gameVersion;
                  break;
                }
                _this.onUpdateGameId = 0;
                _this.openSonGame(gameid);
              }
            }, gameData.address, storagePath);
          } else NetWork_1.NetWork.getInstance().sendMsg({
            gameId: gameid
          }, NetWork_1.NetWork.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).GetRoomListRequest, NetWork_1.CmdType.C_S_GET_ROOM_LIST_REQUEST);
        }
      };
      GameGameChoose.prototype.btnClient = function(event) {
        var gameid = event.target.gameId;
        this.openSonGame(gameid);
        cc.log("GameGameChoose btnClient:" + gameid);
      };
      __decorate([ property(cc.Prefab) ], GameGameChoose.prototype, "gameItem", void 0);
      __decorate([ property(cc.SpriteAtlas) ], GameGameChoose.prototype, "gameSpriteAtlas", void 0);
      GameGameChoose = __decorate([ ccclass ], GameGameChoose);
      return GameGameChoose;
    }(cc.Component);
    exports.default = GameGameChoose;
    cc._RF.pop();
  }, {
    "../common/NetWork": "NetWork",
    "../common/Utils": "Utils",
    "../other/updateApp": "updateApp",
    "./../common/HeadDefine": "HeadDefine"
  } ],
  GameIndicator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "235a5M/vMBKqZs+rLEtG10X", "GameIndicator");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameIndicator = function(_super) {
      __extends(GameIndicator, _super);
      function GameIndicator() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.selectPage = null;
        _this.oldFrame = null;
        _this.cellsScale = 1;
        _this.spacingX = 0;
        return _this;
      }
      GameIndicator.prototype.onLoad = function() {
        var _this = this;
        this.addCom();
        this.updateFrame();
        this.node.parent.on("scroll-ended", function(event) {
          _this.updateFrame();
        });
      };
      GameIndicator.prototype.addCom = function() {
        var layouts = this.addComponent(cc.Layout);
        layouts.type = cc.Layout.Type.HORIZONTAL;
        layouts.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        layouts.spacingX = this.spacingX;
        this.node.scale = this.cellsScale;
      };
      GameIndicator.prototype.addInd = function() {
        this.node.removeAllChildren();
        var paView = this.node.parent.getComponent(cc.PageView);
        var indNum = paView.content.children.length;
        for (var index = 0; index < indNum; index++) if (paView.content.children[index].active) {
          var node = new cc.Node();
          var sprNode = node.addComponent(cc.Sprite);
          sprNode.spriteFrame = 0 != index ? this.oldFrame : this.selectPage;
          this.node.addChild(node);
        }
        this.updateFrame();
      };
      GameIndicator.prototype.updateFrame = function() {
        var paView = this.node.parent.getComponent(cc.PageView);
        var page = paView.getCurrentPageIndex();
        for (var index = 0; index < this.node.children.length; index++) {
          var childnode = this.node.children[index];
          index == page ? childnode.getComponent(cc.Sprite).spriteFrame = this.selectPage : paView.content.children[page].active && (childnode.getComponent(cc.Sprite).spriteFrame = this.oldFrame);
        }
      };
      __decorate([ property({
        type: cc.SpriteFrame
      }) ], GameIndicator.prototype, "selectPage", void 0);
      __decorate([ property({
        type: cc.SpriteFrame
      }) ], GameIndicator.prototype, "oldFrame", void 0);
      __decorate([ property({
        type: cc.Integer
      }) ], GameIndicator.prototype, "cellsScale", void 0);
      __decorate([ property({
        type: cc.Integer
      }) ], GameIndicator.prototype, "spacingX", void 0);
      GameIndicator = __decorate([ ccclass ], GameIndicator);
      return GameIndicator;
    }(cc.Component);
    exports.default = GameIndicator;
    cc._RF.pop();
  }, {} ],
  HeadDefine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98abad1xhZJc6iKz/m3651K", "HeadDefine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoginType;
    (function(LoginType) {
      LoginType[LoginType["LoginType_NONE"] = 0] = "LoginType_NONE";
      LoginType[LoginType["LoginType_VISITOR"] = 1] = "LoginType_VISITOR";
      LoginType[LoginType["LoginType_ACCOUNT"] = 2] = "LoginType_ACCOUNT";
      LoginType[LoginType["LoginType_MAX"] = 3] = "LoginType_MAX";
    })(LoginType = exports.LoginType || (exports.LoginType = {}));
    var ServerStatus;
    (function(ServerStatus) {
      ServerStatus[ServerStatus["ServerStatus_NONE"] = 0] = "ServerStatus_NONE";
      ServerStatus[ServerStatus["ServerStatus_CLOSE"] = 0] = "ServerStatus_CLOSE";
      ServerStatus[ServerStatus["ServerStatus_NORMAL"] = 1] = "ServerStatus_NORMAL";
      ServerStatus[ServerStatus["ServerStatus_MAINTAIN"] = 2] = "ServerStatus_MAINTAIN";
      ServerStatus[ServerStatus["ServerStatus_MAX"] = 3] = "ServerStatus_MAX";
    })(ServerStatus = exports.ServerStatus || (exports.ServerStatus = {}));
    var NetWorkState;
    (function(NetWorkState) {
      NetWorkState[NetWorkState["NetWorkState_NONE"] = 0] = "NetWorkState_NONE";
      NetWorkState[NetWorkState["NetWorkState_CONNECTING"] = 1] = "NetWorkState_CONNECTING";
      NetWorkState[NetWorkState["NetWorkState_CONNECTED"] = 2] = "NetWorkState_CONNECTED";
      NetWorkState[NetWorkState["NetWorkState_ERROR"] = 3] = "NetWorkState_ERROR";
      NetWorkState[NetWorkState["NetWorkState_CLOSE"] = 4] = "NetWorkState_CLOSE";
      NetWorkState[NetWorkState["NetWorkState_TIMEOUT"] = 5] = "NetWorkState_TIMEOUT";
      NetWorkState[NetWorkState["NetWorkState_MAX"] = 6] = "NetWorkState_MAX";
    })(NetWorkState = exports.NetWorkState || (exports.NetWorkState = {}));
    var clientDefine;
    (function(clientDefine) {
      clientDefine["clientDefine_open"] = "netWorkOpen";
      clientDefine["clientDefine_failed"] = "netWorkFailed";
      clientDefine["clientDefine_close"] = "netWorkClose";
      clientDefine[clientDefine["clientDefine_timeout"] = 5e3] = "clientDefine_timeout";
      clientDefine[clientDefine["clientDefine_headmsg_timeout"] = 3e3] = "clientDefine_headmsg_timeout";
      clientDefine[clientDefine["clientDefine_connect_timeout"] = 2e3] = "clientDefine_connect_timeout";
      clientDefine[clientDefine["clientDefine_connectGameServer_timeout"] = 100] = "clientDefine_connectGameServer_timeout";
    })(clientDefine = exports.clientDefine || (exports.clientDefine = {}));
    var protoType;
    (function(protoType) {
      protoType[protoType["protoType_NONE"] = 0] = "protoType_NONE";
      protoType["protoType_Command"] = "Command";
      protoType["protoType_BaseMessage"] = "BaseMessage";
      protoType["protoType_LoginGame"] = "LoginGame";
      protoType["protoType_LoginServer"] = "LoginServer";
      protoType["protoType_PublicData"] = "PublicData";
      protoType["protoType_GameSystem"] = "GameSystem";
      protoType["protoType_HallGame"] = "HallGame";
      protoType["protoType_MAX"] = "";
    })(protoType = exports.protoType || (exports.protoType = {}));
    exports.protoFileType = [ {
      url: "resources/mainUI/proto/Command.proto",
      package: "com.lyh.protocol",
      name: protoType.protoType_Command
    }, {
      url: "resources/mainUI/proto/BaseMessage.proto",
      package: "com.lyh.protocol",
      name: protoType.protoType_BaseMessage
    }, {
      url: "resources/mainUI/proto/LoginGame.proto",
      package: "com.lyh.protocol",
      name: protoType.protoType_LoginGame
    }, {
      url: "resources/mainUI/proto/LoginServer.proto",
      package: "com.lyh.protocol.login",
      name: protoType.protoType_LoginServer
    }, {
      url: "resources/mainUI/proto/PublicData.proto",
      package: "com.lyh.protocol",
      name: protoType.protoType_PublicData
    }, {
      url: "resources/mainUI/proto/GameSystem.proto",
      package: "com.lyh.protocol",
      name: protoType.protoType_GameSystem
    }, {
      url: "resources/mainUI/proto/HallGame.proto",
      package: "com.lyh.protocol",
      name: protoType.protoType_HallGame
    } ];
    var gameType;
    (function(gameType) {
      gameType[gameType["gameType_NONE"] = 0] = "gameType_NONE";
      gameType[gameType["gameType_FOREST_PROM"] = 8002] = "gameType_FOREST_PROM";
      gameType[gameType["gameType_HUNDRED_NIUNIU"] = 8003] = "gameType_HUNDRED_NIUNIU";
      gameType[gameType["gameType_GOLDEN"] = 8006] = "gameType_GOLDEN";
      gameType[gameType["gameType_RED_BLACK"] = 8007] = "gameType_RED_BLACK";
      gameType[gameType["gameType_ROB_BANK_NIUNIU"] = 8008] = "gameType_ROB_BANK_NIUNIU";
      gameType[gameType["gameType_DDZ"] = 8009] = "gameType_DDZ";
      gameType[gameType["gameType_BACCARAT"] = 8010] = "gameType_BACCARAT";
      gameType[gameType["gameType_TEXAS"] = 8011] = "gameType_TEXAS";
      gameType[gameType["gameType_CONTINUOUS_TREASURE"] = 8012] = "gameType_CONTINUOUS_TREASURE";
      gameType[gameType["gameType_SPIRIT_ESSENCE"] = 8013] = "gameType_SPIRIT_ESSENCE";
      gameType[gameType["gameType_TAKETURNS_NIUNIU"] = 8014] = "gameType_TAKETURNS_NIUNIU";
      gameType[gameType["gameType_FRUIT_MACHINE"] = 8015] = "gameType_FRUIT_MACHINE";
      gameType[gameType["gameType_ZHONGFABAI"] = 8016] = "gameType_ZHONGFABAI";
      gameType[gameType["gameType_KAIMENHONG"] = 8017] = "gameType_KAIMENHONG";
      gameType[gameType["gameType_MAX"] = 8018] = "gameType_MAX";
    })(gameType = exports.gameType || (exports.gameType = {}));
    var localStorageType;
    (function(localStorageType) {
      localStorageType[localStorageType["localStorageType_NONE"] = 0] = "localStorageType_NONE";
      localStorageType["localStorageType_LOGINTYPE"] = "loginType";
      localStorageType["localStorageType_WEBDEVICEID"] = "WEBDeviceID";
      localStorageType["localStorageType_ACCOUNT"] = "Account";
      localStorageType["localStorageType_PASSWORD"] = "PassWord";
      localStorageType["localStorageType_FIRST_DOWNLOAD_GAME"] = "";
      localStorageType["localStorageType_MAX"] = "";
    })(localStorageType = exports.localStorageType || (exports.localStorageType = {}));
    var DeviceType;
    (function(DeviceType) {
      DeviceType[DeviceType["DeviceType_NONE"] = 0] = "DeviceType_NONE";
      DeviceType[DeviceType["DeviceType_ANDROID"] = 1] = "DeviceType_ANDROID";
      DeviceType[DeviceType["DeviceType_IOS"] = 2] = "DeviceType_IOS";
      DeviceType[DeviceType["DeviceType_WEB"] = 3] = "DeviceType_WEB";
      DeviceType[DeviceType["DeviceType_MAX"] = 4] = "DeviceType_MAX";
    })(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
    var Sex;
    (function(Sex) {
      Sex[Sex["Sex_NONE"] = 0] = "Sex_NONE";
      Sex[Sex["Sex_MAN"] = 0] = "Sex_MAN";
      Sex[Sex["Sex_WOMAN"] = 1] = "Sex_WOMAN";
      Sex[Sex["Sex_MAX"] = 2] = "Sex_MAX";
    })(Sex = exports.Sex || (exports.Sex = {}));
    var HeadDefine = function() {
      function HeadDefine() {}
      HeadDefine = __decorate([ ccclass ], HeadDefine);
      return HeadDefine;
    }();
    exports.default = HeadDefine;
    cc._RF.pop();
  }, {} ],
  JSBUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a01aSTptVMX6mzI23FD7ia", "JSBUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var utilMd5 = require("utilMd5");
    var HeadDefine_1 = require("./HeadDefine");
    var JSBUtils = function() {
      function JSBUtils() {
        this.ANDROID_API = "";
        this.IOS_API = "";
      }
      JSBUtils_1 = JSBUtils;
      JSBUtils.getInstance = function() {
        if (!this.m_sInstance) {
          this.m_sInstance = new JSBUtils_1();
          this.m_sInstance.init();
        }
        return this.m_sInstance;
      };
      JSBUtils.prototype.init = function() {
        this.ANDROID_API = "com/gbdf/dfh/NativeAPI";
        this.IOS_API = "AppController";
      };
      JSBUtils.prototype.getStrByShearPlate = function() {
        if (cc.sys.isNative) try {
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            var str = jsb.reflection.callStaticMethod(this.ANDROID_API, "getJianQieBan", "()Ljava/lang/String;");
            return str;
          }
          if (cc.sys.os == cc.sys.OS_IOS) return jsb.reflection.callStaticMethod(this.IOS_API, "getJianQieBan");
        } catch (error) {
          console.log(error);
        } else if (cc.sys.isBrowser) return window.clipboardData && window.clipboardData.getData ? window.clipboardData.getData("Text") : "";
      };
      JSBUtils.prototype.addStrToShearPlate = function(chaining) {
        cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this.ANDROID_API, "clipboard", "(Ljava/lang/String;)V", chaining) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(this.IOS_API, "addToJianQieBan:", chaining);
      };
      JSBUtils.prototype.getCustomVersion = function() {
        if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(this.ANDROID_API, "getCustomVersion", "()I");
        if (cc.sys.os == cc.sys.OS_IOS) return jsb.reflection.callStaticMethod(this.IOS_API, "getCustomVersion");
        return 0;
      };
      JSBUtils.prototype.pay = function(identfer) {
        cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(this.IOS_API, "pay:", identfer);
      };
      JSBUtils.prototype.getDeviceId = function() {
        if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(this.ANDROID_API, "getUUID", "()Ljava/lang/String;");
        if (cc.sys.os == cc.sys.OS_IOS) return jsb.reflection.callStaticMethod(this.IOS_API, "getUUID");
        var devieceID = cc.sys.localStorage.getItem(HeadDefine_1.localStorageType.localStorageType_WEBDEVICEID);
        if (!devieceID || devieceID.length <= 0) {
          cc.log(new Date().getTime());
          var timestr = new Date().getTime().toString();
          devieceID = utilMd5.hexMD5(timestr).toUpperCase();
          cc.sys.localStorage.setItem(HeadDefine_1.localStorageType.localStorageType_WEBDEVICEID, devieceID);
        }
        return devieceID;
      };
      JSBUtils.prototype.getDeviceName = function() {
        return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this.ANDROID_API, "getPhoneName", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod(this.IOS_API, "getPhoneName") : "web";
      };
      JSBUtils.m_sInstance = null;
      JSBUtils = JSBUtils_1 = __decorate([ ccclass ], JSBUtils);
      return JSBUtils;
      var JSBUtils_1;
    }();
    exports.default = JSBUtils;
    cc._RF.pop();
  }, {
    "./HeadDefine": "HeadDefine",
    utilMd5: "utilMd5"
  } ],
  Language: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99466tlCfFO1Kmhju20ALCT", "Language");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LanguageUtils = function() {
      function LanguageUtils() {}
      LanguageUtils_1 = LanguageUtils;
      LanguageUtils.getInstance = function() {
        this.instance || (this.instance = new LanguageUtils_1());
        return this.instance;
      };
      LanguageUtils.prototype.format = function(templateStr, param) {
        var str = templateStr;
        var count = 0;
        while (count < param.length) {
          var idx = str.indexOf("&");
          if (-1 == idx) break;
          str = str.substr(0, idx) + param[count] + str.substr(idx + 1, str.length - idx - 1);
          count++;
        }
        return str;
      };
      LanguageUtils.instance = null;
      LanguageUtils = LanguageUtils_1 = __decorate([ ccclass ], LanguageUtils);
      return LanguageUtils;
      var LanguageUtils_1;
    }();
    exports.LanguageUtils = LanguageUtils;
    exports.Language = {
      load_gameLoad: "游戏加载中...",
      load_gameupdate: "游戏更新中",
      load_gameLoadManifest: "请求版本信息",
      load_gameupdateError: "游戏更新失败",
      load_networkconnectting: "正在连接服务器...",
      load_download_game: "资源解压中...",
      NetWork_serverNull: "暂无服务器可用",
      NetWork_tokenError: "Token验证失败",
      NetWork_connectError: "连接失败，请检查网络设置"
    };
    cc._RF.pop();
  }, {} ],
  LoginScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb634ttQPlNWIVjC1V9V6nO", "LoginScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NetWork_1 = require("./../common/NetWork");
    var HeadDefine_1 = require("./../common/HeadDefine");
    var LoginScene = function(_super) {
      __extends(LoginScene, _super);
      function LoginScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.accountLoginButton = null;
        _this.visitorLoginButton = null;
        return _this;
      }
      LoginScene.prototype.onDestroy = function() {
        cc.systemEvent.off(HeadDefine_1.clientDefine.clientDefine_open);
        cc.game.off(cc.game.EVENT_SHOW, this.applocationEnterForeground, this);
      };
      LoginScene.prototype.onLoad = function() {
        cc.game.on(cc.game.EVENT_SHOW, this.applocationEnterForeground, this);
      };
      LoginScene.prototype.start = function() {
        this.connectAndLogin();
      };
      LoginScene.prototype.connectAndLogin = function() {
        var _this = this;
        this.accountLoginButton.node.active = false;
        this.visitorLoginButton.node.active = false;
        cc.systemEvent.off(HeadDefine_1.clientDefine.clientDefine_open);
        cc.systemEvent.on(HeadDefine_1.clientDefine.clientDefine_open, function() {
          var lastLoginType = Number(cc.sys.localStorage.getItem(HeadDefine_1.localStorageType.localStorageType_LOGINTYPE));
          if (lastLoginType < HeadDefine_1.LoginType.LoginType_VISITOR || lastLoginType > HeadDefine_1.LoginType.LoginType_ACCOUNT) {
            _this.accountLoginButton.node.active = true;
            _this.visitorLoginButton.node.active = true;
          } else cc.log("auto login.");
        });
        NetWork_1.NetWork.getInstance().connect(NetWork_1.socketIP, false);
      };
      LoginScene.prototype.applocationEnterForeground = function() {
        this.connectAndLogin();
      };
      LoginScene.prototype.TouchButtonCallBack = function(event, coustEventData) {
        var button = event.target.getComponent(cc.Button);
        if (this.accountLoginButton == button) {
          var account = "";
          var password = "";
          if (account && account.length && password && password.length) {
            cc.sys.localStorage.setItem(HeadDefine_1.localStorageType.localStorageType_ACCOUNT, account);
            cc.sys.localStorage.setItem(HeadDefine_1.localStorageType.localStorageType_PASSWORD, password);
            NetWork_1.NetWork.getInstance().login(account, password);
            cc.sys.localStorage.setItem(HeadDefine_1.localStorageType.localStorageType_LOGINTYPE, HeadDefine_1.LoginType.LoginType_ACCOUNT);
          }
        } else if (this.visitorLoginButton == button) {
          NetWork_1.NetWork.getInstance().checkVisitor();
          cc.sys.localStorage.setItem(HeadDefine_1.localStorageType.localStorageType_LOGINTYPE, HeadDefine_1.LoginType.LoginType_VISITOR);
        }
      };
      __decorate([ property({
        type: cc.Button
      }) ], LoginScene.prototype, "accountLoginButton", void 0);
      __decorate([ property({
        type: cc.Button
      }) ], LoginScene.prototype, "visitorLoginButton", void 0);
      LoginScene = __decorate([ ccclass ], LoginScene);
      return LoginScene;
    }(cc.Component);
    exports.default = LoginScene;
    cc._RF.pop();
  }, {
    "./../common/HeadDefine": "HeadDefine",
    "./../common/NetWork": "NetWork"
  } ],
  MainUIScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "de5d7/mZ2pD74Zm2jKd+0Ka", "MainUIScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NetWork_1 = require("./../common/NetWork");
    var HeadDefine_1 = require("./../common/HeadDefine");
    var PlayerData_1 = require("../common/PlayerData");
    var AudioManager_1 = require("../common/AudioManager");
    var MainUIScene = function(_super) {
      __extends(MainUIScene, _super);
      function MainUIScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.m_pRoomListLayer = null;
        return _this;
      }
      MainUIScene.prototype.TouchButtonCallBack = function(event, coustEvent) {};
      MainUIScene.prototype.openRoomListLayer = function(serverID, roomList) {
        var _this = this;
        if (1 == roomList.length) {
          var message = {
            serverId: serverID,
            roomId: roomList[0].roomId
          };
          NetWork_1.NetWork.getInstance().sendMsg(message, NetWork_1.NetWork.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).RegisterTableRequest, NetWork_1.CmdType.C_S_REGISTER_TABLE_REQUEST);
        } else if (this.m_pRoomListLayer) {
          this.m_pRoomListLayer.active = true;
          this.m_pRoomListLayer.getComponent("ChooseRoom").ReceivedMessageManage(serverID, roomList);
        } else cc.loader.loadRes("mainUI/prafeb/chooseroom", function(err, prefab) {
          if (err) {
            cc.error("load chooseroom error. " + err);
            return;
          }
          _this.m_pRoomListLayer = cc.instantiate(prefab);
          _this.m_pRoomListLayer.parent = _this.node;
          _this.m_pRoomListLayer.setLocalZOrder(2e4);
          _this.m_pRoomListLayer.getComponent("ChooseRoom").ReceivedMessageManage(serverID, roomList);
        });
      };
      MainUIScene.prototype.onMsg = function(message) {
        switch (message.command) {
         case NetWork_1.CmdType.S_C_HALL_GAME_LIST_RESPONSE:
          var message1 = NetWork_1.NetWork.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).HallGameListResponse.decode(message.body);
          cc.log(message1);
          this.node.getChildByName("gameList").getComponent("GameGameChoose").ReceivedMessageManage(message1.gameList);
          return true;

         case NetWork_1.CmdType.S_C_GET_ROOM_LIST_RESPONSE:
          var message1 = NetWork_1.NetWork.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).GetRoomListResponse.decode(message.body);
          cc.log(message1);
          this.openRoomListLayer(message1.serverId, message1.roomList);
          return true;

         case NetWork_1.CmdType.S_C_PLAYER_DATA_RESPONSE:
          this.updateUserIndo();
          this.requestGameList();
        }
        return false;
      };
      MainUIScene.prototype.onDestroy = function() {
        NetWork_1.NetWork.getInstance().removeDelegate(this);
      };
      MainUIScene.prototype.onLoad = function() {
        NetWork_1.NetWork.getInstance().addDelegate(this);
        this.node.getChildByName("gameList").setLocalZOrder(19998);
        this.node.getChildByName("navigation").setLocalZOrder(20001);
        this.node.getChildByName("nav_bg").setLocalZOrder(19999);
        this.node.getChildByName("bt_other").setLocalZOrder(19999);
        this.updateUserIndo();
      };
      MainUIScene.prototype.requestGameList = function() {
        NetWork_1.NetWork.getInstance().sendMsg({}, NetWork_1.NetWork.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).HallGameListRequest, NetWork_1.CmdType.C_S_HALL_GAME_LIST_REQUEST);
      };
      MainUIScene.prototype.start = function() {
        AudioManager_1.default.getInstance().playBGM("resources/mainUI/audio/hall_bg.mp3");
        this.requestGameList();
      };
      MainUIScene.prototype.updateUserIndo = function() {
        this.node.getChildByName("navigation").getChildByName("headLayout").getChildByName("name").getComponent(cc.Label).string = PlayerData_1.default.getInstance().getName();
        this.node.getChildByName("navigation").getChildByName("img_gold_bg").getChildByName("num_bb").getComponent(cc.Label).string = PlayerData_1.default.getInstance().getMoney().toString();
      };
      MainUIScene = __decorate([ ccclass ], MainUIScene);
      return MainUIScene;
    }(cc.Component);
    exports.default = MainUIScene;
    cc._RF.pop();
  }, {
    "../common/AudioManager": "AudioManager",
    "../common/PlayerData": "PlayerData",
    "./../common/HeadDefine": "HeadDefine",
    "./../common/NetWork": "NetWork"
  } ],
  MessageBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "57d86L1krVIUpPsRp7fHhUv", "MessageBox");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.onLoad = function() {};
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  NetWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d32a9sqOkFOF6benDn+fk9O", "NetWork");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeadDefine_1 = require("./HeadDefine");
    var protobuf = require("protobuf");
    var JSBUtils_1 = require("./../common/JSBUtils");
    var Utils_1 = require("./../common/Utils");
    var PlayerData_1 = require("./../common/PlayerData");
    var Language_1 = require("./Language");
    exports.CmdType = {};
    exports.protoArray = [];
    var URL;
    (function(URL) {
      URL["LI_PENG_CHENG"] = "192.168.0.88";
      URL["LIU_YU_HUA"] = "192.168.0.153";
      URL["CHUAN_HAO"] = "192.168.0.168";
      URL["ZHOU_ZHONG_QIN"] = "192.168.0.134";
      URL["CHE_SHI"] = "192.168.0.55";
    })(URL || (URL = {}));
    exports.ip = URL.CHE_SHI;
    exports.updateURL = "http://192.168.0.55:81/GameVersion/game_version.php";
    exports.socketIP = "ws://" + exports.ip + ":4002/";
    var URLType;
    (function(URLType) {
      URLType[URLType["URLType_NONE"] = 0] = "URLType_NONE";
      URLType[URLType["URLType_GATEWAY"] = 1] = "URLType_GATEWAY";
      URLType[URLType["URLType_GAME"] = 2] = "URLType_GAME";
      URLType[URLType["URLType_MAX"] = 3] = "URLType_MAX";
    })(URLType || (URLType = {}));
    var NetWork = function() {
      function NetWork() {
        this.m_cDstIP = "";
        this.m_pSocket = null;
        this.m_eNetWorkState = HeadDefine_1.NetWorkState.NetWorkState_NONE;
        this.m_vDelegates = [];
        this.m_bReciveHeadMsg = false;
        this.m_nHeartbeatNum = -1;
        this.m_nConnectNum = -1;
        this.m_bIsSendHeard = true;
        this.m_vMessageCallBack = [];
        this.m_eConnectUrlType = URLType.URLType_NONE;
        this.m_nConnectCount = 0;
        this.m_bIsHoldClose = false;
      }
      NetWork_1 = NetWork;
      NetWork.prototype.applocationEnterForeground = function() {
        this.connect(exports.socketIP, false, URLType.URLType_GATEWAY);
      };
      NetWork.prototype.applocationEnterBackground = function() {
        this.closeNetWork();
      };
      NetWork.getInstance = function() {
        if (!this.m_sInstance) {
          this.m_sInstance = new NetWork_1();
          this.m_sInstance.init();
        }
        return this.m_sInstance;
      };
      NetWork.prototype.init = function() {
        for (var idx = 0; idx < HeadDefine_1.protoFileType.length; idx++) this.loadProtoFile(HeadDefine_1.protoFileType[idx].url, HeadDefine_1.protoFileType[idx].package, HeadDefine_1.protoFileType[idx].name);
        exports.CmdType = this.getProtoFile(HeadDefine_1.protoType.protoType_Command).CmdType;
        this.m_eNetWorkState = HeadDefine_1.NetWorkState.NetWorkState_NONE;
        this.m_bReciveHeadMsg = false;
        this.m_nHeartbeatNum = -1;
        this.m_nConnectNum = -1;
        cc.game.on(cc.game.EVENT_SHOW, this.applocationEnterForeground, this);
        cc.game.on(cc.game.EVENT_HIDE, this.applocationEnterBackground, this);
      };
      NetWork.prototype.getConnectCount = function() {
        return this.m_nConnectCount;
      };
      NetWork.prototype.getNetWorkState = function() {
        return this.m_eNetWorkState;
      };
      NetWork.prototype.isConnect = function() {
        return this.getNetWorkState() == HeadDefine_1.NetWorkState.NetWorkState_CONNECTED;
      };
      NetWork.prototype.addDelegate = function(delegate) {
        this.m_vDelegates.push(delegate);
      };
      NetWork.prototype.removeDelegate = function(delegate) {
        for (var idx = 0; idx < this.m_vDelegates.length; idx++) if (this.m_vDelegates[idx] == delegate) {
          this.m_vDelegates.splice(idx, 1);
          break;
        }
      };
      NetWork.prototype.requestPlayerData = function(userId, token) {
        var _this = this;
        var playerData = {
          token: token,
          userId: userId
        };
        this.sendMsg(playerData, this.getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).CheckPlayerRequest, exports.CmdType.C_S_CHECK_PLAYER_REQUEST, exports.CmdType.S_C_CHECK_PLAYER_RESPONSE, function(message) {
          var message1 = _this.getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).CheckPlayerResponse.decode(message.body);
          cc.log(message1);
          1 == message1.errorCode ? _this.sendMsg({
            userId: PlayerData_1.default.getInstance().getUserId()
          }, _this.getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).PlayerDataRequest, exports.CmdType.C_S_PLAYER_DATA_REQUEST) : Utils_1.default.getInstance().setTis(Language_1.Language.NetWork_tokenError);
        });
      };
      NetWork.prototype.connectToGameServer = function(url) {
        var _this = this;
        setTimeout(function() {
          _this.isConnect() ? _this.connectToGameServer(url) : _this.connect(url, true, URLType.URLType_GAME);
        }, HeadDefine_1.clientDefine.clientDefine_connectGameServer_timeout);
      };
      NetWork.prototype.onOpenID = function(openId) {
        var _this = this;
        this.sendMsg({
          openId: openId
        }, this.getProtoFile(HeadDefine_1.protoType.protoType_LoginServer).GetLogicIpRequest, exports.CmdType.C_L_GET_LOGIC_IP_REQUEST, exports.CmdType.L_C_GET_LOGIC_IP_RESPONSE, function(message) {
          var message1 = _this.getProtoFile(HeadDefine_1.protoType.protoType_LoginServer).GetLogicIpResponse.decode(message.body);
          cc.log(message1);
          PlayerData_1.default.getInstance().setUserIdAndToken(message1.userId, message1.token);
          _this.closeNetWork();
          var url = Utils_1.default.getInstance().getServerListPath(message1.sList);
          url.length > 0 ? _this.connectToGameServer(url) : Utils_1.default.getInstance().setTis(Language_1.Language.NetWork_serverNull);
        });
      };
      NetWork.prototype.checkVisitor = function() {
        var _this = this;
        cc.log("checkVisitor");
        var deviceid = JSBUtils_1.default.getInstance().getDeviceId();
        var devicetype = Utils_1.default.getInstance().getDevicePlatform();
        var channelID = "0";
        var devicename = JSBUtils_1.default.getInstance().getDeviceName();
        var ips = PlayerData_1.default.getInstance().getLocalIP();
        var cvids = Utils_1.default.getInstance().getSSID(JSBUtils_1.default.getInstance().getStrByShearPlate());
        var data = {
          deviceId: deviceid,
          channelId: channelID,
          deviceType: devicetype.toString(),
          deviceName: devicename,
          realIP: ips,
          cvId: cvids
        };
        this.sendMsg(data, this.getProtoFile(HeadDefine_1.protoType.protoType_LoginServer).CommonLoginRequest, exports.CmdType.C_L_COMMON_LOGIN_REQUEST, exports.CmdType.L_C_COMMON_LOGIN_RESPONSE, function(message) {
          var message1 = _this.getProtoFile(HeadDefine_1.protoType.protoType_LoginServer).CommonLoginResponse.decode(message.body);
          cc.log(message1);
          _this.onOpenID(message1.openId);
        });
      };
      NetWork.prototype.login = function(account, password) {
        var _this = this;
        var data = {
          mobile: account,
          password: password,
          realIP: PlayerData_1.default.getInstance().getLocalIP()
        };
        this.sendMsg(data, this.getProtoFile(HeadDefine_1.protoType.protoType_LoginServer).MobileLoginRequest, exports.CmdType.C_L_MOBILE_LOGIN_REQUEST, exports.CmdType.L_S_MOBILE_LOGIN_RESPONSE, function(message) {
          var message1 = _this.getProtoFile(HeadDefine_1.protoType.protoType_LoginServer).MobileLoginResponse.decode(message.body);
          cc.log(message1);
          _this.onOpenID(message1.openId);
        });
      };
      NetWork.prototype.breakLineReconnection = function() {
        var lastLoginType = Number(cc.sys.localStorage.getItem(HeadDefine_1.localStorageType.localStorageType_LOGINTYPE));
        if (lastLoginType == HeadDefine_1.LoginType.LoginType_VISITOR) this.checkVisitor(); else if (lastLoginType == HeadDefine_1.LoginType.LoginType_ACCOUNT) {
          var account = cc.sys.localStorage(HeadDefine_1.localStorageType.localStorageType_ACCOUNT);
          var password = cc.sys.localStorage(HeadDefine_1.localStorageType.localStorageType_PASSWORD);
          account && account.length && password && password.length && this.login(account, password);
        }
      };
      NetWork.prototype.closeNetWork = function() {
        cc.log("手动关闭");
        this.m_cDstIP = "";
        var state = this.getNetWorkState();
        if (state == HeadDefine_1.NetWorkState.NetWorkState_CONNECTED || state == HeadDefine_1.NetWorkState.NetWorkState_CONNECTING) {
          this.m_bIsHoldClose = true;
          this.m_pSocket && this.m_pSocket.close();
        }
      };
      NetWork.prototype.timeOutConnect = function() {
        var _this = this;
        this.m_pSocket && this.closeNetWork();
        if (!this.m_bIsHoldClose) {
          -1 != this.m_nConnectNum && clearTimeout(this.m_nConnectNum);
          this.m_nConnectNum = setTimeout(function() {
            _this.connect(exports.socketIP, false) || console.log("cancel doConnect.");
          }, HeadDefine_1.clientDefine.clientDefine_connect_timeout);
          this.m_nConnectCount && this.m_nConnectCount % 3 == 0 && Utils_1.default.getInstance().setTis(Language_1.Language.NetWork_connectError);
        }
      };
      NetWork.prototype.connect = function(dstIP, isSendHeard, urlType) {
        void 0 === urlType && (urlType = URLType.URLType_GATEWAY);
        this.m_eConnectUrlType = urlType;
        this.m_cDstIP = dstIP;
        this.m_bIsSendHeard = isSendHeard;
        this.doConnect();
      };
      NetWork.prototype.doConnect = function() {
        if (this.getNetWorkState() == HeadDefine_1.NetWorkState.NetWorkState_CONNECTED || this.getNetWorkState() == HeadDefine_1.NetWorkState.NetWorkState_CONNECTING) {
          cc.error("already connect to server. state = " + this.getNetWorkState());
          return false;
        }
        if (!(this.m_cDstIP && this.m_cDstIP.length > 0)) {
          cc.error("dstIP is null.");
          return false;
        }
        this.m_bIsHoldClose = false;
        cc.log("connect to server. dstIP = " + this.m_cDstIP);
        this.m_nConnectCount++;
        this.m_eNetWorkState = HeadDefine_1.NetWorkState.NetWorkState_CONNECTING;
        this.m_pSocket = new WebSocket(this.m_cDstIP);
        this.m_pSocket.binaryType = "arraybuffer";
        this.m_pSocket.onopen = this.onOpen.bind(this);
        this.m_pSocket.onclose = this.onClose.bind(this);
        this.m_pSocket.onerror = this.onError.bind(this);
        this.m_pSocket.onmessage = this.onMessage.bind(this);
        return true;
      };
      NetWork.prototype.onOpen = function(ev) {
        cc.log(" open ");
        this.m_nConnectCount = 0;
        this.m_eNetWorkState = HeadDefine_1.NetWorkState.NetWorkState_CONNECTED;
        var pEvent = new cc.Event.EventCustom(HeadDefine_1.clientDefine.clientDefine_open, true);
        cc.systemEvent.dispatchEvent(pEvent);
        if (this.m_eConnectUrlType == URLType.URLType_GATEWAY) this.breakLineReconnection(); else if (this.m_eConnectUrlType == URLType.URLType_GAME) {
          var userId = PlayerData_1.default.getInstance().getUserId();
          var token = PlayerData_1.default.getInstance().getToken();
          this.requestPlayerData(userId, token);
        }
        this.m_bIsSendHeard && this.doSendHeadBet();
      };
      NetWork.prototype.onClose = function(ev) {
        cc.log(" close ");
        this.m_eNetWorkState = HeadDefine_1.NetWorkState.NetWorkState_CLOSE;
        var pEvent = new cc.Event.EventCustom(HeadDefine_1.clientDefine.clientDefine_close, true);
        cc.systemEvent.dispatchEvent(pEvent);
        this.timeOutConnect();
      };
      NetWork.prototype.onError = function(ev) {
        cc.log(" error ");
        this.m_eNetWorkState = HeadDefine_1.NetWorkState.NetWorkState_ERROR;
        var pEvent = new cc.Event.EventCustom(HeadDefine_1.clientDefine.clientDefine_failed, true);
        cc.systemEvent.dispatchEvent(pEvent);
      };
      NetWork.prototype.onMessage = function(ev) {
        var byteLength = ev.data.byteLength;
        var dataView = new DataView(ev.data);
        var count = dataView.getUint32(0);
        if (count + 4 == byteLength) {
          var buffer = new ArrayBuffer(count);
          var dataView1 = new DataView(buffer);
          var idx = 0;
          do {
            dataView1.setUint8(idx, dataView.getUint8(idx + 4));
          } while (++idx < count);
          var message = this.getProtoFile(HeadDefine_1.protoType.protoType_BaseMessage).NetMessage.decode(buffer);
          if (message.command == exports.CmdType.HEART_RESPONSE) {
            this.m_bReciveHeadMsg = true;
            return;
          }
          if (message.command == exports.CmdType.S_C_PLAYER_DATA_RESPONSE) {
            var message1 = this.getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).PlayerDataResponse.decode(message.body);
            cc.log(JSON.stringify(message1));
            PlayerData_1.default.getInstance().setPlayerData(message1.playerDataProto);
            if (message1.serverId > 0 && message1.roomId.length > 0) {
              var msg = {
                serverId: message1.serverId,
                roomId: message1.roomId
              };
              NetWork_1.getInstance().sendMsg(msg, NetWork_1.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).RegisterTableRequest, exports.CmdType.C_S_REGISTER_TABLE_REQUEST);
            } else Utils_1.default.getInstance().jumpToMainUI();
          } else {
            if (message.command == exports.CmdType.ERROR_CODE) {
              var message1 = this.getProtoFile(HeadDefine_1.protoType.protoType_LoginServer).ErrorCode.decode(message.body);
              cc.log(JSON.stringify(message1));
              Utils_1.default.getInstance().setTis(message1.errorStr);
              return;
            }
            if (message.command == exports.CmdType.S_C_REGISTER_TABLE_RESPONSE) {
              var message1 = NetWork_1.getInstance().getProtoFile(HeadDefine_1.protoType.protoType_LoginGame).RegisterTableResponse.decode(message.body);
              cc.log(JSON.stringify(message1));
              PlayerData_1.default.getInstance().setRoomID(message1.roomId);
              var roomType = Utils_1.default.getInstance().getGameIdByRoomId(message1.roomId);
              Utils_1.default.getInstance().jumpToGame(roomType);
            }
          }
          cc.log(" onMsg : " + message.command);
          if (this.m_vMessageCallBack[message.command]) this.m_vMessageCallBack[message.command](message); else for (var idx_1 = 0; idx_1 < this.m_vDelegates.length; idx_1++) if (this.m_vDelegates[idx_1] && "function" === typeof this.m_vDelegates[idx_1].onMsg && this.m_vDelegates[idx_1].onMsg(message)) break;
        } else cc.error("recive msg. length is error.");
      };
      NetWork.prototype.sendMsg = function(msgBody, msgTemplate, command, responseCommand, callBack) {
        void 0 === responseCommand && (responseCommand = null);
        void 0 === callBack && (callBack = null);
        if (this.isConnect()) {
          var m = "";
          if (msgTemplate) {
            cc.log("send [ " + command + " ] msg. " + JSON.stringify(msgBody));
            var msgObj = new msgTemplate(msgBody);
            m = msgObj.encode().toArrayBuffer();
          }
          var BaseMessage = this.getProtoFile(HeadDefine_1.protoType.protoType_BaseMessage);
          var msgObj1 = new BaseMessage.NetMessage({
            command: command,
            body: m
          });
          var msg = msgObj1.encode().toArrayBuffer();
          var buffer = new ArrayBuffer(msg.byteLength + 4);
          var dataView = new DataView(buffer);
          dataView.setUint32(0, msg.byteLength);
          var idx = 0;
          var buffer1 = new Uint8Array(msg);
          do {
            dataView.setUint8(idx + 4, buffer1[idx]);
          } while (++idx < msg.byteLength);
          this.m_pSocket.send(buffer);
          callBack && (this.m_vMessageCallBack[responseCommand] = callBack);
          return true;
        }
        cc.log("send msg error. state = " + this.getNetWorkState());
        return false;
      };
      NetWork.prototype.doSendHeadBet = function() {
        var _this = this;
        if (!this.isConnect()) {
          cc.error("doSendHeadBet error. netWork state = " + this.getNetWorkState());
          this.closeNetWork();
          return;
        }
        this.m_bReciveHeadMsg = false;
        this.sendMsg({}, null, exports.CmdType.HEART_REQUEST);
        cc.log("send head msg.");
        -1 != this.m_nHeartbeatNum && clearTimeout(this.m_nHeartbeatNum);
        this.m_nHeartbeatNum = setTimeout(function() {
          _this.m_bReciveHeadMsg ? _this.doSendHeadBet() : _this.timeOutConnect();
        }, HeadDefine_1.clientDefine.clientDefine_headmsg_timeout);
      };
      NetWork.prototype.getProtoFile = function(type) {
        return exports.protoArray[type];
      };
      NetWork.prototype.loadProtoFile = function(fileUrl, packageStr, name) {
        if (exports.protoArray[name]) cc.log(name + ".proto is exit."); else {
          var proto = protobuf.loadProtoFile(cc.url.raw(fileUrl));
          var protoData = proto.build(packageStr);
          exports.protoArray[name] = protoData;
        }
      };
      NetWork.m_sInstance = null;
      NetWork = NetWork_1 = __decorate([ ccclass ], NetWork);
      return NetWork;
      var NetWork_1;
    }();
    exports.NetWork = NetWork;
    cc._RF.pop();
  }, {
    "./../common/JSBUtils": "JSBUtils",
    "./../common/PlayerData": "PlayerData",
    "./../common/Utils": "Utils",
    "./HeadDefine": "HeadDefine",
    "./Language": "Language",
    protobuf: "protobuf"
  } ],
  PlayerData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c5c6VTljFKhIzdbp0oHbRp", "PlayerData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlayerData = function() {
      function PlayerData() {
        this.m_pPlayerData = {};
        this.m_ip = "";
        this.m_nRoomID = 0;
      }
      PlayerData_1 = PlayerData;
      PlayerData.getInstance = function() {
        this.m_sInstance || (this.m_sInstance = new PlayerData_1());
        return this.m_sInstance;
      };
      PlayerData.prototype.setPlayerData = function(playerData) {
        this.m_pPlayerData.userId = playerData.playerId;
        this.m_pPlayerData.money = playerData.money;
        this.m_pPlayerData.headIndex = playerData.headIndex;
        this.m_pPlayerData.name = playerData.name;
        this.m_pPlayerData.url = playerData.url;
        this.m_pPlayerData.sex = playerData.sex;
      };
      PlayerData.prototype.getPlayerData = function() {
        return this.m_pPlayerData;
      };
      PlayerData.prototype.setUserId = function(v) {
        this.m_pPlayerData.userId = v;
      };
      PlayerData.prototype.setMoney = function(v) {
        this.m_pPlayerData.money = v;
      };
      PlayerData.prototype.setName = function(v) {
        this.m_pPlayerData.name = v;
      };
      PlayerData.prototype.setUrl = function(v) {
        this.m_pPlayerData.url = v;
      };
      PlayerData.prototype.setSex = function(v) {
        this.m_pPlayerData.sex = v;
      };
      PlayerData.prototype.setHeadIndex = function(v) {
        this.m_pPlayerData.headIndex = v;
      };
      PlayerData.prototype.getUserId = function() {
        return this.m_pPlayerData.userId;
      };
      PlayerData.prototype.getToken = function() {
        return this.m_pPlayerData.Token;
      };
      PlayerData.prototype.getMoney = function() {
        return this.m_pPlayerData.money;
      };
      PlayerData.prototype.getName = function() {
        return this.m_pPlayerData.name;
      };
      PlayerData.prototype.getHeadIndex = function() {
        return this.m_pPlayerData.headIndex;
      };
      PlayerData.prototype.getUrl = function() {
        return this.m_pPlayerData.url;
      };
      PlayerData.prototype.getSex = function() {
        return this.m_pPlayerData.sex;
      };
      PlayerData.prototype.setUserIdAndToken = function(userid, token) {
        this.m_pPlayerData.userId = userid;
        this.m_pPlayerData.Token = token;
      };
      PlayerData.prototype.setRoomID = function(roomID) {
        this.m_nRoomID = roomID;
      };
      PlayerData.prototype.getRoomID = function() {
        return this.m_nRoomID;
      };
      PlayerData.prototype.logout = function() {};
      PlayerData.prototype.getLocalIP = function() {
        return this.m_ip;
      };
      PlayerData.prototype.setLocalIP = function(ip) {
        this.m_ip = ip;
      };
      PlayerData.prototype.setCoin = function(coin) {
        this.m_pPlayerData.money = coin;
      };
      PlayerData.prototype.getHeadPngName = function(headIdx, sex) {
        return "head_" + sex + "_" + headIdx;
      };
      PlayerData.m_sInstance = null;
      PlayerData = PlayerData_1 = __decorate([ ccclass ], PlayerData);
      return PlayerData;
      var PlayerData_1;
    }();
    exports.default = PlayerData;
    cc._RF.pop();
  }, {} ],
  PromptDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "acc6cKtv65Fz7Q9lZ5prebA", "PromptDialog");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.onLoad = function() {};
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  Slideshow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac1fbpcQnFPVYifuJldUXEi", "Slideshow");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Slideshow = function(_super) {
      __extends(Slideshow, _super);
      function Slideshow() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.messages = [];
        _this.isCrouselSuccess = true;
        _this.widths = 0;
        return _this;
      }
      Slideshow.prototype.start = function() {};
      Slideshow.prototype.onLoad = function() {};
      Slideshow.prototype.init = function() {
        this.messages = [];
        this.isCrouselSuccess = true;
        this.widths = 0;
      };
      Slideshow.prototype.show = function() {
        this.node.active = true;
      };
      Slideshow.prototype.hide = function() {
        this.node.active = false;
      };
      Slideshow.prototype.setData = function(d, width) {
        void 0 === d && (d = null);
        if (d && d.length < 1) return;
        this.messages && this.init();
        this.widths = this.node.getContentSize().width;
        for (var index = 0; index < d.length; index++) this.messages.push[d[index]];
        this.show();
        this.isCrouselSuccess;
      };
      Slideshow.prototype.createLabel = function() {
        var _this = this;
        this.isCrouselSuccess = false;
        var texts = this.messages.shift();
        var labels = cc.instantiate(this.node.getChildByName("mask").getChildByName("serviceinfor"));
        labels.active = true;
        labels.getComponent(cc.RichText).string = texts;
        this.node.getChildByName("mask").addChild(labels);
        var showLen = .5 * this.widths + labels.width;
        var time = showLen / 100;
        var moveto = cc.moveTo(time, cc.p(-showLen, 0));
        var callback = cc.callFunc(function() {
          labels.destroy();
          if (_this.messages.length < 1) {
            _this.hide();
            _this.isCrouselSuccess = true;
          } else _this.createLabel();
        });
        labels.runAction(cc.sequence(moveto, cc.delayTime(.01), callback));
      };
      Slideshow = __decorate([ ccclass ], Slideshow);
      return Slideshow;
    }(cc.Component);
    exports.default = Slideshow;
    cc._RF.pop();
  }, {} ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "877265viL9J4bSAVOc1A7yH", "Utils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeadDefine_1 = require("./HeadDefine");
    var Utils = function() {
      function Utils() {
        this.promptDialogNode = null;
      }
      Utils_1 = Utils;
      Utils.getInstance = function() {
        this.instance || (this.instance = new Utils_1());
        return this.instance;
      };
      Utils.prototype.getGameIdByRoomId = function(roomId) {
        if (roomId > 999) return Number(roomId.toString().substring(0, 4));
        return 0;
      };
      Utils.prototype.jumpToMainUI = function() {
        "mainUIScene" != cc.director.getScene().name ? cc.sys.isBrowser || "loginScene" == cc.director.getScene().name ? cc.director.loadScene("mainUIScene") : require(cc["INGAME"] + "/src/dating.js") : cc.log("已经在大厅场景");
      };
      Utils.prototype.jumpToGame = function(gameID) {
        if (gameID > HeadDefine_1.gameType.gameType_NONE && gameID < HeadDefine_1.gameType.gameType_MAX) if (cc.director.getScene().name != "Game" + gameID) if (cc.sys.isNative) {
          var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + gameID;
          require(storagePath + "/src/main.js");
        } else cc.director.loadScene("Game" + gameID); else cc.log("已经在该游戏场景"); else this.jumpToMainUI();
      };
      Utils.prototype.setTis = function(str) {
        var _this = this;
        if (Number(str) < 0) return;
        if (!str) return;
        if (this.promptDialogNode) {
          this.promptDialogNode.removeFromParent(true);
          this.promptDialogNode = null;
        }
        var canvas = cc.find("Canvas");
        var node = new cc.Node();
        node.setPosition(cc.p(0, 60));
        node.addComponent(cc.Sprite);
        var url = cc.url.raw("resources/mainUI/image/bg_img_tis.png");
        var texure = cc.textureCache.addImage(url, null, null);
        node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texure);
        var textnode = new cc.Node();
        textnode.setPosition(cc.p(0, -5));
        var label = textnode.addComponent(cc.Label);
        label.fontSize = 30;
        label.string = str;
        node.addChild(textnode);
        canvas.addChild(node);
        node.setLocalZOrder(3e4);
        node.setPositionY(canvas.height);
        var movetos = cc.moveTo(.5, cc.p(0, 0));
        movetos.easing(cc.easeBackOut());
        this.promptDialogNode = node;
        node.runAction(cc.sequence(movetos, cc.delayTime(1), cc.fadeOut(1), cc.callFunc(function() {
          node.removeFromParent(true);
          _this.promptDialogNode = null;
        })));
      };
      Utils.prototype.changeSpritePic = function(sprite, url) {
        cc.loader.loadRes(url, cc.SpriteFrame, function(err, spFrame) {
          err ? cc.log(err) : sprite.spriteFrame = spFrame;
        });
      };
      Utils.prototype.convertChip = function(num) {
        return num >= 1e3 && num < 1e4 ? num / 1e3 + "k" : num >= 1e4 ? num / 1e4 + "w" : num.toString();
      };
      Utils.prototype.strInArr = function(arr, str) {
        for (var i = 0; i < arr.length; i++) if (arr[i] === str) return i;
        return -1;
      };
      Utils.prototype.distanceTime = function(pointA, pointB, speed) {
        var distance = Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2);
        return Math.sqrt(distance) / speed;
      };
      Utils.prototype.convertToWan = function(num) {
        num *= 1;
        if (num > 1e4) return num / 1e4 + "万";
        return num.toString();
      };
      Utils.prototype.getDevicePlatform = function() {
        return cc.sys.isNative ? cc.sys.os == cc.sys.OS_ANDROID ? HeadDefine_1.DeviceType.DeviceType_ANDROID : HeadDefine_1.DeviceType.DeviceType_IOS : HeadDefine_1.DeviceType.DeviceType_WEB;
      };
      Utils.prototype.isPhoneNum = function(text) {
        if (11 == text.length && /^1[34578]\d{9}$/.test(text)) return true;
        return false;
      };
      Utils.prototype.getSSID = function(str) {
        var head = "com.rongwan.dongfanghui=";
        if (str && str.length && -1 != str.indexOf(head)) {
          str = str.substr(head.length, str.length - head.length);
          return str;
        }
        return "";
      };
      Utils.prototype.getServerListPath = function(list) {
        if (list && list.length > 0) {
          var usableList = [];
          for (var index = 0; index < list.length; index++) list[index].serverStatus == HeadDefine_1.ServerStatus.ServerStatus_NORMAL && usableList.push(list[index]);
          if (usableList.length > 0) {
            var numindex = parseInt(100 * Math.random() % usableList.length + "");
            cc.log("numindex : " + numindex);
            return "ws://" + usableList[numindex].hostName + ":" + usableList[numindex].portAndPath + "/";
          }
        }
        return "";
      };
      Utils.prototype.checkVersion = function(versionA, versionB) {
        console.log("JS Custom Version Compare: version A is " + versionA + ", version B is " + versionB);
        var vA = versionA.split(".");
        var vB = versionB.split(".");
        for (var i = 0; i < vA.length; ++i) {
          var a = parseInt(vA[i]);
          var b = parseInt(vB[i] || "0");
          if (a === b) continue;
          return a - b;
        }
        return vB.length > vA.length ? -1 : 0;
      };
      Utils.prototype.getLocalVersionByGameID = function(gameId) {
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + gameId + "/";
        if (!jsb.fileUtils.isFileExist(storagePath + "project.manifest")) return "0.0.0";
        var customManifestStr = jsb.fileUtils.getStringFromFile(storagePath + "project.manifest");
        try {
          return JSON.parse(customManifestStr).version;
        } catch (error) {
          cc.error(error);
        }
      };
      Utils.instance = null;
      Utils = Utils_1 = __decorate([ ccclass ], Utils);
      return Utils;
      var Utils_1;
    }();
    exports.default = Utils;
    cc._RF.pop();
  }, {
    "./HeadDefine": "HeadDefine"
  } ],
  WaitLoadAct: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8277613M/5OypmtqMawW6ua", "WaitLoadAct");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.onLoad = function() {};
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  bytebuffer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "12be8tbyfpJXaWfOAxDwjmp", "bytebuffer");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(global, factory) {
      "function" === typeof define && define["amd"] ? define([ "long" ], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = function() {
        var Long;
        try {
          Long = require("long");
        } catch (e) {}
        return factory(Long);
      }() : (global["dcodeIO"] = global["dcodeIO"] || {})["ByteBuffer"] = factory(global["dcodeIO"]["Long"]);
    })(void 0, function(Long) {
      var ByteBuffer = function ByteBuffer(capacity, littleEndian, noAssert) {
        "undefined" === typeof capacity && (capacity = ByteBuffer.DEFAULT_CAPACITY);
        "undefined" === typeof littleEndian && (littleEndian = ByteBuffer.DEFAULT_ENDIAN);
        "undefined" === typeof noAssert && (noAssert = ByteBuffer.DEFAULT_NOASSERT);
        if (!noAssert) {
          capacity |= 0;
          if (capacity < 0) throw RangeError("Illegal capacity");
          littleEndian = !!littleEndian;
          noAssert = !!noAssert;
        }
        this.buffer = 0 === capacity ? EMPTY_BUFFER : new ArrayBuffer(capacity);
        this.view = 0 === capacity ? null : new Uint8Array(this.buffer);
        this.offset = 0;
        this.markedOffset = -1;
        this.limit = capacity;
        this.littleEndian = littleEndian;
        this.noAssert = noAssert;
      };
      ByteBuffer.VERSION = "5.0.1";
      ByteBuffer.LITTLE_ENDIAN = true;
      ByteBuffer.BIG_ENDIAN = false;
      ByteBuffer.DEFAULT_CAPACITY = 16;
      ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;
      ByteBuffer.DEFAULT_NOASSERT = false;
      ByteBuffer.Long = Long || null;
      var ByteBufferPrototype = ByteBuffer.prototype;
      ByteBufferPrototype.__isByteBuffer__;
      Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      var EMPTY_BUFFER = new ArrayBuffer(0);
      var stringFromCharCode = String.fromCharCode;
      function stringSource(s) {
        var i = 0;
        return function() {
          return i < s.length ? s.charCodeAt(i++) : null;
        };
      }
      function stringDestination() {
        var cs = [], ps = [];
        return function() {
          if (0 === arguments.length) return ps.join("") + stringFromCharCode.apply(String, cs);
          cs.length + arguments.length > 1024 && (ps.push(stringFromCharCode.apply(String, cs)), 
          cs.length = 0);
          Array.prototype.push.apply(cs, arguments);
        };
      }
      ByteBuffer.accessor = function() {
        return Uint8Array;
      };
      ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
        return new ByteBuffer(capacity, littleEndian, noAssert);
      };
      ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
        if ("boolean" === typeof encoding || "string" !== typeof encoding) {
          noAssert = littleEndian;
          littleEndian = encoding;
          encoding = void 0;
        }
        var capacity = 0;
        for (var i = 0, k = buffers.length, length; i < k; ++i) {
          ByteBuffer.isByteBuffer(buffers[i]) || (buffers[i] = ByteBuffer.wrap(buffers[i], encoding));
          length = buffers[i].limit - buffers[i].offset;
          length > 0 && (capacity += length);
        }
        if (0 === capacity) return new ByteBuffer(0, littleEndian, noAssert);
        var bb = new ByteBuffer(capacity, littleEndian, noAssert), bi;
        i = 0;
        while (i < k) {
          bi = buffers[i++];
          length = bi.limit - bi.offset;
          if (length <= 0) continue;
          bb.view.set(bi.view.subarray(bi.offset, bi.limit), bb.offset);
          bb.offset += length;
        }
        bb.limit = bb.offset;
        bb.offset = 0;
        return bb;
      };
      ByteBuffer.isByteBuffer = function(bb) {
        return true === (bb && bb["__isByteBuffer__"]);
      };
      ByteBuffer.type = function() {
        return ArrayBuffer;
      };
      ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
        if ("string" !== typeof encoding) {
          noAssert = littleEndian;
          littleEndian = encoding;
          encoding = void 0;
        }
        if ("string" === typeof buffer) {
          "undefined" === typeof encoding && (encoding = "utf8");
          switch (encoding) {
           case "base64":
            return ByteBuffer.fromBase64(buffer, littleEndian);

           case "hex":
            return ByteBuffer.fromHex(buffer, littleEndian);

           case "binary":
            return ByteBuffer.fromBinary(buffer, littleEndian);

           case "utf8":
            return ByteBuffer.fromUTF8(buffer, littleEndian);

           case "debug":
            return ByteBuffer.fromDebug(buffer, littleEndian);

           default:
            throw Error("Unsupported encoding: " + encoding);
          }
        }
        if (null === buffer || "object" !== ("undefined" === typeof buffer ? "undefined" : _typeof(buffer))) throw TypeError("Illegal buffer");
        var bb;
        if (ByteBuffer.isByteBuffer(buffer)) {
          bb = ByteBufferPrototype.clone.call(buffer);
          bb.markedOffset = -1;
          return bb;
        }
        if (buffer instanceof Uint8Array) {
          bb = new ByteBuffer(0, littleEndian, noAssert);
          if (buffer.length > 0) {
            bb.buffer = buffer.buffer;
            bb.offset = buffer.byteOffset;
            bb.limit = buffer.byteOffset + buffer.byteLength;
            bb.view = new Uint8Array(buffer.buffer);
          }
        } else if (buffer instanceof ArrayBuffer) {
          bb = new ByteBuffer(0, littleEndian, noAssert);
          if (buffer.byteLength > 0) {
            bb.buffer = buffer;
            bb.offset = 0;
            bb.limit = buffer.byteLength;
            bb.view = buffer.byteLength > 0 ? new Uint8Array(buffer) : null;
          }
        } else {
          if ("[object Array]" !== Object.prototype.toString.call(buffer)) throw TypeError("Illegal buffer");
          bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
          bb.limit = buffer.length;
          for (var i = 0; i < buffer.length; ++i) bb.view[i] = buffer[i];
        }
        return bb;
      };
      ByteBufferPrototype.writeBitSet = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if (!(value instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, bits = value.length, bytes = bits >> 3, bit = 0, k;
        offset += this.writeVarint32(bits, offset);
        while (bytes--) {
          k = 1 & !!value[bit++] | (1 & !!value[bit++]) << 1 | (1 & !!value[bit++]) << 2 | (1 & !!value[bit++]) << 3 | (1 & !!value[bit++]) << 4 | (1 & !!value[bit++]) << 5 | (1 & !!value[bit++]) << 6 | (1 & !!value[bit++]) << 7;
          this.writeByte(k, offset++);
        }
        if (bit < bits) {
          var m = 0;
          k = 0;
          while (bit < bits) k |= (1 & !!value[bit++]) << m++;
          this.writeByte(k, offset++);
        }
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readBitSet = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        var ret = this.readVarint32(offset), bits = ret.value, bytes = bits >> 3, bit = 0, value = [], k;
        offset += ret.length;
        while (bytes--) {
          k = this.readByte(offset++);
          value[bit++] = !!(1 & k);
          value[bit++] = !!(2 & k);
          value[bit++] = !!(4 & k);
          value[bit++] = !!(8 & k);
          value[bit++] = !!(16 & k);
          value[bit++] = !!(32 & k);
          value[bit++] = !!(64 & k);
          value[bit++] = !!(128 & k);
        }
        if (bit < bits) {
          var m = 0;
          k = this.readByte(offset++);
          while (bit < bits) value[bit++] = !!(k >> m++ & 1);
        }
        relative && (this.offset = offset);
        return value;
      };
      ByteBufferPrototype.readBytes = function(length, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
        }
        var slice = this.slice(offset, offset + length);
        relative && (this.offset += length);
        return slice;
      };
      ByteBufferPrototype.writeBytes = ByteBufferPrototype.append;
      ByteBufferPrototype.writeInt8 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 1;
        var capacity0 = this.buffer.byteLength;
        offset > capacity0 && this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
        offset -= 1;
        this.view[offset] = value;
        relative && (this.offset += 1);
        return this;
      };
      ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;
      ByteBufferPrototype.readInt8 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var value = this.view[offset];
        128 === (128 & value) && (value = -(255 - value + 1));
        relative && (this.offset += 1);
        return value;
      };
      ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;
      ByteBufferPrototype.writeUint8 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 1;
        var capacity1 = this.buffer.byteLength;
        offset > capacity1 && this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
        offset -= 1;
        this.view[offset] = value;
        relative && (this.offset += 1);
        return this;
      };
      ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;
      ByteBufferPrototype.readUint8 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var value = this.view[offset];
        relative && (this.offset += 1);
        return value;
      };
      ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8;
      ByteBufferPrototype.writeInt16 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 2;
        var capacity2 = this.buffer.byteLength;
        offset > capacity2 && this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
        offset -= 2;
        if (this.littleEndian) {
          this.view[offset + 1] = (65280 & value) >>> 8;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = (65280 & value) >>> 8;
          this.view[offset + 1] = 255 & value;
        }
        relative && (this.offset += 2);
        return this;
      };
      ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;
      ByteBufferPrototype.readInt16 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset];
          value |= this.view[offset + 1] << 8;
        } else {
          value = this.view[offset] << 8;
          value |= this.view[offset + 1];
        }
        32768 === (32768 & value) && (value = -(65535 - value + 1));
        relative && (this.offset += 2);
        return value;
      };
      ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;
      ByteBufferPrototype.writeUint16 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 2;
        var capacity3 = this.buffer.byteLength;
        offset > capacity3 && this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
        offset -= 2;
        if (this.littleEndian) {
          this.view[offset + 1] = (65280 & value) >>> 8;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = (65280 & value) >>> 8;
          this.view[offset + 1] = 255 & value;
        }
        relative && (this.offset += 2);
        return this;
      };
      ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;
      ByteBufferPrototype.readUint16 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset];
          value |= this.view[offset + 1] << 8;
        } else {
          value = this.view[offset] << 8;
          value |= this.view[offset + 1];
        }
        relative && (this.offset += 2);
        return value;
      };
      ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16;
      ByteBufferPrototype.writeInt32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity4 = this.buffer.byteLength;
        offset > capacity4 && this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
        offset -= 4;
        if (this.littleEndian) {
          this.view[offset + 3] = value >>> 24 & 255;
          this.view[offset + 2] = value >>> 16 & 255;
          this.view[offset + 1] = value >>> 8 & 255;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = value >>> 24 & 255;
          this.view[offset + 1] = value >>> 16 & 255;
          this.view[offset + 2] = value >>> 8 & 255;
          this.view[offset + 3] = 255 & value;
        }
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;
      ByteBufferPrototype.readInt32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset + 2] << 16;
          value |= this.view[offset + 1] << 8;
          value |= this.view[offset];
          value += this.view[offset + 3] << 24 >>> 0;
        } else {
          value = this.view[offset + 1] << 16;
          value |= this.view[offset + 2] << 8;
          value |= this.view[offset + 3];
          value += this.view[offset] << 24 >>> 0;
        }
        value |= 0;
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;
      ByteBufferPrototype.writeUint32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity5 = this.buffer.byteLength;
        offset > capacity5 && this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
        offset -= 4;
        if (this.littleEndian) {
          this.view[offset + 3] = value >>> 24 & 255;
          this.view[offset + 2] = value >>> 16 & 255;
          this.view[offset + 1] = value >>> 8 & 255;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = value >>> 24 & 255;
          this.view[offset + 1] = value >>> 16 & 255;
          this.view[offset + 2] = value >>> 8 & 255;
          this.view[offset + 3] = 255 & value;
        }
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;
      ByteBufferPrototype.readUint32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset + 2] << 16;
          value |= this.view[offset + 1] << 8;
          value |= this.view[offset];
          value += this.view[offset + 3] << 24 >>> 0;
        } else {
          value = this.view[offset + 1] << 16;
          value |= this.view[offset + 2] << 8;
          value |= this.view[offset + 3];
          value += this.view[offset] << 24 >>> 0;
        }
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32;
      if (Long) {
        ByteBufferPrototype.writeInt64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          offset += 8;
          var capacity6 = this.buffer.byteLength;
          offset > capacity6 && this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
          offset -= 8;
          var lo = value.low, hi = value.high;
          if (this.littleEndian) {
            this.view[offset + 3] = lo >>> 24 & 255;
            this.view[offset + 2] = lo >>> 16 & 255;
            this.view[offset + 1] = lo >>> 8 & 255;
            this.view[offset] = 255 & lo;
            offset += 4;
            this.view[offset + 3] = hi >>> 24 & 255;
            this.view[offset + 2] = hi >>> 16 & 255;
            this.view[offset + 1] = hi >>> 8 & 255;
            this.view[offset] = 255 & hi;
          } else {
            this.view[offset] = hi >>> 24 & 255;
            this.view[offset + 1] = hi >>> 16 & 255;
            this.view[offset + 2] = hi >>> 8 & 255;
            this.view[offset + 3] = 255 & hi;
            offset += 4;
            this.view[offset] = lo >>> 24 & 255;
            this.view[offset + 1] = lo >>> 16 & 255;
            this.view[offset + 2] = lo >>> 8 & 255;
            this.view[offset + 3] = 255 & lo;
          }
          relative && (this.offset += 8);
          return this;
        };
        ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;
        ByteBufferPrototype.readInt64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
          }
          var lo = 0, hi = 0;
          if (this.littleEndian) {
            lo = this.view[offset + 2] << 16;
            lo |= this.view[offset + 1] << 8;
            lo |= this.view[offset];
            lo += this.view[offset + 3] << 24 >>> 0;
            offset += 4;
            hi = this.view[offset + 2] << 16;
            hi |= this.view[offset + 1] << 8;
            hi |= this.view[offset];
            hi += this.view[offset + 3] << 24 >>> 0;
          } else {
            hi = this.view[offset + 1] << 16;
            hi |= this.view[offset + 2] << 8;
            hi |= this.view[offset + 3];
            hi += this.view[offset] << 24 >>> 0;
            offset += 4;
            lo = this.view[offset + 1] << 16;
            lo |= this.view[offset + 2] << 8;
            lo |= this.view[offset + 3];
            lo += this.view[offset] << 24 >>> 0;
          }
          var value = new Long(lo, hi, false);
          relative && (this.offset += 8);
          return value;
        };
        ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;
        ByteBufferPrototype.writeUint64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          offset += 8;
          var capacity7 = this.buffer.byteLength;
          offset > capacity7 && this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
          offset -= 8;
          var lo = value.low, hi = value.high;
          if (this.littleEndian) {
            this.view[offset + 3] = lo >>> 24 & 255;
            this.view[offset + 2] = lo >>> 16 & 255;
            this.view[offset + 1] = lo >>> 8 & 255;
            this.view[offset] = 255 & lo;
            offset += 4;
            this.view[offset + 3] = hi >>> 24 & 255;
            this.view[offset + 2] = hi >>> 16 & 255;
            this.view[offset + 1] = hi >>> 8 & 255;
            this.view[offset] = 255 & hi;
          } else {
            this.view[offset] = hi >>> 24 & 255;
            this.view[offset + 1] = hi >>> 16 & 255;
            this.view[offset + 2] = hi >>> 8 & 255;
            this.view[offset + 3] = 255 & hi;
            offset += 4;
            this.view[offset] = lo >>> 24 & 255;
            this.view[offset + 1] = lo >>> 16 & 255;
            this.view[offset + 2] = lo >>> 8 & 255;
            this.view[offset + 3] = 255 & lo;
          }
          relative && (this.offset += 8);
          return this;
        };
        ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;
        ByteBufferPrototype.readUint64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
          }
          var lo = 0, hi = 0;
          if (this.littleEndian) {
            lo = this.view[offset + 2] << 16;
            lo |= this.view[offset + 1] << 8;
            lo |= this.view[offset];
            lo += this.view[offset + 3] << 24 >>> 0;
            offset += 4;
            hi = this.view[offset + 2] << 16;
            hi |= this.view[offset + 1] << 8;
            hi |= this.view[offset];
            hi += this.view[offset + 3] << 24 >>> 0;
          } else {
            hi = this.view[offset + 1] << 16;
            hi |= this.view[offset + 2] << 8;
            hi |= this.view[offset + 3];
            hi += this.view[offset] << 24 >>> 0;
            offset += 4;
            lo = this.view[offset + 1] << 16;
            lo |= this.view[offset + 2] << 8;
            lo |= this.view[offset + 3];
            lo += this.view[offset] << 24 >>> 0;
          }
          var value = new Long(lo, hi, true);
          relative && (this.offset += 8);
          return value;
        };
        ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;
      }
      function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
        var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
        if (0 === e) e = 1 - eBias; else {
          if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
          m += Math.pow(2, mLen);
          e -= eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      }
      function ieee754_write(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || Infinity === value) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e += eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
        e = e << mLen | m;
        eLen += mLen;
        for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
        buffer[offset + i - d] |= 128 * s;
      }
      ByteBufferPrototype.writeFloat32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity8 = this.buffer.byteLength;
        offset > capacity8 && this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
        offset -= 4;
        ieee754_write(this.view, value, offset, this.littleEndian, 23, 4);
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;
      ByteBufferPrototype.readFloat32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 23, 4);
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;
      ByteBufferPrototype.writeFloat64 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 8;
        var capacity9 = this.buffer.byteLength;
        offset > capacity9 && this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
        offset -= 8;
        ieee754_write(this.view, value, offset, this.littleEndian, 52, 8);
        relative && (this.offset += 8);
        return this;
      };
      ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;
      ByteBufferPrototype.readFloat64 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 52, 8);
        relative && (this.offset += 8);
        return value;
      };
      ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;
      ByteBuffer.MAX_VARINT32_BYTES = 5;
      ByteBuffer.calculateVarint32 = function(value) {
        value >>>= 0;
        return value < 128 ? 1 : value < 16384 ? 2 : value < 1 << 21 ? 3 : value < 1 << 28 ? 4 : 5;
      };
      ByteBuffer.zigZagEncode32 = function(n) {
        return ((n |= 0) << 1 ^ n >> 31) >>> 0;
      };
      ByteBuffer.zigZagDecode32 = function(n) {
        return n >>> 1 ^ -(1 & n) | 0;
      };
      ByteBufferPrototype.writeVarint32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var size = ByteBuffer.calculateVarint32(value), b;
        offset += size;
        var capacity10 = this.buffer.byteLength;
        offset > capacity10 && this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
        offset -= size;
        value >>>= 0;
        while (value >= 128) {
          b = 127 & value | 128;
          this.view[offset++] = b;
          value >>>= 7;
        }
        this.view[offset++] = value;
        if (relative) {
          this.offset = offset;
          return this;
        }
        return size;
      };
      ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
        return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
      };
      ByteBufferPrototype.readVarint32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var c = 0, value = 0, b;
        do {
          if (!this.noAssert && offset > this.limit) {
            var err = Error("Truncated");
            err["truncated"] = true;
            throw err;
          }
          b = this.view[offset++];
          c < 5 && (value |= (127 & b) << 7 * c);
          ++c;
        } while (0 !== (128 & b));
        value |= 0;
        if (relative) {
          this.offset = offset;
          return value;
        }
        return {
          value: value,
          length: c
        };
      };
      ByteBufferPrototype.readVarint32ZigZag = function(offset) {
        var val = this.readVarint32(offset);
        "object" === ("undefined" === typeof val ? "undefined" : _typeof(val)) ? val["value"] = ByteBuffer.zigZagDecode32(val["value"]) : val = ByteBuffer.zigZagDecode32(val);
        return val;
      };
      if (Long) {
        ByteBuffer.MAX_VARINT64_BYTES = 10;
        ByteBuffer.calculateVarint64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          var part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
          return 0 == part2 ? 0 == part1 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 1 << 21 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 1 << 21 ? 7 : 8 : part2 < 128 ? 9 : 10;
        };
        ByteBuffer.zigZagEncode64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
        };
        ByteBuffer.zigZagDecode64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
        };
        ByteBufferPrototype.writeVarint64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          var size = ByteBuffer.calculateVarint64(value), part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
          offset += size;
          var capacity11 = this.buffer.byteLength;
          offset > capacity11 && this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
          offset -= size;
          switch (size) {
           case 10:
            this.view[offset + 9] = part2 >>> 7 & 1;

           case 9:
            this.view[offset + 8] = 9 !== size ? 128 | part2 : 127 & part2;

           case 8:
            this.view[offset + 7] = 8 !== size ? part1 >>> 21 | 128 : part1 >>> 21 & 127;

           case 7:
            this.view[offset + 6] = 7 !== size ? part1 >>> 14 | 128 : part1 >>> 14 & 127;

           case 6:
            this.view[offset + 5] = 6 !== size ? part1 >>> 7 | 128 : part1 >>> 7 & 127;

           case 5:
            this.view[offset + 4] = 5 !== size ? 128 | part1 : 127 & part1;

           case 4:
            this.view[offset + 3] = 4 !== size ? part0 >>> 21 | 128 : part0 >>> 21 & 127;

           case 3:
            this.view[offset + 2] = 3 !== size ? part0 >>> 14 | 128 : part0 >>> 14 & 127;

           case 2:
            this.view[offset + 1] = 2 !== size ? part0 >>> 7 | 128 : part0 >>> 7 & 127;

           case 1:
            this.view[offset] = 1 !== size ? 128 | part0 : 127 & part0;
          }
          if (relative) {
            this.offset += size;
            return this;
          }
          return size;
        };
        ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
          return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
        };
        ByteBufferPrototype.readVarint64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
          }
          var start = offset, part0 = 0, part1 = 0, part2 = 0, b = 0;
          b = this.view[offset++];
          part0 = 127 & b;
          if (128 & b) {
            b = this.view[offset++];
            part0 |= (127 & b) << 7;
            if (128 & b || this.noAssert && "undefined" === typeof b) {
              b = this.view[offset++];
              part0 |= (127 & b) << 14;
              if (128 & b || this.noAssert && "undefined" === typeof b) {
                b = this.view[offset++];
                part0 |= (127 & b) << 21;
                if (128 & b || this.noAssert && "undefined" === typeof b) {
                  b = this.view[offset++];
                  part1 = 127 & b;
                  if (128 & b || this.noAssert && "undefined" === typeof b) {
                    b = this.view[offset++];
                    part1 |= (127 & b) << 7;
                    if (128 & b || this.noAssert && "undefined" === typeof b) {
                      b = this.view[offset++];
                      part1 |= (127 & b) << 14;
                      if (128 & b || this.noAssert && "undefined" === typeof b) {
                        b = this.view[offset++];
                        part1 |= (127 & b) << 21;
                        if (128 & b || this.noAssert && "undefined" === typeof b) {
                          b = this.view[offset++];
                          part2 = 127 & b;
                          if (128 & b || this.noAssert && "undefined" === typeof b) {
                            b = this.view[offset++];
                            part2 |= (127 & b) << 7;
                            if (128 & b || this.noAssert && "undefined" === typeof b) throw Error("Buffer overrun");
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          var value = Long.fromBits(part0 | part1 << 28, part1 >>> 4 | part2 << 24, false);
          if (relative) {
            this.offset = offset;
            return value;
          }
          return {
            value: value,
            length: offset - start
          };
        };
        ByteBufferPrototype.readVarint64ZigZag = function(offset) {
          var val = this.readVarint64(offset);
          val && val["value"] instanceof Long ? val["value"] = ByteBuffer.zigZagDecode64(val["value"]) : val = ByteBuffer.zigZagDecode64(val);
          return val;
        };
      }
      ByteBufferPrototype.writeCString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        var i, k = str.length;
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          for (i = 0; i < k; ++i) if (0 === str.charCodeAt(i)) throw RangeError("Illegal str: Contains NULL-characters");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k + 1;
        var capacity12 = this.buffer.byteLength;
        offset > capacity12 && this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
        offset -= k + 1;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        this.view[offset++] = 0;
        if (relative) {
          this.offset = offset;
          return this;
        }
        return k;
      };
      ByteBufferPrototype.readCString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var start = offset, temp;
        var sd, b = -1;
        utfx.decodeUTF8toUTF16(function() {
          if (0 === b) return null;
          if (offset >= this.limit) throw RangeError("Illegal range: Truncated data, " + offset + " < " + this.limit);
          b = this.view[offset++];
          return 0 === b ? null : b;
        }.bind(this), sd = stringDestination(), true);
        if (relative) {
          this.offset = offset;
          return sd();
        }
        return {
          string: sd(),
          length: offset - start
        };
      };
      ByteBufferPrototype.writeIString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, k;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        offset += 4 + k;
        var capacity13 = this.buffer.byteLength;
        offset > capacity13 && this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
        offset -= 4 + k;
        if (this.littleEndian) {
          this.view[offset + 3] = k >>> 24 & 255;
          this.view[offset + 2] = k >>> 16 & 255;
          this.view[offset + 1] = k >>> 8 & 255;
          this.view[offset] = 255 & k;
        } else {
          this.view[offset] = k >>> 24 & 255;
          this.view[offset + 1] = k >>> 16 & 255;
          this.view[offset + 2] = k >>> 8 & 255;
          this.view[offset + 3] = 255 & k;
        }
        offset += 4;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (offset !== start + 4 + k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + 4 + k));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readIString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readUint32(offset);
        var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
        offset += str["length"];
        if (relative) {
          this.offset = offset;
          return str["string"];
        }
        return {
          string: str["string"],
          length: offset - start
        };
      };
      ByteBuffer.METRICS_CHARS = "c";
      ByteBuffer.METRICS_BYTES = "b";
      ByteBufferPrototype.writeUTF8String = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var k;
        var start = offset;
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k;
        var capacity14 = this.buffer.byteLength;
        offset > capacity14 && this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
        offset -= k;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;
      ByteBuffer.calculateUTF8Chars = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[0];
      };
      ByteBuffer.calculateUTF8Bytes = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[1];
      };
      ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;
      ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
        if ("number" === typeof metrics) {
          offset = metrics;
          metrics = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        "undefined" === typeof metrics && (metrics = ByteBuffer.METRICS_CHARS);
        if (!this.noAssert) {
          if ("number" !== typeof length || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
          length |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var i = 0, start = offset, sd;
        if (metrics === ByteBuffer.METRICS_CHARS) {
          sd = stringDestination();
          utfx.decodeUTF8(function() {
            return i < length && offset < this.limit ? this.view[offset++] : null;
          }.bind(this), function(cp) {
            ++i;
            utfx.UTF8toUTF16(cp, sd);
          });
          if (i !== length) throw RangeError("Illegal range: Truncated data, " + i + " == " + length);
          if (relative) {
            this.offset = offset;
            return sd();
          }
          return {
            string: sd(),
            length: offset - start
          };
        }
        if (metrics === ByteBuffer.METRICS_BYTES) {
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
          }
          var k = offset + length;
          utfx.decodeUTF8toUTF16(function() {
            return offset < k ? this.view[offset++] : null;
          }.bind(this), sd = stringDestination(), this.noAssert);
          if (offset !== k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + k);
          if (relative) {
            this.offset = offset;
            return sd();
          }
          return {
            string: sd(),
            length: offset - start
          };
        }
        throw TypeError("Unsupported metrics: " + metrics);
      };
      ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;
      ByteBufferPrototype.writeVString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, k, l;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        l = ByteBuffer.calculateVarint32(k);
        offset += l + k;
        var capacity15 = this.buffer.byteLength;
        offset > capacity15 && this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
        offset -= l + k;
        offset += this.writeVarint32(k, offset);
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (offset !== start + k + l) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + k + l));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readVString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readVarint32(offset);
        var str = this.readUTF8String(len["value"], ByteBuffer.METRICS_BYTES, offset += len["length"]);
        offset += str["length"];
        if (relative) {
          this.offset = offset;
          return str["string"];
        }
        return {
          string: str["string"],
          length: offset - start
        };
      };
      ByteBufferPrototype.append = function(source, encoding, offset) {
        if ("number" === typeof encoding || "string" !== typeof encoding) {
          offset = encoding;
          encoding = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
        var length = source.limit - source.offset;
        if (length <= 0) return this;
        offset += length;
        var capacity16 = this.buffer.byteLength;
        offset > capacity16 && this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
        offset -= length;
        this.view.set(source.view.subarray(source.offset, source.limit), offset);
        source.offset += length;
        relative && (this.offset += length);
        return this;
      };
      ByteBufferPrototype.appendTo = function(target, offset) {
        target.append(this, offset);
        return this;
      };
      ByteBufferPrototype.assert = function(assert) {
        this.noAssert = !assert;
        return this;
      };
      ByteBufferPrototype.capacity = function() {
        return this.buffer.byteLength;
      };
      ByteBufferPrototype.clear = function() {
        this.offset = 0;
        this.limit = this.buffer.byteLength;
        this.markedOffset = -1;
        return this;
      };
      ByteBufferPrototype.clone = function(copy) {
        var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
        if (copy) {
          bb.buffer = new ArrayBuffer(this.buffer.byteLength);
          bb.view = new Uint8Array(bb.buffer);
        } else {
          bb.buffer = this.buffer;
          bb.view = this.view;
        }
        bb.offset = this.offset;
        bb.markedOffset = this.markedOffset;
        bb.limit = this.limit;
        return bb;
      };
      ByteBufferPrototype.compact = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (0 === begin && end === this.buffer.byteLength) return this;
        var len = end - begin;
        if (0 === len) {
          this.buffer = EMPTY_BUFFER;
          this.view = null;
          this.markedOffset >= 0 && (this.markedOffset -= begin);
          this.offset = 0;
          this.limit = 0;
          return this;
        }
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        view.set(this.view.subarray(begin, end));
        this.buffer = buffer;
        this.view = view;
        this.markedOffset >= 0 && (this.markedOffset -= begin);
        this.offset = 0;
        this.limit = len;
        return this;
      };
      ByteBufferPrototype.copy = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin === end) return new ByteBuffer(0, this.littleEndian, this.noAssert);
        var capacity = end - begin, bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
        bb.offset = 0;
        bb.limit = capacity;
        bb.markedOffset >= 0 && (bb.markedOffset -= begin);
        this.copyTo(bb, 0, begin, end);
        return bb;
      };
      ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
        var relative, targetRelative;
        if (!this.noAssert && !ByteBuffer.isByteBuffer(target)) throw TypeError("Illegal target: Not a ByteBuffer");
        targetOffset = (targetRelative = "undefined" === typeof targetOffset) ? target.offset : 0 | targetOffset;
        sourceOffset = (relative = "undefined" === typeof sourceOffset) ? this.offset : 0 | sourceOffset;
        sourceLimit = "undefined" === typeof sourceLimit ? this.limit : 0 | sourceLimit;
        if (targetOffset < 0 || targetOffset > target.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + targetOffset + " <= " + target.buffer.byteLength);
        if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + sourceOffset + " <= " + this.buffer.byteLength);
        var len = sourceLimit - sourceOffset;
        if (0 === len) return target;
        target.ensureCapacity(targetOffset + len);
        target.view.set(this.view.subarray(sourceOffset, sourceLimit), targetOffset);
        relative && (this.offset += len);
        targetRelative && (target.offset += len);
        return this;
      };
      ByteBufferPrototype.ensureCapacity = function(capacity) {
        var current = this.buffer.byteLength;
        if (current < capacity) return this.resize((current *= 2) > capacity ? current : capacity);
        return this;
      };
      ByteBufferPrototype.fill = function(value, begin, end) {
        var relative = "undefined" === typeof begin;
        relative && (begin = this.offset);
        "string" === typeof value && value.length > 0 && (value = value.charCodeAt(0));
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin >= end) return this;
        while (begin < end) this.view[begin++] = value;
        relative && (this.offset = begin);
        return this;
      };
      ByteBufferPrototype.flip = function() {
        this.limit = this.offset;
        this.offset = 0;
        return this;
      };
      ByteBufferPrototype.mark = function(offset) {
        offset = "undefined" === typeof offset ? this.offset : offset;
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        this.markedOffset = offset;
        return this;
      };
      ByteBufferPrototype.order = function(littleEndian) {
        if (!this.noAssert && "boolean" !== typeof littleEndian) throw TypeError("Illegal littleEndian: Not a boolean");
        this.littleEndian = !!littleEndian;
        return this;
      };
      ByteBufferPrototype.LE = function(littleEndian) {
        this.littleEndian = "undefined" === typeof littleEndian || !!littleEndian;
        return this;
      };
      ByteBufferPrototype.BE = function(bigEndian) {
        this.littleEndian = "undefined" !== typeof bigEndian && !bigEndian;
        return this;
      };
      ByteBufferPrototype.prepend = function(source, encoding, offset) {
        if ("number" === typeof encoding || "string" !== typeof encoding) {
          offset = encoding;
          encoding = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
        var len = source.limit - source.offset;
        if (len <= 0) return this;
        var diff = len - offset;
        if (diff > 0) {
          var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
          var view = new Uint8Array(buffer);
          view.set(this.view.subarray(offset, this.buffer.byteLength), len);
          this.buffer = buffer;
          this.view = view;
          this.offset += diff;
          this.markedOffset >= 0 && (this.markedOffset += diff);
          this.limit += diff;
          offset += diff;
        } else var arrayView = new Uint8Array(this.buffer);
        this.view.set(source.view.subarray(source.offset, source.limit), offset - len);
        source.offset = source.limit;
        relative && (this.offset -= len);
        return this;
      };
      ByteBufferPrototype.prependTo = function(target, offset) {
        target.prepend(this, offset);
        return this;
      };
      ByteBufferPrototype.printDebug = function(out) {
        "function" !== typeof out && (out = console.log.bind(console));
        out(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(true));
      };
      ByteBufferPrototype.remaining = function() {
        return this.limit - this.offset;
      };
      ByteBufferPrototype.reset = function() {
        if (this.markedOffset >= 0) {
          this.offset = this.markedOffset;
          this.markedOffset = -1;
        } else this.offset = 0;
        return this;
      };
      ByteBufferPrototype.resize = function(capacity) {
        if (!this.noAssert) {
          if ("number" !== typeof capacity || capacity % 1 !== 0) throw TypeError("Illegal capacity: " + capacity + " (not an integer)");
          capacity |= 0;
          if (capacity < 0) throw RangeError("Illegal capacity: 0 <= " + capacity);
        }
        if (this.buffer.byteLength < capacity) {
          var buffer = new ArrayBuffer(capacity);
          var view = new Uint8Array(buffer);
          view.set(this.view);
          this.buffer = buffer;
          this.view = view;
        }
        return this;
      };
      ByteBufferPrototype.reverse = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin === end) return this;
        Array.prototype.reverse.call(this.view.subarray(begin, end));
        return this;
      };
      ByteBufferPrototype.skip = function(length) {
        if (!this.noAssert) {
          if ("number" !== typeof length || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
          length |= 0;
        }
        var offset = this.offset + length;
        if (!this.noAssert && (offset < 0 || offset > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + length + " <= " + this.buffer.byteLength);
        this.offset = offset;
        return this;
      };
      ByteBufferPrototype.slice = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var bb = this.clone();
        bb.offset = begin;
        bb.limit = end;
        return bb;
      };
      ByteBufferPrototype.toBuffer = function(forceCopy) {
        var offset = this.offset, limit = this.limit;
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
          offset >>>= 0;
          if ("number" !== typeof limit || limit % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
          limit >>>= 0;
          if (offset < 0 || offset > limit || limit > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + offset + " <= " + limit + " <= " + this.buffer.byteLength);
        }
        if (!forceCopy && 0 === offset && limit === this.buffer.byteLength) return this.buffer;
        if (offset === limit) return EMPTY_BUFFER;
        var buffer = new ArrayBuffer(limit - offset);
        new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
        return buffer;
      };
      ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;
      ByteBufferPrototype.toString = function(encoding, begin, end) {
        if ("undefined" === typeof encoding) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        "number" === typeof encoding && (encoding = "utf8", begin = encoding, end = begin);
        switch (encoding) {
         case "utf8":
          return this.toUTF8(begin, end);

         case "base64":
          return this.toBase64(begin, end);

         case "hex":
          return this.toHex(begin, end);

         case "binary":
          return this.toBinary(begin, end);

         case "debug":
          return this.toDebug();

         case "columns":
          return this.toColumns();

         default:
          throw Error("Unsupported encoding: " + encoding);
        }
      };
      var lxiv = function() {
        var lxiv = {};
        var aout = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 ];
        var ain = [];
        for (var i = 0, k = aout.length; i < k; ++i) ain[aout[i]] = i;
        lxiv.encode = function(src, dst) {
          var b, t;
          while (null !== (b = src())) {
            dst(aout[b >> 2 & 63]);
            t = (3 & b) << 4;
            if (null !== (b = src())) {
              t |= b >> 4 & 15;
              dst(aout[63 & (t | b >> 4 & 15)]);
              t = (15 & b) << 2;
              null !== (b = src()) ? (dst(aout[63 & (t | b >> 6 & 3)]), dst(aout[63 & b])) : (dst(aout[63 & t]), 
              dst(61));
            } else dst(aout[63 & t]), dst(61), dst(61);
          }
        };
        lxiv.decode = function(src, dst) {
          var c, t1, t2;
          function fail(c) {
            throw Error("Illegal character code: " + c);
          }
          while (null !== (c = src())) {
            t1 = ain[c];
            "undefined" === typeof t1 && fail(c);
            if (null !== (c = src())) {
              t2 = ain[c];
              "undefined" === typeof t2 && fail(c);
              dst(t1 << 2 >>> 0 | (48 & t2) >> 4);
              if (null !== (c = src())) {
                t1 = ain[c];
                if ("undefined" === typeof t1) {
                  if (61 === c) break;
                  fail(c);
                }
                dst((15 & t2) << 4 >>> 0 | (60 & t1) >> 2);
                if (null !== (c = src())) {
                  t2 = ain[c];
                  if ("undefined" === typeof t2) {
                    if (61 === c) break;
                    fail(c);
                  }
                  dst((3 & t1) << 6 >>> 0 | t2);
                }
              }
            }
          }
        };
        lxiv.test = function(str) {
          return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
        };
        return lxiv;
      }();
      ByteBufferPrototype.toBase64 = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        begin |= 0;
        end |= 0;
        if (begin < 0 || end > this.capacity || begin > end) throw RangeError("begin, end");
        var sd;
        lxiv.encode(function() {
          return begin < end ? this.view[begin++] : null;
        }.bind(this), sd = stringDestination());
        return sd();
      };
      ByteBuffer.fromBase64 = function(str, littleEndian) {
        if ("string" !== typeof str) throw TypeError("str");
        var bb = new ByteBuffer(str.length / 4 * 3, littleEndian), i = 0;
        lxiv.decode(stringSource(str), function(b) {
          bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
      };
      ByteBuffer.btoa = function(str) {
        return ByteBuffer.fromBinary(str).toBase64();
      };
      ByteBuffer.atob = function(b64) {
        return ByteBuffer.fromBase64(b64).toBinary();
      };
      ByteBufferPrototype.toBinary = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        begin |= 0;
        end |= 0;
        if (begin < 0 || end > this.capacity() || begin > end) throw RangeError("begin, end");
        if (begin === end) return "";
        var chars = [], parts = [];
        while (begin < end) {
          chars.push(this.view[begin++]);
          chars.length >= 1024 && (parts.push(String.fromCharCode.apply(String, chars)), chars = []);
        }
        return parts.join("") + String.fromCharCode.apply(String, chars);
      };
      ByteBuffer.fromBinary = function(str, littleEndian) {
        if ("string" !== typeof str) throw TypeError("str");
        var i = 0, k = str.length, charCode, bb = new ByteBuffer(k, littleEndian);
        while (i < k) {
          charCode = str.charCodeAt(i);
          if (charCode > 255) throw RangeError("illegal char code: " + charCode);
          bb.view[i++] = charCode;
        }
        bb.limit = k;
        return bb;
      };
      ByteBufferPrototype.toDebug = function(columns) {
        var i = -1, k = this.buffer.byteLength, b, hex = "", asc = "", out = "";
        while (i < k) {
          if (-1 !== i) {
            b = this.view[i];
            hex += b < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase();
            columns && (asc += b > 32 && b < 127 ? String.fromCharCode(b) : ".");
          }
          ++i;
          if (columns && i > 0 && i % 16 === 0 && i !== k) {
            while (hex.length < 51) hex += " ";
            out += hex + asc + "\n";
            hex = asc = "";
          }
          i === this.offset && i === this.limit ? hex += i === this.markedOffset ? "!" : "|" : i === this.offset ? hex += i === this.markedOffset ? "[" : "<" : i === this.limit ? hex += i === this.markedOffset ? "]" : ">" : hex += i === this.markedOffset ? "'" : columns || 0 !== i && i !== k ? " " : "";
        }
        if (columns && " " !== hex) {
          while (hex.length < 51) hex += " ";
          out += hex + asc + "\n";
        }
        return columns ? out : hex;
      };
      ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
        var k = str.length, bb = new ByteBuffer((k + 1) / 3 | 0, littleEndian, noAssert);
        var i = 0, j = 0, ch, b, rs = false, ho = false, hm = false, hl = false, fail = false;
        while (i < k) {
          switch (ch = str.charAt(i++)) {
           case "!":
            if (!noAssert) {
              if (ho || hm || hl) {
                fail = true;
                break;
              }
              ho = hm = hl = true;
            }
            bb.offset = bb.markedOffset = bb.limit = j;
            rs = false;
            break;

           case "|":
            if (!noAssert) {
              if (ho || hl) {
                fail = true;
                break;
              }
              ho = hl = true;
            }
            bb.offset = bb.limit = j;
            rs = false;
            break;

           case "[":
            if (!noAssert) {
              if (ho || hm) {
                fail = true;
                break;
              }
              ho = hm = true;
            }
            bb.offset = bb.markedOffset = j;
            rs = false;
            break;

           case "<":
            if (!noAssert) {
              if (ho) {
                fail = true;
                break;
              }
              ho = true;
            }
            bb.offset = j;
            rs = false;
            break;

           case "]":
            if (!noAssert) {
              if (hl || hm) {
                fail = true;
                break;
              }
              hl = hm = true;
            }
            bb.limit = bb.markedOffset = j;
            rs = false;
            break;

           case ">":
            if (!noAssert) {
              if (hl) {
                fail = true;
                break;
              }
              hl = true;
            }
            bb.limit = j;
            rs = false;
            break;

           case "'":
            if (!noAssert) {
              if (hm) {
                fail = true;
                break;
              }
              hm = true;
            }
            bb.markedOffset = j;
            rs = false;
            break;

           case " ":
            rs = false;
            break;

           default:
            if (!noAssert && rs) {
              fail = true;
              break;
            }
            b = parseInt(ch + str.charAt(i++), 16);
            if (!noAssert && (isNaN(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Not a debug encoded string");
            bb.view[j++] = b;
            rs = true;
          }
          if (fail) throw TypeError("Illegal str: Invalid symbol at " + i);
        }
        if (!noAssert) {
          if (!ho || !hl) throw TypeError("Illegal str: Missing offset or limit");
          if (j < bb.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + j + " < " + k);
        }
        return bb;
      };
      ByteBufferPrototype.toHex = function(begin, end) {
        begin = "undefined" === typeof begin ? this.offset : begin;
        end = "undefined" === typeof end ? this.limit : end;
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var out = new Array(end - begin), b;
        while (begin < end) {
          b = this.view[begin++];
          b < 16 ? out.push("0", b.toString(16)) : out.push(b.toString(16));
        }
        return out.join("");
      };
      ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
        if (!noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if (str.length % 2 !== 0) throw TypeError("Illegal str: Length not a multiple of 2");
        }
        var k = str.length, bb = new ByteBuffer(k / 2 | 0, littleEndian), b;
        for (var i = 0, j = 0; i < k; i += 2) {
          b = parseInt(str.substring(i, i + 2), 16);
          if (!noAssert && (!isFinite(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Contains non-hex characters");
          bb.view[j++] = b;
        }
        bb.limit = j;
        return bb;
      };
      var utfx = function() {
        var utfx = {};
        utfx.MAX_CODEPOINT = 1114111;
        utfx.encodeUTF8 = function(src, dst) {
          var cp = null;
          "number" === typeof src && (cp = src, src = function src() {
            return null;
          });
          while (null !== cp || null !== (cp = src())) {
            cp < 128 ? dst(127 & cp) : (cp < 2048 ? dst(cp >> 6 & 31 | 192) : (cp < 65536 ? dst(cp >> 12 & 15 | 224) : (dst(cp >> 18 & 7 | 240), 
            dst(cp >> 12 & 63 | 128)), dst(cp >> 6 & 63 | 128)), dst(63 & cp | 128));
            cp = null;
          }
        };
        utfx.decodeUTF8 = function(src, dst) {
          var a, b, c, d, fail = function fail(b) {
            b = b.slice(0, b.indexOf(null));
            var err = Error(b.toString());
            err.name = "TruncatedError";
            err["bytes"] = b;
            throw err;
          };
          while (null !== (a = src())) if (0 === (128 & a)) dst(a); else if (192 === (224 & a)) null === (b = src()) && fail([ a, b ]), 
          dst((31 & a) << 6 | 63 & b); else if (224 === (240 & a)) (null === (b = src()) || null === (c = src())) && fail([ a, b, c ]), 
          dst((15 & a) << 12 | (63 & b) << 6 | 63 & c); else {
            if (240 !== (248 & a)) throw RangeError("Illegal starting byte: " + a);
            (null === (b = src()) || null === (c = src()) || null === (d = src())) && fail([ a, b, c, d ]), 
            dst((7 & a) << 18 | (63 & b) << 12 | (63 & c) << 6 | 63 & d);
          }
        };
        utfx.UTF16toUTF8 = function(src, dst) {
          var c1, c2 = null;
          while (true) {
            if (null === (c1 = null !== c2 ? c2 : src())) break;
            if (c1 >= 55296 && c1 <= 57343 && null !== (c2 = src()) && c2 >= 56320 && c2 <= 57343) {
              dst(1024 * (c1 - 55296) + c2 - 56320 + 65536);
              c2 = null;
              continue;
            }
            dst(c1);
          }
          null !== c2 && dst(c2);
        };
        utfx.UTF8toUTF16 = function(src, dst) {
          var cp = null;
          "number" === typeof src && (cp = src, src = function src() {
            return null;
          });
          while (null !== cp || null !== (cp = src())) {
            cp <= 65535 ? dst(cp) : (cp -= 65536, dst(55296 + (cp >> 10)), dst(cp % 1024 + 56320));
            cp = null;
          }
        };
        utfx.encodeUTF16toUTF8 = function(src, dst) {
          utfx.UTF16toUTF8(src, function(cp) {
            utfx.encodeUTF8(cp, dst);
          });
        };
        utfx.decodeUTF8toUTF16 = function(src, dst) {
          utfx.decodeUTF8(src, function(cp) {
            utfx.UTF8toUTF16(cp, dst);
          });
        };
        utfx.calculateCodePoint = function(cp) {
          return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
        };
        utfx.calculateUTF8 = function(src) {
          var cp, l = 0;
          while (null !== (cp = src())) l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
          return l;
        };
        utfx.calculateUTF16asUTF8 = function(src) {
          var n = 0, l = 0;
          utfx.UTF16toUTF8(src, function(cp) {
            ++n;
            l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
          });
          return [ n, l ];
        };
        return utfx;
      }();
      ByteBufferPrototype.toUTF8 = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var sd;
        try {
          utfx.decodeUTF8toUTF16(function() {
            return begin < end ? this.view[begin++] : null;
          }.bind(this), sd = stringDestination());
        } catch (e) {
          if (begin !== end) throw RangeError("Illegal range: Truncated data, " + begin + " != " + end);
        }
        return sd();
      };
      ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
        if (!noAssert && "string" !== typeof str) throw TypeError("Illegal str: Not a string");
        var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert), i = 0;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
      };
      return ByteBuffer;
    });
    cc._RF.pop();
  }, {
    long: "long"
  } ],
  loadScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "163f8S+CsNBo4J4ExlboQJ8", "loadScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NetWork_1 = require("./../common/NetWork");
    var HeadDefine_1 = require("./../common/HeadDefine");
    var Language_1 = require("./../common/Language");
    var PlayerData_1 = require("../common/PlayerData");
    var Utils_1 = require("../common/Utils");
    var JSBUtils_1 = require("../common/JSBUtils");
    var AudioManager_1 = require("../common/AudioManager");
    var updateApp_1 = require("./../other/updateApp");
    var fistDownloadGames = [ 8007, 8010 ];
    var loadScene = function(_super) {
      __extends(loadScene, _super);
      function loadScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        _this.infoLabel = null;
        return _this;
      }
      loadScene.prototype.onLoad = function() {
        cc.NetWork = NetWork_1.NetWork.getInstance();
        cc.PlayerData = PlayerData_1.default.getInstance();
        cc.Utils = Utils_1.default.getInstance();
        cc.JSBUtils = JSBUtils_1.default.getInstance();
        cc.AudioManager = AudioManager_1.default.getInstance();
        cc["CmdType"] = NetWork_1.CmdType;
        cc.clientDefine = HeadDefine_1.clientDefine;
        cc.protoType = HeadDefine_1.protoType;
        cc.gameType = HeadDefine_1.gameType;
        cc.LoginType = HeadDefine_1.LoginType;
        cc.ServerStatus = HeadDefine_1.ServerStatus;
        cc.NetWorkState = HeadDefine_1.NetWorkState;
        cc.localStorageType = HeadDefine_1.localStorageType;
        cc.DeviceType = HeadDefine_1.DeviceType;
        cc.Sex = HeadDefine_1.Sex;
      };
      loadScene.prototype.onDestroy = function() {};
      loadScene.prototype.start = function() {
        var _this = this;
        this.infoLabel.string = Language_1.Language.load_gameLoad;
        this.progressBar.progress = 0;
        if (cc.sys.isBrowser) this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
          _this.enterLoginScene();
        }))); else if (cc.sys.isNative) {
          var xhr_1 = new XMLHttpRequest();
          xhr_1.open("GET", NetWork_1.updateURL, true);
          xhr_1.onreadystatechange = function() {
            if (4 === xhr_1.readyState && xhr_1.status >= 200 && xhr_1.status <= 207) {
              var response = xhr_1.responseText;
              console.log("requestVersion :" + response);
              var json = JSON.parse(response);
              var localVersion = JSBUtils_1.default.getInstance().getCustomVersion();
              var serverVersion = Number(json.downloadVersion);
              cc.log("localVersion : " + localVersion + ", serverVersion : " + serverVersion);
              if (serverVersion > localVersion) {
                Utils_1.default.getInstance().getDevicePlatform() == HeadDefine_1.DeviceType.DeviceType_IOS ? cc.sys.openURL(json.iosDownloadAdress) : Utils_1.default.getInstance().getDevicePlatform() == HeadDefine_1.DeviceType.DeviceType_ANDROID ? cc.sys.openURL(json.androidDownloadAddress) : console.log("download installation package error, platform is undefine : " + Utils_1.default.getInstance().getDevicePlatform());
                cc.game.end();
              } else {
                var url = cc.url.raw("resources/project.manifest");
                var data = jsb.fileUtils.getStringFromFile(url);
                var j = JSON.parse(data);
                j.packageUrl = json.hotAddress;
                j.remoteManifestUrl = json.hotAddress + "project.manifest";
                j.remoteVersionUrl = json.hotAddress + "version.manifest";
                Utils_1.default.getInstance().checkVersion(json.hotVersion, j.version) > 0 ? updateApp_1.updateApp.getInstance().updateApp(function(type, value) {
                  switch (type) {
                   case updateApp_1.UpdateCallBackType.UpdateCallBackType_CHECKED:
                    _this.infoLabel.string = Language_1.Language.load_gameLoadManifest;
                    break;

                   case updateApp_1.UpdateCallBackType.UpdateCallBackType_ONUPDATE:
                    _this.progressBar.progress = .01 * Number(value);
                    _this.infoLabel.string = Language_1.Language.load_gameupdate + value + "%";
                    cc.log("更新进度:" + value + "%");
                    break;

                   case updateApp_1.UpdateCallBackType.UpdateCallBackType_UPDATE_ERROR:
                    _this.infoLabel.string = Language_1.Language.load_gameupdateError;
                    break;

                   case updateApp_1.UpdateCallBackType.UpdateCallBackType_UPDATE_END:
                    var searchPaths = jsb.fileUtils.getSearchPaths();
                    Array.prototype.unshift(searchPaths, value);
                    cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
                    jsb.fileUtils.setSearchPaths(searchPaths);
                    cc.game.restart();
                    break;

                   case updateApp_1.UpdateCallBackType.UpdateCallBackType_ALREADY_UP_TO_DATE:
                    _this.enterLoginScene();
                  }
                }, JSON.stringify(j), jsb.fileUtils.getWritablePath() + "lbdwc_hot") : _this.enterLoginScene();
              }
            }
          };
          xhr_1.send(NetWork_1.updateURL);
        }
      };
      loadScene.prototype.firstDownloadGame = function(index) {
        var _this = this;
        if (fistDownloadGames.length <= index) {
          cc.sys.localStorage.setItem(HeadDefine_1.localStorageType.localStorageType_FIRST_DOWNLOAD_GAME, true);
          this.enterLoginScene();
        } else {
          var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + fistDownloadGames[index] + "/";
          updateApp_1.updateApp.getInstance().updateSonApp(function(type, value) {
            switch (type) {
             case updateApp_1.UpdateCallBackType.UpdateCallBackType_CHECKED:
              break;

             case updateApp_1.UpdateCallBackType.UpdateCallBackType_ONUPDATE:
              var progress = (100 * index + Number(value)) / (100 * fistDownloadGames.length);
              cc.log("download " + progress);
              _this.progressBar.progress = progress;
              break;

             case updateApp_1.UpdateCallBackType.UpdateCallBackType_UPDATE_ERROR:
              break;

             case updateApp_1.UpdateCallBackType.UpdateCallBackType_UPDATE_END:
             case updateApp_1.UpdateCallBackType.UpdateCallBackType_ALREADY_UP_TO_DATE:
              setTimeout(function() {
                _this.firstDownloadGame(index + 1);
              }, 1e3);
            }
          }, "http://" + NetWork_1.ip + "/GameVersion/" + fistDownloadGames[index] + "/", storagePath);
        }
      };
      loadScene.prototype.enterLoginScene = function() {
        var _this = this;
        var first = !cc.sys.localStorage.getItem(HeadDefine_1.localStorageType.localStorageType_FIRST_DOWNLOAD_GAME);
        if (cc.sys.isNative && first) {
          this.infoLabel.string = Language_1.Language.load_download_game;
          this.progressBar.progress = 0;
          setTimeout(function() {
            _this.firstDownloadGame(0);
          }, 1e3);
          return;
        }
        cc.director.loadScene("loginScene");
      };
      __decorate([ property({
        type: cc.ProgressBar
      }) ], loadScene.prototype, "progressBar", void 0);
      __decorate([ property({
        type: cc.Label
      }) ], loadScene.prototype, "infoLabel", void 0);
      loadScene = __decorate([ ccclass ], loadScene);
      return loadScene;
    }(cc.Component);
    exports.default = loadScene;
    cc._RF.pop();
  }, {
    "../common/AudioManager": "AudioManager",
    "../common/JSBUtils": "JSBUtils",
    "../common/PlayerData": "PlayerData",
    "../common/Utils": "Utils",
    "./../common/HeadDefine": "HeadDefine",
    "./../common/Language": "Language",
    "./../common/NetWork": "NetWork",
    "./../other/updateApp": "updateApp"
  } ],
  long: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e79796vxipIvbyfUT1LvXO7", "long");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(global, factory) {
      "function" === typeof define && define["amd"] ? define([], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = factory() : (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();
    })(void 0, function() {
      function Long(low, high, unsigned) {
        this.low = 0 | low;
        this.high = 0 | high;
        this.unsigned = !!unsigned;
      }
      Long.prototype.__isLong__;
      Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      function isLong(obj) {
        return true === (obj && obj["__isLong__"]);
      }
      Long.isLong = isLong;
      var INT_CACHE = {};
      var UINT_CACHE = {};
      function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
          value >>>= 0;
          if (cache = 0 <= value && value < 256) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj) return cachedObj;
          }
          obj = fromBits(value, (0 | value) < 0 ? -1 : 0, true);
          cache && (UINT_CACHE[value] = obj);
          return obj;
        }
        value |= 0;
        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj) return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        cache && (INT_CACHE[value] = obj);
        return obj;
      }
      Long.fromInt = fromInt;
      function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value)) return unsigned ? UZERO : ZERO;
        if (unsigned) {
          if (value < 0) return UZERO;
          if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
        } else {
          if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
        }
        if (value < 0) return fromNumber(-value, unsigned).neg();
        return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
      }
      Long.fromNumber = fromNumber;
      function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
      }
      Long.fromBits = fromBits;
      var pow_dbl = Math.pow;
      function fromString(str, unsigned, radix) {
        if (0 === str.length) throw Error("empty string");
        if ("NaN" === str || "Infinity" === str || "+Infinity" === str || "-Infinity" === str) return ZERO;
        "number" === typeof unsigned ? (radix = unsigned, unsigned = false) : unsigned = !!unsigned;
        radix = radix || 10;
        if (radix < 2 || 36 < radix) throw RangeError("radix");
        var p;
        if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
        if (0 === p) return fromString(str.substring(1), unsigned, radix).neg();
        var radixToPower = fromNumber(pow_dbl(radix, 8));
        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
          } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
          }
        }
        result.unsigned = unsigned;
        return result;
      }
      Long.fromString = fromString;
      function fromValue(val) {
        if (val instanceof Long) return val;
        if ("number" === typeof val) return fromNumber(val);
        if ("string" === typeof val) return fromString(val);
        return fromBits(val.low, val.high, val.unsigned);
      }
      Long.fromValue = fromValue;
      var TWO_PWR_16_DBL = 65536;
      var TWO_PWR_24_DBL = 1 << 24;
      var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
      var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
      var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
      var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
      var ZERO = fromInt(0);
      Long.ZERO = ZERO;
      var UZERO = fromInt(0, true);
      Long.UZERO = UZERO;
      var ONE = fromInt(1);
      Long.ONE = ONE;
      var UONE = fromInt(1, true);
      Long.UONE = UONE;
      var NEG_ONE = fromInt(-1);
      Long.NEG_ONE = NEG_ONE;
      var MAX_VALUE = fromBits(-1, 2147483647, false);
      Long.MAX_VALUE = MAX_VALUE;
      var MAX_UNSIGNED_VALUE = fromBits(-1, -1, true);
      Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
      var MIN_VALUE = fromBits(0, -2147483648, false);
      Long.MIN_VALUE = MIN_VALUE;
      var LongPrototype = Long.prototype;
      LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };
      LongPrototype.toNumber = function toNumber() {
        if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
      };
      LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
          if (this.eq(MIN_VALUE)) {
            var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          }
          return "-" + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
        var result = "";
        while (true) {
          var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero()) return digits + result;
          while (digits.length < 6) digits = "0" + digits;
          result = "" + digits + result;
        }
      };
      LongPrototype.getHighBits = function getHighBits() {
        return this.high;
      };
      LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
      };
      LongPrototype.getLowBits = function getLowBits() {
        return this.low;
      };
      LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
      };
      LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = 0 != this.high ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--) if (0 != (val & 1 << bit)) break;
        return 0 != this.high ? bit + 33 : bit + 1;
      };
      LongPrototype.isZero = function isZero() {
        return 0 === this.high && 0 === this.low;
      };
      LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
      };
      LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
      };
      LongPrototype.isOdd = function isOdd() {
        return 1 === (1 & this.low);
      };
      LongPrototype.isEven = function isEven() {
        return 0 === (1 & this.low);
      };
      LongPrototype.equals = function equals(other) {
        isLong(other) || (other = fromValue(other));
        if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
        return this.high === other.high && this.low === other.low;
      };
      LongPrototype.eq = LongPrototype.equals;
      LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(other);
      };
      LongPrototype.neq = LongPrototype.notEquals;
      LongPrototype.lessThan = function lessThan(other) {
        return this.comp(other) < 0;
      };
      LongPrototype.lt = LongPrototype.lessThan;
      LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(other) <= 0;
      };
      LongPrototype.lte = LongPrototype.lessThanOrEqual;
      LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(other) > 0;
      };
      LongPrototype.gt = LongPrototype.greaterThan;
      LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(other) >= 0;
      };
      LongPrototype.gte = LongPrototype.greaterThanOrEqual;
      LongPrototype.compare = function compare(other) {
        isLong(other) || (other = fromValue(other));
        if (this.eq(other)) return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg) return -1;
        if (!thisNeg && otherNeg) return 1;
        if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
        return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
      };
      LongPrototype.comp = LongPrototype.compare;
      LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
        return this.not().add(ONE);
      };
      LongPrototype.neg = LongPrototype.negate;
      LongPrototype.add = function add(addend) {
        isLong(addend) || (addend = fromValue(addend));
        var a48 = this.high >>> 16;
        var a32 = 65535 & this.high;
        var a16 = this.low >>> 16;
        var a00 = 65535 & this.low;
        var b48 = addend.high >>> 16;
        var b32 = 65535 & addend.high;
        var b16 = addend.low >>> 16;
        var b00 = 65535 & addend.low;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 + b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.subtract = function subtract(subtrahend) {
        isLong(subtrahend) || (subtrahend = fromValue(subtrahend));
        return this.add(subtrahend.neg());
      };
      LongPrototype.sub = LongPrototype.subtract;
      LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero()) return ZERO;
        isLong(multiplier) || (multiplier = fromValue(multiplier));
        if (multiplier.isZero()) return ZERO;
        if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) return multiplier.isNegative() ? this.neg().mul(multiplier.neg()) : this.neg().mul(multiplier).neg();
        if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = 65535 & this.high;
        var a16 = this.low >>> 16;
        var a00 = 65535 & this.low;
        var b48 = multiplier.high >>> 16;
        var b32 = 65535 & multiplier.high;
        var b16 = multiplier.low >>> 16;
        var b00 = 65535 & multiplier.low;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.mul = LongPrototype.multiply;
      LongPrototype.divide = function divide(divisor) {
        isLong(divisor) || (divisor = fromValue(divisor));
        if (divisor.isZero()) throw Error("division by zero");
        if (this.isZero()) return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (this.unsigned) {
          divisor.unsigned || (divisor = divisor.toUnsigned());
          if (divisor.gt(this)) return UZERO;
          if (divisor.gt(this.shru(1))) return UONE;
          res = UZERO;
        } else {
          if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE;
            if (divisor.eq(MIN_VALUE)) return ONE;
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) return divisor.isNegative() ? ONE : NEG_ONE;
            rem = this.sub(divisor.mul(approx));
            res = approx.add(rem.div(divisor));
            return res;
          }
          if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
          if (this.isNegative()) {
            if (divisor.isNegative()) return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
          }
          if (divisor.isNegative()) return this.div(divisor.neg()).neg();
          res = ZERO;
        }
        rem = this;
        while (rem.gte(divisor)) {
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
          var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
          }
          approxRes.isZero() && (approxRes = ONE);
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      LongPrototype.div = LongPrototype.divide;
      LongPrototype.modulo = function modulo(divisor) {
        isLong(divisor) || (divisor = fromValue(divisor));
        return this.sub(this.div(divisor).mul(divisor));
      };
      LongPrototype.mod = LongPrototype.modulo;
      LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
      };
      LongPrototype.and = function and(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      LongPrototype.or = function or(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      LongPrototype.xor = function xor(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      LongPrototype.shiftLeft = function shiftLeft(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        return 0 === (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned) : fromBits(0, this.low << numBits - 32, this.unsigned);
      };
      LongPrototype.shl = LongPrototype.shiftLeft;
      LongPrototype.shiftRight = function shiftRight(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        return 0 === (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned) : fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
      };
      LongPrototype.shr = LongPrototype.shiftRight;
      LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        numBits &= 63;
        if (0 === numBits) return this;
        var high = this.high;
        if (numBits < 32) {
          var low = this.low;
          return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        }
        return fromBits(32 === numBits ? high : high >>> numBits - 32, 0, this.unsigned);
      };
      LongPrototype.shru = LongPrototype.shiftRightUnsigned;
      LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned) return this;
        return fromBits(this.low, this.high, false);
      };
      LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned) return this;
        return fromBits(this.low, this.high, true);
      };
      return Long;
    });
    cc._RF.pop();
  }, {} ],
  "protobuf.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b66d1pmeoZNHrioUNkBx+mW", "protobuf.min");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    !function(t, r) {
      !function(r, e, n) {
        function i(t) {
          var n = e[t];
          return n || r[t][0].call(n = e[t] = {
            exports: {}
          }, i, n, n.exports), n.exports;
        }
        var o = t.protobuf = i(n[0]);
        "function" == typeof define && define.amd && define([ "long" ], function(t) {
          return t && t.isLong && (o.util.Long = t, o.configure()), o;
        }), "object" == ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module.exports && (module.exports = o);
      }({
        1: [ function(t, r) {
          function e(t, r) {
            for (var e = Array(arguments.length - 1), n = 0, i = 2, o = !0; i < arguments.length; ) e[n++] = arguments[i++];
            return new Promise(function(i, s) {
              e[n] = function(t) {
                if (o) if (o = !1, t) s(t); else {
                  for (var r = Array(arguments.length - 1), e = 0; e < r.length; ) r[e++] = arguments[e];
                  i.apply(null, r);
                }
              };
              try {
                t.apply(r || null, e);
              } catch (t) {
                o && (o = !1, s(t));
              }
            });
          }
          r.exports = e;
        }, {} ],
        2: [ function(t, e, n) {
          var i = n;
          i.length = function(t) {
            var r = t.length;
            if (!r) return 0;
            for (var e = 0; --r % 4 > 1 && "=" === t.charAt(r); ) ++e;
            return Math.ceil(3 * t.length) / 4 - e;
          };
          for (var o = Array(64), s = Array(123), u = 0; u < 64; ) s[o[u] = u < 26 ? u + 65 : u < 52 ? u + 71 : u < 62 ? u - 4 : u - 59 | 43] = u++;
          i.encode = function(t, r, e) {
            for (var n, i = null, s = [], u = 0, f = 0; r < e; ) {
              var h = t[r++];
              switch (f) {
               case 0:
                s[u++] = o[h >> 2], n = (3 & h) << 4, f = 1;
                break;

               case 1:
                s[u++] = o[n | h >> 4], n = (15 & h) << 2, f = 2;
                break;

               case 2:
                s[u++] = o[n | h >> 6], s[u++] = o[63 & h], f = 0;
              }
              u > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, s)), u = 0);
            }
            return f && (s[u++] = o[n], s[u++] = 61, 1 === f && (s[u++] = 61)), i ? (u && i.push(String.fromCharCode.apply(String, s.slice(0, u))), 
            i.join("")) : String.fromCharCode.apply(String, s.slice(0, u));
          };
          i.decode = function(t, e, n) {
            for (var i, o = n, u = 0, f = 0; f < t.length; ) {
              var h = t.charCodeAt(f++);
              if (61 === h && u > 1) break;
              if ((h = s[h]) === r) throw Error("invalid encoding");
              switch (u) {
               case 0:
                i = h, u = 1;
                break;

               case 1:
                e[n++] = i << 2 | (48 & h) >> 4, i = h, u = 2;
                break;

               case 2:
                e[n++] = (15 & i) << 4 | (60 & h) >> 2, i = h, u = 3;
                break;

               case 3:
                e[n++] = (3 & i) << 6 | h, u = 0;
              }
            }
            if (1 === u) throw Error("invalid encoding");
            return n - o;
          }, i.test = function(t) {
            return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(t);
          };
        }, {} ],
        3: [ function(t, e) {
          function n() {
            this.a = {};
          }
          e.exports = n, n.prototype.on = function(t, r, e) {
            return (this.a[t] || (this.a[t] = [])).push({
              fn: r,
              ctx: e || this
            }), this;
          }, n.prototype.off = function(t, e) {
            if (t === r) this.a = {}; else if (e === r) this.a[t] = []; else for (var n = this.a[t], i = 0; i < n.length; ) n[i].fn === e ? n.splice(i, 1) : ++i;
            return this;
          }, n.prototype.emit = function(t) {
            var r = this.a[t];
            if (r) {
              for (var e = [], n = 1; n < arguments.length; ) e.push(arguments[n++]);
              for (n = 0; n < r.length; ) r[n].fn.apply(r[n++].ctx, e);
            }
            return this;
          };
        }, {} ],
        4: [ function(t, r) {
          function e(t) {
            return "undefined" != typeof Float32Array ? function() {
              function r(t, r, e) {
                o[0] = t, r[e] = s[0], r[e + 1] = s[1], r[e + 2] = s[2], r[e + 3] = s[3];
              }
              function e(t, r, e) {
                o[0] = t, r[e] = s[3], r[e + 1] = s[2], r[e + 2] = s[1], r[e + 3] = s[0];
              }
              function n(t, r) {
                return s[0] = t[r], s[1] = t[r + 1], s[2] = t[r + 2], s[3] = t[r + 3], o[0];
              }
              function i(t, r) {
                return s[3] = t[r], s[2] = t[r + 1], s[1] = t[r + 2], s[0] = t[r + 3], o[0];
              }
              var o = new Float32Array([ -0 ]), s = new Uint8Array(o.buffer), u = 128 === s[3];
              t.writeFloatLE = u ? r : e, t.writeFloatBE = u ? e : r, t.readFloatLE = u ? n : i, 
              t.readFloatBE = u ? i : n;
            }() : function() {
              function r(t, r, e, n) {
                var i = r < 0 ? 1 : 0;
                if (i && (r = -r), 0 === r) t(1 / r > 0 ? 0 : 2147483648, e, n); else if (isNaN(r)) t(2143289344, e, n); else if (r > 3.4028234663852886e38) t((i << 31 | 2139095040) >>> 0, e, n); else if (r < 1.1754943508222875e-38) t((i << 31 | Math.round(r / 1.401298464324817e-45)) >>> 0, e, n); else {
                  var o = Math.floor(Math.log(r) / Math.LN2), s = 8388607 & Math.round(r * Math.pow(2, -o) * 8388608);
                  t((i << 31 | o + 127 << 23 | s) >>> 0, e, n);
                }
              }
              function e(t, r, e) {
                var n = t(r, e), i = 2 * (n >> 31) + 1, o = n >>> 23 & 255, s = 8388607 & n;
                return 255 === o ? s ? NaN : i * (1 / 0) : 0 === o ? 1.401298464324817e-45 * i * s : i * Math.pow(2, o - 150) * (s + 8388608);
              }
              t.writeFloatLE = r.bind(null, n), t.writeFloatBE = r.bind(null, i), t.readFloatLE = e.bind(null, o), 
              t.readFloatBE = e.bind(null, s);
            }(), "undefined" != typeof Float64Array ? function() {
              function r(t, r, e) {
                o[0] = t, r[e] = s[0], r[e + 1] = s[1], r[e + 2] = s[2], r[e + 3] = s[3], r[e + 4] = s[4], 
                r[e + 5] = s[5], r[e + 6] = s[6], r[e + 7] = s[7];
              }
              function e(t, r, e) {
                o[0] = t, r[e] = s[7], r[e + 1] = s[6], r[e + 2] = s[5], r[e + 3] = s[4], r[e + 4] = s[3], 
                r[e + 5] = s[2], r[e + 6] = s[1], r[e + 7] = s[0];
              }
              function n(t, r) {
                return s[0] = t[r], s[1] = t[r + 1], s[2] = t[r + 2], s[3] = t[r + 3], s[4] = t[r + 4], 
                s[5] = t[r + 5], s[6] = t[r + 6], s[7] = t[r + 7], o[0];
              }
              function i(t, r) {
                return s[7] = t[r], s[6] = t[r + 1], s[5] = t[r + 2], s[4] = t[r + 3], s[3] = t[r + 4], 
                s[2] = t[r + 5], s[1] = t[r + 6], s[0] = t[r + 7], o[0];
              }
              var o = new Float64Array([ -0 ]), s = new Uint8Array(o.buffer), u = 128 === s[7];
              t.writeDoubleLE = u ? r : e, t.writeDoubleBE = u ? e : r, t.readDoubleLE = u ? n : i, 
              t.readDoubleBE = u ? i : n;
            }() : function() {
              function r(t, r, e, n, i, o) {
                var s = n < 0 ? 1 : 0;
                if (s && (n = -n), 0 === n) t(0, i, o + r), t(1 / n > 0 ? 0 : 2147483648, i, o + e); else if (isNaN(n)) t(0, i, o + r), 
                t(2146959360, i, o + e); else if (n > 1.7976931348623157e308) t(0, i, o + r), t((s << 31 | 2146435072) >>> 0, i, o + e); else {
                  var u;
                  if (n < 2.2250738585072014e-308) u = n / 5e-324, t(u >>> 0, i, o + r), t((s << 31 | u / 4294967296) >>> 0, i, o + e); else {
                    var f = Math.floor(Math.log(n) / Math.LN2);
                    1024 === f && (f = 1023), u = n * Math.pow(2, -f), t(4503599627370496 * u >>> 0, i, o + r), 
                    t((s << 31 | f + 1023 << 20 | 1048576 * u & 1048575) >>> 0, i, o + e);
                  }
                }
              }
              function e(t, r, e, n, i) {
                var o = t(n, i + r), s = t(n, i + e), u = 2 * (s >> 31) + 1, f = s >>> 20 & 2047, h = 4294967296 * (1048575 & s) + o;
                return 2047 === f ? h ? NaN : u * (1 / 0) : 0 === f ? 5e-324 * u * h : u * Math.pow(2, f - 1075) * (h + 4503599627370496);
              }
              t.writeDoubleLE = r.bind(null, n, 0, 4), t.writeDoubleBE = r.bind(null, i, 4, 0), 
              t.readDoubleLE = e.bind(null, o, 0, 4), t.readDoubleBE = e.bind(null, s, 4, 0);
            }(), t;
          }
          function n(t, r, e) {
            r[e] = 255 & t, r[e + 1] = t >>> 8 & 255, r[e + 2] = t >>> 16 & 255, r[e + 3] = t >>> 24;
          }
          function i(t, r, e) {
            r[e] = t >>> 24, r[e + 1] = t >>> 16 & 255, r[e + 2] = t >>> 8 & 255, r[e + 3] = 255 & t;
          }
          function o(t, r) {
            return (t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24) >>> 0;
          }
          function s(t, r) {
            return (t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]) >>> 0;
          }
          r.exports = e(e);
        }, {} ],
        5: [ function(t, r, e) {
          function n(t) {
            try {
              var r = eval("quire".replace(/^/, "re"))(t);
              if (r && (r.length || Object.keys(r).length)) return r;
            } catch (t) {}
            return null;
          }
          r.exports = n;
        }, {} ],
        6: [ function(t, r) {
          function e(t, r, e) {
            var n = e || 8192, i = n >>> 1, o = null, s = n;
            return function(e) {
              if (e < 1 || e > i) return t(e);
              s + e > n && (o = t(n), s = 0);
              var u = r.call(o, s, s += e);
              return 7 & s && (s = 1 + (7 | s)), u;
            };
          }
          r.exports = e;
        }, {} ],
        7: [ function(t, r, e) {
          var n = e;
          n.length = function(t) {
            for (var r = 0, e = 0, n = 0; n < t.length; ++n) e = t.charCodeAt(n), e < 128 ? r += 1 : e < 2048 ? r += 2 : 55296 == (64512 & e) && 56320 == (64512 & t.charCodeAt(n + 1)) ? (++n, 
            r += 4) : r += 3;
            return r;
          }, n.read = function(t, r, e) {
            if (e - r < 1) return "";
            for (var n, i = null, o = [], s = 0; r < e; ) n = t[r++], n < 128 ? o[s++] = n : n > 191 && n < 224 ? o[s++] = (31 & n) << 6 | 63 & t[r++] : n > 239 && n < 365 ? (n = ((7 & n) << 18 | (63 & t[r++]) << 12 | (63 & t[r++]) << 6 | 63 & t[r++]) - 65536, 
            o[s++] = 55296 + (n >> 10), o[s++] = 56320 + (1023 & n)) : o[s++] = (15 & n) << 12 | (63 & t[r++]) << 6 | 63 & t[r++], 
            s > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, o)), s = 0);
            return i ? (s && i.push(String.fromCharCode.apply(String, o.slice(0, s))), i.join("")) : String.fromCharCode.apply(String, o.slice(0, s));
          }, n.write = function(t, r, e) {
            for (var n, i, o = e, s = 0; s < t.length; ++s) n = t.charCodeAt(s), n < 128 ? r[e++] = n : (n < 2048 ? r[e++] = n >> 6 | 192 : (55296 == (64512 & n) && 56320 == (64512 & (i = t.charCodeAt(s + 1))) ? (n = 65536 + ((1023 & n) << 10) + (1023 & i), 
            ++s, r[e++] = n >> 18 | 240, r[e++] = n >> 12 & 63 | 128) : r[e++] = n >> 12 | 224, 
            r[e++] = n >> 6 & 63 | 128), r[e++] = 63 & n | 128);
            return e - o;
          };
        }, {} ],
        8: [ function(t, r, e) {
          function n() {
            i.Reader.b(i.BufferReader), i.util.b();
          }
          var i = e;
          i.build = "minimal", i.Writer = t(16), i.BufferWriter = t(17), i.Reader = t(9), 
          i.BufferReader = t(10), i.util = t(15), i.rpc = t(12), i.roots = t(11), i.configure = n, 
          i.Writer.b(i.BufferWriter), n();
        }, {
          10: 10,
          11: 11,
          12: 12,
          15: 15,
          16: 16,
          17: 17,
          9: 9
        } ],
        9: [ function(t, r) {
          function e(t, r) {
            return RangeError("index out of range: " + t.pos + " + " + (r || 1) + " > " + t.len);
          }
          function n(t) {
            this.buf = t, this.pos = 0, this.len = t.length;
          }
          function i() {
            var t = new h(0, 0), r = 0;
            if (!(this.len - this.pos > 4)) {
              for (;r < 3; ++r) {
                if (this.pos >= this.len) throw e(this);
                if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * r) >>> 0, this.buf[this.pos++] < 128) return t;
              }
              return t.lo = (t.lo | (127 & this.buf[this.pos++]) << 7 * r) >>> 0, t;
            }
            for (;r < 4; ++r) if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * r) >>> 0, 
            this.buf[this.pos++] < 128) return t;
            if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 28) >>> 0, t.hi = (t.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, 
            this.buf[this.pos++] < 128) return t;
            if (r = 0, this.len - this.pos > 4) {
              for (;r < 5; ++r) if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * r + 3) >>> 0, 
              this.buf[this.pos++] < 128) return t;
            } else for (;r < 5; ++r) {
              if (this.pos >= this.len) throw e(this);
              if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * r + 3) >>> 0, this.buf[this.pos++] < 128) return t;
            }
            throw Error("invalid varint encoding");
          }
          function o(t, r) {
            return (t[r - 4] | t[r - 3] << 8 | t[r - 2] << 16 | t[r - 1] << 24) >>> 0;
          }
          function s() {
            if (this.pos + 8 > this.len) throw e(this, 8);
            return new h(o(this.buf, this.pos += 4), o(this.buf, this.pos += 4));
          }
          r.exports = n;
          var u, f = t(15), h = f.LongBits, a = f.utf8, l = "undefined" != typeof Uint8Array ? function(t) {
            if (t instanceof Uint8Array || Array.isArray(t)) return new n(t);
            throw Error("illegal buffer");
          } : function(t) {
            if (Array.isArray(t)) return new n(t);
            throw Error("illegal buffer");
          };
          n.create = f.Buffer ? function(t) {
            return (n.create = function(t) {
              return f.Buffer.isBuffer(t) ? new u(t) : l(t);
            })(t);
          } : l, n.prototype.c = f.Array.prototype.subarray || f.Array.prototype.slice, n.prototype.uint32 = function() {
            var t = 4294967295;
            return function() {
              if (t = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return t;
              if (t = (t | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return t;
              if (t = (t | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return t;
              if (t = (t | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return t;
              if (t = (t | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return t;
              if ((this.pos += 5) > this.len) throw this.pos = this.len, e(this, 10);
              return t;
            };
          }(), n.prototype.int32 = function() {
            return 0 | this.uint32();
          }, n.prototype.sint32 = function() {
            var t = this.uint32();
            return t >>> 1 ^ -(1 & t) | 0;
          }, n.prototype.bool = function() {
            return 0 !== this.uint32();
          }, n.prototype.fixed32 = function() {
            if (this.pos + 4 > this.len) throw e(this, 4);
            return o(this.buf, this.pos += 4);
          }, n.prototype.sfixed32 = function() {
            if (this.pos + 4 > this.len) throw e(this, 4);
            return 0 | o(this.buf, this.pos += 4);
          }, n.prototype.float = function() {
            if (this.pos + 4 > this.len) throw e(this, 4);
            var t = f.float.readFloatLE(this.buf, this.pos);
            return this.pos += 4, t;
          }, n.prototype.double = function() {
            if (this.pos + 8 > this.len) throw e(this, 4);
            var t = f.float.readDoubleLE(this.buf, this.pos);
            return this.pos += 8, t;
          }, n.prototype.bytes = function() {
            var t = this.uint32(), r = this.pos, n = this.pos + t;
            if (n > this.len) throw e(this, t);
            return this.pos += t, Array.isArray(this.buf) ? this.buf.slice(r, n) : r === n ? new this.buf.constructor(0) : this.c.call(this.buf, r, n);
          }, n.prototype.string = function() {
            var t = this.bytes();
            return a.read(t, 0, t.length);
          }, n.prototype.skip = function(t) {
            if ("number" == typeof t) {
              if (this.pos + t > this.len) throw e(this, t);
              this.pos += t;
            } else do {
              if (this.pos >= this.len) throw e(this);
            } while (128 & this.buf[this.pos++]);
            return this;
          }, n.prototype.skipType = function(t) {
            switch (t) {
             case 0:
              this.skip();
              break;

             case 1:
              this.skip(8);
              break;

             case 2:
              this.skip(this.uint32());
              break;

             case 3:
              for (;;) {
                if (4 == (t = 7 & this.uint32())) break;
                this.skipType(t);
              }
              break;

             case 5:
              this.skip(4);
              break;

             default:
              throw Error("invalid wire type " + t + " at offset " + this.pos);
            }
            return this;
          }, n.b = function(t) {
            u = t;
            var r = f.Long ? "toLong" : "toNumber";
            f.merge(n.prototype, {
              int64: function int64() {
                return i.call(this)[r](!1);
              },
              uint64: function uint64() {
                return i.call(this)[r](!0);
              },
              sint64: function sint64() {
                return i.call(this).zzDecode()[r](!1);
              },
              fixed64: function fixed64() {
                return s.call(this)[r](!0);
              },
              sfixed64: function sfixed64() {
                return s.call(this)[r](!1);
              }
            });
          };
        }, {
          15: 15
        } ],
        10: [ function(t, r) {
          function e(t) {
            n.call(this, t);
          }
          r.exports = e;
          var n = t(9);
          (e.prototype = Object.create(n.prototype)).constructor = e;
          var i = t(15);
          i.Buffer && (e.prototype.c = i.Buffer.prototype.slice), e.prototype.string = function() {
            var t = this.uint32();
            return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + t, this.len));
          };
        }, {
          15: 15,
          9: 9
        } ],
        11: [ function(t, r) {
          r.exports = {};
        }, {} ],
        12: [ function(t, r, e) {
          e.Service = t(13);
        }, {
          13: 13
        } ],
        13: [ function(t, e) {
          function n(t, r, e) {
            if ("function" != typeof t) throw TypeError("rpcImpl must be a function");
            i.EventEmitter.call(this), this.rpcImpl = t, this.requestDelimited = !!r, this.responseDelimited = !!e;
          }
          e.exports = n;
          var i = t(15);
          (n.prototype = Object.create(i.EventEmitter.prototype)).constructor = n, n.prototype.rpcCall = function t(e, n, o, s, u) {
            if (!s) throw TypeError("request must be specified");
            var f = this;
            if (!u) return i.asPromise(t, f, e, n, o, s);
            if (!f.rpcImpl) return setTimeout(function() {
              u(Error("already ended"));
            }, 0), r;
            try {
              return f.rpcImpl(e, n[f.requestDelimited ? "encodeDelimited" : "encode"](s).finish(), function(t, n) {
                if (t) return f.emit("error", t, e), u(t);
                if (null === n) return f.end(!0), r;
                if (!(n instanceof o)) try {
                  n = o[f.responseDelimited ? "decodeDelimited" : "decode"](n);
                } catch (t) {
                  return f.emit("error", t, e), u(t);
                }
                return f.emit("data", n, e), u(null, n);
              });
            } catch (t) {
              return f.emit("error", t, e), setTimeout(function() {
                u(t);
              }, 0), r;
            }
          }, n.prototype.end = function(t) {
            return this.rpcImpl && (t || this.rpcImpl(null, null, null), this.rpcImpl = null, 
            this.emit("end").off()), this;
          };
        }, {
          15: 15
        } ],
        14: [ function(t, r) {
          function e(t, r) {
            this.lo = t >>> 0, this.hi = r >>> 0;
          }
          r.exports = e;
          var n = t(15), i = e.zero = new e(0, 0);
          i.toNumber = function() {
            return 0;
          }, i.zzEncode = i.zzDecode = function() {
            return this;
          }, i.length = function() {
            return 1;
          };
          var o = e.zeroHash = "\0\0\0\0\0\0\0\0";
          e.fromNumber = function(t) {
            if (0 === t) return i;
            var r = t < 0;
            r && (t = -t);
            var n = t >>> 0, o = (t - n) / 4294967296 >>> 0;
            return r && (o = ~o >>> 0, n = ~n >>> 0, ++n > 4294967295 && (n = 0, ++o > 4294967295 && (o = 0))), 
            new e(n, o);
          }, e.from = function(t) {
            if ("number" == typeof t) return e.fromNumber(t);
            if (n.isString(t)) {
              if (!n.Long) return e.fromNumber(parseInt(t, 10));
              t = n.Long.fromString(t);
            }
            return t.low || t.high ? new e(t.low >>> 0, t.high >>> 0) : i;
          }, e.prototype.toNumber = function(t) {
            if (!t && this.hi >>> 31) {
              var r = 1 + ~this.lo >>> 0, e = ~this.hi >>> 0;
              return r || (e = e + 1 >>> 0), -(r + 4294967296 * e);
            }
            return this.lo + 4294967296 * this.hi;
          }, e.prototype.toLong = function(t) {
            return n.Long ? new n.Long(0 | this.lo, 0 | this.hi, !!t) : {
              low: 0 | this.lo,
              high: 0 | this.hi,
              unsigned: !!t
            };
          };
          var s = String.prototype.charCodeAt;
          e.fromHash = function(t) {
            return t === o ? i : new e((s.call(t, 0) | s.call(t, 1) << 8 | s.call(t, 2) << 16 | s.call(t, 3) << 24) >>> 0, (s.call(t, 4) | s.call(t, 5) << 8 | s.call(t, 6) << 16 | s.call(t, 7) << 24) >>> 0);
          }, e.prototype.toHash = function() {
            return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
          }, e.prototype.zzEncode = function() {
            var t = this.hi >> 31;
            return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ t) >>> 0, this.lo = (this.lo << 1 ^ t) >>> 0, 
            this;
          }, e.prototype.zzDecode = function() {
            var t = -(1 & this.lo);
            return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ t) >>> 0, this.hi = (this.hi >>> 1 ^ t) >>> 0, 
            this;
          }, e.prototype.length = function() {
            var t = this.lo, r = (this.lo >>> 28 | this.hi << 4) >>> 0, e = this.hi >>> 24;
            return 0 === e ? 0 === r ? t < 16384 ? t < 128 ? 1 : 2 : t < 2097152 ? 3 : 4 : r < 16384 ? r < 128 ? 5 : 6 : r < 2097152 ? 7 : 8 : e < 128 ? 9 : 10;
          };
        }, {
          15: 15
        } ],
        15: [ function(e, n, i) {
          function o(t, e, n) {
            for (var i = Object.keys(e), o = 0; o < i.length; ++o) t[i[o]] !== r && n || (t[i[o]] = e[i[o]]);
            return t;
          }
          function s(t) {
            function r(t, e) {
              if (!(this instanceof r)) return new r(t, e);
              Object.defineProperty(this, "message", {
                get: function get() {
                  return t;
                }
              }), Error.captureStackTrace ? Error.captureStackTrace(this, r) : Object.defineProperty(this, "stack", {
                value: Error().stack || ""
              }), e && o(this, e);
            }
            return (r.prototype = Object.create(Error.prototype)).constructor = r, Object.defineProperty(r.prototype, "name", {
              get: function get() {
                return t;
              }
            }), r.prototype.toString = function() {
              return this.name + ": " + this.message;
            }, r;
          }
          var u = i;
          u.asPromise = e(1), u.base64 = e(2), u.EventEmitter = e(3), u.float = e(4), u.inquire = e(5), 
          u.utf8 = e(7), u.pool = e(6), u.LongBits = e(14), u.emptyArray = Object.freeze ? Object.freeze([]) : [], 
          u.emptyObject = Object.freeze ? Object.freeze({}) : {}, u.isNode = !!(t.process && t.process.versions && t.process.versions.node), 
          u.isInteger = Number.isInteger || function(t) {
            return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
          }, u.isString = function(t) {
            return "string" == typeof t || t instanceof String;
          }, u.isObject = function(t) {
            return t && "object" == ("undefined" === typeof t ? "undefined" : _typeof(t));
          }, u.isset = u.isSet = function(t, r) {
            var e = t[r];
            return !(null == e || !t.hasOwnProperty(r)) && ("object" != ("undefined" === typeof e ? "undefined" : _typeof(e)) || (Array.isArray(e) ? e.length : Object.keys(e).length) > 0);
          }, u.Buffer = function() {
            try {
              var t = u.inquire("buffer").Buffer;
              return t.prototype.utf8Write ? t : null;
            } catch (t) {
              return null;
            }
          }(), u.d = null, u.e = null, u.newBuffer = function(t) {
            return "number" == typeof t ? u.Buffer ? u.e(t) : new u.Array(t) : u.Buffer ? u.d(t) : "undefined" == typeof Uint8Array ? t : new Uint8Array(t);
          }, u.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, u.Long = t.dcodeIO && t.dcodeIO.Long || u.inquire("long"), 
          u.key2Re = /^true|false|0|1$/, u.key32Re = /^-?(?:0|[1-9][0-9]*)$/, u.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, 
          u.longToHash = function(t) {
            return t ? u.LongBits.from(t).toHash() : u.LongBits.zeroHash;
          }, u.longFromHash = function(t, r) {
            var e = u.LongBits.fromHash(t);
            return u.Long ? u.Long.fromBits(e.lo, e.hi, r) : e.toNumber(!!r);
          }, u.merge = o, u.lcFirst = function(t) {
            return t.charAt(0).toLowerCase() + t.substring(1);
          }, u.newError = s, u.ProtocolError = s("ProtocolError"), u.oneOfGetter = function(t) {
            for (var e = {}, n = 0; n < t.length; ++n) e[t[n]] = 1;
            return function() {
              for (var t = Object.keys(this), n = t.length - 1; n > -1; --n) if (1 === e[t[n]] && this[t[n]] !== r && null !== this[t[n]]) return t[n];
            };
          }, u.oneOfSetter = function(t) {
            return function(r) {
              for (var e = 0; e < t.length; ++e) t[e] !== r && delete this[t[e]];
            };
          }, u.toJSONOptions = {
            longs: String,
            enums: String,
            bytes: String,
            json: !0
          }, u.b = function() {
            var t = u.Buffer;
            if (!t) return void (u.d = u.e = null);
            u.d = t.from !== Uint8Array.from && t.from || function(r, e) {
              return new t(r, e);
            }, u.e = t.allocUnsafe || function(r) {
              return new t(r);
            };
          };
        }, {
          1: 1,
          14: 14,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7
        } ],
        16: [ function(t, e) {
          function n(t, e, n) {
            this.fn = t, this.len = e, this.next = r, this.val = n;
          }
          function i() {}
          function o(t) {
            this.head = t.head, this.tail = t.tail, this.len = t.len, this.next = t.states;
          }
          function s() {
            this.len = 0, this.head = new n(i, 0, 0), this.tail = this.head, this.states = null;
          }
          function u(t, r, e) {
            r[e] = 255 & t;
          }
          function f(t, r, e) {
            for (;t > 127; ) r[e++] = 127 & t | 128, t >>>= 7;
            r[e] = t;
          }
          function h(t, e) {
            this.len = t, this.next = r, this.val = e;
          }
          function a(t, r, e) {
            for (;t.hi; ) r[e++] = 127 & t.lo | 128, t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0, 
            t.hi >>>= 7;
            for (;t.lo > 127; ) r[e++] = 127 & t.lo | 128, t.lo = t.lo >>> 7;
            r[e++] = t.lo;
          }
          function l(t, r, e) {
            r[e] = 255 & t, r[e + 1] = t >>> 8 & 255, r[e + 2] = t >>> 16 & 255, r[e + 3] = t >>> 24;
          }
          e.exports = s;
          var c, p = t(15), y = p.LongBits, d = p.base64, b = p.utf8;
          s.create = p.Buffer ? function() {
            return (s.create = function() {
              return new c();
            })();
          } : function() {
            return new s();
          }, s.alloc = function(t) {
            return new p.Array(t);
          }, p.Array !== Array && (s.alloc = p.pool(s.alloc, p.Array.prototype.subarray)), 
          s.prototype.f = function(t, r, e) {
            return this.tail = this.tail.next = new n(t, r, e), this.len += r, this;
          }, h.prototype = Object.create(n.prototype), h.prototype.fn = f, s.prototype.uint32 = function(t) {
            return this.len += (this.tail = this.tail.next = new h((t >>>= 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len, 
            this;
          }, s.prototype.int32 = function(t) {
            return t < 0 ? this.f(a, 10, y.fromNumber(t)) : this.uint32(t);
          }, s.prototype.sint32 = function(t) {
            return this.uint32((t << 1 ^ t >> 31) >>> 0);
          }, s.prototype.uint64 = function(t) {
            var r = y.from(t);
            return this.f(a, r.length(), r);
          }, s.prototype.int64 = s.prototype.uint64, s.prototype.sint64 = function(t) {
            var r = y.from(t).zzEncode();
            return this.f(a, r.length(), r);
          }, s.prototype.bool = function(t) {
            return this.f(u, 1, t ? 1 : 0);
          }, s.prototype.fixed32 = function(t) {
            return this.f(l, 4, t >>> 0);
          }, s.prototype.sfixed32 = s.prototype.fixed32, s.prototype.fixed64 = function(t) {
            var r = y.from(t);
            return this.f(l, 4, r.lo).f(l, 4, r.hi);
          }, s.prototype.sfixed64 = s.prototype.fixed64, s.prototype.float = function(t) {
            return this.f(p.float.writeFloatLE, 4, t);
          }, s.prototype.double = function(t) {
            return this.f(p.float.writeDoubleLE, 8, t);
          };
          var g = p.Array.prototype.set ? function(t, r, e) {
            r.set(t, e);
          } : function(t, r, e) {
            for (var n = 0; n < t.length; ++n) r[e + n] = t[n];
          };
          s.prototype.bytes = function(t) {
            var r = t.length >>> 0;
            if (!r) return this.f(u, 1, 0);
            if (p.isString(t)) {
              var e = s.alloc(r = d.length(t));
              d.decode(t, e, 0), t = e;
            }
            return this.uint32(r).f(g, r, t);
          }, s.prototype.string = function(t) {
            var r = b.length(t);
            return r ? this.uint32(r).f(b.write, r, t) : this.f(u, 1, 0);
          }, s.prototype.fork = function() {
            return this.states = new o(this), this.head = this.tail = new n(i, 0, 0), this.len = 0, 
            this;
          }, s.prototype.reset = function() {
            return this.states ? (this.head = this.states.head, this.tail = this.states.tail, 
            this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new n(i, 0, 0), 
            this.len = 0), this;
          }, s.prototype.ldelim = function() {
            var t = this.head, r = this.tail, e = this.len;
            return this.reset().uint32(e), e && (this.tail.next = t.next, this.tail = r, this.len += e), 
            this;
          }, s.prototype.finish = function() {
            for (var t = this.head.next, r = this.constructor.alloc(this.len), e = 0; t; ) t.fn(t.val, r, e), 
            e += t.len, t = t.next;
            return r;
          }, s.b = function(t) {
            c = t;
          };
        }, {
          15: 15
        } ],
        17: [ function(t, r) {
          function e() {
            i.call(this);
          }
          function n(t, r, e) {
            t.length < 40 ? o.utf8.write(t, r, e) : r.utf8Write(t, e);
          }
          r.exports = e;
          var i = t(16);
          (e.prototype = Object.create(i.prototype)).constructor = e;
          var o = t(15), s = o.Buffer;
          e.alloc = function(t) {
            return (e.alloc = o.e)(t);
          };
          var u = s && s.prototype instanceof Uint8Array && "set" === s.prototype.set.name ? function(t, r, e) {
            r.set(t, e);
          } : function(t, r, e) {
            if (t.copy) t.copy(r, e, 0, t.length); else for (var n = 0; n < t.length; ) r[e++] = t[n++];
          };
          e.prototype.bytes = function(t) {
            o.isString(t) && (t = o.d(t, "base64"));
            var r = t.length >>> 0;
            return this.uint32(r), r && this.f(u, r, t), this;
          }, e.prototype.string = function(t) {
            var r = s.byteLength(t);
            return this.uint32(r), r && this.f(n, r, t), this;
          };
        }, {
          15: 15,
          16: 16
        } ]
      }, {}, [ 8 ]);
    }("object" == ("undefined" === typeof window ? "undefined" : _typeof(window)) && window || "object" == ("undefined" === typeof self ? "undefined" : _typeof(self)) && self || void 0);
    cc._RF.pop();
  }, {} ],
  protobuf: [ function(require, module, exports) {
    (function(process) {
      "use strict";
      cc._RF.push(module, "ddc1c/FcqBJEal9D6wD846V", "protobuf");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(global, factory) {
        "function" === typeof define && define["amd"] ? define([ "bytebuffer" ], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = factory(require("bytebuffer"), true) : (global["dcodeIO"] = global["dcodeIO"] || {})["ProtoBuf"] = factory(global["dcodeIO"]["ByteBuffer"]);
      })(void 0, function(ByteBuffer, isCommonJS) {
        var ProtoBuf = {};
        ProtoBuf.ByteBuffer = ByteBuffer;
        ProtoBuf.Long = ByteBuffer.Long || null;
        ProtoBuf.VERSION = "5.0.1";
        ProtoBuf.WIRE_TYPES = {};
        ProtoBuf.WIRE_TYPES.VARINT = 0;
        ProtoBuf.WIRE_TYPES.BITS64 = 1;
        ProtoBuf.WIRE_TYPES.LDELIM = 2;
        ProtoBuf.WIRE_TYPES.STARTGROUP = 3;
        ProtoBuf.WIRE_TYPES.ENDGROUP = 4;
        ProtoBuf.WIRE_TYPES.BITS32 = 5;
        ProtoBuf.PACKABLE_WIRE_TYPES = [ ProtoBuf.WIRE_TYPES.VARINT, ProtoBuf.WIRE_TYPES.BITS64, ProtoBuf.WIRE_TYPES.BITS32 ];
        ProtoBuf.TYPES = {
          int32: {
            name: "int32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          uint32: {
            name: "uint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          sint32: {
            name: "sint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          int64: {
            name: "int64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          uint64: {
            name: "uint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
          },
          sint64: {
            name: "sint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          bool: {
            name: "bool",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: false
          },
          double: {
            name: "double",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: 0
          },
          string: {
            name: "string",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: ""
          },
          bytes: {
            name: "bytes",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null
          },
          fixed32: {
            name: "fixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          sfixed32: {
            name: "sfixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          fixed64: {
            name: "fixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
          },
          sfixed64: {
            name: "sfixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          float: {
            name: "float",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          enum: {
            name: "enum",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          message: {
            name: "message",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null
          },
          group: {
            name: "group",
            wireType: ProtoBuf.WIRE_TYPES.STARTGROUP,
            defaultValue: null
          }
        };
        ProtoBuf.MAP_KEY_TYPES = [ ProtoBuf.TYPES["int32"], ProtoBuf.TYPES["sint32"], ProtoBuf.TYPES["sfixed32"], ProtoBuf.TYPES["uint32"], ProtoBuf.TYPES["fixed32"], ProtoBuf.TYPES["int64"], ProtoBuf.TYPES["sint64"], ProtoBuf.TYPES["sfixed64"], ProtoBuf.TYPES["uint64"], ProtoBuf.TYPES["fixed64"], ProtoBuf.TYPES["bool"], ProtoBuf.TYPES["string"], ProtoBuf.TYPES["bytes"] ];
        ProtoBuf.ID_MIN = 1;
        ProtoBuf.ID_MAX = 536870911;
        ProtoBuf.convertFieldsToCamelCase = false;
        ProtoBuf.populateAccessors = true;
        ProtoBuf.populateDefaults = true;
        ProtoBuf.Util = function() {
          var Util = {};
          Util.IS_NODE = !!("object" === ("undefined" === typeof process ? "undefined" : _typeof(process)) && process + "" === "[object process]" && !process["browser"]);
          Util.XHR = function() {
            var XMLHttpFactories = [ function() {
              return new XMLHttpRequest();
            }, function() {
              return new ActiveXObject("Msxml2.XMLHTTP");
            }, function() {
              return new ActiveXObject("Msxml3.XMLHTTP");
            }, function() {
              return new ActiveXObject("Microsoft.XMLHTTP");
            } ];
            var xhr = null;
            for (var i = 0; i < XMLHttpFactories.length; i++) {
              try {
                xhr = XMLHttpFactories[i]();
              } catch (e) {
                continue;
              }
              break;
            }
            if (!xhr) throw Error("XMLHttpRequest is not supported");
            return xhr;
          };
          Util.fetch = function(path, callback) {
            callback && "function" != typeof callback && (callback = null);
            if (cc.sys.isNative) try {
              var data = jsb.fileUtils.getStringFromFile(path);
              return data;
            } catch (e) {
              return null;
            } else if (Util.IS_NODE) {
              var fs = require("fs");
              if (callback) fs.readFile(path, function(err, data) {
                callback(err ? null : "" + data);
              }); else try {
                return fs.readFileSync(path);
              } catch (e) {
                return null;
              }
            } else {
              var xhr = Util.XHR();
              xhr.open("GET", path, !!callback);
              xhr.setRequestHeader("Accept", "text/plain");
              "function" === typeof xhr.overrideMimeType && xhr.overrideMimeType("text/plain");
              if (!callback) {
                xhr.send(null);
                if (200 == xhr.status || 0 == xhr.status && "string" === typeof xhr.responseText) return xhr.responseText;
                return null;
              }
              xhr.onreadystatechange = function() {
                if (4 != xhr.readyState) return;
                200 == xhr.status || 0 == xhr.status && "string" === typeof xhr.responseText ? callback(xhr.responseText) : callback(null);
              };
              if (4 == xhr.readyState) return;
              xhr.send(null);
            }
          };
          Util.toCamelCase = function(str) {
            return str.replace(/_([a-zA-Z])/g, function($0, $1) {
              return $1.toUpperCase();
            });
          };
          return Util;
        }();
        ProtoBuf.Lang = {
          DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
          RULE: /^(?:required|optional|repeated|map)$/,
          TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
          NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
          TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
          TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
          FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
          NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
          NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
          NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
          NUMBER_OCT: /^0[0-7]+$/,
          NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
          BOOL: /^(?:true|false)$/i,
          ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
          NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
          WHITESPACE: /\s/,
          STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
          STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
          STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
        };
        ProtoBuf.DotProto = function(ProtoBuf, Lang) {
          var DotProto = {};
          var Tokenizer = function Tokenizer(proto) {
            this.source = proto + "";
            this.index = 0;
            this.line = 1;
            this.stack = [];
            this._stringOpen = null;
          };
          var TokenizerPrototype = Tokenizer.prototype;
          TokenizerPrototype._readString = function() {
            var re = '"' === this._stringOpen ? Lang.STRING_DQ : Lang.STRING_SQ;
            re.lastIndex = this.index - 1;
            var match = re.exec(this.source);
            if (!match) throw Error("unterminated string");
            this.index = re.lastIndex;
            this.stack.push(this._stringOpen);
            this._stringOpen = null;
            return match[1];
          };
          TokenizerPrototype.next = function() {
            if (this.stack.length > 0) return this.stack.shift();
            if (this.index >= this.source.length) return null;
            if (null !== this._stringOpen) return this._readString();
            var repeat, prev, next;
            do {
              repeat = false;
              while (Lang.WHITESPACE.test(next = this.source.charAt(this.index))) {
                "\n" === next && ++this.line;
                if (++this.index === this.source.length) return null;
              }
              if ("/" === this.source.charAt(this.index)) {
                ++this.index;
                if ("/" === this.source.charAt(this.index)) {
                  while ("\n" !== this.source.charAt(++this.index)) if (this.index == this.source.length) return null;
                  ++this.index;
                  ++this.line;
                  repeat = true;
                } else {
                  if ("*" !== (next = this.source.charAt(this.index))) return "/";
                  do {
                    "\n" === next && ++this.line;
                    if (++this.index === this.source.length) return null;
                    prev = next;
                    next = this.source.charAt(this.index);
                  } while ("*" !== prev || "/" !== next);
                  ++this.index;
                  repeat = true;
                }
              }
            } while (repeat);
            if (this.index === this.source.length) return null;
            var end = this.index;
            Lang.DELIM.lastIndex = 0;
            var delim = Lang.DELIM.test(this.source.charAt(end++));
            if (!delim) while (end < this.source.length && !Lang.DELIM.test(this.source.charAt(end))) ++end;
            var token = this.source.substring(this.index, this.index = end);
            '"' !== token && "'" !== token || (this._stringOpen = token);
            return token;
          };
          TokenizerPrototype.peek = function() {
            if (0 === this.stack.length) {
              var token = this.next();
              if (null === token) return null;
              this.stack.push(token);
            }
            return this.stack[0];
          };
          TokenizerPrototype.skip = function(expected) {
            var actual = this.next();
            if (actual !== expected) throw Error("illegal '" + actual + "', '" + expected + "' expected");
          };
          TokenizerPrototype.omit = function(expected) {
            if (this.peek() === expected) {
              this.next();
              return true;
            }
            return false;
          };
          TokenizerPrototype.toString = function() {
            return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")";
          };
          DotProto.Tokenizer = Tokenizer;
          var Parser = function Parser(source) {
            this.tn = new Tokenizer(source);
            this.proto3 = false;
          };
          var ParserPrototype = Parser.prototype;
          ParserPrototype.parse = function() {
            var topLevel = {
              name: "[ROOT]",
              package: null,
              messages: [],
              enums: [],
              imports: [],
              options: {},
              services: []
            };
            var token, head = true, weak;
            try {
              while (token = this.tn.next()) switch (token) {
               case "package":
                if (!head || null !== topLevel["package"]) throw Error("unexpected 'package'");
                token = this.tn.next();
                if (!Lang.TYPEREF.test(token)) throw Error("illegal package name: " + token);
                this.tn.skip(";");
                topLevel["package"] = token;
                break;

               case "import":
                if (!head) throw Error("unexpected 'import'");
                token = this.tn.peek();
                ("public" === token || (weak = "weak" === token)) && this.tn.next();
                token = this._readString();
                this.tn.skip(";");
                weak || topLevel["imports"].push(token);
                break;

               case "syntax":
                if (!head) throw Error("unexpected 'syntax'");
                this.tn.skip("=");
                "proto3" === (topLevel["syntax"] = this._readString()) && (this.proto3 = true);
                this.tn.skip(";");
                break;

               case "message":
                this._parseMessage(topLevel, null);
                head = false;
                break;

               case "enum":
                this._parseEnum(topLevel);
                head = false;
                break;

               case "option":
                this._parseOption(topLevel);
                break;

               case "service":
                this._parseService(topLevel);
                break;

               case "extend":
                this._parseExtend(topLevel);
                break;

               default:
                throw Error("unexpected '" + token + "'");
              }
            } catch (e) {
              e.message = "Parse error at line " + this.tn.line + ": " + e.message;
              throw e;
            }
            delete topLevel["name"];
            return topLevel;
          };
          Parser.parse = function(source) {
            return new Parser(source).parse();
          };
          function mkId(value, mayBeNegative) {
            var id = -1, sign = 1;
            if ("-" == value.charAt(0)) {
              sign = -1;
              value = value.substring(1);
            }
            if (Lang.NUMBER_DEC.test(value)) id = parseInt(value); else if (Lang.NUMBER_HEX.test(value)) id = parseInt(value.substring(2), 16); else {
              if (!Lang.NUMBER_OCT.test(value)) throw Error("illegal id value: " + (sign < 0 ? "-" : "") + value);
              id = parseInt(value.substring(1), 8);
            }
            id = sign * id | 0;
            if (!mayBeNegative && id < 0) throw Error("illegal id value: " + (sign < 0 ? "-" : "") + value);
            return id;
          }
          function mkNumber(val) {
            var sign = 1;
            if ("-" == val.charAt(0)) {
              sign = -1;
              val = val.substring(1);
            }
            if (Lang.NUMBER_DEC.test(val)) return sign * parseInt(val, 10);
            if (Lang.NUMBER_HEX.test(val)) return sign * parseInt(val.substring(2), 16);
            if (Lang.NUMBER_OCT.test(val)) return sign * parseInt(val.substring(1), 8);
            if ("inf" === val) return Infinity * sign;
            if ("nan" === val) return NaN;
            if (Lang.NUMBER_FLT.test(val)) return sign * parseFloat(val);
            throw Error("illegal number value: " + (sign < 0 ? "-" : "") + val);
          }
          ParserPrototype._readString = function() {
            var value = "", token, delim;
            do {
              delim = this.tn.next();
              if ("'" !== delim && '"' !== delim) throw Error("illegal string delimiter: " + delim);
              value += this.tn.next();
              this.tn.skip(delim);
              token = this.tn.peek();
            } while ('"' === token || '"' === token);
            return value;
          };
          ParserPrototype._readValue = function(mayBeTypeRef) {
            var token = this.tn.peek(), value;
            if ('"' === token || "'" === token) return this._readString();
            this.tn.next();
            if (Lang.NUMBER.test(token)) return mkNumber(token);
            if (Lang.BOOL.test(token)) return "true" === token.toLowerCase();
            if (mayBeTypeRef && Lang.TYPEREF.test(token)) return token;
            throw Error("illegal value: " + token);
          };
          ParserPrototype._parseOption = function(parent, isList) {
            var token = this.tn.next(), custom = false;
            if ("(" === token) {
              custom = true;
              token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token)) throw Error("illegal option name: " + token);
            var name = token;
            if (custom) {
              this.tn.skip(")");
              name = "(" + name + ")";
              token = this.tn.peek();
              if (Lang.FQTYPEREF.test(token)) {
                name += token;
                this.tn.next();
              }
            }
            this.tn.skip("=");
            this._parseOptionValue(parent, name);
            isList || this.tn.skip(";");
          };
          function setOption(options, name, value) {
            if ("undefined" === typeof options[name]) options[name] = value; else {
              Array.isArray(options[name]) || (options[name] = [ options[name] ]);
              options[name].push(value);
            }
          }
          ParserPrototype._parseOptionValue = function(parent, name) {
            var token = this.tn.peek();
            if ("{" !== token) setOption(parent["options"], name, this._readValue(true)); else {
              this.tn.skip("{");
              while ("}" !== (token = this.tn.next())) {
                if (!Lang.NAME.test(token)) throw Error("illegal option name: " + name + "." + token);
                this.tn.omit(":") ? setOption(parent["options"], name + "." + token, this._readValue(true)) : this._parseOptionValue(parent, name + "." + token);
              }
            }
          };
          ParserPrototype._parseService = function(parent) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal service name at line " + this.tn.line + ": " + token);
            var name = token;
            var svc = {
              name: name,
              rpc: {},
              options: {}
            };
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if ("option" === token) this._parseOption(svc); else {
              if ("rpc" !== token) throw Error("illegal service token: " + token);
              this._parseServiceRPC(svc);
            }
            this.tn.omit(";");
            parent["services"].push(svc);
          };
          ParserPrototype._parseServiceRPC = function(svc) {
            var type = "rpc", token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal rpc service method name: " + token);
            var name = token;
            var method = {
              request: null,
              response: null,
              request_stream: false,
              response_stream: false,
              options: {}
            };
            this.tn.skip("(");
            token = this.tn.next();
            if ("stream" === token.toLowerCase()) {
              method["request_stream"] = true;
              token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token)) throw Error("illegal rpc service request type: " + token);
            method["request"] = token;
            this.tn.skip(")");
            token = this.tn.next();
            if ("returns" !== token.toLowerCase()) throw Error("illegal rpc service request type delimiter: " + token);
            this.tn.skip("(");
            token = this.tn.next();
            if ("stream" === token.toLowerCase()) {
              method["response_stream"] = true;
              token = this.tn.next();
            }
            method["response"] = token;
            this.tn.skip(")");
            token = this.tn.peek();
            if ("{" === token) {
              this.tn.next();
              while ("}" !== (token = this.tn.next())) {
                if ("option" !== token) throw Error("illegal rpc service token: " + token);
                this._parseOption(method);
              }
              this.tn.omit(";");
            } else this.tn.skip(";");
            "undefined" === typeof svc[type] && (svc[type] = {});
            svc[type][name] = method;
          };
          ParserPrototype._parseMessage = function(parent, fld) {
            var isGroup = !!fld, token = this.tn.next();
            var msg = {
              name: "",
              fields: [],
              enums: [],
              messages: [],
              options: {},
              services: [],
              oneofs: {}
            };
            if (!Lang.NAME.test(token)) throw Error("illegal " + (isGroup ? "group" : "message") + " name: " + token);
            msg["name"] = token;
            if (isGroup) {
              this.tn.skip("=");
              fld["id"] = mkId(this.tn.next());
              msg["isGroup"] = true;
            }
            token = this.tn.peek();
            "[" === token && fld && this._parseFieldOptions(fld);
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if (Lang.RULE.test(token)) this._parseMessageField(msg, token); else if ("oneof" === token) this._parseMessageOneOf(msg); else if ("enum" === token) this._parseEnum(msg); else if ("message" === token) this._parseMessage(msg); else if ("option" === token) this._parseOption(msg); else if ("service" === token) this._parseService(msg); else if ("extensions" === token) msg.hasOwnProperty("extensions") ? msg["extensions"] = msg["extensions"].concat(this._parseExtensionRanges()) : msg["extensions"] = this._parseExtensionRanges(); else if ("reserved" === token) this._parseIgnored(); else if ("extend" === token) this._parseExtend(msg); else {
              if (!Lang.TYPEREF.test(token)) throw Error("illegal message token: " + token);
              if (!this.proto3) throw Error("illegal field rule: " + token);
              this._parseMessageField(msg, "optional", token);
            }
            this.tn.omit(";");
            parent["messages"].push(msg);
            return msg;
          };
          ParserPrototype._parseIgnored = function() {
            while (";" !== this.tn.peek()) this.tn.next();
            this.tn.skip(";");
          };
          ParserPrototype._parseMessageField = function(msg, rule, type) {
            if (!Lang.RULE.test(rule)) throw Error("illegal message field rule: " + rule);
            var fld = {
              rule: rule,
              type: "",
              name: "",
              options: {},
              id: 0
            };
            var token;
            if ("map" === rule) {
              if (type) throw Error("illegal type: " + type);
              this.tn.skip("<");
              token = this.tn.next();
              if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) throw Error("illegal message field type: " + token);
              fld["keytype"] = token;
              this.tn.skip(",");
              token = this.tn.next();
              if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) throw Error("illegal message field: " + token);
              fld["type"] = token;
              this.tn.skip(">");
              token = this.tn.next();
              if (!Lang.NAME.test(token)) throw Error("illegal message field name: " + token);
              fld["name"] = token;
              this.tn.skip("=");
              fld["id"] = mkId(this.tn.next());
              token = this.tn.peek();
              "[" === token && this._parseFieldOptions(fld);
              this.tn.skip(";");
            } else {
              type = "undefined" !== typeof type ? type : this.tn.next();
              if ("group" === type) {
                var grp = this._parseMessage(msg, fld);
                if (!/^[A-Z]/.test(grp["name"])) throw Error("illegal group name: " + grp["name"]);
                fld["type"] = grp["name"];
                fld["name"] = grp["name"].toLowerCase();
                this.tn.omit(";");
              } else {
                if (!Lang.TYPE.test(type) && !Lang.TYPEREF.test(type)) throw Error("illegal message field type: " + type);
                fld["type"] = type;
                token = this.tn.next();
                if (!Lang.NAME.test(token)) throw Error("illegal message field name: " + token);
                fld["name"] = token;
                this.tn.skip("=");
                fld["id"] = mkId(this.tn.next());
                token = this.tn.peek();
                "[" === token && this._parseFieldOptions(fld);
                this.tn.skip(";");
              }
            }
            msg["fields"].push(fld);
            return fld;
          };
          ParserPrototype._parseMessageOneOf = function(msg) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal oneof name: " + token);
            var name = token, fld;
            var fields = [];
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) {
              fld = this._parseMessageField(msg, "optional", token);
              fld["oneof"] = name;
              fields.push(fld["id"]);
            }
            this.tn.omit(";");
            msg["oneofs"][name] = fields;
          };
          ParserPrototype._parseFieldOptions = function(fld) {
            this.tn.skip("[");
            var token, first = true;
            while ("]" !== (token = this.tn.peek())) {
              first || this.tn.skip(",");
              this._parseOption(fld, true);
              first = false;
            }
            this.tn.next();
          };
          ParserPrototype._parseEnum = function(msg) {
            var enm = {
              name: "",
              values: [],
              options: {}
            };
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal name: " + token);
            enm["name"] = token;
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if ("option" === token) this._parseOption(enm); else {
              if (!Lang.NAME.test(token)) throw Error("illegal name: " + token);
              this.tn.skip("=");
              var val = {
                name: token,
                id: mkId(this.tn.next(), true)
              };
              token = this.tn.peek();
              "[" === token && this._parseFieldOptions({
                options: {}
              });
              this.tn.skip(";");
              enm["values"].push(val);
            }
            this.tn.omit(";");
            msg["enums"].push(enm);
          };
          ParserPrototype._parseExtensionRanges = function() {
            var ranges = [];
            var token, range, value;
            do {
              range = [];
              while (true) {
                token = this.tn.next();
                switch (token) {
                 case "min":
                  value = ProtoBuf.ID_MIN;
                  break;

                 case "max":
                  value = ProtoBuf.ID_MAX;
                  break;

                 default:
                  value = mkNumber(token);
                }
                range.push(value);
                if (2 === range.length) break;
                if ("to" !== this.tn.peek()) {
                  range.push(value);
                  break;
                }
                this.tn.next();
              }
              ranges.push(range);
            } while (this.tn.omit(","));
            this.tn.skip(";");
            return ranges;
          };
          ParserPrototype._parseExtend = function(parent) {
            var token = this.tn.next();
            if (!Lang.TYPEREF.test(token)) throw Error("illegal extend reference: " + token);
            var ext = {
              ref: token,
              fields: []
            };
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if (Lang.RULE.test(token)) this._parseMessageField(ext, token); else {
              if (!Lang.TYPEREF.test(token)) throw Error("illegal extend token: " + token);
              if (!this.proto3) throw Error("illegal field rule: " + token);
              this._parseMessageField(ext, "optional", token);
            }
            this.tn.omit(";");
            parent["messages"].push(ext);
            return ext;
          };
          ParserPrototype.toString = function() {
            return "Parser at line " + this.tn.line;
          };
          DotProto.Parser = Parser;
          return DotProto;
        }(ProtoBuf, ProtoBuf.Lang);
        ProtoBuf.Reflect = function(ProtoBuf) {
          var Reflect = {};
          var T = function T(builder, parent, name) {
            this.builder = builder;
            this.parent = parent;
            this.name = name;
            this.className;
          };
          var TPrototype = T.prototype;
          TPrototype.fqn = function() {
            var name = this.name, ptr = this;
            do {
              ptr = ptr.parent;
              if (null == ptr) break;
              name = ptr.name + "." + name;
            } while (true);
            return name;
          };
          TPrototype.toString = function(includeClass) {
            return (includeClass ? this.className + " " : "") + this.fqn();
          };
          TPrototype.build = function() {
            throw Error(this.toString(true) + " cannot be built directly");
          };
          Reflect.T = T;
          var Namespace = function Namespace(builder, parent, name, options, syntax) {
            T.call(this, builder, parent, name);
            this.className = "Namespace";
            this.children = [];
            this.options = options || {};
            this.syntax = syntax || "proto2";
          };
          var NamespacePrototype = Namespace.prototype = Object.create(T.prototype);
          NamespacePrototype.getChildren = function(type) {
            type = type || null;
            if (null == type) return this.children.slice();
            var children = [];
            for (var i = 0, k = this.children.length; i < k; ++i) this.children[i] instanceof type && children.push(this.children[i]);
            return children;
          };
          NamespacePrototype.addChild = function(child) {
            var other;
            if (other = this.getChild(child.name)) if (other instanceof Message.Field && other.name !== other.originalName && null === this.getChild(other.originalName)) other.name = other.originalName; else {
              if (!(child instanceof Message.Field && child.name !== child.originalName && null === this.getChild(child.originalName))) throw Error("Duplicate name in namespace " + this.toString(true) + ": " + child.name);
              child.name = child.originalName;
            }
            this.children.push(child);
          };
          NamespacePrototype.getChild = function(nameOrId) {
            var key = "number" === typeof nameOrId ? "id" : "name";
            for (var i = 0, k = this.children.length; i < k; ++i) if (this.children[i][key] === nameOrId) return this.children[i];
            return null;
          };
          NamespacePrototype.resolve = function(qn, excludeNonNamespace) {
            var part = "string" === typeof qn ? qn.split(".") : qn, ptr = this, i = 0;
            if ("" === part[i]) {
              while (null !== ptr.parent) ptr = ptr.parent;
              i++;
            }
            var child;
            do {
              do {
                if (!(ptr instanceof Reflect.Namespace)) {
                  ptr = null;
                  break;
                }
                child = ptr.getChild(part[i]);
                if (!child || !(child instanceof Reflect.T) || excludeNonNamespace && !(child instanceof Reflect.Namespace)) {
                  ptr = null;
                  break;
                }
                ptr = child;
                i++;
              } while (i < part.length);
              if (null != ptr) break;
              if (null !== this.parent) return this.parent.resolve(qn, excludeNonNamespace);
            } while (null != ptr);
            return ptr;
          };
          NamespacePrototype.qn = function(t) {
            var part = [], ptr = t;
            do {
              part.unshift(ptr.name);
              ptr = ptr.parent;
            } while (null !== ptr);
            for (var len = 1; len <= part.length; len++) {
              var qn = part.slice(part.length - len);
              if (t === this.resolve(qn, t instanceof Reflect.Namespace)) return qn.join(".");
            }
            return t.fqn();
          };
          NamespacePrototype.build = function() {
            var ns = {};
            var children = this.children;
            for (var i = 0, k = children.length, child; i < k; ++i) {
              child = children[i];
              child instanceof Namespace && (ns[child.name] = child.build());
            }
            Object.defineProperty && Object.defineProperty(ns, "$options", {
              value: this.buildOpt()
            });
            return ns;
          };
          NamespacePrototype.buildOpt = function() {
            var opt = {}, keys = Object.keys(this.options);
            for (var i = 0, k = keys.length; i < k; ++i) {
              var key = keys[i], val = this.options[keys[i]];
              opt[key] = val;
            }
            return opt;
          };
          NamespacePrototype.getOption = function(name) {
            if ("undefined" === typeof name) return this.options;
            return "undefined" !== typeof this.options[name] ? this.options[name] : null;
          };
          Reflect.Namespace = Namespace;
          var Element = function Element(type, resolvedType, isMapKey, syntax, name) {
            this.type = type;
            this.resolvedType = resolvedType;
            this.isMapKey = isMapKey;
            this.syntax = syntax;
            this.name = name;
            if (isMapKey && ProtoBuf.MAP_KEY_TYPES.indexOf(type) < 0) throw Error("Invalid map key type: " + type.name);
          };
          var ElementPrototype = Element.prototype;
          function mkDefault(type) {
            "string" === typeof type && (type = ProtoBuf.TYPES[type]);
            if ("undefined" === typeof type.defaultValue) throw Error("default value for type " + type.name + " is not supported");
            if (type == ProtoBuf.TYPES["bytes"]) return new ByteBuffer(0);
            return type.defaultValue;
          }
          Element.defaultFieldValue = mkDefault;
          function mkLong(value, unsigned) {
            if (value && "number" === typeof value.low && "number" === typeof value.high && "boolean" === typeof value.unsigned && value.low === value.low && value.high === value.high) return new ProtoBuf.Long(value.low, value.high, "undefined" === typeof unsigned ? value.unsigned : unsigned);
            if ("string" === typeof value) return ProtoBuf.Long.fromString(value, unsigned || false, 10);
            if ("number" === typeof value) return ProtoBuf.Long.fromNumber(value, unsigned || false);
            throw Error("not convertible to Long");
          }
          ElementPrototype.toString = function() {
            return (this.name || "") + (this.isMapKey ? "map" : "value") + " element";
          };
          ElementPrototype.verifyValue = function(value) {
            var self = this;
            function fail(val, msg) {
              throw Error("Illegal value for " + self.toString(true) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
            }
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
              ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
              return value > 4294967295 ? 0 | value : value;

             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
              return value < 0 ? value >>> 0 : value;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
              if (ProtoBuf.Long) try {
                return mkLong(value, false);
              } catch (e) {
                fail("undefined" === typeof value ? "undefined" : _typeof(value), e.message);
              } else fail("undefined" === typeof value ? "undefined" : _typeof(value), "requires Long.js");

             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              if (ProtoBuf.Long) try {
                return mkLong(value, true);
              } catch (e) {
                fail("undefined" === typeof value ? "undefined" : _typeof(value), e.message);
              } else fail("undefined" === typeof value ? "undefined" : _typeof(value), "requires Long.js");

             case ProtoBuf.TYPES["bool"]:
              "boolean" !== typeof value && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a boolean");
              return value;

             case ProtoBuf.TYPES["float"]:
             case ProtoBuf.TYPES["double"]:
              "number" !== typeof value && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a number");
              return value;

             case ProtoBuf.TYPES["string"]:
              "string" === typeof value || value && value instanceof String || fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a string");
              return "" + value;

             case ProtoBuf.TYPES["bytes"]:
              if (ByteBuffer.isByteBuffer(value)) return value;
              return ByteBuffer.wrap(value, "base64");

             case ProtoBuf.TYPES["enum"]:
              var values = this.resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
              for (i = 0; i < values.length; i++) {
                if (values[i].name == value) return values[i].id;
                if (values[i].id == value) return values[i].id;
              }
              if ("proto3" === this.syntax) {
                ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
                (value > 4294967295 || value < 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not in range for uint32");
                return value;
              }
              fail(value, "not a valid enum value");

             case ProtoBuf.TYPES["group"]:
             case ProtoBuf.TYPES["message"]:
              value && "object" === ("undefined" === typeof value ? "undefined" : _typeof(value)) || fail("undefined" === typeof value ? "undefined" : _typeof(value), "object expected");
              if (value instanceof this.resolvedType.clazz) return value;
              if (value instanceof ProtoBuf.Builder.Message) {
                var obj = {};
                for (var i in value) value.hasOwnProperty(i) && (obj[i] = value[i]);
                value = obj;
              }
              return new this.resolvedType.clazz(value);
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(true) + ": " + value + " (undefined type " + this.type + ")");
          };
          ElementPrototype.calculateLength = function(id, value) {
            if (null === value) return 0;
            var n;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["uint32"]:
              return ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["sint32"]:
              return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));

             case ProtoBuf.TYPES["fixed32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["float"]:
              return 4;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["uint64"]:
              return ByteBuffer.calculateVarint64(value);

             case ProtoBuf.TYPES["sint64"]:
              return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));

             case ProtoBuf.TYPES["fixed64"]:
             case ProtoBuf.TYPES["sfixed64"]:
              return 8;

             case ProtoBuf.TYPES["bool"]:
              return 1;

             case ProtoBuf.TYPES["enum"]:
              return ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["double"]:
              return 8;

             case ProtoBuf.TYPES["string"]:
              n = ByteBuffer.calculateUTF8Bytes(value);
              return ByteBuffer.calculateVarint32(n) + n;

             case ProtoBuf.TYPES["bytes"]:
              if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(true) + ": " + value.remaining() + " bytes remaining");
              return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();

             case ProtoBuf.TYPES["message"]:
              n = this.resolvedType.calculate(value);
              return ByteBuffer.calculateVarint32(n) + n;

             case ProtoBuf.TYPES["group"]:
              n = this.resolvedType.calculate(value);
              return n + ByteBuffer.calculateVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
            }
            throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + value + " (unknown type)");
          };
          ElementPrototype.encodeValue = function(id, value, buffer) {
            if (null === value) return buffer;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              value < 0 ? buffer.writeVarint64(value) : buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["uint32"]:
              buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["sint32"]:
              buffer.writeVarint32ZigZag(value);
              break;

             case ProtoBuf.TYPES["fixed32"]:
              buffer.writeUint32(value);
              break;

             case ProtoBuf.TYPES["sfixed32"]:
              buffer.writeInt32(value);
              break;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["uint64"]:
              buffer.writeVarint64(value);
              break;

             case ProtoBuf.TYPES["sint64"]:
              buffer.writeVarint64ZigZag(value);
              break;

             case ProtoBuf.TYPES["fixed64"]:
              buffer.writeUint64(value);
              break;

             case ProtoBuf.TYPES["sfixed64"]:
              buffer.writeInt64(value);
              break;

             case ProtoBuf.TYPES["bool"]:
              "string" === typeof value ? buffer.writeVarint32("false" === value.toLowerCase() ? 0 : !!value) : buffer.writeVarint32(value ? 1 : 0);
              break;

             case ProtoBuf.TYPES["enum"]:
              buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["float"]:
              buffer.writeFloat32(value);
              break;

             case ProtoBuf.TYPES["double"]:
              buffer.writeFloat64(value);
              break;

             case ProtoBuf.TYPES["string"]:
              buffer.writeVString(value);
              break;

             case ProtoBuf.TYPES["bytes"]:
              if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(true) + ": " + value.remaining() + " bytes remaining");
              var prevOffset = value.offset;
              buffer.writeVarint32(value.remaining());
              buffer.append(value);
              value.offset = prevOffset;
              break;

             case ProtoBuf.TYPES["message"]:
              var bb = new ByteBuffer().LE();
              this.resolvedType.encode(value, bb);
              buffer.writeVarint32(bb.offset);
              buffer.append(bb.flip());
              break;

             case ProtoBuf.TYPES["group"]:
              this.resolvedType.encode(value, buffer);
              buffer.writeVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
              break;

             default:
              throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + value + " (unknown type)");
            }
            return buffer;
          };
          ElementPrototype.decode = function(buffer, wireType, id) {
            if (wireType != this.type.wireType) throw Error("Unexpected wire type for element");
            var value, nBytes;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              return 0 | buffer.readVarint32();

             case ProtoBuf.TYPES["uint32"]:
              return buffer.readVarint32() >>> 0;

             case ProtoBuf.TYPES["sint32"]:
              return 0 | buffer.readVarint32ZigZag();

             case ProtoBuf.TYPES["fixed32"]:
              return buffer.readUint32() >>> 0;

             case ProtoBuf.TYPES["sfixed32"]:
              return 0 | buffer.readInt32();

             case ProtoBuf.TYPES["int64"]:
              return buffer.readVarint64();

             case ProtoBuf.TYPES["uint64"]:
              return buffer.readVarint64().toUnsigned();

             case ProtoBuf.TYPES["sint64"]:
              return buffer.readVarint64ZigZag();

             case ProtoBuf.TYPES["fixed64"]:
              return buffer.readUint64();

             case ProtoBuf.TYPES["sfixed64"]:
              return buffer.readInt64();

             case ProtoBuf.TYPES["bool"]:
              return !!buffer.readVarint32();

             case ProtoBuf.TYPES["enum"]:
              return buffer.readVarint32();

             case ProtoBuf.TYPES["float"]:
              return buffer.readFloat();

             case ProtoBuf.TYPES["double"]:
              return buffer.readDouble();

             case ProtoBuf.TYPES["string"]:
              return buffer.readVString();

             case ProtoBuf.TYPES["bytes"]:
              nBytes = buffer.readVarint32();
              if (buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(true) + ": " + nBytes + " required but got only " + buffer.remaining());
              value = buffer.clone();
              value.limit = value.offset + nBytes;
              buffer.offset += nBytes;
              return value;

             case ProtoBuf.TYPES["message"]:
              nBytes = buffer.readVarint32();
              return this.resolvedType.decode(buffer, nBytes);

             case ProtoBuf.TYPES["group"]:
              return this.resolvedType.decode(buffer, -1, id);
            }
            throw Error("[INTERNAL] Illegal decode type");
          };
          ElementPrototype.valueFromString = function(str) {
            if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              return this.verifyValue(parseInt(str));

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              return this.verifyValue(str);

             case ProtoBuf.TYPES["bool"]:
              return "true" === str;

             case ProtoBuf.TYPES["string"]:
              return this.verifyValue(str);

             case ProtoBuf.TYPES["bytes"]:
              return ByteBuffer.fromBinary(str);
            }
          };
          ElementPrototype.valueToString = function(value) {
            if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
            return this.type === ProtoBuf.TYPES["bytes"] ? value.toString("binary") : value.toString();
          };
          Reflect.Element = Element;
          var Message = function Message(builder, parent, name, options, isGroup, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);
            this.className = "Message";
            this.extensions = void 0;
            this.clazz = null;
            this.isGroup = !!isGroup;
            this._fields = null;
            this._fieldsById = null;
            this._fieldsByName = null;
          };
          var MessagePrototype = Message.prototype = Object.create(Namespace.prototype);
          MessagePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild) return this.clazz;
            var clazz = function(ProtoBuf, T) {
              var fields = T.getChildren(ProtoBuf.Reflect.Message.Field), oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf);
              var Message = function Message(values, var_args) {
                ProtoBuf.Builder.Message.call(this);
                for (var i = 0, k = oneofs.length; i < k; ++i) this[oneofs[i].name] = null;
                for (i = 0, k = fields.length; i < k; ++i) {
                  var field = fields[i];
                  this[field.name] = field.repeated ? [] : field.map ? new ProtoBuf.Map(field) : null;
                  !field.required && "proto3" !== T.syntax || null === field.defaultValue || (this[field.name] = field.defaultValue);
                }
                if (arguments.length > 0) {
                  var value;
                  if (1 !== arguments.length || null === values || "object" !== ("undefined" === typeof values ? "undefined" : _typeof(values)) || !("function" !== typeof values.encode || values instanceof Message) || Array.isArray(values) || values instanceof ProtoBuf.Map || ByteBuffer.isByteBuffer(values) || values instanceof ArrayBuffer || ProtoBuf.Long && values instanceof ProtoBuf.Long) for (i = 0, 
                  k = arguments.length; i < k; ++i) "undefined" !== typeof (value = arguments[i]) && this.$set(fields[i].name, value); else this.$set(values);
                }
              };
              var MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);
              MessagePrototype.add = function(key, value, noAssert) {
                var field = T._fieldsByName[key];
                if (!noAssert) {
                  if (!field) throw Error(this + "#" + key + " is undefined");
                  if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(true));
                  if (!field.repeated) throw Error(this + "#" + key + " is not a repeated field");
                  value = field.verifyValue(value, true);
                }
                null === this[key] && (this[key] = []);
                this[key].push(value);
                return this;
              };
              MessagePrototype.$add = MessagePrototype.add;
              MessagePrototype.set = function(keyOrObj, value, noAssert) {
                if (keyOrObj && "object" === ("undefined" === typeof keyOrObj ? "undefined" : _typeof(keyOrObj))) {
                  noAssert = value;
                  for (var ikey in keyOrObj) keyOrObj.hasOwnProperty(ikey) && "undefined" !== typeof (value = keyOrObj[ikey]) && this.$set(ikey, value, noAssert);
                  return this;
                }
                var field = T._fieldsByName[keyOrObj];
                if (noAssert) this[keyOrObj] = value; else {
                  if (!field) throw Error(this + "#" + keyOrObj + " is not a field: undefined");
                  if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + keyOrObj + " is not a field: " + field.toString(true));
                  this[field.name] = value = field.verifyValue(value);
                }
                if (field && field.oneof) {
                  var currentField = this[field.oneof.name];
                  if (null !== value) {
                    null !== currentField && currentField !== field.name && (this[currentField] = null);
                    this[field.oneof.name] = field.name;
                  } else currentField === keyOrObj && (this[field.oneof.name] = null);
                }
                return this;
              };
              MessagePrototype.$set = MessagePrototype.set;
              MessagePrototype.get = function(key, noAssert) {
                if (noAssert) return this[key];
                var field = T._fieldsByName[key];
                if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: undefined");
                if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(true));
                return this[field.name];
              };
              MessagePrototype.$get = MessagePrototype.get;
              for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (field instanceof ProtoBuf.Reflect.Message.ExtensionField) continue;
                T.builder.options["populateAccessors"] && function(field) {
                  var Name = field.originalName.replace(/(_[a-zA-Z])/g, function(match) {
                    return match.toUpperCase().replace("_", "");
                  });
                  Name = Name.substring(0, 1).toUpperCase() + Name.substring(1);
                  var name = field.originalName.replace(/([A-Z])/g, function(match) {
                    return "_" + match;
                  });
                  var setter = function setter(value, noAssert) {
                    this[field.name] = noAssert ? value : field.verifyValue(value);
                    return this;
                  };
                  var getter = function getter() {
                    return this[field.name];
                  };
                  null === T.getChild("set" + Name) && (MessagePrototype["set" + Name] = setter);
                  null === T.getChild("set_" + name) && (MessagePrototype["set_" + name] = setter);
                  null === T.getChild("get" + Name) && (MessagePrototype["get" + Name] = getter);
                  null === T.getChild("get_" + name) && (MessagePrototype["get_" + name] = getter);
                }(field);
              }
              MessagePrototype.encode = function(buffer, noVerify) {
                "boolean" === typeof buffer && (noVerify = buffer, buffer = void 0);
                var isNew = false;
                buffer || (buffer = new ByteBuffer(), isNew = true);
                var le = buffer.littleEndian;
                try {
                  T.encode(this, buffer.LE(), noVerify);
                  return (isNew ? buffer.flip() : buffer).LE(le);
                } catch (e) {
                  buffer.LE(le);
                  throw e;
                }
              };
              Message.encode = function(data, buffer, noVerify) {
                return new Message(data).encode(buffer, noVerify);
              };
              MessagePrototype.calculate = function() {
                return T.calculate(this);
              };
              MessagePrototype.encodeDelimited = function(buffer, noVerify) {
                var isNew = false;
                buffer || (buffer = new ByteBuffer(), isNew = true);
                var enc = new ByteBuffer().LE();
                T.encode(this, enc, noVerify).flip();
                buffer.writeVarint32(enc.remaining());
                buffer.append(enc);
                return isNew ? buffer.flip() : buffer;
              };
              MessagePrototype.encodeAB = function() {
                try {
                  return this.encode().toArrayBuffer();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toArrayBuffer());
                  throw e;
                }
              };
              MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB;
              MessagePrototype.encodeNB = function() {
                try {
                  return this.encode().toBuffer();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toBuffer());
                  throw e;
                }
              };
              MessagePrototype.toBuffer = MessagePrototype.encodeNB;
              MessagePrototype.encode64 = function() {
                try {
                  return this.encode().toBase64();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toBase64());
                  throw e;
                }
              };
              MessagePrototype.toBase64 = MessagePrototype.encode64;
              MessagePrototype.encodeHex = function() {
                try {
                  return this.encode().toHex();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toHex());
                  throw e;
                }
              };
              MessagePrototype.toHex = MessagePrototype.encodeHex;
              function cloneRaw(obj, binaryAsBase64, longsAsStrings, resolvedType) {
                if (null === obj || "object" !== ("undefined" === typeof obj ? "undefined" : _typeof(obj))) {
                  if (resolvedType && resolvedType instanceof ProtoBuf.Reflect.Enum) {
                    var name = ProtoBuf.Reflect.Enum.getName(resolvedType.object, obj);
                    if (null !== name) return name;
                  }
                  return obj;
                }
                if (ByteBuffer.isByteBuffer(obj)) return binaryAsBase64 ? obj.toBase64() : obj.toBuffer();
                if (ProtoBuf.Long.isLong(obj)) return longsAsStrings ? obj.toString() : ProtoBuf.Long.fromValue(obj);
                var clone;
                if (Array.isArray(obj)) {
                  clone = [];
                  obj.forEach(function(v, k) {
                    clone[k] = cloneRaw(v, binaryAsBase64, longsAsStrings, resolvedType);
                  });
                  return clone;
                }
                clone = {};
                if (obj instanceof ProtoBuf.Map) {
                  var it = obj.entries();
                  for (var e = it.next(); !e.done; e = it.next()) clone[obj.keyElem.valueToString(e.value[0])] = cloneRaw(e.value[1], binaryAsBase64, longsAsStrings, obj.valueElem.resolvedType);
                  return clone;
                }
                var type = obj.$type, field = void 0;
                for (var i in obj) obj.hasOwnProperty(i) && (type && (field = type.getChild(i)) ? clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings, field.resolvedType) : clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings));
                return clone;
              }
              MessagePrototype.toRaw = function(binaryAsBase64, longsAsStrings) {
                return cloneRaw(this, !!binaryAsBase64, !!longsAsStrings, this.$type);
              };
              MessagePrototype.encodeJSON = function() {
                return JSON.stringify(cloneRaw(this, true, true, this.$type));
              };
              Message.decode = function(buffer, length, enc) {
                "string" === typeof length && (enc = length, length = -1);
                "string" === typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer));
                var le = buffer.littleEndian;
                try {
                  var msg = T.decode(buffer.LE(), length);
                  buffer.LE(le);
                  return msg;
                } catch (e) {
                  buffer.LE(le);
                  throw e;
                }
              };
              Message.decodeDelimited = function(buffer, enc) {
                "string" === typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer));
                if (buffer.remaining() < 1) return null;
                var off = buffer.offset, len = buffer.readVarint32();
                if (buffer.remaining() < len) {
                  buffer.offset = off;
                  return null;
                }
                try {
                  var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
                  buffer.offset += len;
                  return msg;
                } catch (err) {
                  buffer.offset += len;
                  throw err;
                }
              };
              Message.decode64 = function(str) {
                return Message.decode(str, "base64");
              };
              Message.decodeHex = function(str) {
                return Message.decode(str, "hex");
              };
              Message.decodeJSON = function(str) {
                return new Message(JSON.parse(str));
              };
              MessagePrototype.toString = function() {
                return T.toString();
              };
              var $optionsS;
              var $options;
              var $typeS;
              var $type;
              Object.defineProperty && (Object.defineProperty(Message, "$options", {
                value: T.buildOpt()
              }), Object.defineProperty(MessagePrototype, "$options", {
                value: Message["$options"]
              }), Object.defineProperty(Message, "$type", {
                value: T
              }), Object.defineProperty(MessagePrototype, "$type", {
                value: T
              }));
              return Message;
            }(ProtoBuf, this);
            this._fields = [];
            this._fieldsById = {};
            this._fieldsByName = {};
            for (var i = 0, k = this.children.length, child; i < k; i++) {
              child = this.children[i];
              if (child instanceof Enum || child instanceof Message || child instanceof Service) {
                if (clazz.hasOwnProperty(child.name)) throw Error("Illegal reflect child of " + this.toString(true) + ": " + child.toString(true) + " cannot override static property '" + child.name + "'");
                clazz[child.name] = child.build();
              } else if (child instanceof Message.Field) child.build(), this._fields.push(child), 
              this._fieldsById[child.id] = child, this._fieldsByName[child.name] = child; else if (!(child instanceof Message.OneOf) && !(child instanceof Extension)) throw Error("Illegal reflect child of " + this.toString(true) + ": " + this.children[i].toString(true));
            }
            return this.clazz = clazz;
          };
          MessagePrototype.encode = function(message, buffer, noVerify) {
            var fieldMissing = null, field;
            for (var i = 0, k = this._fields.length, val; i < k; ++i) {
              field = this._fields[i];
              val = message[field.name];
              field.required && null === val ? null === fieldMissing && (fieldMissing = field) : field.encode(noVerify ? val : field.verifyValue(val), buffer, message);
            }
            if (null !== fieldMissing) {
              var err = Error("Missing at least one required field for " + this.toString(true) + ": " + fieldMissing);
              err["encoded"] = buffer;
              throw err;
            }
            return buffer;
          };
          MessagePrototype.calculate = function(message) {
            for (var n = 0, i = 0, k = this._fields.length, field, val; i < k; ++i) {
              field = this._fields[i];
              val = message[field.name];
              if (field.required && null === val) throw Error("Missing at least one required field for " + this.toString(true) + ": " + field);
              n += field.calculate(val, message);
            }
            return n;
          };
          function skipTillGroupEnd(expectedId, buf) {
            var tag = buf.readVarint32(), wireType = 7 & tag, id = tag >>> 3;
            switch (wireType) {
             case ProtoBuf.WIRE_TYPES.VARINT:
              do {
                tag = buf.readUint8();
              } while (128 === (128 & tag));
              break;

             case ProtoBuf.WIRE_TYPES.BITS64:
              buf.offset += 8;
              break;

             case ProtoBuf.WIRE_TYPES.LDELIM:
              tag = buf.readVarint32();
              buf.offset += tag;
              break;

             case ProtoBuf.WIRE_TYPES.STARTGROUP:
              skipTillGroupEnd(id, buf);
              break;

             case ProtoBuf.WIRE_TYPES.ENDGROUP:
              if (id === expectedId) return false;
              throw Error("Illegal GROUPEND after unknown group: " + id + " (" + expectedId + " expected)");

             case ProtoBuf.WIRE_TYPES.BITS32:
              buf.offset += 4;
              break;

             default:
              throw Error("Illegal wire type in unknown group " + expectedId + ": " + wireType);
            }
            return true;
          }
          MessagePrototype.decode = function(buffer, length, expectedGroupEndId) {
            "number" !== typeof length && (length = -1);
            var start = buffer.offset, msg = new this.clazz(), tag, wireType, id, field;
            while (buffer.offset < start + length || -1 === length && buffer.remaining() > 0) {
              tag = buffer.readVarint32();
              wireType = 7 & tag;
              id = tag >>> 3;
              if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
                if (id !== expectedGroupEndId) throw Error("Illegal group end indicator for " + this.toString(true) + ": " + id + " (" + (expectedGroupEndId ? expectedGroupEndId + " expected" : "not a group") + ")");
                break;
              }
              if (!(field = this._fieldsById[id])) {
                switch (wireType) {
                 case ProtoBuf.WIRE_TYPES.VARINT:
                  buffer.readVarint32();
                  break;

                 case ProtoBuf.WIRE_TYPES.BITS32:
                  buffer.offset += 4;
                  break;

                 case ProtoBuf.WIRE_TYPES.BITS64:
                  buffer.offset += 8;
                  break;

                 case ProtoBuf.WIRE_TYPES.LDELIM:
                  var len = buffer.readVarint32();
                  buffer.offset += len;
                  break;

                 case ProtoBuf.WIRE_TYPES.STARTGROUP:
                  while (skipTillGroupEnd(id, buffer)) ;
                  break;

                 default:
                  throw Error("Illegal wire type for unknown field " + id + " in " + this.toString(true) + "#decode: " + wireType);
                }
                continue;
              }
              if (field.repeated && !field.options["packed"]) msg[field.name].push(field.decode(wireType, buffer)); else if (field.map) {
                var keyval = field.decode(wireType, buffer);
                msg[field.name].set(keyval[0], keyval[1]);
              } else {
                msg[field.name] = field.decode(wireType, buffer);
                if (field.oneof) {
                  var currentField = msg[field.oneof.name];
                  null !== currentField && currentField !== field.name && (msg[currentField] = null);
                  msg[field.oneof.name] = field.name;
                }
              }
            }
            for (var i = 0, k = this._fields.length; i < k; ++i) {
              field = this._fields[i];
              if (null === msg[field.name]) if ("proto3" === this.syntax) msg[field.name] = field.defaultValue; else {
                if (field.required) {
                  var err = Error("Missing at least one required field for " + this.toString(true) + ": " + field.name);
                  err["decoded"] = msg;
                  throw err;
                }
                ProtoBuf.populateDefaults && null !== field.defaultValue && (msg[field.name] = field.defaultValue);
              }
            }
            return msg;
          };
          Reflect.Message = Message;
          var Field = function Field(builder, message, rule, keytype, type, name, id, options, oneof, syntax) {
            T.call(this, builder, message, name);
            this.className = "Message.Field";
            this.required = "required" === rule;
            this.repeated = "repeated" === rule;
            this.map = "map" === rule;
            this.keyType = keytype || null;
            this.type = type;
            this.resolvedType = null;
            this.id = id;
            this.options = options || {};
            this.defaultValue = null;
            this.oneof = oneof || null;
            this.syntax = syntax || "proto2";
            this.originalName = this.name;
            this.element = null;
            this.keyElement = null;
            !this.builder.options["convertFieldsToCamelCase"] || this instanceof Message.ExtensionField || (this.name = ProtoBuf.Util.toCamelCase(this.name));
          };
          var FieldPrototype = Field.prototype = Object.create(T.prototype);
          FieldPrototype.build = function() {
            this.element = new Element(this.type, this.resolvedType, false, this.syntax, this.name);
            this.map && (this.keyElement = new Element(this.keyType, void 0, true, this.syntax, this.name));
            "proto3" !== this.syntax || this.repeated || this.map ? "undefined" !== typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = Element.defaultFieldValue(this.type);
          };
          FieldPrototype.verifyValue = function(value, skipRepeated) {
            skipRepeated = skipRepeated || false;
            var self = this;
            function fail(val, msg) {
              throw Error("Illegal value for " + self.toString(true) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
            }
            if (null === value) {
              this.required && fail("undefined" === typeof value ? "undefined" : _typeof(value), "required");
              "proto3" === this.syntax && this.type !== ProtoBuf.TYPES["message"] && fail("undefined" === typeof value ? "undefined" : _typeof(value), "proto3 field without field presence cannot be null");
              return null;
            }
            var i;
            if (this.repeated && !skipRepeated) {
              Array.isArray(value) || (value = [ value ]);
              var res = [];
              for (i = 0; i < value.length; i++) res.push(this.element.verifyValue(value[i]));
              return res;
            }
            if (this.map && !skipRepeated) {
              if (value instanceof ProtoBuf.Map) return value;
              value instanceof Object || fail("undefined" === typeof value ? "undefined" : _typeof(value), "expected ProtoBuf.Map or raw object for map field");
              return new ProtoBuf.Map(this, value);
            }
            !this.repeated && Array.isArray(value) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "no array expected");
            return this.element.verifyValue(value);
          };
          FieldPrototype.hasWirePresence = function(value, message) {
            if ("proto3" !== this.syntax) return null !== value;
            if (this.oneof && message[this.oneof.name] === this.name) return true;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              return 0 !== value;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              return 0 !== value.low || 0 !== value.high;

             case ProtoBuf.TYPES["bool"]:
              return value;

             case ProtoBuf.TYPES["float"]:
             case ProtoBuf.TYPES["double"]:
              return 0 !== value;

             case ProtoBuf.TYPES["string"]:
              return value.length > 0;

             case ProtoBuf.TYPES["bytes"]:
              return value.remaining() > 0;

             case ProtoBuf.TYPES["enum"]:
              return 0 !== value;

             case ProtoBuf.TYPES["message"]:
              return null !== value;

             default:
              return true;
            }
          };
          FieldPrototype.encode = function(value, buffer, message) {
            if (null === this.type || "object" !== _typeof(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
            if (null === value || this.repeated && 0 == value.length) return buffer;
            try {
              if (this.repeated) {
                var i;
                if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                  buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                  buffer.ensureCapacity(buffer.offset += 1);
                  var start = buffer.offset;
                  for (i = 0; i < value.length; i++) this.element.encodeValue(this.id, value[i], buffer);
                  var len = buffer.offset - start, varintLen = ByteBuffer.calculateVarint32(len);
                  if (varintLen > 1) {
                    var contents = buffer.slice(start, buffer.offset);
                    start += varintLen - 1;
                    buffer.offset = start;
                    buffer.append(contents);
                  }
                  buffer.writeVarint32(len, start - varintLen);
                } else for (i = 0; i < value.length; i++) buffer.writeVarint32(this.id << 3 | this.type.wireType), 
                this.element.encodeValue(this.id, value[i], buffer);
              } else if (this.map) value.forEach(function(val, key, m) {
                var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
                buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                buffer.writeVarint32(length);
                buffer.writeVarint32(8 | this.keyType.wireType);
                this.keyElement.encodeValue(1, key, buffer);
                buffer.writeVarint32(16 | this.type.wireType);
                this.element.encodeValue(2, val, buffer);
              }, this); else if (this.hasWirePresence(value, message)) {
                buffer.writeVarint32(this.id << 3 | this.type.wireType);
                this.element.encodeValue(this.id, value, buffer);
              }
            } catch (e) {
              throw Error("Illegal value for " + this.toString(true) + ": " + value + " (" + e + ")");
            }
            return buffer;
          };
          FieldPrototype.calculate = function(value, message) {
            value = this.verifyValue(value);
            if (null === this.type || "object" !== _typeof(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
            if (null === value || this.repeated && 0 == value.length) return 0;
            var n = 0;
            try {
              if (this.repeated) {
                var i, ni;
                if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                  n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                  ni = 0;
                  for (i = 0; i < value.length; i++) ni += this.element.calculateLength(this.id, value[i]);
                  n += ByteBuffer.calculateVarint32(ni);
                  n += ni;
                } else for (i = 0; i < value.length; i++) n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType), 
                n += this.element.calculateLength(this.id, value[i]);
              } else if (this.map) value.forEach(function(val, key, m) {
                var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
                n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                n += ByteBuffer.calculateVarint32(length);
                n += length;
              }, this); else if (this.hasWirePresence(value, message)) {
                n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType);
                n += this.element.calculateLength(this.id, value);
              }
            } catch (e) {
              throw Error("Illegal value for " + this.toString(true) + ": " + value + " (" + e + ")");
            }
            return n;
          };
          FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
            var value, nBytes;
            var wireTypeOK = !this.map && wireType == this.type.wireType || !skipRepeated && this.repeated && this.options["packed"] && wireType == ProtoBuf.WIRE_TYPES.LDELIM || this.map && wireType == ProtoBuf.WIRE_TYPES.LDELIM;
            if (!wireTypeOK) throw Error("Illegal wire type for field " + this.toString(true) + ": " + wireType + " (" + this.type.wireType + " expected)");
            if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !skipRepeated) {
              nBytes = buffer.readVarint32();
              nBytes = buffer.offset + nBytes;
              var values = [];
              while (buffer.offset < nBytes) values.push(this.decode(this.type.wireType, buffer, true));
              return values;
            }
            if (this.map) {
              var key = Element.defaultFieldValue(this.keyType);
              value = Element.defaultFieldValue(this.type);
              nBytes = buffer.readVarint32();
              if (buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(true) + ": " + nBytes + " required but got only " + buffer.remaining());
              var msgbuf = buffer.clone();
              msgbuf.limit = msgbuf.offset + nBytes;
              buffer.offset += nBytes;
              while (msgbuf.remaining() > 0) {
                var tag = msgbuf.readVarint32();
                wireType = 7 & tag;
                var id = tag >>> 3;
                if (1 === id) key = this.keyElement.decode(msgbuf, wireType, id); else {
                  if (2 !== id) throw Error("Unexpected tag in map field key/value submessage");
                  value = this.element.decode(msgbuf, wireType, id);
                }
              }
              return [ key, value ];
            }
            return this.element.decode(buffer, wireType, this.id);
          };
          Reflect.Message.Field = Field;
          var ExtensionField = function ExtensionField(builder, message, rule, type, name, id, options) {
            Field.call(this, builder, message, rule, null, type, name, id, options);
            this.extension;
          };
          ExtensionField.prototype = Object.create(Field.prototype);
          Reflect.Message.ExtensionField = ExtensionField;
          var OneOf = function OneOf(builder, message, name) {
            T.call(this, builder, message, name);
            this.fields = [];
          };
          Reflect.Message.OneOf = OneOf;
          var Enum = function Enum(builder, parent, name, options, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);
            this.className = "Enum";
            this.object = null;
          };
          Enum.getName = function(enm, value) {
            var keys = Object.keys(enm);
            for (var i = 0, key; i < keys.length; ++i) if (enm[key = keys[i]] === value) return key;
            return null;
          };
          var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);
          EnumPrototype.build = function(rebuild) {
            if (this.object && !rebuild) return this.object;
            var enm = new ProtoBuf.Builder.Enum(), values = this.getChildren(Enum.Value);
            for (var i = 0, k = values.length; i < k; ++i) enm[values[i]["name"]] = values[i]["id"];
            Object.defineProperty && Object.defineProperty(enm, "$options", {
              value: this.buildOpt(),
              enumerable: false
            });
            return this.object = enm;
          };
          Reflect.Enum = Enum;
          var Value = function Value(builder, enm, name, id) {
            T.call(this, builder, enm, name);
            this.className = "Enum.Value";
            this.id = id;
          };
          Value.prototype = Object.create(T.prototype);
          Reflect.Enum.Value = Value;
          var Extension = function Extension(builder, parent, name, field) {
            T.call(this, builder, parent, name);
            this.field = field;
          };
          Extension.prototype = Object.create(T.prototype);
          Reflect.Extension = Extension;
          var Service = function Service(builder, root, name, options) {
            Namespace.call(this, builder, root, name, options);
            this.className = "Service";
            this.clazz = null;
          };
          var ServicePrototype = Service.prototype = Object.create(Namespace.prototype);
          ServicePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild) return this.clazz;
            return this.clazz = function(ProtoBuf, T) {
              var Service = function Service(rpcImpl) {
                ProtoBuf.Builder.Service.call(this);
                this.rpcImpl = rpcImpl || function(name, msg, callback) {
                  setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
                };
              };
              var ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype);
              var rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod);
              for (var i = 0; i < rpc.length; i++) (function(method) {
                ServicePrototype[method.name] = function(req, callback) {
                  try {
                    try {
                      req = method.resolvedRequestType.clazz.decode(ByteBuffer.wrap(req));
                    } catch (err) {
                      if (!(err instanceof TypeError)) throw err;
                    }
                    if (null === req || "object" !== ("undefined" === typeof req ? "undefined" : _typeof(req))) throw Error("Illegal arguments");
                    req instanceof method.resolvedRequestType.clazz || (req = new method.resolvedRequestType.clazz(req));
                    this.rpcImpl(method.fqn(), req, function(err, res) {
                      if (err) {
                        callback(err);
                        return;
                      }
                      null === res && (res = "");
                      try {
                        res = method.resolvedResponseType.clazz.decode(res);
                      } catch (notABuffer) {}
                      if (!res || !(res instanceof method.resolvedResponseType.clazz)) {
                        callback(Error("Illegal response type received in service method " + T.name + "#" + method.name));
                        return;
                      }
                      callback(null, res);
                    });
                  } catch (err) {
                    setTimeout(callback.bind(this, err), 0);
                  }
                };
                Service[method.name] = function(rpcImpl, req, callback) {
                  new Service(rpcImpl)[method.name](req, callback);
                };
                Object.defineProperty && (Object.defineProperty(Service[method.name], "$options", {
                  value: method.buildOpt()
                }), Object.defineProperty(ServicePrototype[method.name], "$options", {
                  value: Service[method.name]["$options"]
                }));
              })(rpc[i]);
              var $optionsS;
              var $options;
              var $typeS;
              var $type;
              Object.defineProperty && (Object.defineProperty(Service, "$options", {
                value: T.buildOpt()
              }), Object.defineProperty(ServicePrototype, "$options", {
                value: Service["$options"]
              }), Object.defineProperty(Service, "$type", {
                value: T
              }), Object.defineProperty(ServicePrototype, "$type", {
                value: T
              }));
              return Service;
            }(ProtoBuf, this);
          };
          Reflect.Service = Service;
          var Method = function Method(builder, svc, name, options) {
            T.call(this, builder, svc, name);
            this.className = "Service.Method";
            this.options = options || {};
          };
          var MethodPrototype = Method.prototype = Object.create(T.prototype);
          MethodPrototype.buildOpt = NamespacePrototype.buildOpt;
          Reflect.Service.Method = Method;
          var RPCMethod = function RPCMethod(builder, svc, name, request, response, request_stream, response_stream, options) {
            Method.call(this, builder, svc, name, options);
            this.className = "Service.RPCMethod";
            this.requestName = request;
            this.responseName = response;
            this.requestStream = request_stream;
            this.responseStream = response_stream;
            this.resolvedRequestType = null;
            this.resolvedResponseType = null;
          };
          RPCMethod.prototype = Object.create(Method.prototype);
          Reflect.Service.RPCMethod = RPCMethod;
          return Reflect;
        }(ProtoBuf);
        ProtoBuf.Builder = function(ProtoBuf, Lang, Reflect) {
          var Builder = function Builder(options) {
            this.ns = new Reflect.Namespace(this, null, "");
            this.ptr = this.ns;
            this.resolved = false;
            this.result = null;
            this.files = {};
            this.importRoot = null;
            this.options = options || {};
          };
          var BuilderPrototype = Builder.prototype;
          Builder.isMessage = function(def) {
            if ("string" !== typeof def["name"]) return false;
            if ("undefined" !== typeof def["values"] || "undefined" !== typeof def["rpc"]) return false;
            return true;
          };
          Builder.isMessageField = function(def) {
            if ("string" !== typeof def["rule"] || "string" !== typeof def["name"] || "string" !== typeof def["type"] || "undefined" === typeof def["id"]) return false;
            return true;
          };
          Builder.isEnum = function(def) {
            if ("string" !== typeof def["name"]) return false;
            if ("undefined" === typeof def["values"] || !Array.isArray(def["values"]) || 0 === def["values"].length) return false;
            return true;
          };
          Builder.isService = function(def) {
            if ("string" !== typeof def["name"] || "object" !== _typeof(def["rpc"]) || !def["rpc"]) return false;
            return true;
          };
          Builder.isExtend = function(def) {
            if ("string" !== typeof def["ref"]) return false;
            return true;
          };
          BuilderPrototype.reset = function() {
            this.ptr = this.ns;
            return this;
          };
          BuilderPrototype.define = function(namespace) {
            if ("string" !== typeof namespace || !Lang.TYPEREF.test(namespace)) throw Error("illegal namespace: " + namespace);
            namespace.split(".").forEach(function(part) {
              var ns = this.ptr.getChild(part);
              null === ns && this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part));
              this.ptr = ns;
            }, this);
            return this;
          };
          BuilderPrototype.create = function(defs) {
            if (!defs) return this;
            if (Array.isArray(defs)) {
              if (0 === defs.length) return this;
              defs = defs.slice();
            } else defs = [ defs ];
            var stack = [ defs ];
            while (stack.length > 0) {
              defs = stack.pop();
              if (!Array.isArray(defs)) throw Error("not a valid namespace: " + JSON.stringify(defs));
              while (defs.length > 0) {
                var def = defs.shift();
                if (Builder.isMessage(def)) {
                  var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"], def["syntax"]);
                  var oneofs = {};
                  def["oneofs"] && Object.keys(def["oneofs"]).forEach(function(name) {
                    obj.addChild(oneofs[name] = new Reflect.Message.OneOf(this, obj, name));
                  }, this);
                  def["fields"] && def["fields"].forEach(function(fld) {
                    if (null !== obj.getChild(0 | fld["id"])) throw Error("duplicate or invalid field id in " + obj.name + ": " + fld["id"]);
                    if (fld["options"] && "object" !== _typeof(fld["options"])) throw Error("illegal field options in " + obj.name + "#" + fld["name"]);
                    var oneof = null;
                    if ("string" === typeof fld["oneof"] && !(oneof = oneofs[fld["oneof"]])) throw Error("illegal oneof in " + obj.name + "#" + fld["name"] + ": " + fld["oneof"]);
                    fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["keytype"], fld["type"], fld["name"], fld["id"], fld["options"], oneof, def["syntax"]);
                    oneof && oneof.fields.push(fld);
                    obj.addChild(fld);
                  }, this);
                  var subObj = [];
                  def["enums"] && def["enums"].forEach(function(enm) {
                    subObj.push(enm);
                  });
                  def["messages"] && def["messages"].forEach(function(msg) {
                    subObj.push(msg);
                  });
                  def["services"] && def["services"].forEach(function(svc) {
                    subObj.push(svc);
                  });
                  def["extensions"] && ("number" === typeof def["extensions"][0] ? obj.extensions = [ def["extensions"] ] : obj.extensions = def["extensions"]);
                  this.ptr.addChild(obj);
                  if (subObj.length > 0) {
                    stack.push(defs);
                    defs = subObj;
                    subObj = null;
                    this.ptr = obj;
                    obj = null;
                    continue;
                  }
                  subObj = null;
                } else if (Builder.isEnum(def)) {
                  obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"], def["syntax"]);
                  def["values"].forEach(function(val) {
                    obj.addChild(new Reflect.Enum.Value(this, obj, val["name"], val["id"]));
                  }, this);
                  this.ptr.addChild(obj);
                } else if (Builder.isService(def)) {
                  obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
                  Object.keys(def["rpc"]).forEach(function(name) {
                    var mtd = def["rpc"][name];
                    obj.addChild(new Reflect.Service.RPCMethod(this, obj, name, mtd["request"], mtd["response"], !!mtd["request_stream"], !!mtd["response_stream"], mtd["options"]));
                  }, this);
                  this.ptr.addChild(obj);
                } else {
                  if (!Builder.isExtend(def)) throw Error("not a valid definition: " + JSON.stringify(def));
                  obj = this.ptr.resolve(def["ref"], true);
                  if (obj) def["fields"].forEach(function(fld) {
                    if (null !== obj.getChild(0 | fld["id"])) throw Error("duplicate extended field id in " + obj.name + ": " + fld["id"]);
                    if (obj.extensions) {
                      var valid = false;
                      obj.extensions.forEach(function(range) {
                        fld["id"] >= range[0] && fld["id"] <= range[1] && (valid = true);
                      });
                      if (!valid) throw Error("illegal extended field id in " + obj.name + ": " + fld["id"] + " (not within valid ranges)");
                    }
                    var name = fld["name"];
                    this.options["convertFieldsToCamelCase"] && (name = ProtoBuf.Util.toCamelCase(name));
                    var field = new Reflect.Message.ExtensionField(this, obj, fld["rule"], fld["type"], this.ptr.fqn() + "." + name, fld["id"], fld["options"]);
                    var ext = new Reflect.Extension(this, this.ptr, fld["name"], field);
                    field.extension = ext;
                    this.ptr.addChild(ext);
                    obj.addChild(field);
                  }, this); else if (!/\.?google\.protobuf\./.test(def["ref"])) throw Error("extended message " + def["ref"] + " is not defined");
                }
                def = null;
                obj = null;
              }
              defs = null;
              this.ptr = this.ptr.parent;
            }
            this.resolved = false;
            this.result = null;
            return this;
          };
          function propagateSyntax(parent) {
            parent["messages"] && parent["messages"].forEach(function(child) {
              child["syntax"] = parent["syntax"];
              propagateSyntax(child);
            });
            parent["enums"] && parent["enums"].forEach(function(child) {
              child["syntax"] = parent["syntax"];
            });
          }
          BuilderPrototype["import"] = function(json, filename) {
            var delim = "/";
            if ("string" === typeof filename) {
              cc.sys.isNative;
              ProtoBuf.Util.IS_NODE && (filename = require("path")["resolve"](filename));
              if (true === this.files[filename]) return this.reset();
              this.files[filename] = true;
            } else if ("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename))) {
              var root = filename.root;
              ProtoBuf.Util.IS_NODE && (root = require("path")["resolve"](root));
              (root.indexOf("\\") >= 0 || filename.file.indexOf("\\") >= 0) && (delim = "\\");
              var fname = root + delim + filename.file;
              if (true === this.files[fname]) return this.reset();
              this.files[fname] = true;
            }
            if (json["imports"] && json["imports"].length > 0) {
              var importRoot, resetRoot = false;
              if ("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename))) {
                this.importRoot = filename["root"];
                resetRoot = true;
                importRoot = this.importRoot;
                filename = filename["file"];
                (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0) && (delim = "\\");
              } else if ("string" === typeof filename) if (this.importRoot) importRoot = this.importRoot; else if (filename.indexOf("/") >= 0) {
                importRoot = filename.replace(/\/[^\/]*$/, "");
                "" === importRoot && (importRoot = "/");
              } else if (filename.indexOf("\\") >= 0) {
                importRoot = filename.replace(/\\[^\\]*$/, "");
                delim = "\\";
              } else importRoot = "."; else importRoot = null;
              for (var i = 0; i < json["imports"].length; i++) if ("string" === typeof json["imports"][i]) {
                if (!importRoot) throw Error("cannot determine import root");
                var importFilename = json["imports"][i];
                if ("google/protobuf/descriptor.proto" === importFilename) continue;
                importFilename = importRoot + delim + importFilename;
                if (true === this.files[importFilename]) continue;
                /\.proto$/i.test(importFilename) && !ProtoBuf.DotProto && (importFilename = importFilename.replace(/\.proto$/, ".json"));
                var contents = ProtoBuf.Util.fetch(importFilename);
                if (null === contents) throw Error("failed to import '" + importFilename + "' in '" + filename + "': file not found");
                /\.json$/i.test(importFilename) ? this["import"](JSON.parse(contents + ""), importFilename) : this["import"](ProtoBuf.DotProto.Parser.parse(contents), importFilename);
              } else filename ? /\.(\w+)$/.test(filename) ? this["import"](json["imports"][i], filename.replace(/^(.+)\.(\w+)$/, function($0, $1, $2) {
                return $1 + "_import" + i + "." + $2;
              })) : this["import"](json["imports"][i], filename + "_import" + i) : this["import"](json["imports"][i]);
              resetRoot && (this.importRoot = null);
            }
            json["package"] && this.define(json["package"]);
            json["syntax"] && propagateSyntax(json);
            var base = this.ptr;
            json["options"] && Object.keys(json["options"]).forEach(function(key) {
              base.options[key] = json["options"][key];
            });
            json["messages"] && (this.create(json["messages"]), this.ptr = base);
            json["enums"] && (this.create(json["enums"]), this.ptr = base);
            json["services"] && (this.create(json["services"]), this.ptr = base);
            json["extends"] && this.create(json["extends"]);
            return this.reset();
          };
          BuilderPrototype.resolveAll = function() {
            var res;
            if (null == this.ptr || "object" === _typeof(this.ptr.type)) return this;
            if (this.ptr instanceof Reflect.Namespace) this.ptr.children.forEach(function(child) {
              this.ptr = child;
              this.resolveAll();
            }, this); else if (this.ptr instanceof Reflect.Message.Field) {
              if (Lang.TYPE.test(this.ptr.type)) this.ptr.type = ProtoBuf.TYPES[this.ptr.type]; else {
                if (!Lang.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                if (!res) throw Error("unresolvable type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                this.ptr.resolvedType = res;
                if (res instanceof Reflect.Enum) {
                  this.ptr.type = ProtoBuf.TYPES["enum"];
                  if ("proto3" === this.ptr.syntax && "proto3" !== res.syntax) throw Error("proto3 message cannot reference proto2 enum");
                } else {
                  if (!(res instanceof Reflect.Message)) throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                  this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
                }
              }
              if (this.ptr.map) {
                if (!Lang.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(true) + ": " + this.ptr.keyType);
                this.ptr.keyType = ProtoBuf.TYPES[this.ptr.keyType];
              }
            } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {
              if (!(this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(true));
              res = this.ptr.parent.resolve(this.ptr.requestName, true);
              if (!res || !(res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.requestName);
              this.ptr.resolvedRequestType = res;
              res = this.ptr.parent.resolve(this.ptr.responseName, true);
              if (!res || !(res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.responseName);
              this.ptr.resolvedResponseType = res;
            } else if (!(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && !(this.ptr instanceof ProtoBuf.Reflect.Extension) && !(this.ptr instanceof ProtoBuf.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + _typeof(this.ptr) + ": " + this.ptr);
            return this.reset();
          };
          BuilderPrototype.build = function(path) {
            this.reset();
            this.resolved || (this.resolveAll(), this.resolved = true, this.result = null);
            null === this.result && (this.result = this.ns.build());
            if (!path) return this.result;
            var part = "string" === typeof path ? path.split(".") : path, ptr = this.result;
            for (var i = 0; i < part.length; i++) {
              if (!ptr[part[i]]) {
                ptr = null;
                break;
              }
              ptr = ptr[part[i]];
            }
            return ptr;
          };
          BuilderPrototype.lookup = function(path, excludeNonNamespace) {
            return path ? this.ns.resolve(path, excludeNonNamespace) : this.ns;
          };
          BuilderPrototype.toString = function() {
            return "Builder";
          };
          Builder.Message = function() {};
          Builder.Enum = function() {};
          Builder.Service = function() {};
          return Builder;
        }(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);
        ProtoBuf.Map = function(ProtoBuf, Reflect) {
          var Map = function Map(field, contents) {
            if (!field.map) throw Error("field is not a map");
            this.field = field;
            this.keyElem = new Reflect.Element(field.keyType, null, true, field.syntax);
            this.valueElem = new Reflect.Element(field.type, field.resolvedType, false, field.syntax);
            this.map = {};
            Object.defineProperty(this, "size", {
              get: function get() {
                return Object.keys(this.map).length;
              }
            });
            if (contents) {
              var keys = Object.keys(contents);
              for (var i = 0; i < keys.length; i++) {
                var key = this.keyElem.valueFromString(keys[i]);
                var val = this.valueElem.verifyValue(contents[keys[i]]);
                this.map[this.keyElem.valueToString(key)] = {
                  key: key,
                  value: val
                };
              }
            }
          };
          var MapPrototype = Map.prototype;
          function arrayIterator(arr) {
            var idx = 0;
            return {
              next: function next() {
                if (idx < arr.length) return {
                  done: false,
                  value: arr[idx++]
                };
                return {
                  done: true
                };
              }
            };
          }
          MapPrototype.clear = function() {
            this.map = {};
          };
          MapPrototype["delete"] = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            var hadKey = keyValue in this.map;
            delete this.map[keyValue];
            return hadKey;
          };
          MapPrototype.entries = function() {
            var entries = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++) entries.push([ (entry = this.map[strKeys[i]]).key, entry.value ]);
            return arrayIterator(entries);
          };
          MapPrototype.keys = function() {
            var keys = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++) keys.push(this.map[strKeys[i]].key);
            return arrayIterator(keys);
          };
          MapPrototype.values = function() {
            var values = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++) values.push(this.map[strKeys[i]].value);
            return arrayIterator(values);
          };
          MapPrototype.forEach = function(cb, thisArg) {
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++) cb.call(thisArg, (entry = this.map[strKeys[i]]).value, entry.key, this);
          };
          MapPrototype.set = function(key, value) {
            var keyValue = this.keyElem.verifyValue(key);
            var valValue = this.valueElem.verifyValue(value);
            this.map[this.keyElem.valueToString(keyValue)] = {
              key: keyValue,
              value: valValue
            };
            return this;
          };
          MapPrototype.get = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            if (!(keyValue in this.map)) return;
            return this.map[keyValue].value;
          };
          MapPrototype.has = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            return keyValue in this.map;
          };
          return Map;
        }(ProtoBuf, ProtoBuf.Reflect);
        ProtoBuf.loadProto = function(proto, builder, filename) {
          ("string" === typeof builder || builder && "string" === typeof builder["file"] && "string" === typeof builder["root"]) && (filename = builder, 
          builder = void 0);
          return ProtoBuf.loadJson(ProtoBuf.DotProto.Parser.parse(proto), builder, filename);
        };
        ProtoBuf.protoFromString = ProtoBuf.loadProto;
        ProtoBuf.loadProtoFile = function(filename, callback, builder) {
          callback && "object" === ("undefined" === typeof callback ? "undefined" : _typeof(callback)) ? (builder = callback, 
          callback = null) : callback && "function" === typeof callback || (callback = null);
          if (callback) return ProtoBuf.Util.fetch("string" === typeof filename ? filename : filename["root"] + "/" + filename["file"], function(contents) {
            if (null === contents) {
              callback(Error("Failed to fetch file"));
              return;
            }
            try {
              callback(null, ProtoBuf.loadProto(contents, builder, filename));
            } catch (e) {
              callback(e);
            }
          });
          var contents = ProtoBuf.Util.fetch("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename)) ? filename["root"] + "/" + filename["file"] : filename);
          return null === contents ? null : ProtoBuf.loadProto(contents, builder, filename);
        };
        ProtoBuf.protoFromFile = ProtoBuf.loadProtoFile;
        ProtoBuf.newBuilder = function(options) {
          options = options || {};
          "undefined" === typeof options["convertFieldsToCamelCase"] && (options["convertFieldsToCamelCase"] = ProtoBuf.convertFieldsToCamelCase);
          "undefined" === typeof options["populateAccessors"] && (options["populateAccessors"] = ProtoBuf.populateAccessors);
          return new ProtoBuf.Builder(options);
        };
        ProtoBuf.loadJson = function(json, builder, filename) {
          ("string" === typeof builder || builder && "string" === typeof builder["file"] && "string" === typeof builder["root"]) && (filename = builder, 
          builder = null);
          builder && "object" === ("undefined" === typeof builder ? "undefined" : _typeof(builder)) || (builder = ProtoBuf.newBuilder());
          "string" === typeof json && (json = JSON.parse(json));
          builder["import"](json, filename);
          builder.resolveAll();
          return builder;
        };
        ProtoBuf.loadJsonFile = function(filename, callback, builder) {
          callback && "object" === ("undefined" === typeof callback ? "undefined" : _typeof(callback)) ? (builder = callback, 
          callback = null) : callback && "function" === typeof callback || (callback = null);
          if (callback) return ProtoBuf.Util.fetch("string" === typeof filename ? filename : filename["root"] + "/" + filename["file"], function(contents) {
            if (null === contents) {
              callback(Error("Failed to fetch file"));
              return;
            }
            try {
              callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
            } catch (e) {
              callback(e);
            }
          });
          var contents = ProtoBuf.Util.fetch("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename)) ? filename["root"] + "/" + filename["file"] : filename);
          return null === contents ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
        };
        return ProtoBuf;
      });
      cc._RF.pop();
    }).call(this, require("_process"));
  }, {
    _process: 2,
    bytebuffer: "bytebuffer",
    fs: void 0,
    path: 1
  } ],
  updateApp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c93c7uwoYdCHIG/EYWlxdm/", "updateApp");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Utils_1 = require("../common/Utils");
    var UpdateCallBackType;
    (function(UpdateCallBackType) {
      UpdateCallBackType[UpdateCallBackType["UpdateCallBackType_NONE"] = 0] = "UpdateCallBackType_NONE";
      UpdateCallBackType[UpdateCallBackType["UpdateCallBackType_CHECKED"] = 1] = "UpdateCallBackType_CHECKED";
      UpdateCallBackType[UpdateCallBackType["UpdateCallBackType_ONUPDATE"] = 2] = "UpdateCallBackType_ONUPDATE";
      UpdateCallBackType[UpdateCallBackType["UpdateCallBackType_UPDATE_ERROR"] = 3] = "UpdateCallBackType_UPDATE_ERROR";
      UpdateCallBackType[UpdateCallBackType["UpdateCallBackType_UPDATE_END"] = 4] = "UpdateCallBackType_UPDATE_END";
      UpdateCallBackType[UpdateCallBackType["UpdateCallBackType_ALREADY_UP_TO_DATE"] = 5] = "UpdateCallBackType_ALREADY_UP_TO_DATE";
      UpdateCallBackType[UpdateCallBackType["UpdateCallBackType_MAX"] = 6] = "UpdateCallBackType_MAX";
    })(UpdateCallBackType = exports.UpdateCallBackType || (exports.UpdateCallBackType = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var updateApp = function() {
      function updateApp() {
        this._updating = false;
        this._canRetry = false;
        this._am = null;
        this._updateListener = null;
        this._checkListener = null;
        this.m_fCallback = null;
      }
      updateApp_1 = updateApp;
      updateApp.getInstance = function() {
        updateApp_1.instance || (updateApp_1.instance = new updateApp_1());
        return updateApp_1.instance;
      };
      updateApp.prototype.retry = function() {
        if (!this._updating && this._canRetry) {
          this._canRetry = false;
          this._am.downloadFailedAssets();
        }
      };
      updateApp.prototype.createAssetsManager = function() {
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "lbdwc_hot";
        this._am = new jsb.AssetsManager("", storagePath);
        cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._am.retain();
        this._am.setVersionCompareHandle(Utils_1.default.getInstance().checkVersion);
        this._am.setVerifyCallback(function(path, asset) {
          var compressed = asset.compressed;
          var expectedMD5 = asset.md5;
          var relativePath = asset.path;
          var size = asset.size;
          return compressed, true;
        });
        cc.sys.os === cc.sys.OS_ANDROID && this._am.setMaxConcurrentTask(2);
      };
      updateApp.prototype.updateSonApp = function(callback, url, storagePath) {
        this.m_fCallback = callback;
        if (this._updating) {
          cc.log("正在更新");
          return false;
        }
        if (this._am) {
          delete this._am;
          this._am = null;
        }
        this.createAssetsManager();
        var customManifestStr = "";
        customManifestStr = jsb.fileUtils.isFileExist(storagePath + "peision.manifest") ? jsb.fileUtils.getStringFromFile(storagePath + "peision.manifest") : JSON.stringify({
          packageUrl: url,
          remoteManifestUrl: url + "peision.manifest",
          remoteVersionUrl: url + "version.manifest",
          version: "0.0.0",
          assets: {},
          searchPaths: []
        });
        cc.log(url);
        var manifest = new jsb.Manifest(customManifestStr, storagePath);
        this._am.loadLocalManifest(manifest, storagePath);
        this.checkUpdate();
        return true;
      };
      updateApp.prototype.updateApp = function(callback, data, storagePath) {
        this.m_fCallback = callback;
        if (this._updating) {
          cc.log("正在更新");
          return false;
        }
        this._am || this.createAssetsManager();
        var manifest = new jsb.Manifest(data, storagePath);
        this._am.loadLocalManifest(manifest, storagePath);
        this.checkUpdate();
        return true;
      };
      updateApp.prototype.checkUpdate = function() {
        cc.log("checkUpdate : " + this._am.getState());
        if (this._updating) {
          cc.log("checkUpdate 正在更新");
          return;
        }
        if (!this._am.getLocalManifest().isLoaded()) {
          cc.log("checkUpdate 加载本地配置失败");
          return;
        }
        this._updating = true;
        if (this._updateListener) {
          cc.eventManager.removeListener(this._updateListener);
          this._updateListener = null;
        }
        if (this._checkListener) {
          cc.eventManager.removeListener(this._checkListener);
          this._checkListener = null;
        }
        this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        cc.eventManager.addListener(this._checkListener, 1);
        this.m_fCallback && this.m_fCallback(UpdateCallBackType.UpdateCallBackType_CHECKED, 0);
        this._am.checkUpdate();
      };
      updateApp.prototype.checkCb = function(event) {
        console.log("checkCb : " + event.getEventCode());
        this._updating = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
          this.m_fCallback && this.m_fCallback(UpdateCallBackType.UpdateCallBackType_UPDATE_ERROR, 1);
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this.m_fCallback && this.m_fCallback(UpdateCallBackType.UpdateCallBackType_ALREADY_UP_TO_DATE, 1);
          break;

         case jsb.EventAssetsManager.NEW_VERSION_FOUND:
          this.m_fCallback && this.m_fCallback(UpdateCallBackType.UpdateCallBackType_ONUPDATE, 0);
          break;

         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          cc.log("No local manifest file found, hot update skipped.");
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          cc.log("Fail to download manifest file, hot update skipped.");
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          cc.log("Update failed. " + event.getMessage());
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          cc.log(event.getMessage());
          break;

         default:
          return;
        }
        cc.eventManager.removeListener(this._checkListener);
        this._checkListener = null;
        event.getEventCode() == jsb.EventAssetsManager.NEW_VERSION_FOUND && this.hotUpdate();
      };
      updateApp.prototype.hotUpdate = function() {
        if (this._am && !this._updating) {
          this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
          cc.eventManager.removeListener(this._updateListener);
          cc.eventManager.addListener(this._updateListener, 1);
          this._am.update();
          this._updating = true;
        }
      };
      updateApp.prototype.updateCb = function(event) {
        console.log("updateCb : " + event.getEventCode());
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          var percent = event.getPercentByFile();
          percent && this.m_fCallback && this.m_fCallback(UpdateCallBackType.UpdateCallBackType_ONUPDATE, (100 * percent).toFixed(0));
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this._updating = false;
          this.m_fCallback && this.m_fCallback(UpdateCallBackType.UpdateCallBackType_ALREADY_UP_TO_DATE, 1);
          cc.eventManager.removeListener(this._updateListener);
          this._updateListener = null;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          this._updating = false;
          cc.eventManager.removeListener(this._updateListener);
          this._updateListener = null;
          var newPaths = this._am.getLocalManifest().getSearchPaths();
          this.m_fCallback && this.m_fCallback(UpdateCallBackType.UpdateCallBackType_UPDATE_END, newPaths);
        }
      };
      updateApp.instance = null;
      updateApp = updateApp_1 = __decorate([ ccclass ], updateApp);
      return updateApp;
      var updateApp_1;
    }();
    exports.updateApp = updateApp;
    cc._RF.pop();
  }, {
    "../common/Utils": "Utils"
  } ],
  utilMd5: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec769EhhWtGLLO0QKUwD9WQ", "utilMd5");
    "use strict";
    function safe_add(x, y) {
      var lsw = (65535 & x) + (65535 & y);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | 65535 & lsw;
    }
    function rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    function cmn(q, a, b, x, s, t) {
      return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function ff(a, b, c, d, x, s, t) {
      return cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function gg(a, b, c, d, x, s, t) {
      return cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function hh(a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a, b, c, d, x, s, t) {
      return cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function coreMD5(x) {
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return [ a, b, c, d ];
    }
    function binl2hex(binarray) {
      var hex_tab = "0123456789abcdef";
      var str = "";
      for (var i = 0; i < 4 * binarray.length; i++) str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
      return str;
    }
    function binl2b64(binarray) {
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var str = "";
      for (var i = 0; i < 32 * binarray.length; i += 6) str += tab.charAt(binarray[i >> 5] << i % 32 & 63 | binarray[i >> 6] >> 32 - i % 32 & 63);
      return str;
    }
    function str2binl(str) {
      var nblk = 1 + (str.length + 8 >> 6);
      var blks = new Array(16 * nblk);
      for (var i = 0; i < 16 * nblk; i++) blks[i] = 0;
      for (var i = 0; i < str.length; i++) blks[i >> 2] |= (255 & str.charCodeAt(i)) << i % 4 * 8;
      blks[i >> 2] |= 128 << i % 4 * 8;
      blks[16 * nblk - 2] = 8 * str.length;
      return blks;
    }
    function strw2binl(str) {
      var nblk = 1 + (str.length + 4 >> 5);
      var blks = new Array(16 * nblk);
      for (var i = 0; i < 16 * nblk; i++) blks[i] = 0;
      for (var i = 0; i < str.length; i++) blks[i >> 1] |= str.charCodeAt(i) << i % 2 * 16;
      blks[i >> 1] |= 128 << i % 2 * 16;
      blks[16 * nblk - 2] = 16 * str.length;
      return blks;
    }
    function hexMD5(str) {
      return binl2hex(coreMD5(str2binl(str)));
    }
    function hexMD5w(str) {
      return binl2hex(coreMD5(strw2binl(str)));
    }
    function b64MD5(str) {
      return binl2b64(coreMD5(str2binl(str)));
    }
    function b64MD5w(str) {
      return binl2b64(coreMD5(strw2binl(str)));
    }
    function calcMD5(str) {
      return binl2hex(coreMD5(str2binl(str)));
    }
    module.exports = {
      hexMD5: hexMD5
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "AudioManager", "CryptoJS", "HeadDefine", "JSBUtils", "Language", "NetWork", "PlayerData", "Slideshow", "Utils", "bytebuffer", "long", "protobuf", "protobuf.min", "utilMd5", "LoginScene", "loadScene", "ChooseRoom", "GameGameChoose", "GameIndicator", "MainUIScene", "MessageBox", "PromptDialog", "WaitLoadAct", "updateApp" ]);
(function () {

    // 这是为了解决一个重启的 bug 而添加的
    cc.director.startAnimation();

    'use strict';
    var _CCSettings = null;

    var settings = null;

    cc.INGAME = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "8010/";

    if (!cc.baijiale) {

        require(cc.INGAME + 'src/settings.js');

        cc.baijiale = settings = window._CCSettings;


        //重点 加入自己游戏大厅场景db 和 uuid   跳转场景和 原跳转场景一样无需在重新更改代码

        settings["scenes"].push({ "url": "db://assets/resources/mainUI/scene/mainUIScene.fire", "uuid": "21Mq6dmrFBBooQWcDFUv30" });

        require(settings.debug ? cc.INGAME + 'src/project.dev.js' : cc.INGAME + 'src/project.js');

    } else {

        settings = cc.baijiale;
    }

    window._CCSettings = undefined;




    var uuids = settings.uuids ? settings.uuids : [];


    var rawAssets = settings.rawAssets;
    var assetTypes = settings.assetTypes;
    var realRawAssets = settings.rawAssets = {};
    for (var mount in rawAssets) {
        var entries = rawAssets[mount];
        var realEntries = realRawAssets[mount] = {};
        for (var id in entries) {
            var entry = entries[id];
            var type = entry[1];
            // retrieve minified raw asset
            if (typeof type === 'number') {
                entry[1] = assetTypes[type];
            }
            // retrieve uuid
            realEntries[uuids[id] || id] = entry;
        }
    }

    var scenes = settings.scenes;
    for (var i = 0; i < scenes.length; ++i) {
        var scene = scenes[i];
        if (typeof scene.uuid === 'number') {
            scene.uuid = uuids[scene.uuid];
        }
    }

    var packedAssets = settings.packedAssets;
    for (var packId in packedAssets) {
        var packedIds = packedAssets[packId];
        for (var j = 0; j < packedIds.length; ++j) {
            if (typeof packedIds[j] === 'number') {
                packedIds[j] = uuids[packedIds[j]];
            }
        }
    }


    var onStart = function () {
        cc.view.resizeWithBrowserSize(true);
        // UC browser on many android devices have performance issue with retina display
        if (cc.sys.os !== cc.sys.OS_ANDROID || cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC) {
            cc.view.enableRetina(true);
        }
        //cc.view.setDesignResolutionSize(settings.designWidth, settings.designHeight, cc.ResolutionPolicy.SHOW_ALL);



        if (cc.sys.isMobile) {
            if (settings.orientation === 'landscape') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            else if (settings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
            // qq, wechat, baidu
            cc.view.enableAutoFullScreen(
                cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU &&
                cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT &&
                cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ
            );
        }

        // Limit downloading max concurrent task to 2,
        // more tasks simultaneously may cause performance draw back on some android system / brwosers.
        // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
        }


        // init assets
        cc.AssetLibrary.init({
            libraryPath: cc.INGAME + 'res/import',
            rawAssetsBase: cc.INGAME + 'res/raw-',
            rawAssets: settings.rawAssets,
            packedAssets: settings.packedAssets,
            md5AssetsMap: settings.md5AssetsMap
        });

        var launchScene = settings.launchScene;

        // load scene
        if (cc.runtime) {
            cc.director.setRuntimeLaunchScene(launchScene);
        }
        cc.director.loadScene(launchScene, null,
            function () {
                if (cc.sys.isBrowser) {
                    // show canvas
                    canvas.style.visibility = '';
                    var div = document.getElementById('GameDiv');
                    if (div) {
                        div.style.backgroundImage = '';
                    }
                }
                cc.loader.onProgress = null;

                // play game
                // cc.game.resume();

                console.log('Success to load scene: ' + launchScene);
            }
        );
    };

    // jsList
    var jsList = settings.jsList;
    var bundledScript = settings.debug ? cc.INGAME + 'src/project.dev.js' : cc.INGAME + 'src/project.js';
    if (jsList) {
        jsList = jsList.map(function (x) { return cc.INGAME + 'src/' + x; });
        jsList.push(bundledScript);
    }
    else {
        jsList = [bundledScript];
    }

    // anysdk scripts
    if (cc.sys.isNative && cc.sys.isMobile) {
        // jsList = jsList.concat(['src/anysdk/jsb_anysdk.js', 'src/anysdk/jsb_anysdk_constants.js']);
    }
    var option = {
        //width: width,
        //height: height,
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
        renderMode: 0
    };

    cc.game.run(option, onStart);
})();
(function () {


    // 这是为了解决一个重启的 bug 而添加的
    cc.director.startAnimation();

    'use strict';

    var _CCSettings = null;
    var settings = null;

    cc.INGAME = "";//(jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/');

    if (!cc.dating) {
        require(cc.INGAME + 'src/settings.js');
        cc.dating = settings = window._CCSettings;
        settings["scenes"].push({ "url": "db://assets/resources/mainUI/scene/mainUIScene.fire", "uuid": "21Mq6dmrFBBooQWcDFUv30" });
    } else {
        settings = cc.dating;
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


    // init engine
    var canvas;
    var onStart = function () {


        cc.view.resizeWithBrowserSize(true);

        if (cc.sys.os !== cc.sys.OS_ANDROID || cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC) {
            cc.view.enableRetina(true);
        }

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

        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
        }



        // init assets
        cc.AssetLibrary.init({
            libraryPath: cc.INGAME + 'res/import',
            rawAssetsBase: cc.INGAME + 'res/raw-',
            rawAssets: settings.rawAssets,
            packedAssets: settings.packedAssets
        });


        var launchScene = "db://assets/resources/mainUI/scene/mainUIScene.fire";

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
    var bundledScript = settings.debug ? 'project.dev.js' : 'project.js';
    if (jsList) {
        jsList.push(bundledScript);
    } else {
        jsList = [bundledScript];
    }

    jsList = jsList.map(function (x) { return cc.INGAME + 'src/' + x; });
    var option = {
        //width: width,
        //height: height,
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
        showFPS: 0,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
        renderMode: 0
    };
    cc.game.run(option, onStart);
})();
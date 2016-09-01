document.addEventListener('DOMContentLoaded', function() {
	var openId = '',
		wbuserid = '',
		XuntongJSBridge = window.XuntongJSBridge ;

	function getOS() {
		return (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'iOS' :
			navigator.userAgent.match(/Android/i) ? 'Android' : '');
	}

	/* 判断是否运行于云之家桌面端
	 * @return {object} cloudhub 返回是否桌面端、当前桌面端userAgent版本及是否支持js桥
	 * cloudhub = {isCloudHub: true | false, hasJsBridget: true | false, version: '0.0.1'}
	 */

	function getCloudHub() {
		var ua = window.navigator.userAgent;
		var reg = /cloudhub 10204\/([^;]+)/;
		var cloudhub = {
			isCloudHub: false,
			hasJsBridget: false,
			version: ''
		};

		var match = reg.exec(ua),
			version;

		if (match) {
			version = match[1];
			cloudhub.isCloudHub = true;
			cloudhub.version = version;

			if (version.replace(/\./g, '') > 1) {
				cloudhub.hasJsBridget = true;
			}
		}

		return cloudhub;
	}

	function callback(result) {
		var success;
		/* ****  注意 start **** */
		/* ****  由于在桌面端，实现js桥方式不同，这里的回调返回值result是一个string **** */
		/* ****  为确保result正常使用，建议在回调中添加如下代码 **** */
		if (typeof result == 'string') {
			result = JSON.parse(result);
		}
		success = String(result.success);
		if (success == "true") {

		} else {

		}

		alert("结果：" + JSON.stringify(result));
	}

	

	XuntongJSBridge.call('getPersonInfo', {}, function(result) {
		if (result.success) {
			openId = result.data.openId;
			wbuserid = result.data.wbuserid;
		}
	});

	//获取当前的用户环境是否ios或Android或非手机
	document.querySelector('#getOS').onclick = function() {
		var ret = getOS();
		if (ret === '') {
			ret = 'other';
		}
		alert(ret);
	};
	//判断当前环境是否支持JSBridge
	document.querySelector('#supportBridge').onclick = function() {
		alert(navigator.userAgent.indexOf('Qing') >= 0);
	};
	//当前支持的js桥的版本
	document.querySelector('#getVersion').onclick = function() {
		var ua = navigator.userAgent,
			reg = /Qing\/([^;]+)/gi,
			version = '不支持js桥',
			match = reg.exec(ua);

		if (match && match.length >= 2) {

			version = match[1];
		}
		alert(version);
	};
	//判断是否运行于云之家桌面端
	document.querySelector('#getCloudhub').onclick = function() {
		var cloudHub = getCloudHub();
		alert("结果：" + JSON.stringify(cloudHub));
	};

	
	//显示右上角按钮
	//document.querySelector('#showOptionMenu').onclick = function() {
	//	XuntongJSBridge.call('showOptionMenu');
	//};
	//隐藏右上角按钮
	//document.querySelector('#hideOptionMenu').onclick = function() {
	//	XuntongJSBridge.call('hideOptionMenu');
	//};

	//隐藏页面标题
	//document.querySelector('#hideWebViewTitle').onclick = function() {
	//	XuntongJSBridge.call('hideWebViewTitle');
	//};
	//设置页面标题并显示
	//document.querySelector('#setWebViewTitle').onclick = function() {
	//	XuntongJSBridge.call('setWebViewTitle', {
	//		'title': '你设置的标题'
	//	});
	//};

	//获取当前用户身份信息（桌面端+）
	document.querySelector('#getPersonInfo').onclick = function() {
		XuntongJSBridge.call('getPersonInfo', {}, function(result) {
			callback(result);
		});
	};

	//获取用户网络状态
	document.querySelector('#getNetworkType').onclick = function() {
		XuntongJSBridge.call('getNetworkType', {}, function(result) {
			callback(result);
		});
	};

	//打开第三方应用
	document.querySelector('#gotoApp').onclick = function() {
		XuntongJSBridge.call('gotoApp', {
			"data": 'kdweibo://p?url=https://itunes.apple.com/cn/app/bu-luo/id946626039'
		}, function(result) {
			callback(result);
		});
	};

	//进入会话
	document.querySelector('#chat').onclick = function() {
		alert('XT-' + wbuserid + '-XT-10000')
		XuntongJSBridge.call('chat', {
			//openId或者groupId
			'openId': 'XT-' + wbuserid + '-XT-10000'
		}, function(result) {
			alert("结果：" + JSON.stringify(result));
		});
	};

	// 唤起人员详情页面
	document.querySelector('#personInfo').onclick = function() {
		XuntongJSBridge.call('personInfo', {
			'openId': openId
		}, function(result) {
			callback(result);
		});
	};

	//分享接口
	document.querySelector('#share-pub').onclick = function() {
		XuntongJSBridge.call("share", {
			"shareType": "4",
			"appId": "XT-9105d076-f022-4c57-8631-6c859624d602",
			"appName": "测试",
			"theme": "组名",
			"title": "分享的标题",
			"content": "分享的内容",
			"thumbData": testImg,
			"webpageUrl": "http://baidu.com",
			"cellContent": "聊天界面显示的内容",
			"sharedObject": "all"
		}, function(result) {
			callback(result);
		});
	};

	// 切换工作圈
	document.querySelector('#switchCompany').onclick = function() {
		XuntongJSBridge.call("switchCompany", {
			"eid": "1746898"
		}, function(result) {
			callback(result);
		});
	};

	// 关闭轻应用界面
	document.querySelector('#close').onclick = function() {
		XuntongJSBridge.call('close');
	};

	// 获取图片
	document.querySelector('#selectPic').onclick = function() {
		XuntongJSBridge.call('selectPic', {}, function(result) {
			alert("结果：" + JSON.stringify(result.success) + '。由于图片编码过长，具体返回，请查看文档。');
		});
	};

	// 扫一扫
	document.querySelector('#scanQRCode').onclick = function() {
		XuntongJSBridge.call("scanQRCode", {
			"needResult": 0
		}, function(result) {
			callback(result);
		});
	};
	//自定义右上角弹出菜单
	document.querySelector('#createPop').onclick = function() {
		XuntongJSBridge.call('createPop', {
			'popTitle': '测试标题',
			'popTitleCallBackId': '弹出菜单的ID',
			'items': [{
				'text': '测试',
				'callBackId': '测试项的单项ID'
			}],
			'menuList': ['refresh', 'share', 'openWithBrowser']
		}, function(result) {
			alert("结果：" + JSON.stringify(result));
		});
	};
	//关闭右上角弹出菜单
	document.querySelector('#closePop').onclick = function() {
		XuntongJSBridge.call('closePop');
	};

	// 关闭当前webview
	document.querySelector('#closeWebView').onclick = function() {
		XuntongJSBridge.call('closeWebView');
	};

		// 云之家定位
	document.querySelector('#getLocation').onclick = function() {
		XuntongJSBridge.call('getLocation', {}, function(result) {
			alert("结果：" + JSON.stringify(result));
		});
	};
	// 云之家选取周边位置
	document.querySelector('#selectLocation').onclick = function() {
		XuntongJSBridge.call('selectLocation', {
				'isLocation': true
			},
			function(result) {
				alert("结果：" + JSON.stringify(result));
			}
		);
	};
	
	// 云之家选取周边位置
    document.querySelector('#selectPersons').onclick = function() {
        XuntongJSBridge.call('selectPersons', {
                'isMulti':false
            },
            function(result) {
                alert("结果：" + JSON.stringify(result));
            }
        );
    };
});

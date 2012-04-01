chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		var parser = new(less.Parser);

		var cnt = 0;

		$(request).each(function(idx, val)
		{
			val.less = $.trim(val.less);
			parser.parse(val.less, function(e, css)
			{
				if (e)
				{
					request[idx].error = e;
				}
				else
				{
					request[idx].css = css.toCSS({compress: true});
					cnt++;
				}
				
			});
		});

		var payload = {
			url: sender.tab.url,
			styles: request
		};

		if (cnt > 0)
		{
			activatePopup(payload.styles.length);
		}

		localStorage["inline-less-output"] = JSON.stringify(payload);

		sendResponse(request);
	}
);

chrome.tabs.onActivated.addListener(function(obj)
{
	chrome.tabs.get(obj.tabId, function(tab)
	{
		var less_sheets = JSON.parse(localStorage["inline-less-output"]);

		if (less_sheets.url == tab.url)
		{
			activatePopup(less_sheets.styles.length);
		}
		else
		{
			deactivatePopup();
		}
	});
});

function activatePopup(num)
{
	chrome.browserAction.setBadgeBackgroundColor({color: [0, 195, 0, 255]});
	chrome.browserAction.setBadgeText({text: "" + num});
	chrome.browserAction.setPopup({popup: "popup.html"});
}

function deactivatePopup()
{
	chrome.browserAction.setBadgeBackgroundColor({color: [195, 0, 0, 255]});
	chrome.browserAction.setBadgeText({text: ""});
	chrome.browserAction.setPopup({popup: ""});
}
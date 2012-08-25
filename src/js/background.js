chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse)
	{
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
					request[idx].css = css.toCSS({compress: false});
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
			activatePopup(payload.styles);
		}
		else
		{
			deactivatePopup();
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

		if (less_sheets.url == tab.url && less_sheets.styles.length > 0)
		{
			activatePopup(less_sheets.styles);
		}
		else
		{
			deactivatePopup();
		}
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{	
	if (changeInfo.status == "complete")
	{
		var less_sheets = JSON.parse(localStorage["inline-less-output"]);

		if (less_sheets.url == tab.url && less_sheets.styles.length > 0)
		{
			activatePopup(less_sheets.styles);
		}
		else
		{
			deactivatePopup();
		}
	}
});

function activatePopup(styles)
{
	var valid = 0, errors = 0;

	for (var i in styles)
	{
		if (typeof styles[i].css !== "undefined")
		{
			valid++;
		}
		else if (typeof styles[i].error !== "undefined")
		{
			errors++;
		}
	}

	if (errors == 0)
	{
		chrome.browserAction.setBadgeBackgroundColor({color: [0, 195, 0, 255]});
	}
	else
	{
		chrome.browserAction.setBadgeBackgroundColor({color: [255, 195, 0, 255]});
	}

	
	chrome.browserAction.setBadgeText({text: "" + (valid + errors)});
	chrome.browserAction.setPopup({popup: "popup.html"});
}

function deactivatePopup()
{
	chrome.browserAction.setBadgeBackgroundColor({color: [195, 0, 0, 255]});
	chrome.browserAction.setBadgeText({text: ""});
	chrome.browserAction.setPopup({popup: ""});
}
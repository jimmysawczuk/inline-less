chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		var parser = new(less.Parser);

		$(request).each(function(idx, val)
		{
			parser.parse(val.less, function(e, css)
			{
				if (e)
				{
					request[idx].error = e;
				}
				else
				{
					request[idx].css = css.toCSS({compress: true});	
				}
				
			});
		});

		sendResponse(request);
	}
);
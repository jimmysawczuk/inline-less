var less_sheets = [];

$('style').each(function(idx, val)
{
	if ($(val).attr('type') == 'text/less')
	{
		var id = $(val).attr('id')? $(val).attr('id') : 'less-stylesheet-' + (less_sheets.length + 1);

		less_sheets.push({'id': id, 'less': $(val).text()});

		$(val).attr({'id': id});
	}
});

chrome.extension.sendRequest(less_sheets, function(response) 
{
	$(response).each(function(idx, val)
	{
		if (typeof val.css !== "undefined")
		{
			$('#' + val.id).after($('<style />')
				.text(val.css)
				.attr({'type': "text/css", 'data-less-stylesheet-id': val.id})
			);	
		}
		else
		{
			console.error(val.error);
		}
		
	});
});
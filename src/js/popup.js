$(document).ready(function()
{
	var less_sheets = JSON.parse(localStorage["inline-less-output"]);
	var even = false;

	$(less_sheets.styles).each(function(idx, style)
	{
		if (typeof style.css !== "undefined")
		{
			var obj = $('<div />')
				.addClass('style_block')
				.addClass(even? 'even' : 'odd')
				.append($('<h2 />')
					.html(style.id)
					.append($('<div />')
						.addClass('copy')
						.append($('<input />')
							.attr({'type': 'button'})
							.val('Copy')
							.click(function()
							{
								var code = $(this).parent().parent().parent().find('div.preview textarea');

								code[0].select();
								document.execCommand('copy');
							})
						)
					)
				).append($('<div />')
					.addClass('preview')
					.append($('<textarea />')
						.val(style.css)
					)
				);

			$('#container').append(obj);
		}
		else if (typeof style.error !== "undefined")
		{
			var error_string = '';
			error_string += '<b>' + style.error.type + ' error on line ' + style.error.line;
			error_string += ', column ' + style.error.column + ':</b> ' + style.error.message;

			var extract = $('<pre />');

			for (var i in style.error.extract)
			{
				if (style.error.extract[i] != null)
				{
					extract.append(i + ': ' + style.error.extract[i]);
				}
			}


			var obj = $('<div />')
				.addClass('style_block')
				.addClass(even? 'even' : 'odd')
				.addClass('error')
				.html(style.error)
				.append($('<h2 />')
					.html(style.id)
					.append($('<div />')
						.addClass('warning')
						.html('Error')
					)
				).append($('<div />')
					.addClass('error_msg')
					.html(error_string)
					.append(extract)
				);

			$('#container').append(obj);
		}

		even = !even;
	});
});
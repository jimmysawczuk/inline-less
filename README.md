# inline-less

**inline-less** is a Chrome extension designed to help developers who want to use [LESS][lesscss] instead of CSS for some quick styling, but want to avoid the headache of including the library or having to worry about compilation.

## Usage

1. Install the Chrome extension by downloading and opening the latest CRX build in `bin/`.

2. Use LESS inline, like so, taking care to set the `type` attribute correctly:

	<style type="text/less">
		h1 {
			&.header { color: red; }
		}

		// and more...
	</style>

3. Watch as your LESS stylesheets are rendered!

4. When you're ready to ship your code, click the extension icon for copy-and-paste-ready CSS code.

5. Done!





 [lesscss]: http://www.lesscss.org
# inline-less

**inline-less** is a Chrome extension designed to help developers who want to use [LESS][lesscss] instead of CSS for some quick styling, but want to avoid the headache of including the library or having to worry about compilation.

## Usage

1. Install the Chrome extension by [downloading it from the extension gallery][download-link]. (If you're having problems on local pages, make sure "Allow access to file URLs" is checked in your extensions settings, i.e. `chrome://extensions`.)

2. Use LESS inline, like so, taking care to set the `type` attribute correctly:

    ```html
    <html>
    <head>
    <title>My cool page</title>
    <style type="text/less">
        h1 {
            &.header { color: red; }
        }

        // and more...
    </style>

    <!-- put IDs on your style tags for easy reference later on -->
    <style type="text/less" id="named-sheet">
    	p {
            font-size: 13px;

            em {
                font-style: italic;
            }
    	}
    </style>
    </head>
    <!-- and more... -->
    ```

3. Watch as your LESS stylesheets are rendered!

4. When you're ready to ship your code, click the extension icon for copy-and-paste-ready CSS code.

5. Done!

## Installing the unpacked extension

1. Clone this repository:

    ```bash
    $ git clone https://github.com/jimmysawczuk/inline-less.git
    ```

2. Open `chrome://extensions`.
3. Check the "Developer Mode" checkbox.
4. Click the "Load unpacked extension..." button and navigate to the `src/` subdirectory of the repsitory you just cloned.

## License

This code uses code from the [jQuery][jquery], [Formalize][formalize] and [LessCSS][lesscss] projects under their respective licenses. This extension is released under the following license:

	The MIT License (MIT)
	Copyright (C) 2012-2013 by Jimmy Sawczuk

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.


 [lesscss]: http://www.lesscss.org
 [download-link]: https://chrome.google.com/webstore/detail/inline-less/gphilobijbhnjbeohenlbjccgjhdpodp
 [jquery]: http://jquery.com
 [formalize]: http://formalize.me
 [extensions]: chrome://extensions
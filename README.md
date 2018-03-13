# r/chess pgn viewer

![](http://tingdc.github.io/pgnviewer2.png)

View pgn boards inline on r/chess. 
Current version: 1.95.1

## Installation

[Link on chrome webstore](https://chrome.google.com/webstore/detail/reddit-pgn-viewer/hplecpnihkigeaiobbmfnfblepiadjdh?hl=en)

[Link on firefox add-on](https://addons.mozilla.org/en-us/firefox/addon/rchess-pgn-viewer/)

## Contributing

### Requirements

1. npm
2. chrome. firefox.

### Setup

1. Fork repo.
2. `npm install` to install dependencies.
3. `grunt` to copy source files to the different browser folders.
3. [Instructions](https://developer.chrome.com/extensions/getstarted#unpacked) for setting up chrome extension development locally.

### Making changes

You should only have to make source code changes to files in the `core` folder. `core` contains the actual code developed for this extension. `viewer` contains third party pgn viewers that we utilize. Use the following grunt tasks to handle copying the source files from both folders to the browser folders:

`grunt clean` and `grunt copy` will wipe, and reapply all source files to the two browser folders respectively.

`grunt watch` will set a watch on the source files so that any changes are automatically copied over to the browser folders.

`grunt chrome` and `grunt firefox` will copy source files to their respective folders, and watch for further changes to copy over to their respective browser.

### Testing changes

##### For chrome

After every change, reload the extension from the extensions menu in chrome (`chrome://extensions/`).

##### For firefox

After every change, run `jpm run` from the firefox folder. This should launch a new firefox instance with your latest changes.

### Packaging

##### For chrome

1. Bump up version number in manifest
2. Zip chrome folder.
3. Upload zip file at chrome developer dashboard.

##### For firefox

1. Bump up version number in manifest
2. Zip firefox folder
3. Upload at firefox add-on developer hub.

## License

MIT

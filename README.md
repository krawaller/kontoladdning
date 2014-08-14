# Kontoladdning
This app lets you easily see the charges on your [Västtrafik](http://www.vasttrafik.se) card(s).

## Development
It's a hybrid app written in javascript with the [Ionic Framework](http://ionicframework.com/) and wrapped with [Cordova](http://cordova.apache.org/).

Two small npm modules encapsulates all communication with Västtrafik, namely [vasttrafik-login](https://github.com/krawaller/vasttrafik-login) for authentication and [vasttrafik-cards](https://github.com/krawaller/vasttrafik-cards) for data-fetching.

## Getting Started

If you want to contribute or just try it out:

```bash
$ git clone https://github.com/krawaller/FIXME.git
$ npm install -g ionic    # might need `sudo` depending on your node installation.
$ ionic serve    # to start the app in your web browser
$ ionic emulate    # to run it in your simulator
$ ionic run    # to run it on your device
```

## License
MIT
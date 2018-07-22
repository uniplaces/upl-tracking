# upl-tracking

upl-tracking is a library that provides all the UPL tracking functionalities

## Installation

As this package is private and it's not available in npm, yet, add the following line to your `package.json` to install upl-tracking:

```
"upl-tracking": "git+ssh://git@github.com/uniplaces/upl-tracking#v0.1.0"
```

## Usage

```js
import * as UplTracking from 'upl-tracking';
// or
import { trackTouch, setEnvironment, ActionsType, EnvironmentType } from 'upl-tracking';

initializeUplTracking() {
  // Set the desired environment. It defaults to staging
  setEnvironment(EnvironmentType.PRODUCTION);

  // Track the touch. You can provide the location of the user.
  trackTouch(location);
}

trackUplBookingRequest() {
  // Track any action you want. The action must be present in the ActionType enumerable.
  trackAction(ActionsType.BOOKING_REQUEST),
}
```

## Documentation

You can check the documentation [here](http://upl-tracking.uniplaces.com)

## Building the project

Every time a new PR is submitted, the project must be built and the `dist` must be committed.
This is due to the fact that this library is not published in `npm`.
Run the following command to build this library.

```bash
$ npm run build && npm run-script build:webpack
```

## Running tests

```bash
$ npm test
```

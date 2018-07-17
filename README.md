# upl-tracking

upl-tracking is a library that enables touch-cookie

## Installation

As this package is private and it's not available in npm, yet, add the following line to your `package.json` to install upl-tracking:

```
"upl-tracking": "git+ssh://git@github.com/uniplaces/upl-tracking#v0.1.0"
```

## Usage

```js
import * as UplTracking from 'upl-tracking';
// or
import { trackTouch, setEnvironment, ActionsType } from 'upl-tracking';

initializeUplTracking() {
  // Set the desired environment. It defaults to staging
  UplTracking.setEnvironment('production');

  // Track the touch. You can provide the location of the user.
  UplTracking.trackTouch(location);
}

trackUplBookingRequest() {
  // Track any action you want. The action must be present in the ActionType enumerable.
  UplTracking.trackAction(UplTracking.ActionsType.BOOKING_REQUEST),
}
```

## Documentation

You can check the documentation [here]()

## Building the project

```bash
$ npm run build
```

## Running tests

```bash
$ npm test
```

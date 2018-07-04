# upl-tracking

## Installation

## Usage

```js
const UplTracking = require('upl-tracking');
// or
import UplTracking from 'upl-tracking';

let cookie = UplTracking.setTouch();
if (cookie) {
  this.sendToApiGateway('new-touch', cookie.toJSON());
}

if (cookie) {
  // When a user signs up, send the event to API Gateway
  this.sendToApiGateway('event', {
    name: UplTracking.EventsType.SIGN_UP, // 'sign-up'
    touchId: cookie.getTouchId(),
    timestamp: moment().format('x')
  });
}
```

## Running tests

```bash
$ npm test
```

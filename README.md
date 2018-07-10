# upl-tracking

upl-tracking is a library that enables touch-cookie

## Installation

## Usage

```js
import * as UplTracking from 'upl-tracking';
// or
import { setTouch, EventsType } from 'upl-tracking';

let cookie = setTouch();
if (cookie) {
  this.sendToApiGateway('new-touch', cookie.toJSON());
}

if (cookie) {
  // When a user signs up, send the event to API Gateway
  this.sendToApiGateway('event', {
    name: EventsType.SIGN_UP, // 'sign-up'
    touchId: cookie.getTouchId(),
    timestamp: moment().format('x')
  });
}
```

## Building the project

```bash
$ npm run build
```

## Running tests

```bash
$ npm test
```

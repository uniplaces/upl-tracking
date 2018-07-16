# upl-tracking

upl-tracking is a library that enables touch-cookie

## Installation

## Usage

```js
import * as UplTracking from 'upl-tracking';
// or
import { trackTouch, setEnvironment, ActionsType } from 'upl-tracking';

initialize() {
  // Set the desired environment. It defaults to staging
  UplTracking.setEnvironment('production');

  // Track the touch
  UplTracking.trackTouch(location);
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

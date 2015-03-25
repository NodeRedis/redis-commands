# Redis Commands

Redis commands.

This module exports all the commands that Redis supports, using the API of http://redis.io/commands.json. The version of this module should equal to the Redis version of the commands.

## Install

```shell
$ npm install redis-commands
```

## Usage

```javascript
var commands = require('redis-commands');

Object.keys(commands).forEach(function (command) {
  console.log(command);
});
```

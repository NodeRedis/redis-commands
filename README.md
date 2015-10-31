# Redis Commands

[![Build Status](https://travis-ci.org/luin/redis-commands.png?branch=master)](https://travis-ci.org/luin/redis-commands)

This module exports all the commands that Redis supports.

## Install

```shell
$ npm install redis-commands
```

## Usage

```javascript
var commands = require('redis-commands');
```

commands.list.forEach(function (command) {
  console.log(command);
});
```

## Acknowledgment

Thank [@Yuan Chuan](https://github.com/yuanchuan) for the package name. The original redis-commands is renamed to [@yuanchuan/redis-commands](https://www.npmjs.com/package/@yuanchuan/redis-commands).

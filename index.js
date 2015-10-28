var commands = require('./commands');

exports.commands = Object.keys(commands);

exports.hasFlag = function (commandName, flag) {
  var command = commands[commandName];
  if (!command) {
    throw new Error('Unknown command ' + commandName);
  }

  var flags = command.flags;

  for (var i = 0; i < flags.length; i++) {
    if (flags[i] === flag) {
      return true;
    }
  }

  return false;
};

exports.getKeyIndexes = function (commandName, args, options) {
  var command = commands[commandName];
  if (!command) {
    throw new Error('Unknown command ' + commandName);
  }

  if (!Array.isArray(args)) {
    throw new Error('Expect args to be an array');
  }

  var parsePartialKey = options && options.parsePartialKey;

  var keys = [];
  var i, range, keyStart, keyStop;
  switch (commandName) {
  case 'eval':
  case 'evalsha':
    keyStop = Number(args[1]) + 2;
    for (i = 2; i < keyStop; i++) {
      keys.push(i);
    }
    break;
  case 'sort':
    keys.push(0);
    for (i = 1; i < args.length - 1; i++) {
      if (typeof args[i] !== 'string') {
        continue;
      }
      var directive = args[i].toUpperCase();
      if (directive === 'GET') {
        i += 1;
        if (args[i] !== '#') {
          if (parsePartialKey && (range = getPartialKeyRange(args[i]))) {
            keys.push([i, range]);
          } else {
            keys.push(i);
          }
        }
      } else if (directive === 'BY') {
        i += 1;
        if (parsePartialKey && (range = getPartialKeyRange(args[i]))) {
          keys.push([i, range]);
        } else {
          keys.push(i);
        }
      } else if (directive === 'STORE') {
        i += 1;
        keys.push(i);
      }
    }
    break;
  case 'zunionstore':
  case 'zinterstore':
    keys.push(0);
    keyStop = Number(args[1]) + 2;
    for (i = 2; i < keyStop; i++) {
      keys.push(i);
    }
    break;
  default:
    keyStart = def.keyStart - 1;
    keyStop = def.keyStop > 0 ? def.keyStop : args.length + def.keyStop + 1;
    if (keyStart >= 0 && keyStop <= args.length && keyStop > keyStart && def.step > 0) {
      for (i = keyStart; i < keyStop; i += def.step) {
        keys.push(i);
      }
    }
    break;
  }
};

function getPartialKeyRange(key) {
  var starPos = key.indexOf('*');
  if (starPos === -1) {
    return;
  }
  var hashPos = key.indexOf('->', starPos + 1);
  if (hashPos === 1) {
    return;
  }
  return [0, hashPos];
}

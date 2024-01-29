import * as path from 'node:path';

export const currentWorkingDirPath = path.resolve();

const ConsoleTypes = {
  info: 'info',
  error: 'error',
};

const UnicodeTypes = {
  [ConsoleTypes.info]: 'ℹ️ ',
  [ConsoleTypes.error]: '❌ ',
}

const ConsoleStyles = {
  reset: '\x1b[0m',
  [ConsoleTypes.info]: {
    fg: '\x1b[34m',
    bg: '\x1b[44m\x1b[37m',
  },
  [ConsoleTypes.error]: {
    fg: '\x1b[31m',
    bg: '\x1b[41m\x1b[37m',
  },
};

const OutputMessages = {
  [ConsoleTypes.info]: 'FS operation performed',
  [ConsoleTypes.error]: 'FS operation failed'
};

export const prettyConsole = (() => {
  const handlerOutput = (trigger, message) => {
    const consoleType = [ConsoleStyles[trigger].bg, `${trigger.toUpperCase()}:`, ConsoleStyles.reset];
    const consoleOutput = [ConsoleStyles[trigger].fg, OutputMessages[trigger], ConsoleStyles.reset];
    const consoleMessage = message.length ? [UnicodeTypes[trigger], ...message] : [];

    console[trigger](...consoleType, ...consoleOutput, ...consoleMessage);
  };

  return {
    info: (...message) => handlerOutput(ConsoleTypes.info, message),
    error: (...message) => handlerOutput(ConsoleTypes.error, message),
  };
})();

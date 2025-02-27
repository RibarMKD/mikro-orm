#!/usr/bin/env node --loader ts-node/esm --no-warnings=ExperimentalWarning

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@jercle/yargonaut')
  .style('blue')
  .style('yellow', 'required')
  .helpStyle('green')
  .errorsStyle('red');

import { CLIHelper } from './CLIHelper';
import { CLIConfigurator } from './CLIConfigurator';

(async () => {
  const argv = await CLIConfigurator.configure();
  const args = await argv.parse(process.argv.slice(2)) as { _: string[] };

  if (args._.length === 0) {
    CLIHelper.showHelp();
  }
})();

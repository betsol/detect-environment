
import * as minimist from 'minimist';

import {EnvironmentConfig} from './environment-config';
import {Options} from './options';


const defaultOptions: Options = {
  environments: {
    production: {
      aliases: ['prod']
    },
    development: {
      aliases: ['dev']
    }
  },
  methods: ['CLI', 'NODE_ENV'],
  defaultEnvironment: 'development'
};


export function detectEnvironment (options?: Options) {

  options = Object.assign({}, defaultOptions, options || {});

  const environments = options.environments || {};

  const aliasesIndex: { [key: string]: string; } = buildAliasesIndex(environments);

  let environment = null;

  if (options.methods) {
    for (const method of options.methods) {
      switch (method) {
        case 'CLI':
          environment = getFromCliArgs(aliasesIndex);
          break;
        case 'NODE_ENV':
          environment = process.env.NODE_ENV;
          break;
      }
      if (environment) {
        break;
      }
    }
  }

  // Expanding environment aliases names.
  if (environment && aliasesIndex[environment]) {
    environment = aliasesIndex[environment];
  }

  return environment || options.defaultEnvironment || null;

}


function getFromCliArgs (aliasesIndex: { [key: string]: string; }) {

  const args = minimist(process.argv.slice(2));

  let environment = args.environment || args.env;

  if (!environment) {
    Object.keys(aliasesIndex).forEach(name => {
      if (args[name]) {
        environment = aliasesIndex[name];
      }
    });
  }

  return environment;

}

function buildAliasesIndex (environments: { [key: string]: EnvironmentConfig; }) {

  const index: { [key: string]: string; } = {};

  Object.keys(environments).forEach(canonicalName => {
    index[canonicalName] = canonicalName;
    const envConfig = environments[canonicalName];
    if (envConfig.aliases) {
      for (const alias of envConfig.aliases) {
        index[alias] = canonicalName;
      }
    }
  });

  return index;

}

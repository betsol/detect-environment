
import {EnvironmentConfig} from './environment-config';


export interface Options {
  environments?: {
    [key: string]: EnvironmentConfig;
  },
  methods?: ('CLI' | 'NODE_ENV')[];
  defaultEnvironment?: string;
}

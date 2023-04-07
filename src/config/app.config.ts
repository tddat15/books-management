import { Inject, Injectable } from '@nestjs/common';

import { ConfigType, registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  host: process.env.APP_HOST || '0.0.0.0',
  port: process.env.APP_PORT || 3000,
  prefix: process.env.API_PREFIX || 'book-management',
}));

@Injectable()
export class AppConfig {
  public readonly host: string;
  public readonly port: number;
  public readonly prefix: string;

  constructor(
    @Inject(appConfig.KEY)
    config: ConfigType<typeof appConfig>,
  ) {
    this.host = config.host;
    this.port = Number(config.port);
    this.prefix = config.prefix!;
  }
}

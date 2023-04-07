import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppConfig } from './config';
import { useContainer } from 'class-validator';
import * as morgan from 'morgan';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { logger: ['error', 'warn', 'log', 'debug', 'verbose'] },
    );

    const { prefix, host, port } = app.get(AppConfig);

    const config = app.get(AppConfig);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.setGlobalPrefix(prefix);

    app.use(morgan('common'));

    const configSwagger = new DocumentBuilder()
      .setTitle('Book Management')
      .setDescription('API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup(prefix, app, document);

    await app.listen(port, host);

    const url = await app.getUrl();
    Logger.log(`${url}/${prefix}`);

    return config;
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

bootstrap()
  .then((config: AppConfig) => {
    new Logger('Bootstrap').log(
      { config },
      `Server is listening on port ${config.port}`,
    );
  })
  .catch((err) => {
    new Logger('Bootstrap').error(`Error starting server, ${err}`);
    throw err;
  });

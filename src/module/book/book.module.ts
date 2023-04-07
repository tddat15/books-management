import { Module } from '@nestjs/common';
import * as useCases from './application';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import * as process from 'process';

const applications = Object.values(useCases);
const controllers = applications.filter((x) => x.name.endsWith('Controller'));
const services = applications.filter(
  (x) => x.name.endsWith('Service') || x.name.endsWith('Repository'),
);

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ES_URL || 'http://localhost:9200',
      auth: {
        username: process.env.ES_USERNAME || '',
        password: process.env.ES_PASSWORD || '',
      },
    }),
  ],
  controllers: [...controllers],
  providers: [...services, ...Object.values(services)],
})
export class BookModule {}

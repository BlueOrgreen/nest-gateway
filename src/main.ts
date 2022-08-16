import { NestFactory } from '@nestjs/core';
import fastify from 'fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { FastifyLogger } from './common/logger';
import { generateDocument } from './doc';
import fastifyCookie from '@fastify/cookie';

declare const module: any;

async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // new FastifyAdapter({ logger: true }),
    new FastifyAdapter(fastifyInstance),
  );

  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  generateDocument(app);
  await app.listen(3001);
}
bootstrap();

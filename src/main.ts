import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('proyect API documentation')
    .setDescription('The prestadores API description')
    .setVersion('1.0')
    .addTag('Profiles')
    .addTag('photos')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

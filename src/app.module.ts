import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://muzakkir:2hYq0MLGtYFdpGih@cluster0.9jmks.mongodb.net/nest-mongo',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NutritionistsModule } from './nutritionists/nutritionists.module';

@Module({
  imports: [
    NutritionistsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nutrisoft',
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './database/typeorm-config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MorganLoggerMiddleware } from './modules/common/middlewares/morgan-logger.middleware';
import { CommonModule } from './modules/common/common.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GuardsModule } from './modules/guards/guard.module';
import { QuestionsModule } from './modules/questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    UsersModule,
    GuardsModule,
    CommonModule,
    AuthModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganLoggerMiddleware).forRoutes('*');
  }
}

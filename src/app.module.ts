import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user/user.entity';
import { TagEntity } from './tag/tag.entity';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { ArticleModule } from './article/article.module';
import { ArticleEntity } from './article/article.entity';
@Module({
  imports: [
    TagModule,
    UserModule,
    ArticleModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [UserEntity, TagEntity, ArticleEntity],
          synchronize: configService.get('DB_SYNC') === 'false',
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    })
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}

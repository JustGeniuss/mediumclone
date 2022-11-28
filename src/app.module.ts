import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { ArticleModule } from './article/article.module';
import { dataSourceOptions } from 'db/data-source';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TagModule,
    UserModule,
    ArticleModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ProfileModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

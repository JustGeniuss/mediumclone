import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleController } from "./article.controller";
import { ArticleEntity } from "src/article/article.entity";
import { ArticleService } from "./article.service";
import { UserEntity } from "src/user/user.entity";
import { FollowEntity } from "src/profile/follow.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEntity])],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: []
})
export class ArticleModule {}
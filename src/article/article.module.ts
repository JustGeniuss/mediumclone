import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleController } from "./article.controller";
import { ArticleEntity } from "src/article/article.entity";
import { ArticleService } from "./article.service";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity])],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: []
})
export class ArticleModule {}
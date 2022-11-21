import { Controller, Post } from "@nestjs/common";
import { AuthGuard } from "src/user/guards/auth.guard";
import { ArticleService } from "./article.service";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
    
    @Post()
    async createArticle() {
        return this.articleService.createArticle();
    }
}
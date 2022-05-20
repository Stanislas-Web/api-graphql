import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ArticleService } from "../article.service";
import { ArticleCreateInput, ArticleCreateOutput } from "../dto/article-create.dto";
import { Article } from "../models/article.model";


@Resolver(Article)
export class ArticleMutationsResolver{
    constructor(private readonly articleService: ArticleService){}

    @Mutation(() => ArticleCreateOutput)
    async articleCreate(@Args('input') input: ArticleCreateInput){
        return this.articleService.articleCreate(input);
    }
}
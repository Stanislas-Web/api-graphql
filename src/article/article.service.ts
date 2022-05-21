import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreateInput, ArticleCreateOutput } from './dto/article-create.dto';
import { ArticleUpdateInput, ArticleUpdateOutput } from './dto/article-update.dto';
import { Article } from './models/article.model';
import { Args, ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { ArticleDeleteOutput } from './dto/article-delete.dto';


@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ){}

    async articleCreate(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
        const newArticle = this.articleRepository.create(input);
        const article = await this.articleRepository.save(newArticle);
        return { article };
    }

    async articleUpdate(
        articleId: Article['id'],
        input: ArticleUpdateInput,
      ): Promise<ArticleUpdateOutput> {
        const article = await this.articleRepository.findOneByOrFail({ id: articleId } as any);
        article.title = input.title;
        article.description = input.description;
        article.image = input.image;
        await article.save();
        return { article };
      }

      async articleDelete(
        articleId: Article['id'],
      ): Promise<ArticleDeleteOutput> {
        const article = await this.articleRepository.findOneByOrFail({ id: articleId } as any);
        await article.remove();
        return { articleId };
      }

      async articlesList(): Promise<Article[]>{
        return this.articleRepository.find();
      }

      
}

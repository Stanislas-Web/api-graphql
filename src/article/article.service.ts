import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreateInput, ArticleCreateOutput } from './dto/article-create.dto';
import { ArticleUpdateInput, ArticleUpdateOutput } from './dto/article-update.dto';
import { Article } from './models/article.model';
import { Args, ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { ArticleDeleteOutput } from './dto/article-delete.dto';
import { ArticlesPagination, ArticlesPaginationArgs } from './dto/articles-pagination.dto';
import { SortDirection } from 'src/pagination/dto/pagination.dto';


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

      async articlesPagination(args: ArticlesPaginationArgs): Promise<ArticlesPagination>{
        const qb = this.articleRepository.createQueryBuilder('article');
        qb.take(args.take);
        qb.skip(args.skip);
        if(args.sortBy){
          if(args.sortBy.createdAt !== null){
            qb.addOrderBy('article.createdAt', args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC');
          }
          if(args.sortBy.title !== null){
            qb.addOrderBy('article.title', args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC');
          }
        }
        const [nodes, totalCount ] = await qb.getManyAndCount();
      //   const [nodes, totalCount] = await this.articleRepository.findAndCount({
      //       skip: args.skip,
      //       take: args.take,
      //       order:{
      //         createdAt: args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',

      //       }
      // });
      return { nodes, totalCount };
    }

      
}

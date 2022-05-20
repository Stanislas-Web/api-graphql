import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver{
    @Query(()=> String)
    sayHello(): String{
        return "Hello word"
    }
}
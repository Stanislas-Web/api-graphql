import { ArgsType, Field, InputType, Int, InterfaceType, registerEnumType } from "@nestjs/graphql";
import { Node } from "../models/node.model";


export enum SortDirection {
    ASC, 
    DESC
}

registerEnumType(SortDirection, {
    name: 'SortDirection',
})


@InputType()
export class PaginationSortBy {
    @Field(() => SortDirection, { nullable: true })
    createdAt?: SortDirection;

    @Field(() => SortDirection, { nullable: true })
    title?: SortDirection;

    @Field(() => String, { nullable: true })
    order: string;

}


@ArgsType()
export class PaginationArgs {

    @Field(() => Int)
    skip: number;

    @Field(() => Int)
    take: number;

}

    
@InterfaceType()
export abstract class Pagination<N extends Node = Node > {
    @Field()
    totalCount: number;

    @Field(() => [Node])
    abstract nodes: N[];


}
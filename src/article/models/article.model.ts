import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Node } from "src/pagination/models/node.model";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class Article extends Node{


    @Field(() => String)
    @Column()
    title: String

    @Field(() => String)
    @Column()
    description: String

    @Field(() => String)
    @Column()
    image: String

}
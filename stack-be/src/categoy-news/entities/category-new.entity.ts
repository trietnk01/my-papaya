import { News } from "news/entities/news.entity";
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";

@Entity({ name: "category_news" })
export class CategoryNews {
  @ObjectIdColumn()
  _id: string;

  @Column()
  categoryName: string;

  @OneToMany(() => News, (news) => news.categoryNews, {
    cascade: true,
    eager: true
  })
  newsItems: News[];
}

import { News } from "news/entities/news.entity";
import { Column, Entity, JoinColumn, ObjectIdColumn, OneToMany } from "typeorm";

@Entity({ name: "category_news" })
export class CategoryNews {
  @ObjectIdColumn()
  _id: string;

  @Column()
  category_name: string;

  @OneToMany(() => News, (news) => news.categoryNews, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: "_id", referencedColumnName: "category_news_id" })
  newsItems: News[];
}

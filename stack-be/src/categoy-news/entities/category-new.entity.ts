import { News } from "news/entities/news.entity";
import { Column, Entity, JoinColumn, ObjectIdColumn, OneToMany } from "typeorm";

@Entity({ name: "category_news" })
export class CategoryNews {
  @ObjectIdColumn()
  _id: string;

  @Column()
  categoryName: string;

  @OneToMany(() => News, (news) => news.categoryNews)
  @JoinColumn({ referencedColumnName: "categoryNewsId", foreignKeyConstraintName: "_id" })
  newsItems: [];
}

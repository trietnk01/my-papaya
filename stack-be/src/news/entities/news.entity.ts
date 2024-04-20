import { CategoryNews } from "categoy-news/entities/category-new.entity";
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from "typeorm";

@Entity({ name: "news" })
export class News {
  @ObjectIdColumn()
  _id: string;

  @Column()
  newsTitle: string;

  @Column()
  categoryNewsId: string;

  @Column()
  publisherId: string;

  @ManyToOne(() => CategoryNews, (categoryNews) => categoryNews.newsItems)
  @JoinColumn({ referencedColumnName: "_id", foreignKeyConstraintName: "categoryNewsId" })
  categoryNews: CategoryNews;
}

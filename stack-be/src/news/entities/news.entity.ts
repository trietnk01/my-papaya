import { CategoryNews } from "categoy-news/entities/category-news.entity";
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from "typeorm";
import { Users } from "users/entities/users.entity";

@Entity({ name: "news" })
export class News {
  @ObjectIdColumn()
  _id: string;

  @Column()
  newsTitle: string;

  @Column()
  newsIntro: string;

  @Column()
  newsContent: string;

  @Column()
  newsImg: string;

  @Column()
  categoryNewsId: string;

  @Column()
  publisherId: string;

  @ManyToOne(() => CategoryNews, (categoryNews) => categoryNews.newsItems)
  @JoinColumn({ name: "categoryNewsId" })
  categoryNews: CategoryNews;

  @ManyToOne(() => Users, (users) => users.userItems)
  @JoinColumn({ name: "publisherId" })
  publisher: Users;
}

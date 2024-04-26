import { News } from "news/entities/news.entity";
import { Column, Entity, JoinColumn, ObjectIdColumn, OneToMany } from "typeorm";

@Entity({ name: "users" })
export class Users {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  displayName: string;

  @Column()
  token: string;

  @OneToMany(() => News, (news) => news.categoryNews, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: "_id", referencedColumnName: "publisherId" })
  userItems: News[];
}

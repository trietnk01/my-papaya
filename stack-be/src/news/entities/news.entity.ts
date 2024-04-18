import { Column, Entity, ObjectIdColumn } from "typeorm";

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
}

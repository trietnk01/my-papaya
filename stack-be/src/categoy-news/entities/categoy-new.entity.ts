import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "category_news" })
export class CategoryNews {
  @ObjectIdColumn()
  _id: string;

  @Column()
  categoryName: string;
}

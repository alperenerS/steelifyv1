import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table
export class Address extends Model<Address> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user:User

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_row: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  second_row: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  zip: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
}
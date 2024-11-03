// models/group.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import Chat from './chat.model'
import User from './user.model';

type GroupAttributes = {
  id: string;
  chatId: string;
  adminIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

type GroupCreationAttributes = Optional<GroupAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: string;
  public chatId!: string;
  public adminIds!: string[];
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Chat,
        key: 'id',
      },
    },
    adminIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Group',
    timestamps: true,
    freezeTableName: true,
    // define the table's name
    tableName: 'Group',
  }
);

export default Group;

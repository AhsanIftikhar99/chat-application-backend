import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import { ChatAttributes } from '../types';


interface ChatCreationAttributes extends Optional<ChatAttributes, 'id' | 'groupName' | 'groupAvatar' | 'createdAt' | 'updatedAt'> { }

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public id!: string;
  public isGroupChat!: boolean;
  public groupName?: string;
  public groupAvatar?: string;
  public members!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    isGroupChat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupAvatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Chat',
    tableName: 'Chat',
    timestamps: true,
    freezeTableName: true,
  }
);

export default Chat;
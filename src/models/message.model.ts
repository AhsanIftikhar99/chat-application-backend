import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';

interface MessageAttributes {
  id: string;
  chatId: string;
  senderId: string;
  messageType: 'text' | 'voice' | 'media';
  content?: string;
  mediaUrl?: string;
  timestamp?: Date;
  encrypted: boolean;
  seenBy?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

type MessageCreationAttributes = Optional<MessageAttributes, 'id' | 'timestamp' | 'encrypted' | 'seenBy' | 'createdAt' | 'updatedAt'>;

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: string;
  public chatId!: string;
  public senderId!: string;
  public messageType!: 'text' | 'voice' | 'media';
  public content?: string;
  public mediaUrl?: string;
  public timestamp?: Date;
  public encrypted!: boolean;
  public seenBy?: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    messageType: {
      type: DataTypes.ENUM('text', 'voice', 'media'),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    encrypted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    seenBy: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
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
    modelName: 'Message',
    tableName: 'Message',
    timestamps: true,
    freezeTableName: true,
  }
);

export default Message;
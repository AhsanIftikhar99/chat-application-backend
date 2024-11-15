import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import { UserAttributes } from '../types';

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'displayName' | 'profilePicture' | 'status' | 'createdAt' | 'updatedAt' | 'phoneNumber'> { }

// Extend the Model class with the attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public displayName?: string;
  public email!: string;
  public password!: string;
  public profilePicture?: string;
  public status?: string;
  public phoneNumber?: string;
  public online?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    displayName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    profilePicture: {
      type: DataTypes.BLOB, // Store binary data
      allowNull: true,
    },
    online: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    freezeTableName: true,
    // define the table's name
    tableName: 'User',

  }
);


export default User;
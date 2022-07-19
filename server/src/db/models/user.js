import { Sequelize, DataTypes } from "sequelize";

class User extends Sequelize.Model {
  
  static init(sequelize){
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nickname: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING(200), 
        allowNull: false
      },

      birthday: {
        type: DataTypes.DATE,
      },

      location: {
        type: DataTypes.STRING(200),
      },

      latitude: {
        type: DataTypes.DECIMAL(10,8),
      },

      longitude: {
        type: DataTypes.DECIMAL(11,8),
      },

      status: {
        type: DataTypes.STRING(200),
        allowNull: false
      },

      profileText: {
        type: DataTypes.STRING(200)
      },

      profileImage: {
        type: DataTypes.STRING(200),
        defaultValue: 'img/뚱이.png'
      },

      oauth: {
        type: DataTypes.STRING(200)
      },

    },{
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Users",
        modelName: "User"
      }
    );
    }

  static associate(db) { 
    db.User.hasOne(db.Favor, { foreignKey: 'userId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.User.hasOne(db.Language, { foreignKey: 'userId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
    db.User.hasMany(db.Letter, { foreignKey: 'sendId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.User.hasMany(db.Letter, { foreignKey: 'receiveId', sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
   }
};

export { User };
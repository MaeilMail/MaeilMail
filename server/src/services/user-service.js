import bcrypt from 'bcrypt';
import { User } from '../db/models';

class UserService {
  constructor(param) {
    this.User = param;
  }

  async addUser(userInfo) {
    const { nickname, email, password, gender } = userInfo;

    const emailResult = await this.User.findOne({ where: { email } });
    if (emailResult) {
      throw new Error('중복된 이메일입니다.');
    }

    const nicknameResult = await this.User.findOne({ where: { nickname } });
    if (nicknameResult) {
      throw new Error('중복된 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { nickname, email, password: hashedPassword, status: "active", gender};

    const newUser = await this.userModel.create(newUserInfo);

    return newUser;
  }

  async addNullUser(userInfo) {
    const { email } = userInfo;
    
    const result = await this.User.findOne({ where: { email } });
    if (result) {
      throw new Error('중복된 이메일입니다.');
    }

    const newUser = await this.userModel.create(newUserInfo);

    return newUser;
  }

  async getUsers() {
    const users = await this.User.findAll({});
    return users;
  }
  
  async getUserById(id) {
    const user = await this.User.findByPk(id);
    if (!user) {
      throw new Error('일치하는 사용자 정보가 존재하지 않습니다.');
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.User.findOne({ where: {email: email}})
    if (!user) {
      throw new Error('해당 이메일과 일치하는 사용자 정보가 존재하지 않습니다.')
    }
    return user;
  }

  async updateUser(id, password, toUpdate, flag) {
    if (password) {
      const currentPassword = await this.User.findOne(
        { where: {user_id: id} },
        { attributes: ['password'] }
      )
      if (currentPassword !== password) {
        throw new Error("비밀번호가 일치하지 않습니다.")
      }
    }
    const hashedPassword = password && toUpdate ? await bcrypt.hash(password, 10) : null;
    const toUpdate = 
      !password ? toUpdate
    : !toUpdate ? { status: 'inactive' }
    : { password: hashedPassword };
    
    const updated = await this.User.update( { toUpdate: toUpdate }, { where: { user_id: id } } )
    
    return updated
  }
}

const userService = new UserService(User);

export { userService };

'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');
const moment = require('moment');
const path = require('path');

class User extends Service {

  async list({
    offset = 0,
    limit = 10
  }) {
    return this.ctx.model.User.listUsers({
      offset,
      limit
    });
  }

  async find(id) {
    const user = await this.ctx.model.User.findUserById(id);

    return user;
  }

  async createUser(user,role) {
    const ctx = this.ctx;

    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const helper = this.ctx.helper;
      user.password = helper.cryptoPwd(helper.cryptoPwd(user.password));
      const createUserObj = await this.ctx.model.User.createUser(user, transaction);
      await this.ctx.model.UserRole.creteUserRole(createUserObj.Id, role, transaction);
      await transaction.commit();

      return createUserObj;
    } catch (e) {
      this.ctx.logger.error(e.message);
      await transaction.rollback();
      return false;
    }
  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.User.updateUser({
      id,
      updates
    });
  }

  async del(id) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.User.delUserById(id, transaction);
      await this.ctx.model.UserRole.delUserRoleByUserId(id, transaction);
      await transaction.commit();
      return true
    } catch (e) {
      await transaction.rollback();
      this.ctx.logger.error(e.message);
      return false
    }

  }

  async loginFindUserByUserName(email) {
    let user = await this.ctx.model.User.loginFindUserByUserName(email);

    return user;
  }

  async updatePwd(userId, newPwd) {
    try {
      await this.ctx.model.User.updatePwd(userId, newPwd);
      return true;
    } catch (e) {
      this.ctx.logger.error(e.message);
      return false;
    }
  }

  async updateValidByUserId(userId, valid) {
    await this.ctx.model.User.updateValidByUserId(userId, valid);
  }

  async updatePwdWithMobileAndSmsCode(mobile, smsCode, newPwd) {
    const ctx = this.ctx;
    try {
      const helper = this.ctx.helper;
      let curDate = new Date();
      let preDate = moment(new Date(curDate.getTime() - 30 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss');
      let smsObject = await this.ctx.model.SmsMessage.vertifyCode({
        mobile: mobile,
        code: smsCode
      });
      if (smsObject) {
        if (smsObject.createAt > preDate) {
          const password = helper.cryptoPwd(helper.cryptoPwd(newPwd));
          await this.ctx.model.User.updatePwdWithMobileAndSmsCode(mobile, password);
          return {
            success: true,
            message: ctx.__('updateSuccessful')
          };
        } else {
          return {
            success: false,
            message: ctx.__('mobileVertifyfailure')
          };
        }
      } else {
        return {
          success: false,
          message: ctx.__('mobileVertifyIsNotCorrect')
        };
      }

    } catch (e) {
      this.ctx.logger.error(e.message);
      return {
        success: false,
        message: e.message
      };
    }
  }

  async updateUserRole(userId, operation) {
    try {
      await this.ctx.model.UserRole.updateUserRole(userId, operation);
      return true;
    } catch (e) {
      this.ctx.logger.error(e.message);
      return false;
    }
  }

  async getBackPwdWithEmail(email) {
    try {
      const activeCode = UUID.v1();
      await this.ctx.model.User.updateUserActiveCodeByEmail(email, activeCode);
      await this.ctx.service.emailService.sendBackPwdEmail(email, activeCode);
      return true;
    } catch (e) {
      return false;
    }
  }


}

module.exports = User;

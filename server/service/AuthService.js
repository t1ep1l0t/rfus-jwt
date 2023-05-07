import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import TokenService from "./TokenService.js";
import RoleModel from "../models/RoleModel.js";

class AuthService {
    async register_user ({username, password}) {
        const check_username = await UserModel.findOne({username: username});
        if(check_username) {
            return {
                status: 400,
                message: 'Пользователь с таким username уже есть, Залогиньтесь'
            }
        }

        const hash_password = bcrypt.hashSync(password, 5);

        const refresh_token = TokenService.create_refresh_token({username});

        const role = await RoleModel.findOne({role: 'USER'})

        const new_user = await UserModel.create({
            username,
            password: hash_password,
            refresh_token,
            role: [role.role]
        });

        console.log(new_user);

        return {
            status: 200,
            message: 'Пользователь создан'
        }
    }
    async login_user ({username,  password}) {
        const check_username = await UserModel.findOne({username: username});
        if(!check_username) {
            return {
                status: 400,
                message: 'Пользователь с таким username еще нет, Зарегестрируйтесь'
            }
        }

        const decode_password = bcrypt.compareSync(password, check_username.password);
        if(!decode_password) {
            return {
                status: 400,
                message: 'Пароль не верный'
            }
        }

        const refresh_token = TokenService.create_refresh_token({username});
        const access_token = TokenService.create_access_token({username});

        check_username.refresh_token = refresh_token;

        await check_username.save();

        return {
            status: 200,
            message: 'Успешный вход',
            user: check_username,
            access_token,
        }
    }
    async logout_user (id) {
        const user = await UserModel.findById(id);
        if(!user) {
            return {
                status: 404,
                message: 'Пользователь не найден'
            }
        }

        user.refresh_token = null;
        await user.save();
        return {
            status: 201,
            message: 'Токен успешно удален'
        }
    }
    async delete_user (id) {
        const user = await UserModel.findByIdAndDelete(id);

        if(!user) {
            return {
                status: 404,
                message: 'Пользователь не найден'
            }
        }

        return {
            status: 200,
            message: 'Пользователь успешно удален'
        }
    }
    async check_access_token (token) {

        const result = TokenService.check_access_token(token);

        if(result.status !== 200 ) {
            return {
                status: 401,
                message: 'Токен не валидный, Пользователь должен авторизоваться'
            }
        }

        const user = await UserModel.findOne({username: result.token.username})

        return {
            status: 200,
            message: 'Токен валидный',
            user,
            token
        }

    }
    async check_refresh_token (token) {
        const result = TokenService.check_refresh_token(token);
        console.log(result);

        if(result.status !== 200 ) {
            return {
                status: 401,
                message: 'Токен не валидный, Пользователь должен авторизоваться'
            }
        }

        const user = await UserModel.findOne({username: result.token.username});

        const {username} = user;

        const new_refresh_token =  TokenService.create_refresh_token({username});
        const new_access_token =  TokenService.create_access_token({username});

        user.refresh_token = new_refresh_token;

        await user.save();

        return {
            status: 200,
            message: 'Токены успешно обновлены',
            user,
            access_token: new_access_token
        }

    }
};
export default new AuthService();
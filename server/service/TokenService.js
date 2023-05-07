import jwt from 'jsonwebtoken'
class TokenService {
    create_access_token ({username}) {
        return jwt.sign({username}, process.env.ACCESS_SK, {expiresIn: '1m'});
    }
    create_refresh_token ({username}) {
        return jwt.sign({username}, process.env.REFRESH_SK, {expiresIn: '30d'});
    }
    check_access_token (access_token) {
        try {
            const token = jwt.verify(access_token, process.env.ACCESS_SK);

            return {
                status: 200,
                message: 'Токен валидный',
                token
            }

        } catch (e) {
            return {
                status: 401,
                message: 'Токен не валидный'
            }
        }
    }
    check_refresh_token (refresh_token) {
        try {
            const token = jwt.verify(refresh_token, process.env.REFRESH_SK);
            return {
                status: 200,
                message: 'Токен валидный',
                token
            }
        } catch (e) {
            return {
                status: 401,
                message: 'Токен не валидный'
            }
        }
    }

}

export default new TokenService()
import AuthService from "../service/AuthService.js";

class AuthController {
    async register_user (req, res) {
        try {
            const { username,  password} = req.body;

            const result = await AuthService.register_user({username,  password});

            console.log(result)

            res.status(result.status).json({
                message: result.message
            });
        } catch (e)  {
            console.log(e);
            res.status(500);
        }
    }
    async login_user (req, res) {
        try {
            const { username,  password} = req.body;

            const result = await AuthService.login_user({username,  password});

            res.status(result.status).json({
                message: result.message,
                user: result.user ? result.user : null,
                access_token: result.access_token ? result.access_token : null
            });
        } catch (e)  {
            console.log(e);
            res.status(500)
        }
    }
    async logout_user (req, res) {
        try {
            const id = req.params.id;

            const result = await AuthService.logout_user(id);

            res.status(result.status).json({
                message: result.message
            });

        } catch (e)  {
            console.log(e);
            res.status(500)
        }
    }
    async delete_user (req, res) {
        try {
            const id = req.params.id;

            const result = await AuthService.delete_user(id);

            res.status(result.status).json({
                message: result.message
            });
        } catch (e)  {
            console.log(e);
            res.status(500)
        }
    }

    async check_access_token (req, res) {
        const token = req.headers.authorization.split(' ')[1];

        const result = await AuthService.check_access_token(token);

        res.status(result.status).json({
            message: result.message,
            user: result.user ? result.user : null,
            access_token: result.token ? result.token : null
        })
    }
    async check_refresh_token (req, res) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer token

        const result = await AuthService.check_refresh_token(token);

        res.status(result.status).json({
            message: result.message,
            user: result.user ? result.user : null,
            access_token: result.access_token ? result.access_token : null
        })
    }
};

export default new AuthController()
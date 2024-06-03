import UserModel from "../../models/auth";
import { Request, Response } from "express";
import validator from 'validator';
import bcrypt from 'bcrypt';
import emailExistence from 'email-existence';


class AuthController {
    public static userRegistration = async (req: Request, res: Response): Promise<void> => {
        const { first_name, last_name, email, password, confirm_password } = req.body;
        try {
            if (!first_name || !last_name || !email || !password || !confirm_password) {
                res.status(400).json({ status: "failed", error: 'All fields are required' });
            }
            if (password !== confirm_password) {
                res.status(400).json({ status: "failed", error: 'Passwords do not match' });
            }

            const isEmailValid: boolean = validator.isEmail(email);
            if (!isEmailValid) {
                res.status(400).json({ status: "failed", error: 'Invalid email' });
            }

            const user = await UserModel.findOne({ email });
            if (user) {
                res.status(400).json({ status: "failed", error: 'User already exists' });
            }

            /* ===== Check if email is valid ===== */
            const checkEmailIsValid: boolean = validator.isEmail(email);
            if (checkEmailIsValid) {
                /* ====== Check email is in SMTP server ====== */
                await emailExistence.check(req.body.email, async (error: any, response: any) => {
                    console.log("emailExistence response: ", response);
                    console.log("emailExistence error: ", error);
                    if (response) {
                        const salt: string = await bcrypt.genSalt(10);
                        const hashPassword: string = await bcrypt.hash(password, salt);

                        const payload = {
                            first_name,
                            last_name,
                            email,
                            password: hashPassword
                        };

                        const newUser = new UserModel(payload);
                        await newUser.save();
                        res.status(201).json({ status: "success", data: newUser });
                    } else if (error) {
                        res.status(500).json({ error });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    };
}

export default AuthController;
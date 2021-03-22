import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch (e) {
            
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId)
        } catch (e) {
            
        }
    };

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Сократить ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                        <div className="input-field">
                            <input placeholder="Введите email" name="email" id="email" type="text" className="validate yellow-input" onChange={changeHandler} value={form.email}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Введите пароль" id="password" type="password" name="password" className="validate yellow-input" onChange={changeHandler} value={form.password}/>
                            <label htmlFor="password">Пароль</label>
                        </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={loginHandler} className="btn yellow darken-4" style={{marginRight: 10}} disabled={loading}>Войти</button>
                        <button onClick={registerHandler} className="btn grey lighten-1 black-text" disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
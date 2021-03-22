import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState('');
    const {request} = useHttp();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                
            }
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input placeholder="Вставьте ссылку" id="link" type="text" value={link} onChange={e => setLink(e.target.value)} onKeyPress={pressHandler}/>
                    <label htmlFor="link">Вставьте ссылку</label>
                </div>
            </div>
        </div>
    )
};
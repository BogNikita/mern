import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LinkCard } from "../components/LinkCard";
import { Loader } from "../components/Loader";
import { AuthContext } from "../Context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const DetailPage = () => {
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext)

    const getLink = useCallback ( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLink(fetched);
        } catch (error) {
            
        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink()
    }, [getLink]);

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            { !loading && link && <LinkCard link={link}/>}
        </>
    )
};
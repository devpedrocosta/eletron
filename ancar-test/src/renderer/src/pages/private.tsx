

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ProtectedRoutes({ component: Component }, props) {
    const [loading, setLoading] = useState(true);
    const isAuthenticated = localStorage.getItem("loggedIn") === "true";

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(false);
            return;
        }
        navigate("/signup");
    }, []);

    return <>{loading ? "Carregando..." : <Component {...props} />} </>;
}

export default ProtectedRoutes;
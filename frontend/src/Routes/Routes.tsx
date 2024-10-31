import { createBrowserRouter } from "react-router-dom";

//Pagina inicial
import App from "../App";
import HomePage from "../Views/HomePage";
import LoginPage from "../Views/LoginPage";
import SignUpPage from "../Views/SignUpPage";
import ChangePassword from "../Views/ChangePassword";

//Acá nos encargaremos de manejar las rutas dentro de la página
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                //Landing page
                path: "",
                element: <HomePage/>
            },
            {
                //Página de Login
                path: "/login",
                element: <LoginPage/>
            },
            {
                //Página de SignUp
                path: "/signup",
                element: <SignUpPage/>
            },
            {
                //Página de contraseña
                path: "/change_password",
                element: <ChangePassword/>
            }
        ]        
    }
]);

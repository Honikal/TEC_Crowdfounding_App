import { createBrowserRouter } from "react-router-dom";

//Pagina inicial
import App from "../App";
import HomePage from "../Views/HomePage";
import LoginPage from "../Views/LoginPage";
import SignUpPage from "../Views/SignUpPage";
import ChangePassword from "../Views/ChangePassword";
import MainPage from "../Views/MainPage";
import ModifyUserPage from "../Views/ModifyUserPage";
import DonationsManagement from "../Views/admin/DonationsManagement";
//Main Page


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
                path: "/change-password",
                element: <ChangePassword/>
            },
            {
                //Página para modificar los datos del usuario
                path: "/user-settings",
                element: <ModifyUserPage/>
            },

            {
                //Página de inicio de usuario
                path: "/main-page",
                element: <MainPage/>
            },

            {
                //Página de administración de donaciones
                path: "/donations-management",
                element: <DonationsManagement/>
            }
        ]        
    }
]);

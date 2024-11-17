import { createBrowserRouter } from "react-router-dom";

// Pagina inicial
import App from "../App";
import HomePage from "../Views/HomePage";
import LoginPage from "../Views/LoginPage";
import SignUpPage from "../Views/SignUpPage";
import ChangePassword from "../Views/ChangePassword";

import MainPage from "../Views/MainPage";
import ModifyUserPage from "../Views/ModifyUserPage";
import ProjectPage from "../Views/ProjectPage";
import NewProjectPage from "../Views/NewProjectPage";
import SearchedProjectPage from "../Views/SearchedProjectPage";

// Admin Pages
import DonationsManagement from "../Views/admin/DonationsManagement";
import UserManagement from "../Views/admin/UserManagement";
import ProjectValidation from "../Views/admin/ProjectValidation";
import EventConfiguration from "../Views/admin/EventConfiguration";

// Acá nos encargaremos de manejar las rutas dentro de la página
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                // Landing page
                path: "",
                element: <HomePage/>
            },
            {
                // Página de Login
                path: "/login",
                element: <LoginPage/>
            },
            {
                // Página de SignUp
                path: "/signup",
                element: <SignUpPage/>
            },
            {
                // Página de contraseña
                path: "/change-password",
                element: <ChangePassword/>
            },
            {
                // Página para modificar los datos del usuario
                path: "/user-settings",
                element: <ModifyUserPage/>
            },
            {
                // Página de inicio de usuario
                path: "/main-page",
                element: <MainPage/>
            },
            {
                // Página de Proyecto
                path: "/project/:projectId",
                element: <ProjectPage/>
            },
            {
                // Página de Crear Nuevo Proyecto
                path: "/new-project",
                element: <NewProjectPage/>
            },
            {
                // Página de Proyectos Buscados
                path: "/searched-projects",
                element: <SearchedProjectPage/>
            },
            {
                // Página de Administración de Donaciones
                path: "/admin/donations-management",
                element: <DonationsManagement/>
            },
            {
                // Página de Gestión de Usuarios
                path: "/admin/user-management",
                element: <UserManagement/>
            },
            {
                // Página de Validación de Proyectos
                path: "/admin/project-validation",
                element: <ProjectValidation/>
            },
            {
                // Página de Configuración de Eventos
                path: "/admin/event-configuration",
                element: <EventConfiguration/>
            },
            /*Sección de Proyectos*/
            {
                //Página de creación de Proyectos
                path: "/new-project",
                element: <NewProjectPage/>
            },
            {
                //Página de proyecto de forma individual
                path: "/project",
                element: <ProjectPage/>
            },
            {
                //Páginas específicas para proyectos
                path: "/search/categories",
                element: <SearchedProjectPage/>
            },

        ]        
    }
]);

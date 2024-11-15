import { createBrowserRouter } from "react-router-dom";

// Páginas principales
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

// Páginas de administración
import DonationsManagement from "../Views/admin/DonationsManagement";
import UserManagement from "../Views/admin/UserManagement";
import ProjectValidation from "../Views/admin/ProjectValidation";
import EventConfiguration from "../Views/admin/EventConfiguration";

// Acá nos encargaremos de manejar las rutas dentro de la página
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                // Página de inicio
                path: "",
                element: <HomePage />
            },
            {
                // Página de Login
                path: "/login",
                element: <LoginPage />
            },
            {
                // Página de SignUp
                path: "/signup",
                element: <SignUpPage />
            },
            {
                // Página para cambiar la contraseña
                path: "/change-password",
                element: <ChangePassword />
            },
            {
                // Página para modificar los datos del usuario
                path: "/user-settings",
                element: <ModifyUserPage />
            },
            {
                // Página de inicio para usuarios
                path: "/main-page",
                element: <MainPage />
            },
            {
                // Página para crear un nuevo proyecto
                path: "/new-project",
                element: <NewProjectPage />
            },
            {
                // Página de proyectos buscados
                path: "/searched-projects",
                element: <SearchedProjectPage />
            },
            // Páginas de administración
            {
                path: "/admin/donations-management",
                element: <DonationsManagement />
            },
            {
                path: "/admin/user-management",
                element: <UserManagement />
            },
            {
                path: "/admin/project-validation",
                element: <ProjectValidation />
            },
            {
                path: "/admin/event-configuration",
                element: <EventConfiguration />
            },
            // Sección de proyectos
            {
                path: "/search/categories",
                element: <SearchedProjectPage />
            },
            {
                //Página de proyecto de forma individual
                path: "/project",
                element: <ProjectPage/>
            },
        ]
    }
]);

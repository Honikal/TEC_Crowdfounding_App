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
import MyProjectsPage from "../Views/MyProjectsPage";

import DonatePage from "../Views/DonatePage";
import MyDonationsPage from "../Views/MyDonationsPage";
import ModifyProjectPage from "../Views/ModifyProjectPage";

// Admin Pages
import DonationsManagement from "../Views/admin/DonationsManagement";
import UserManagement from "../Views/admin/UserManagement";
import ProjectValidation from "../Views/admin/ProjectValidation";
import EventConfiguration from "../Views/admin/EventConfiguration";
import ProjectMonitoring from "../Views/admin/ProjectMonitoring";
import MentorManagement from "../Views/admin/MentorManagement";
import NotificationSettings from "../Views/admin/NotificationSettings";

// Configuración de rutas
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/signup",
                element: <SignUpPage/>
            },
            {
                path: "/change-password",
                element: <ChangePassword/>
            },
            {
                path: "/user-settings",
                element: <ModifyUserPage/>
            },
            {
                path: "/main-page",
                element: <MainPage/>
            },
            {
                path: "/project/:projectId",
                element: <ProjectPage/>
            },
            {
                path: "/new-project",
                element: <NewProjectPage/>
            },
            {
                path: "/searched-projects",
                element: <SearchedProjectPage/>
            },
            // Admin routes
            {
                //Método para donar los proyectos
                path: "/project/donate",
                element: <DonatePage/>
            },
            {
                //Página específica para modificar el proyecto como tal
                path: "/project/edit-project",
                element: <ModifyProjectPage/>
            },
            {
                //Páginas específicas para proyectos
                path: "/search/categories",
                element: <SearchedProjectPage/>
            },
            {
                //Páginas específicas para proyecto de usuario
                path: "/my-projects",
                element: <MyProjectsPage/>
            },

            /*Área de donación*/
            {
                //Páginas específicas para mostrar donaciones
                path: "/my-donations",
                element: <MyDonationsPage/>
            },
            {
                path: "/admin/donations-management",
                element: <DonationsManagement/>
            },
            {
                path: "/admin/user-management",
                element: <UserManagement/>
            },
            {
                path: "/admin/project-validation",
                element: <ProjectValidation/>
            },
            {
                path: "/admin/event-configuration",
                element: <EventConfiguration/>
            },
            {
                path: "/admin/project-monitoring",
                element: <ProjectMonitoring/>
            },
            {
                path: "/admin/mentor-management",
                element: <MentorManagement/>
            },
            {
                path: "/admin/notification-settings",
                element: <NotificationSettings/>
            }
        ]        
    }
]);
 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthAdminLayout from "./layouts/AuthAdminLayout";
import LoginAdminView from "./views/authAdmin/LoginAdminView";
import RegisterAdminView from "./views/authAdmin/RegisterAdminView";
import ConfirmAccountView from "./views/authAdmin/ConfirmAccountView";
import RequestNewCodeView from "./views/authAdmin/RequestNewCodeView";
import ForgotPasswordView from "./views/authAdmin/ForgotPasswordView";
import NewPasswordView from "./views/authAdmin/NewPasswordView";
import LoginAffiliateView from "./views/authAffiliate/LoginAffiliateView";
import AppAffiliateLayout from "./layouts/AppAffiliateLayout";
import DashboardAffiliateView from "./views/AppointmentAffiliate/DashboardAffiliateView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthAdminLayout/>}>
                    <Route path="/auth/admin/login" element={<LoginAdminView/>}/>
                    <Route path="/auth/admin/register" element={<RegisterAdminView/>}/>
                    <Route path="/auth/admin/confirm-account" element={<ConfirmAccountView/>}/>
                    <Route path="/auth/admin/request-code" element={<RequestNewCodeView/>}/>
                    <Route path="/auth/admin/forgot-password" element={<ForgotPasswordView/>}/>
                    <Route path="/auth/admin/new-password" element={<NewPasswordView/>}/>
                </Route>

                <Route path='/auth/affiliate/login' element={<LoginAffiliateView/>}/>

                <Route element={<AppAffiliateLayout/>}>
                    <Route path="/" element={<DashboardAffiliateView/>} index/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
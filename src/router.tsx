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
import AuthAffiliateLayout from "./layouts/AuthAffiliateLayout";
import RegisterAffiliateView from "./views/authAffiliate/RegisterAffiliateView";
import ConfirmAccountAffiliateView from "./views/authAffiliate/ConfirmAccountAffiliateView";
import RequestNewCodeAffiliateView from "./views/authAffiliate/RequestNewCodeAffiliateView";
import ForgotPasswordAffiliateView from "./views/authAffiliate/ForgotPasswordAffiliateView";
import NewPasswordAffiliateView from "./views/authAffiliate/NewPasswordAffiliateView";
import AppAdminLayout from "./layouts/AppAdminLayout";
import DashboardAdminView from "./views/RecordsAdmin/DashboardAdminView";
import DoctorsView from "./views/RecordsAdmin/DoctorsView";

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

                <Route element={<AuthAffiliateLayout/>}>
                    <Route path='/auth/affiliate/login' element={<LoginAffiliateView/>}/>
                    <Route path="/auth/affiliate/register" element={<RegisterAffiliateView/>}/>
                    <Route path="/auth/affiliate/confirm-account" element={<ConfirmAccountAffiliateView/>}/>
                    <Route path="/auth/affiliate/request-code" element={<RequestNewCodeAffiliateView/>}/>
                    <Route path="/auth/affiliate/forgot-password" element={<ForgotPasswordAffiliateView/>}/>
                    <Route path="/auth/affiliate/new-password" element={<NewPasswordAffiliateView/>}/>
                </Route>

                <Route element={<AppAffiliateLayout/>}>
                    <Route path="/" element={<DashboardAffiliateView/>} index/>
                </Route>

                <Route element={<AppAdminLayout/>}>
                    <Route path="/records" element={<DashboardAdminView/>} index/>
                    <Route path="/doctors" element={<DoctorsView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, } from "react-router-dom";
// import NoPageFound from './Pages/NoPageFound';
// import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import EmailAuth from './Pages/ForgetPassword/EmailAuth';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';

import Header from './components/Header';
import SignUp from './Pages/SignUp/SignUp';
import Dashboard from './Pages/Dashboard/Dashboard'
import RouteLayout from "./RouteLayout"
import Logins from "./components/Auth/Signin";
import Layout from './components/Layout/Layout';
import WelcomePage from './Pages/WelcomePage';
import Profile from './Pages/Profile/Profile';
import ProfileWrapper from './Pages/Profile/ProfileWrapper';
import DashboardWrapper from './Pages/Dashboard/DashboardWrapper';
import AnalyticsWrapper from './Pages/Analytics/AnalyticsWrapper';
import InvoicesWrapper from './Pages/Invoices/InvoicesWrapper';
import AffiliateLinksWrapper from './Pages/AffiliateLinks/AffiliateLinksWrapper';
import AddAffiliateLinksWrapper from './Pages/AffiliateLinks/AddAffiliateLinks/AddAffiliateLinksWrapper';

import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import AdminDashboardWrapper from './Pages/ADMIN/Dashboard/AdminDashboardWrapper';
import AddInvoiceWrapper from './Pages/ADMIN/Dashboard/AddInvoice/AddInvoiceWrapper';
import ViewInvoiceWrapper from './Pages/ADMIN/ViewInvoice/ViewInvoiceWrapper';
import AdminAffiliateLinksWrapper from './Pages/ADMIN/Affiliate/AdminAffiliateLinksWrapper';
import AdminAddAffiliateLinksWrapper from './Pages/ADMIN/Affiliate/AddAffiliate/AddAffiliateLinksWrapper';
import AssignAffiliateWrapper from './Pages/ADMIN/Affiliate/AssignAffiliate/AssignAffiliateWrapper';
import AnalyticsGraphWrapper from './Pages/AnalyticsGraph/AnalyticsGraphWrapper';
import EditAffiliateWrapper from './Pages/ADMIN/Affiliate/EditAffiliate/EditAffiliateWrapper';
import CustomerProfileWrapper from './Pages/ADMIN/CustomerProfile/CustomerProfileWrapper';
import NoPageFound from './Pages/NoPageFound';
import TermAndConditions from './Pages/Terms&Condition';

function Routing() {
    const navigate = useNavigate()
    const [decodedToken, setDecodedToken] = useState();
    const [authenticateLogin, setAthenticateLogin] = useState(false);
    const [role, setRole] = useState('');

    const userToken = Cookies.get("isLogged");
    //////// Checking if user is logged or not ////////////  
    useEffect((e) => {
        if (!userToken || userToken === null) {
            setAthenticateLogin(false)
            if (!window.location.pathname.includes('forgot-password')) {
                navigate('/');
            }
        }
        else {
            setAthenticateLogin(true)
        }
    }, [userToken])



    useEffect(() => {
        if (userToken?.length > 1) {
            const decodingToken = jwtDecode(userToken);
            console.log(decodingToken?.role, 'decodedToken');
            setRole(decodingToken?.role)
        }
        console.log('')
    }, [userToken, authenticateLogin])



    return (
        <div className=' w-full h-full'>
            {/* <Header/> */}
            <Routes>
                <Route path="" element={<Logins auth={setAthenticateLogin} setRole={setRole} />} />
                <Route path="/login" element={<Logins auth={setAthenticateLogin} setRole={setRole} />} />
                <Route path="/register" element={<SignUp auth={setAthenticateLogin} />} />
                <Route path="/forgot-password/:role" element={<EmailAuth />} />
                <Route path="/reset-password/:role/:id" element={<ForgetPassword />} />
                <Route path="/terms-condition" element={<TermAndConditions />} />
                {
                    authenticateLogin && role != 'admin' ?
                        <Route path='/dashboard/' element={<Layout />} >
                            <Route path='' element={<DashboardWrapper />} />
                            <Route path='profile' element={<ProfileWrapper />} />
                            <Route path='affiliate-links' element={<AffiliateLinksWrapper />} />
                            {/* <Route path='affiliate-links/add' element={<AddAffiliateLinksWrapper />} /> */}
                            <Route path='invoices' element={<InvoicesWrapper />} />
                            <Route path='analytics' element={<AnalyticsWrapper />} />
                            <Route path='analytics/:id/:name' element={<AnalyticsGraphWrapper />} />
                        </Route>
                        :
                        authenticateLogin ?
                            <Route path='/dashboard/' element={<Layout />} >
                                <Route path='' element={<AdminDashboardWrapper />} />
                                <Route path='profile' element={<ProfileWrapper />} />
                                <Route path='customer/profile/:id' element={<CustomerProfileWrapper />} />
                                <Route path='invoice/add/:id' element={<AddInvoiceWrapper />} />
                                <Route path='invoice/view/:id' element={<ViewInvoiceWrapper />} />
                                <Route path='invoice/add/:id' element={<AddInvoiceWrapper />} />
                                <Route path='invoice/view/:id' element={<ViewInvoiceWrapper />} />
                                <Route path='affiliate-links' element={<AdminAffiliateLinksWrapper />} />
                                <Route path='affiliate-links/add' element={<AdminAddAffiliateLinksWrapper />} />
                                <Route path='affiliate-links/edit/:id' element={<EditAffiliateWrapper />} />
                                <Route path='affiliate-links/assign/:id' element={<AssignAffiliateWrapper />} />
                            </Route>
                            :
                            <Route path='*' element={<><NoPageFound /></>} />
                }
            </Routes>
        </div>
    )
}

export default Routing;
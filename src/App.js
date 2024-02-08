import { BrowserRouter as Router, Route, Switch, Redirect, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import React from 'react';
import "./styles/app.sass";
import Page from "./components/Page";
import DomainDashboard from "./screens/DomainDashboard";
import DisDomains from "./screens/DisDomains";
import Released from "./screens/Released";
import Comments from "./screens/Comments";
import Scheduled from "./screens/Scheduled";
import AssetsDashboard from "./screens/AssetsDashboard";
import Promote from "./screens/Promote";
import Settings from "./screens/Settings";
import UpgradeToPro from "./screens/UpgradeToPro";
import MessageCenter from "./screens/MessageCenter";
import ExploreCreators from "./screens/ExploreCreators";
import AffiliateCenter from "./screens/AffiliateCenter";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Refunds from "./screens/Refunds";
import Payouts from "./screens/Payouts";
import Statements from "./screens/Statements";
import Shop from "./screens/Shop";
import PageList from "./screens/PageList";
import NewAsset from "./screens/NewAsset";
import AssetManagement from "./screens/AssetManagement";
import ThreatManagement from "./screens/ThreatManagement";
import Profile from "./screens/Profile"


function App() {
    
    return (
        <AuthProvider>
        <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
        <Route
            path="/"
            element={
                <Page title="Dashboard">
                <DomainDashboard title="Dashboard" />
                </Page>
            }
          />
            <Route
            path="domains"
            element={
                <Page title="Domains">
                <DomainDashboard title="Domains" />
                </Page>
            }
          />
                <Route
                    path="domains/add"
                    element={
                        <Page title="Enumeration">
                            <NewAsset />
                        </Page>
                    }
                />
                <Route
                    path="domains/view"
                    element={
                        <Page title="Discover Domains">
                            <DisDomains />
                        </Page>
                    }
                />
                <Route
                    path="products/released"
                    element={
                        <Page title="Released">
                            <Released />
                        </Page>
                    }
                />
                <Route
                    path="products/comments"
                    element={
                        <Page title="Comments">
                            <Comments />
                        </Page>
                    }
                />
                <Route
                    path="products/scheduled"
                    element={
                        <Page title="Scheduled">
                            <Scheduled />
                        </Page>
                    }
                />
                <Route
                    path="assets/overview"
                    element={
                        <Page title="Asset IP">
                            <AssetsDashboard />
                        </Page>
                    }
                />
                <Route
                    path="assets/view"
                    element={
                        <Page title="Asset Management">
                            <AssetManagement />
                        </Page>
                    }
                />
                <Route
                    path="threats/overview"
                    element={
                        <Page title="Threats">
                            <ThreatManagement />
                        </Page>
                    }
                />

                <Route
                    path="profile"
                    element={
                        <Page title="Profile">
                            <Profile />
                        </Page>
                    }
                />
                
                </Route>

                
                <Route path="sign-up" element={<SignUp />} />
                <Route path="pagelist" element={<PageList />} />
            
        </Routes>
        </AuthProvider>
    );
}

export default App;

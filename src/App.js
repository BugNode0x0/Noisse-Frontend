import { BrowserRouter as Router, Route, Switch, Redirect, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import React from 'react';
import "./styles/app.sass";
import Page from "./components/Page";
import DomainDashboard from "./screens/DomainDashboard";
import DisDomains from "./screens/DisDomains";
import AssetsDashboard from "./screens/AssetsDashboard";
import SignIn from "./screens/SignIn";
import NewAsset from "./screens/NewAsset";
import AssetManagement from "./screens/AssetManagement";
import WebView from "./screens/WebView";
import Crawl from "./screens/Crawl";
import Profile from "./screens/Profile"
import PaymentSuccess from './screens/PaymentSuccess';


function App() {
    
    return (
        <AuthProvider>
        <SubscriptionProvider>
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
                        <Page title="Asset IP">
                            <AssetManagement />
                        </Page>
                    }
                />
                <Route
                    path="web/view"
                    element={
                        <Page title="Web View">
                            <WebView />
                        </Page>
                    }
                />

                <Route
                    path="crawler/view"
                    element={
                        <Page title="Crawler">
                            <Crawl />
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

                <Route
                    path="/payment-success"
                    element={
                        <Page title="Payment Success">
                        <PaymentSuccess/>
                        </Page>
                    }
                />
                
                </Route>            
        </Routes>
        </SubscriptionProvider>
        </AuthProvider>
    );
}

export default App;

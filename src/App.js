import { BrowserRouter as Router, Route, Switch, Redirect, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
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
import Notification from "./screens/Notification";
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


function App() {
    
    return (
        <AuthProvider>
        <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route
            path="/"
            element={
              <PrivateRoute>
                <Page title="Dashboard">
                <DomainDashboard title="Dashboard" />
                </Page>
              </PrivateRoute>
            }
          />
                <Route
            path="domains"
            element={
              <PrivateRoute>
                <Page title="Domains">
                <DomainDashboard title="Domains" />
                </Page>
              </PrivateRoute>
            }
          />
                <Route
                    path="domains/add"
                    element={
                        <Page title="Add Assets">
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
                        <Page title="Assets">
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
                    path="shop"
                    element={
                        <Page wide>
                            <Shop />
                        </Page>
                    }
                />
                <Route
                    path="threats/overview"
                    element={
                        <Page title="Earning">
                            <ThreatManagement />
                        </Page>
                    }
                />
                <Route
                    path="income/refunds"
                    element={
                        <Page title="Refunds">
                            <Refunds />
                        </Page>
                    }
                />
                <Route
                    path="income/payouts"
                    element={
                        <Page title="Payouts">
                            <Payouts />
                        </Page>
                    }
                />
                <Route
                    path="income/statements"
                    element={
                        <Page title="Statements">
                            <Statements />
                        </Page>
                    }
                />
                <Route
                    path="promote"
                    element={
                        <Page title="Promote">
                            <Promote />
                        </Page>
                    }
                />
                <Route
                    path="notification"
                    element={
                        <Page title="Notification">
                            <Notification />
                        </Page>
                    }
                />
                <Route
                    path="settings"
                    element={
                        <Page title="Settings">
                            <Settings />
                        </Page>
                    }
                />
                <Route
                    path="upgrade-to-pro"
                    element={
                        <Page title="Upgrade to Pro">
                            <UpgradeToPro />
                        </Page>
                    }
                />
                <Route
                    path="message-center"
                    element={
                        <Page title="Message center">
                            <MessageCenter />
                        </Page>
                    }
                />
                <Route
                    path="explore-creators"
                    element={
                        <Page title="Explore creators">
                            <ExploreCreators />
                        </Page>
                    }
                />
                <Route
                    path="affiliate-center"
                    element={
                        <Page title="Affiliate center">
                            <AffiliateCenter />
                        </Page>
                    }
                />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="pagelist" element={<PageList />} />
            
        </Routes>
        </AuthProvider>
    );
}

export default App;

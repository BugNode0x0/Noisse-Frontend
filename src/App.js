import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import "./styles/app.sass";
import Page from "./components/Page";
import DomainDashboard from "./screens/DomainDashboard";
import DisDomains from "./screens/DisDomains";
import AssetsDashboard from "./screens/AssetsDashboard";
import SignIn from "./screens/SignIn";
import NewAsset from "./screens/NewAsset";
import AssetManagement from "./screens/AssetManagement";
import ThreatManagement from "./screens/ThreatManagement";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';


function App() {
    return (
        <AuthProvider>
        <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route
            path="/"
            element={
            <ProtectedRoute>
            <DomainDashboard />
            </ProtectedRoute>
            }
            />
               <Route
    path="/domains"
    element={
        <ProtectedRoute>
            <Page title="Domain - Dashboard">
                <DomainDashboard />
            </Page>
        </ProtectedRoute>
    }
/>
<Route
    path="domains/add"
    element={
        <ProtectedRoute>
            <Page title="Add Assets">
                <NewAsset />
            </Page>
        </ProtectedRoute>
    }
/>
<Route
    path="domains/view"
    element={
        <ProtectedRoute>
            <Page title="Discover Domains">
                <DisDomains />
            </Page>
        </ProtectedRoute>
    }
/>

<Route
    path="assets/overview"
    element={
        <ProtectedRoute>
            <Page title="Assets">
                <AssetsDashboard />
            </Page>
        </ProtectedRoute>
    }
/>
<Route
    path="assets/view"
    element={
        <ProtectedRoute>
            <Page title="Asset Management">
                <AssetManagement />
            </Page>
        </ProtectedRoute>
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
        </Routes>
        </AuthProvider>
    );
}

export default App;

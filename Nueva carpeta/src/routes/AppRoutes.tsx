import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import GenerateReports from '../pages/generate-reports/generate-reports';
import ReportsList from '../pages/reports-list/reports-list';
import ReportDetail from '../pages/report-detail/report-detail';
import ProvidersInfo from '../pages/providers-info/providers-info';
import Emails from '../pages/emails/emails';
import LogIn from '../pages/log-in/log-in';
import Navbar from '../components/navbar/navbar';
import { PowerBi } from '../pages/power-bi/power-bi';
import ErrorPage from '../pages/error/error-page';
import DqrHome from '../pages/dqr/home/home';
import RiskList from '../pages/dqr/risk-list/risk-list';
import RiskDetail from '../pages/dqr/risk-detail/risk-detail';
import ResearchList from '../pages/dqr/research-list/research-list';
import ResearchDetail from '../pages/dqr/research-detail/research-detail';

export default function AppRoutes({
    accessToken,
    azureToken,
    bnpUserRol,
    setAzureToken,
    dqrUserRol,
}: {
    accessToken: string | null;
    azureToken: string | null;
    bnpUserRol: string | null;
    setAzureToken: (t: string | null) => void;
    dqrUserRol: string | null;
}) {
    return (
        <>
            <Routes>
                {accessToken ? (
                    <>
                        <Route path='/' element={<Navbar />}>
                            <Route index element={<Dashboard />} />
                            {bnpUserRol && (
                                <>
                                    <Route
                                        path='/bnp/generate'
                                        element={<GenerateReports />}
                                    />

                                    <Route
                                        path='/bnp/reports-list'
                                        element={<ReportsList />}
                                    />
                                    <Route
                                        path='/bnp/reports-list/:reportId'
                                        element={<ReportDetail />}
                                    />
                                    <Route
                                        path='/bnp/reports-list/:reportId/send'
                                        element={<ProvidersInfo />}
                                    />
                                    <Route
                                        element={<Emails />}
                                        path='/bnp/emails'
                                    />
                                </>
                            )}
                            {azureToken && (
                                <Route
                                    element={
                                        <PowerBi
                                            accessToken={accessToken}
                                            azureToken={azureToken}
                                            setAzureToken={setAzureToken}
                                        />
                                    }
                                    path='/transaction-monitoring'
                                />
                            )}
                            {dqrUserRol && (
                                <>
                                    <Route
                                        element={<DqrHome />}
                                        path='/dqr/home'
                                    />
                                    <Route
                                        element={<RiskList />}
                                        path='/dqr/risk-list'
                                    />
                                    <Route
                                        element={<RiskDetail />}
                                        path='/dqr/risk-list/:riskId'
                                    />
                                    <Route
                                        element={<ResearchList />}
                                        path='/dqr/research-list'
                                    />
                                    <Route
                                        element={<ResearchDetail />}
                                        path='/dqr/research-list/:researchId'
                                    />
                                </>
                            )}
                        </Route>
                    </>
                ) : (
                    <>
                        <Route path='/' element={<LogIn />} />
                    </>
                )}
                <Route
                    path='*'
                    element={
                        <ErrorPage
                            errorCode='404'
                            errorMessage='Sorry, the page you are looking for does not exist.'
                        />
                    }
                />
            </Routes>
        </>
    );
}

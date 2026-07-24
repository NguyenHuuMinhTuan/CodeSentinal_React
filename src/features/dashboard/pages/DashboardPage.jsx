import { useState } from "react";
import "./DashboardPage.scss";
import UploadZone from "../components/dashboard/UploadZone";
import LoadingOverlay from "../components/dashboard/LoadingOverlay";
import SummaryCards from "../components/dashboard/SummaryCards";
import ExtensionChart from "../components/dashboard/ExtensionChart";
import SeverityChart from "../components/dashboard/SeverityChart";
import RiskScore from "../components/dashboard/RiskScore";
import FindingsTable from "../components/dashboard/FindingsTable";
import SuspiciousFiles from "../components/dashboard/SuspiciousFiles";
import { Row, Col, Card } from "antd";

export default function DashboardPage() {

    const [loading, setLoading] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    return (
        <div className="dashboard-root min-h-screen bg-slate-950 text-white p-8">

            <LoadingOverlay loading={loading} />

            <h1 className="text-4xl font-bold mb-8">CodeSentinel Dashboard</h1>

            <UploadZone
                setLoading={setLoading}
                setScanResult={setScanResult}
            />

            {scanResult && (
                <>

                    <SummaryCards data={scanResult} />

                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                        <Col xs={24} lg={12}>
                            <Card title="File extensions" bordered={false} bodyStyle={{ padding: 12 }}>
                                <ExtensionChart data={scanResult} />
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card title="Severity distribution" bordered={false} bodyStyle={{ padding: 12 }}>
                                <SeverityChart data={scanResult} />
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 16 }} gutter={[16, 16]}>
                        <Col xs={24} lg={8}>
                            <Card title="Risk Score" bordered={false} bodyStyle={{ padding: 12 }}>
                                <RiskScore data={scanResult} />
                            </Card>
                        </Col>
                        <Col xs={24} lg={16}>
                            <Card title="Findings" bordered={false} bodyStyle={{ padding: 12 }}>
                                <FindingsTable findings={scanResult.findings} />
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 16 }}>
                        <Col xs={24}>
                            <Card title="Suspicious Files" bordered={false} bodyStyle={{ padding: 12 }}>
                                <SuspiciousFiles files={scanResult.suspiciousFiles} />
                            </Card>
                        </Col>
                    </Row>

                </>
            )}

        </div>
    );
}
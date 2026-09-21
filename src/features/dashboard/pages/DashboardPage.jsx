import { Row, Col, Card } from "antd";
import "./DashboardPage.scss";

import useScan from "../hooks/useScan";
import UploadZone from "../components/dashboard/UploadZone";
import LoadingOverlay from "../components/dashboard/LoadingOverlay";
import SummaryCards from "../components/dashboard/SummaryCards";
import ExtensionChart from "../components/dashboard/ExtensionChart";
import SeverityChart from "../components/dashboard/SeverityChart";
import RiskScore from "../components/dashboard/RiskScore";
import FindingsTable from "../components/dashboard/FindingsTable";
import SuspiciousFiles from "../components/dashboard/SuspiciousFiles";

export default function DashboardPage() {
    const { scan, loading, scanResult, error } = useScan();

    return (
        <div className="dashboard-page">
            <LoadingOverlay loading={loading} />

            <div className="dashboard-page__header">
                <h1>Scan console</h1>
                <p>Upload a source archive to run static detection.</p>
            </div>

            <Card bordered={false} className="dashboard-page__upload">
                <UploadZone loading={loading} onScan={scan} />
                {error && <p className="dashboard-page__error">{error}</p>}
            </Card>

            {scanResult && (
                <>
                    <SummaryCards
                        totalFiles={scanResult.totalFiles}
                        findingsCount={scanResult.findings?.length ?? 0}
                        suspiciousCount={scanResult.suspiciousFiles?.length ?? 0}
                        extensionsCount={Object.keys(scanResult.extensions || {}).length}
                    />

                    <Row gutter={[16, 16]} className="dashboard-page__row">
                        <Col xs={24} lg={12}>
                            <Card title="File extensions" bordered={false}>
                                <ExtensionChart extensions={scanResult.extensions} />
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card title="Severity distribution" bordered={false}>
                                <SeverityChart findings={scanResult.findings} />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className="dashboard-page__row">
                        <Col xs={24} lg={8}>
                            <Card title="Overall risk" bordered={false}>
                                <RiskScore
                                    findings={scanResult.findings}
                                    totalFiles={scanResult.totalFiles}
                                    suspiciousCount={scanResult.suspiciousFiles?.length}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} lg={16}>
                            <Card title="Findings" bordered={false}>
                                <FindingsTable findings={scanResult.findings} />
                            </Card>
                        </Col>
                    </Row>

                    <Row className="dashboard-page__row">
                        <Col xs={24}>
                            <Card title="Suspicious files" bordered={false}>
                                <SuspiciousFiles files={scanResult.suspiciousFiles} />
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

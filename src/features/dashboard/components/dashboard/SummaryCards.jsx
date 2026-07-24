import { Row, Col, Card } from "antd";

export default function SummaryCards({ data }) {

    const stats = [
        { key: "files", title: "Files", value: data.totalFiles },
        { key: "findings", title: "Findings", value: data.findings?.length ?? 0 },
        { key: "suspicious", title: "Suspicious", value: data.suspiciousFiles?.length ?? 0 },
        { key: "extensions", title: "Extensions", value: Object.keys(data.extensions || {}).length }
    ];

    return (

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {stats.map((s) => (
                <Col key={s.key} xs={24} sm={12} md={12} lg={6}>
                    <Card bordered={false} className="summary-card">
                        <div style={{ color: '#9CA3AF' }}>{s.title}</div>
                        <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{s.value}</div>
                    </Card>
                </Col>
            ))}
        </Row>

    );

}
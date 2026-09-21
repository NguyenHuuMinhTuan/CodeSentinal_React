import { useState } from "react";
import { Upload, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export default function UploadZone({ loading, onScan }) {
    const [file, setFile] = useState(null);

    const beforeUpload = (candidate) => {
        setFile(candidate);
        return false; // prevent antd's own auto-upload; we scan explicitly
    };

    const handleScan = async () => {
        if (!file) {
            message.warning("Choose an archive first.");
            return;
        }

        try {
            await onScan(file);
            message.success("Scan complete.");
        } catch {
            message.error("Scan failed.");
        }
    };

    const handleClear = () => {
        setFile(null);
        message.info("Selection cleared.");
    };

    return (
        <div className="upload-zone">
            <Dragger
                name="file"
                accept=".zip,.rar"
                beforeUpload={beforeUpload}
                multiple={false}
                showUploadList={{ showRemoveIcon: true }}
                onRemove={handleClear}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Drop archive or click to browse</p>
                <p className="ant-upload-hint">Accepted formats: .zip, .rar</p>
            </Dragger>

            <div className="upload-zone__actions">
                <Button type="primary" onClick={handleScan} disabled={!file || loading}>
                    {loading ? "Scanning…" : "Scan archive"}
                </Button>
                <Button onClick={handleClear} disabled={!file || loading}>
                    Clear
                </Button>
            </div>
        </div>
    );
}

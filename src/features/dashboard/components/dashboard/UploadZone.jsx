import { useState } from "react";
import { Upload, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import api from "@/shared/api/api";

const { Dragger } = Upload;

export default function UploadZone({ setLoading, setScanResult }) {

    const [file, setFile] = useState(null);

    const beforeUpload = (file) => {
        setFile(file);
        return false; // prevent auto upload
    };

    const upload = async () => {
        if (!file) {
            message.warning("Please choose a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            const response = await api.post(
                "/api/scans/upload",
                 formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setScanResult(response.data);
            message.success("Upload successful");
        } catch (err) {
            message.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-zone">
            <Dragger
                name="file"
                accept=".zip,.rar"
                beforeUpload={beforeUpload}
                multiple={false}
                showUploadList={{ showRemoveIcon: true }}
                className="w-full"
            >
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text" style={{ color: '#eef6fb' }}>Kéo thả file hoặc nhấn để chọn file</p>
                <p className="upload-instructions">Hỗ trợ: .zip, .rar — Tối ưu để quét toàn bộ project</p>
            </Dragger>

            <div className="upload-actions">
                <Button type="primary" onClick={upload} disabled={!file}>Scan</Button>
                <Button onClick={() => { setFile(null); message.info('File đã được bỏ chọn'); }}>Clear</Button>
            </div>
        </div>
    );

}
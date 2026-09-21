import { useCallback, useState } from "react";
import { uploadArchiveForScan } from "../services/scanService";

export default function useScan() {
    const [loading, setLoading] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState("");

    const scan = useCallback(async (file) => {
        setLoading(true);
        setError("");
        try {
            const result = await uploadArchiveForScan(file);
            setScanResult(result);
            return result;
        } catch (err) {
            setError(
                err?.response?.data?.message || "Scan failed. Please try again."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { scan, loading, scanResult, error };
}

import api from "@/shared/api/api";

export async function uploadArchiveForScan(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/scans/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
}

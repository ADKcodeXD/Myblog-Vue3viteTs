import { uploadBanner } from "@/api/article";
import { ElMessage } from "element-plus";
import { ElFile, UploadFile } from "element-plus/es/components/upload/src/upload.type";

export const useUpload = async (file: UploadFile): Promise<string> => {
    const isImg = file.type === "image/jpeg" || file.type === "image/png";
    const isLt5M = file.size / 1024 / 1024 < 5;
    let flag: string = "";
    if (!isImg) {
        ElMessage.error("请上传jpg或者png格式的图片");
        return flag;
    }
    if (!isLt5M) {
        ElMessage.error("请不要上传大于5MB的图片");
        return flag;
    }
    // 上传到后端
    const fd = new FormData();
    fd.append("image", file);
    try {
        const { data } = await uploadBanner(fd);
        if (data.code !== 200) {
            ElMessage.error(data.msg);
            return flag;
        } else {
            ElMessage.success("上传成功");
            flag=data.data;
        }
    } catch (error) {
        ElMessage.error("上传发生错误");
    }

    return flag;
}
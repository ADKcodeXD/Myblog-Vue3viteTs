import { getSubjectInfoAllApi } from "@/api/bangumi";
import { AnimeDeatilItem } from "@/interface/bangumiApi.type";

export const useAnimeDeatil=async (subjectId:number):Promise<AnimeDeatilItem>=>{
    const {data}=await getSubjectInfoAllApi(subjectId);
    return data;
}
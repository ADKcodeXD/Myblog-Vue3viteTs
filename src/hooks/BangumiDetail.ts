import { getSubjectInfoAllApi } from '@/api/bangumi'

export const useAnimeDeatil = async (subjectId: number): Promise<Bangumi.AnimeDeatilItem> => {
  const { data } = await getSubjectInfoAllApi(subjectId)
  return data.data
}

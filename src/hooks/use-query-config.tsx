import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import { useSearchParam } from './use-query-params';
export default function useQueryConfig() {
  const searchParam = useSearchParam();
  const queryConfig = omitBy(
    {
      keyword: searchParam.keyword,
      pageSize: searchParam.pageSize || '10',
      pageIndex: searchParam.pageIndex || '1',
      jobTypeId: searchParam.jobTypeId,
      maCongViec: searchParam.maCongViec
    },
    isUndefined
  );
  return queryConfig;
}

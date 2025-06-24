import { useSearchParams } from 'react-router';
export function useSearchParam() {
  const [searchParam] = useSearchParams();
  return Object.fromEntries([...searchParam]);
}

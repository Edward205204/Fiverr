import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useReactRouter from '@/routes/use-react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function App() {
  const element = useReactRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <div>{element}</div>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

import "@bka-stuff/mfe-utils/style.css";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { KWThemeProvider } from '@xds-core/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Shell from './Shell';

import { Provider } from 'jotai';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      {/* <KWThemeProvider> */}
      <Provider>
        <Shell />
      </Provider>
      {/* </KWThemeProvider> */}
    </QueryClientProvider>
  </BrowserRouter>
);

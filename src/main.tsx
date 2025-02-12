import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from '@graphql/client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </ThemeProvider>
  </ErrorBoundary>
);

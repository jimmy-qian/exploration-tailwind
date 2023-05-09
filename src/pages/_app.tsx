import * as i from 'types';
import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import {
  type DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import 'styles/global.css';
import GlobalStyle from 'styles';
import theme from 'styles/theme';

const App = ({ Component, pageProps: { dehydrateState, ...pageProps } }: Props) => {
  // This ensures that data is not shared between different users and requests,
  // while still only creating the QueryClient once per component lifecycle.
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30 seconds
            cacheTime: 1000 * 6 * 10, // 10 minutes
            retry: false,
          },
        },
      }),
  );

  const getLayout = Component.layout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" sizes="192x192" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydrateState}>
            {getLayout(<Component {...pageProps} />, pageProps)}
          </Hydrate>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

type Props = Omit<AppProps, 'pageProps'> & {
  pageProps: i.AnyObject & {
    dehydrateState?: DehydratedState;
  };
  Component: i.NextPageComponent;
};

export default App;

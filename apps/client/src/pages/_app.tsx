import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DarkModeProvider } from "@/utils/DarkModeContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <Head>
          <title>Task Tracker Client</title>
        </Head>
        <Component {...pageProps} />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

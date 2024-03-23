import store from "@/context";
import "@/styles/globals.css";
import "@mantine/core/styles.css"
import {createTheme, MantineProvider} from '@mantine/core'
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

const theme = createTheme({
  
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}

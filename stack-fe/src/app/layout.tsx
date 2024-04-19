"use client";
import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import styles from "scss/global.module.scss";
import "scss/style.min.css";
import { JWTProvider as AuthProvider } from "./contexts/JWTContext";
import END_POINT from "./configs";
import { store } from "./store";
const client = new ApolloClient({
  uri: END_POINT.API_ENDPOINT,
  cache: new InMemoryCache()
});
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={styles.body}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </ApolloProvider>
        </Provider>
      </body>
    </html>
  );
}

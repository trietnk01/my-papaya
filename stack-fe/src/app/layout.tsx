"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { Provider } from "react-redux";
import styles from "scss/global.module.scss";
import "scss/style.min.css";
import { JWTProvider as AuthProvider } from "./contexts/JWTContext";
import { store } from "./store";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/graphql`;
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache()
  });
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

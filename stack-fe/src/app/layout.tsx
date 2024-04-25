"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "./apollo-upload-client/createUploadLink.mjs";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import styles from "scss/global.module.scss";
import "scss/style.min.css";
import { Loader } from "./components";
import { JWTProvider as AuthProvider } from "./contexts/JWTContext";
import { store } from "./store";
import auth_service from "./utils/authService";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/graphql`;
  const httpLink = createUploadLink({ uri });
  const authLink = setContext((_, { headers }) => {
    const token: string = auth_service.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        "Apollo-Require-Preflight": "true"
      }
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  return (
    <html>
      <body className={styles.body}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <AuthProvider>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </AuthProvider>
          </ApolloProvider>
        </Provider>
      </body>
    </html>
  );
}

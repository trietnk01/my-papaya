import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//import createUploadLink from "./apollo-upload-client/createUploadLink";
import createUploadLink from "./apollo-upload-client/createUploadLink.mjs";
import { JWTProvider as AuthProvider } from "./contexts/JWTContext";
import React from "react";
import "./scss/style.min.css";
import auth_service from "./utils/authService";

function App() {
  const backendUri: string = import.meta.env.VITE_BACKEND_URI;
  const httpLink = createUploadLink({ backendUri });
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
    <ApolloProvider client={client}>
      <AuthProvider>
        <React.Fragment></React.Fragment>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

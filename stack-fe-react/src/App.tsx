import JWTProvider from "@/providers/jwt-provider";
import Routes from "@/routes";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import PublicProvider from "@/providers/public-provider";

function App() {
  const httpLink = createUploadLink({ uri: `${process.env.REACT_APP_BACKEND_URI}/graphql` });
  const authLink = setContext((_, { headers }) => {
    const token: string = window.localStorage.getItem("accessToken")
      ? (window.localStorage.getItem("accessToken") as string)
      : "";
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
      <JWTProvider>
        <PublicProvider>
          <Routes />
        </PublicProvider>
      </JWTProvider>
    </ApolloProvider>
  );
}

export default App;

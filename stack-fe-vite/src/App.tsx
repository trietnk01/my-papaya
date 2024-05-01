import createUploadLink from "@/apollo-upload-client/createUploadLink.d.mts";
import JWTProvider from "@/providers/jwt-provider";
import Routes from "@/routes";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function App() {
  const backendUri = `${import.meta.env.VITE_BACKEND_URI}/graphql`;
  const httpLink = createUploadLink({ uri: backendUri ? backendUri.toString().trim() : "" });
  const authLink = setContext((_, { headers }) => {
    const token: string = window.localStorage.getItem("accessToken")
      ? (window.localStorage.getItem("accessToken") as string)
      : "";
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
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
        <Routes />
      </JWTProvider>
    </ApolloProvider>
  );
}

export default App;

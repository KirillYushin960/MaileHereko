import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Page: {
          merge(existing = {}, incoming) {
            return {
              ...existing,
              ...incoming,
              media: [...(existing.media || []), ...(incoming.media || [])],
            };
          },
        },
      },
    },
    Media: {
      fields: {
        coverImage: {
          merge(existing = {}, incoming) {
            return {
              ...existing,
              ...incoming,
            };
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: import.meta.env.VITE_CLIENT_URI,
  cache,
});

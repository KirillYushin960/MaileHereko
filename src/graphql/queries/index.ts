import { gql } from '@apollo/client';

export const GET_ITEMS = gql(`
  query GetItems($page: Int, $perPage: Int, $type: MediaType, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        hasNextPage
      }
      media(type: $type, search: $search) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        type
        meanScore
      }
    }
  }
`);

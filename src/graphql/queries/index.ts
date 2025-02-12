import { gql } from '@apollo/client';

export const GET_ANIME = gql(`
  query GetAnime($page: Int, $perPage: Int, $type: MediaType, $search: String) {
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

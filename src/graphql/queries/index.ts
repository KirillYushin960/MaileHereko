import { gql } from '@apollo/client';

export const GET_MEDIA = gql(`
  query GetMedia($page: Int, $perPage: Int, $type: MediaType, $search: String) {
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

export const GET_SINGLE_MEDIA = gql(`
  query GetSingleMedia($mediaId: Int) {
    Media(id: $mediaId) {
      id
      title {
        userPreferred
      }
      startDate {
        day
        month
        year
      }
      endDate {
        year
        month
        day
      }
      type
      status
      duration
      bannerImage
      genres
      meanScore
      coverImage {
        extraLarge
      }
      description
      episodes
      chapters
    }
  }
`);

import { useEffect, useState, useRef, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { debounce } from 'lodash';
import { Input } from '@components/Input';
import { Card } from '@components/Card';
import { animePageStore } from '@store/AnimePage';
import { useQuery } from '@apollo/client';
import { GET_ANIME } from '@graphql/queries';
import { projectName } from '@constants';
import { GetAnimeQuery } from '@generated/types';
import { CardPlaceholderCollection } from '@ui/CardPlaceholderCollection';
import { Grid2 as Grid, Typography } from '@mui/material';
import { style } from './style';
import Search from '@assets/icons/search-normal.svg';

const Anime = () => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(animePageStore.filter.input || '');
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // вынести в хук
  const observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        handleLoadMore();
      }
    },
    { rootMargin: '500px' }
  );
  const { data, loading, fetchMore, networkStatus } = useQuery<GetAnimeQuery>(GET_ANIME, {
    variables: { page: 1, perPage: 20, type: 'ANIME', search: animePageStore.filter.input || null },
    notifyOnNetworkStatusChange: true,
  });

  const isFetchMore = networkStatus === 3;

  const debouncedSetStoreInput = useCallback(
    debounce((value: string) => {
      animePageStore.setInputValue(value);
    }, 1000),
    []
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    debouncedSetStoreInput(event.currentTarget.value);
  };

  const handleLoadMore = useCallback(() => {
    if (isFetchMore || !data?.Page?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        return {
          Page: {
            ...fetchMoreResult.Page,
            media: [...(prevResult.Page?.media || []), ...(fetchMoreResult.Page?.media || [])],
          },
        };
      },
    });

    setPage((prevPage) => prevPage + 1);
  }, [fetchMore, page, networkStatus, data]);

  useEffect(() => {
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleLoadMore]);

  return (
    <>
      <Typography variant="bodyExtraSmall" sx={style.subtitle}>
        {projectName}
      </Typography>

      <Typography variant="h1" sx={style.title}>
        Anime
      </Typography>

      <Input
        value={inputValue}
        onChange={handleInputChange}
        label="Search Manga or Anime"
        startIcon={Search}
        sxStyle={style.input}
      />

      {data && (
        <Typography variant="bodyRegular" sx={style.counter}>
          {data.Page?.pageInfo?.total} {data.Page?.pageInfo?.total === 1 ? 'item' : 'items'}
        </Typography>
      )}

      <Grid container>
        {data?.Page?.pageInfo?.total === 0 && (
          <Typography variant="h2" sx={style.noResults}>
            There are no matches
          </Typography>
        )}

        {loading && networkStatus !== 3 && <CardPlaceholderCollection />}

        {data?.Page?.media?.map((media) => (
          <Card
            key={media?.id}
            title={media?.title?.userPreferred}
            image={media?.coverImage?.large}
            rating={media?.meanScore}
          />
        ))}

        {isFetchMore && <CardPlaceholderCollection />}
      </Grid>

      <div ref={loaderRef} />
    </>
  );
};

export default observer(Anime);

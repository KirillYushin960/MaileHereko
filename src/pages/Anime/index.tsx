import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { debounce } from 'lodash';
import { Input } from '@components/Input';
import { Card } from '@components/Card';
import { RenderContent } from '@components/RenderContent';
import { animePageStore } from '@store/AnimePageStore';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '@graphql/queries';
import { projectName } from '@constants';
import { GetItemsQuery } from '@generated/types';
import { useIntersectionObserver } from '@hooks';
import { Typography } from '@mui/material';
import { style } from './style';
import Search from '@assets/icons/search-normal.svg';

const Anime = () => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(animePageStore.filter.input || '');
  const [hasError, setHasError] = useState(false);

  const observedCardRef = useRef<HTMLDivElement | null>(null);

  const { loading, data, fetchMore } = useQuery<GetItemsQuery>(GET_ITEMS, {
    variables: { page: 1, perPage: 20, type: 'ANIME', search: animePageStore.filter.input || null },
    notifyOnNetworkStatusChange: true,
    onError: () => {
      setHasError(true);
    },
    onCompleted: () => {
      if (hasError) {
        setHasError(false);
      }
    },
  });

  const itemQuantity = data?.Page?.pageInfo?.total;

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

  const handleLoadMore = useCallback(async () => {
    if (loading || hasError || !data?.Page?.pageInfo?.hasNextPage) return;

    try {
      await fetchMore({
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
    } catch {
      setHasError(true);
    }
  }, [fetchMore, page, data, loading, hasError]);

  useIntersectionObserver(observedCardRef, handleLoadMore);

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
        label="Search Anime"
        startIcon={Search}
        sxStyle={style.input}
      />

      <Typography variant="bodyRegular" sx={style.counter}>
        {data ? itemQuantity : '...'} {itemQuantity === 1 ? 'item' : 'items'}
      </Typography>

      <RenderContent loading={loading} error={hasError} count={itemQuantity}>
        {data?.Page?.media?.map((media, index) => {
          const isObserved = index === (data.Page?.media?.length || 0) - 5;

          return (
            <Card
              key={media?.id}
              title={media?.title?.userPreferred}
              image={media?.coverImage?.large}
              rating={media?.meanScore}
              ref={isObserved ? observedCardRef : null}
            />
          );
        })}
      </RenderContent>
    </>
  );
};

export default observer(Anime);

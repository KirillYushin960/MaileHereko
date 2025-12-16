import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@components/Input';
import { Card } from '@components/Card';
import { RenderCardList } from '@components/RenderCardList';
import { pageFilterStore } from '@store/PageFilterStore';
import { observer } from 'mobx-react-lite';
import { debounce } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_MEDIA } from '@graphql/queries';
import { cardPerPage, projectName } from '@constants';
import { useIntersectionObserver } from '@hooks';
import { mergePageData } from '@helpers';
import { PageFilter } from '@types';
import { GetMediaQuery } from '@generated/types';
import { Typography } from '@mui/material';
import { style } from './style';
import Search from '@assets/icons/search-normal.svg';

interface IMediaPage {
  filter: PageFilter;
  pageName: string;
}

const Media = ({ filter, pageName }: IMediaPage) => {
  const [inputValue, setInputValue] = useState(filter.inputValue || '');
  const [hasError, setHasError] = useState(false);

  const observedCardRef = useRef<HTMLDivElement | null>(null);

  const { loading, data, fetchMore } = useQuery<GetMediaQuery>(GET_MEDIA, {
    variables: {
      page: 1,
      perPage: cardPerPage,
      type: pageName.toUpperCase(),
      search: filter.inputValue || null,
    },
    fetchPolicy: 'cache-and-network',
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
      pageFilterStore.setInputValue(filter, value);
    }, 1000),
    [filter]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
    debouncedSetStoreInput(newValue);
  };

  const handleLoadMore = useCallback(async () => {
    if (loading || hasError || !data?.Page?.pageInfo?.hasNextPage) return;

    try {
      await fetchMore({
        variables: {
          page: (data.Page.media?.length || 0) / cardPerPage + 1,
        },
        updateQuery: (prevResult, { fetchMoreResult }) =>
          mergePageData(prevResult, fetchMoreResult),
      });
    } catch {
      setHasError(true);
    }
  }, [fetchMore, data, loading, hasError]);

  useIntersectionObserver(observedCardRef, handleLoadMore);

  return (
    <>
      <Typography variant="bodyExtraSmall" sx={style.subtitle} component={Link} to="/">
        {projectName}
      </Typography>

      <Typography variant="h1" sx={style.title}>
        {pageName}
      </Typography>

      <Input
        value={inputValue}
        onChange={handleInputChange}
        label={`Search ${pageName}`}
        startIcon={Search}
        sxStyle={style.input}
      />

      <Typography variant="bodyRegular" sx={style.counter}>
        {!loading ? itemQuantity : '...'} {itemQuantity === 1 ? 'item' : 'items'}
      </Typography>

      <RenderCardList loading={loading} error={hasError} count={itemQuantity}>
        {data?.Page?.media?.map((media, index) => {
          const isObserved = index === (data.Page?.media?.length || 0) - 5;

          return (
            media?.id &&
            media?.title?.userPreferred && (
              <Card
                key={media?.id}
                id={media?.id}
                title={media?.title?.userPreferred}
                image={media?.coverImage?.large}
                rating={media?.meanScore}
                ref={isObserved ? observedCardRef : null}
              />
            )
          );
        })}
      </RenderCardList>
    </>
  );
};

export default observer(Media);

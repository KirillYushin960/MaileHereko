import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { debounce } from 'lodash';
import { Input } from '@components/Input';
import { Card } from '@components/Card';
import { RenderCardList } from '@components/RenderCardList';
import { ButtonGroup } from '@components/ButtonGroup';
import { pageFilterStore } from '@store/PageFilterStore';
import { useQuery } from '@apollo/client';
import { GET_MEDIA } from '@graphql/queries';
import { cardPerPage, content, projectName } from '@constants';
import { generateCategoryButtons, mergePageData } from '@helpers';
import { Content } from '@types';
import { GetMediaQuery } from '@generated/types';
import { useIntersectionObserver } from '@hooks';
import { Typography } from '@mui/material';
import { style } from './style';
import Search from '@assets/icons/search-normal.svg';

const Home = () => {
  const [inputValue, setInputValue] = useState(pageFilterStore.homeFilter.inputValue || '');
  const [hasError, setHasError] = useState(false);
  const [activeType, setActiveType] = useState<Content>('All');

  const observedCardRef = useRef<HTMLDivElement | null>(null);

  const variables = {
    page: 1,
    perPage: cardPerPage,
    type: activeType === 'All' ? undefined : activeType.toUpperCase(),
    search: pageFilterStore.homeFilter.inputValue || null,
  };

  const { loading, data, fetchMore } = useQuery<GetMediaQuery>(GET_MEDIA, {
    variables,
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
      pageFilterStore.setInputValue(pageFilterStore.homeFilter, value);
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
      <Typography sx={style.title}>{projectName}</Typography>

      <Typography variant="bodyRegular" sx={style.description}>
        List of movies and TV Shows, I,{' '}
        <Typography variant="bodyRegular" component="span" sx={style.descriptionSpan}>
          Pramod Poudel
        </Typography>{' '}
        have watched till date. Explore what I have watched and also feel free to make a suggestion.
        😉
      </Typography>

      <Input
        value={inputValue}
        onChange={handleInputChange}
        label="Search Anime of Manga"
        startIcon={Search}
        sxStyle={style.input}
      />

      <ButtonGroup
        activeValue={activeType}
        buttons={generateCategoryButtons(content, setActiveType)}
        sxStyle={style.buttonGroup}
      />

      <Typography variant="bodyRegular" sx={style.counter}>
        {activeType} {!loading && `(${itemQuantity})`}
      </Typography>

      <RenderCardList loading={loading} error={hasError} count={itemQuantity}>
        {data?.Page?.media?.map((media, index) => {
          const isObserved = index === (data.Page?.media?.length || 0) - 5;

          return (
            media?.id &&
            media?.title?.userPreferred && (
              <Card
                key={media.id}
                id={media.id}
                title={media.title.userPreferred}
                image={media.coverImage?.large}
                rating={media.meanScore}
                ref={isObserved ? observedCardRef : null}
              />
            )
          );
        })}
      </RenderCardList>
    </>
  );
};

export default observer(Home);

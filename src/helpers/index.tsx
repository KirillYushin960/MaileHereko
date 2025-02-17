import { CardPlaceholder } from '@components/CardPlaceholder';
import { GetMediaQuery } from '@generated/types';

type PageData = GetMediaQuery['Page'];

export const renderPlaceholders = (count: number) => {
  return Array.from({ length: count }, (_, index) => <CardPlaceholder key={index} />);
};

export const mergePageData = (
  prevResult: { Page?: PageData },
  fetchMoreResult: { Page?: PageData }
): { Page?: PageData } => {
  if (!fetchMoreResult?.Page) return prevResult;

  return {
    Page: {
      ...fetchMoreResult.Page,
      media: [...(prevResult.Page?.media || []), ...(fetchMoreResult.Page.media || [])],
    },
  };
};

export const generateCategoryButtons = <T extends string>(
  items: readonly T[],
  setActiveType: (type: T) => void
) =>
  items.map((item) => ({
    label: item,
    onClick: () => setActiveType(item),
  }));

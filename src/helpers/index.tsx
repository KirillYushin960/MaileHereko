import { CardPlaceholder } from '@components/CardPlaceholder';
import { GetMediaQuery, GetSingleMediaQuery } from '@generated/types';

type PageData = GetMediaQuery['Page'];

type MediaDate = NonNullable<GetSingleMediaQuery['Media']>['startDate'];

interface IDatesEqual {
  startDate: MediaDate;
  endDate: MediaDate;
}

export const renderPlaceholders = (count: number) =>
  Array.from({ length: count }, (_, index) => <CardPlaceholder key={index} />);

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

export const handleDateFormat = (date: MediaDate) => {
  if (date) {
    const { day, month, year } = date;

    return date.year || month || day ? [year, month, day].filter(Boolean).join('-') : 'unknown';
  }
};

export const areDatesEqual = ({ startDate, endDate }: IDatesEqual): boolean =>
  startDate?.day === endDate?.day &&
  startDate?.month === endDate?.month &&
  startDate?.year === endDate?.year;

export const parseMediaStatus = (status: string | undefined | null): string =>
  status ? status.toLowerCase().replace(/_/g, ' ') : 'unknown';

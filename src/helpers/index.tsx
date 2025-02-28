import { CardPlaceholder } from '@components/CardPlaceholder';
import { GetMediaQuery, GetSingleMediaQuery } from '@generated/types';
import parse from 'html-react-parser';

type PageData = GetMediaQuery['Page'];

type MediaDate = NonNullable<NonNullable<GetSingleMediaQuery['Media']>['startDate']>;

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
  const { day, month, year } = date;

  return date.year || month || day ? [year, month, day].filter(Boolean).join('-') : 'unknown';
};

export const areDatesEqual = ({ startDate, endDate }: IDatesEqual): boolean =>
  startDate?.day === endDate?.day &&
  startDate?.month === endDate?.month &&
  startDate?.year === endDate?.year;

export const parseMediaStatus = (status: string | undefined | null): string =>
  status ? status.toLowerCase().replace(/_/g, ' ') : 'unknown';

export const parseDescription = (description: string) =>
  parse(
    description
      .replace(/<br>\s*<br>/g, '')
      .replace(/\(Source.*$/s, '')
      .replace(/<b>\*.*$/s, '')
  );

// dayjs попробовать
export const getFormattedDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

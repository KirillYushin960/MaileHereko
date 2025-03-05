import { CardPlaceholder } from '@components/CardPlaceholder';
import { GetMediaQuery, GetSingleMediaQuery } from '@generated/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
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

dayjs.extend(relativeTime);

export const getFormattedDate = (seconds: number): string => {
  const date = dayjs.unix(seconds);
  const now = dayjs();

  if (now.diff(date, 'second') < 60) return 'just now';
  if (now.diff(date, 'day') < 1) return date.fromNow();

  return date.format('MMM D, YYYY HH:mm');
};

export const formatLikes = (count: number) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }

  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }

  return count.toString();
};

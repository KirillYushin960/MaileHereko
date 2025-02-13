import { CardPlaceholder } from '@components/CardPlaceholder';

export const CardPlaceholderCollection = () => (
  <>
    {Array.from({ length: 4 }, (_, index) => (
      <CardPlaceholder key={index} />
    ))}
  </>
);

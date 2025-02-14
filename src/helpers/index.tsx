import { CardPlaceholder } from '@components/CardPlaceholder';

export const renderPlaceholders = (count: number) => {
  return Array.from({ length: count }, (_, index) => <CardPlaceholder key={index} />);
};

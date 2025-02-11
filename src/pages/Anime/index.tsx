import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { siteName } from '@constants';
import { Box, Typography } from '@mui/material';
import { style } from './style';
import Search from '@assets/icons/search-normal.svg';

const Anime = () => (
  <>
    <Typography variant="bodyExtraSmall" sx={style.subtitle}>
      {siteName}
    </Typography>

    <Typography variant="h1" sx={style.title}>
      Anime
    </Typography>

    <Box sx={style.searchContainer}>
      <Input startIcon={Search} label="Search Manga or Anime" />
      <Button>Search</Button>
    </Box>
  </>
);

export default Anime;

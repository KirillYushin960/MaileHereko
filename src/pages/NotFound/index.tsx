import { useNavigate } from 'react-router-dom';
import { Button } from '@components/Button';
import { Box, Typography } from '@mui/material';
import { style } from './style';
import NotFoundImage from '@assets/no-results.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box sx={style.container}>
      <Box component="img" src={NotFoundImage} sx={style.image} />

      <Typography sx={style.title}>Lost your way?</Typography>

      <Typography sx={style.description}>
        Oops! This is awkward. You are looking for something that doesn't actually exist.
      </Typography>

      <Button onClick={() => navigate('/')} sxStyle={style.button}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;

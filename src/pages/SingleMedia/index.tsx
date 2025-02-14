import { useQuery } from '@apollo/client';
import { GetSingleMediaQuery } from '@generated/types';
import { GET_SINGLE_MEDIA } from '@graphql/queries';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const SingleMedia = () => {
  const { id: mediaId = '' } = useParams<{ id: string }>();

  const { data } = useQuery<GetSingleMediaQuery>(GET_SINGLE_MEDIA, {
    variables: {
      mediaId,
    },
  });

  return (
    <>
      <Typography variant="h1" sx={{ color: 'white' }}>
        {mediaId}
      </Typography>
      <Button
        sx={{ color: 'white', backgroundColor: 'black', border: '1px solid white' }}
        onClick={() => console.log(data)}
      >
        <Typography variant="h1">LOG</Typography>
      </Button>
    </>
  );
};

export default SingleMedia;

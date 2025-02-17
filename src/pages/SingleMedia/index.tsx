import { useQuery } from '@apollo/client';
import { GetSingleMediaQuery } from '@generated/types';
import { GET_SINGLE_MEDIA } from '@graphql/queries';
import { Box, Grid2 as Grid, Typography, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { style } from './style';
import { projectName } from '@constants';
import { Link } from 'react-router-dom';
import { Rating } from '@ui/Rating';
import parse from 'html-react-parser';

const SingleMedia = () => {
  const { id: mediaId = '' } = useParams<{ id: string }>();

  const isMobile = useMediaQuery('(max-width:600px)');

  const { data } = useQuery<GetSingleMediaQuery>(GET_SINGLE_MEDIA, {
    variables: {
      mediaId,
    },
  });

  const banner = data?.Media?.bannerImage;

  return (
    <>
      {banner && (
        <Box component="img" src={banner} alt="banner" sx={style.banner} draggable="false" />
      )}

      <Box sx={style.titleBox(banner)}>
        <Box>
          <Typography variant="bodyExtraSmall" sx={style.subtitle} component={Link} to="/">
            {projectName}
          </Typography>

          <Typography component="span" sx={style.slash} variant="bodyExtraSmall">
            /
          </Typography>

          <Typography
            variant="bodyExtraSmall"
            sx={style.subtitle}
            component={Link}
            to={`/${data?.Media?.type?.toLowerCase()}`}
          >
            {data?.Media?.type?.toLowerCase()}
          </Typography>
        </Box>

        <Typography variant={isMobile ? 'h5' : 'h3'} sx={style.title}>
          {data?.Media?.title?.userPreferred}
        </Typography>
      </Box>

      {/* <Box sx={style.contentBox(banner)}> */}

      <Grid sx={{ mt: '150px', gridAutoRows: 'min-content' }}>
        <Grid size={6}>
          {data?.Media?.coverImage?.extraLarge && (
            <Box
              component="img"
              src={data.Media.coverImage.extraLarge}
              alt="media image"
              sx={{
                maxWidth: { sm: '480px' },

                width: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                flex: 1,
                alignSelf: { xs: 'center', sm: 'flex-start' },
                minWidth: '280px',
                borderRadius: '24px',
              }}
            />
          )}
        </Grid>

        <Grid size={6}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Typography variant="h4" sx={{ color: '#EBEEF5' }}>
              {data?.Media?.title?.userPreferred}
            </Typography>

            {data?.Media?.description && (
              <Typography variant="bodyLarge" sx={{ color: 'gray', whiteSpace: 'pre-line' }}>
                {parse(data.Media.description)}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid size={6}>
          <Box sx={{ height: '500px', width: '250px', backgroundColor: 'black' }}>
            <Rating number={data?.Media?.meanScore} sxStyle={{ height: '32px', width: '60px' }} />
          </Box>
        </Grid>
      </Grid>

      {/* </Box> */}
    </>
  );
};

export default SingleMedia;

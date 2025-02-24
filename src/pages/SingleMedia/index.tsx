import { useParams, Link } from 'react-router-dom';
import { MediaDetails } from '@components/MediaDetails';
import { RenderSingleMedia } from '@components/RenderSingleMedia';
import { projectName } from '@constants';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_MEDIA } from '@graphql/queries';
import { GetSingleMediaQuery } from '@generated/types';
import { Box, Typography } from '@mui/material';
import { style } from './style';
import { observer } from 'mobx-react-lite';

const SingleMedia = () => {
  const { id: mediaId = '' } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<GetSingleMediaQuery>(GET_SINGLE_MEDIA, {
    variables: {
      mediaId,
    },
  });

  const banner = data?.Media?.bannerImage;

  return (
    <RenderSingleMedia loading={loading} error={error}>
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

        <Typography sx={style.title}>{data?.Media?.title?.userPreferred}</Typography>
      </Box>

      <MediaDetails data={data?.Media} />
    </RenderSingleMedia>
  );
};

export default observer(SingleMedia);

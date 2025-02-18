import { Masonry } from '@mui/lab';
import parse from 'html-react-parser';
import { GetSingleMediaQuery } from '@generated/types';
import { handleDateFormat, areDatesEqual, parseMediaStatus } from '@helpers';
import { MediaInfo } from '@ui/MediaInfo';
import { Rating } from '@ui/Rating';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { style } from './style';

interface IMediaDetails {
  data: GetSingleMediaQuery['Media'];
}

export const MediaDetails = ({ data }: IMediaDetails) => {
  const {
    startDate,
    endDate,
    meanScore,
    type,
    status,
    episodes,
    chapters,
    duration,
    genres,
    coverImage,
    title,
    description,
  } = data || {};

  const datesEqual = areDatesEqual({ startDate, endDate });

  return (
    <>
      <Box sx={style.media}>
        <Masonry columns={{ xs: 1, sm: 2 }} spacing={{ xs: 4, sm: 4, md: 6, lg: 10 }}>
          {coverImage?.extraLarge && (
            <Box component="img" src={coverImage.extraLarge} alt="media image" sx={style.image} />
          )}

          <Box sx={style.info}>
            <Typography variant="h4" sx={style.infoTitle}>
              {title?.userPreferred}
            </Typography>

            {description && (
              <Typography variant="bodyLarge" sx={style.infoDescription}>
                {parse(description)}
              </Typography>
            )}
          </Box>

          <Grid rowGap={3} columnGap={3} justifyContent={'flex-start'}>
            {meanScore && (
              <Grid size={12} mb={0} justifyContent={'flex-start'}>
                <Rating number={meanScore} sxStyle={style.rating} />
              </Grid>
            )}

            {type && (
              <MediaInfo title="Type" description={type.toLowerCase()} size={{ xs: 12, md: 6 }} />
            )}

            {status && (
              <MediaInfo
                title="Status"
                description={parseMediaStatus(status)}
                size={{ xs: 12, md: 6 }}
              />
            )}

            {datesEqual ? (
              <MediaInfo title="Release" description={handleDateFormat(startDate)} size={12} />
            ) : (
              <>
                <MediaInfo
                  title="First air date"
                  description={handleDateFormat(startDate)}
                  size={{ xs: 12, md: 6 }}
                />
                <MediaInfo
                  title="Last air date"
                  description={handleDateFormat(endDate)}
                  size={{ xs: 12, md: 6 }}
                />
              </>
            )}

            {episodes && episodes > 1 && (
              <MediaInfo title="No. of episodes" description={episodes} size={12} />
            )}

            {chapters && chapters > 1 && (
              <MediaInfo title="No. of chapters" description={chapters} size={12} />
            )}

            {duration &&
              (episodes === 1 ? (
                <MediaInfo title="Run time" description={`${duration} min`} size={12} />
              ) : (
                <MediaInfo title="Episode run time" description={`${duration} min`} size={12} />
              ))}

            {genres && genres.length > 0 && (
              <MediaInfo title="Genres" description={genres.join(', ')} size={12} />
            )}
          </Grid>
        </Masonry>
      </Box>
    </>
  );
};

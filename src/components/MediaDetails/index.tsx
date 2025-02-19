import { EpisodeItem } from '@components/EpisodeItem';
import { Masonry } from '@mui/lab';
import { GetSingleMediaQuery } from '@generated/types';
import { handleDateFormat, areDatesEqual, parseMediaStatus, parseDescription } from '@helpers';
import { MediaInfo } from '@ui/MediaInfo';
import { Rating } from '@ui/Rating';
import { Box, Grid2 as Grid, ImageList, Typography } from '@mui/material';
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
    description,
    streamingEpisodes,
  } = data || {};

  const datesEqual = startDate && endDate ? areDatesEqual({ startDate, endDate }) : false;

  return (
    <>
      <Box sx={style.container}>
        <Masonry columns={{ xs: 1, sm: 2 }} spacing={{ xs: 4, sm: 4, md: 6, lg: 10 }}>
          {coverImage?.extraLarge && (
            <Box component="img" src={coverImage.extraLarge} alt="media image" sx={style.image} />
          )}

          {description && (
            <Typography variant="bodyLarge" sx={style.description}>
              {parseDescription(description)}
            </Typography>
          )}

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

            {startDate && (
              <>
                {endDate && !datesEqual ? (
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
                ) : (
                  <MediaInfo title="Release" description={handleDateFormat(startDate)} size={12} />
                )}
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

          {streamingEpisodes && streamingEpisodes.length > 0 && (
            <Box sx={style.episodesContainer}>
              <Typography variant="bodyRegular" sx={style.episodesHeader}>
                Watch
              </Typography>

              <ImageList gap={10} sx={style.episodesList}>
                {streamingEpisodes.map((episode, i) => (
                  <EpisodeItem key={i} episode={episode} />
                ))}
              </ImageList>
            </Box>
          )}
        </Masonry>
      </Box>
    </>
  );
};

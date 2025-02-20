import { EpisodeItem } from '@components/EpisodeItem';
import { GetSingleMediaQuery } from '@generated/types';
import { handleDateFormat, areDatesEqual, parseMediaStatus, parseDescription } from '@helpers';
import { MediaInfo } from '@ui/MediaInfo';
import { Rating } from '@ui/Rating';
import { Box, Typography } from '@mui/material';
import { style } from './style';
import { useState } from 'react';

const charLimit = 300;

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

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const parsedDescription = parseDescription(description ?? '');
  const isTruncated = parsedDescription.length > charLimit;

  return (
    <>
      <Box sx={style.container}>
        <Box>
          {coverImage?.extraLarge && (
            <Box component="img" src={coverImage.extraLarge} alt="media image" sx={style.image} />
          )}

          {description && (
            <Typography variant="bodyLarge" sx={style.description}>
              {isDescriptionExpanded || !isTruncated ? (
                parsedDescription
              ) : (
                <>
                  {parsedDescription.slice(0, charLimit)}...
                  <Box
                    component="span"
                    onClick={() => setIsDescriptionExpanded(true)}
                    sx={style.showMore}
                  >
                    show more
                  </Box>
                </>
              )}
            </Typography>
          )}

          {meanScore && (
            <Box sx={style.ratingContainer}>
              <Rating number={meanScore} sxStyle={style.rating} />
            </Box>
          )}
        </Box>

        <Box sx={style.infoContainer}>
          {type && <MediaInfo title="Type" description={type.toLowerCase()} />}

          {status && <MediaInfo title="Status" description={parseMediaStatus(status)} />}

          {startDate && (
            <>
              {endDate && !datesEqual ? (
                <>
                  <MediaInfo title="First air date" description={handleDateFormat(startDate)} />
                  <MediaInfo title="Last air date" description={handleDateFormat(endDate)} />
                </>
              ) : (
                <MediaInfo title="Release" description={handleDateFormat(startDate)} />
              )}
            </>
          )}

          {episodes && episodes > 1 && <MediaInfo title="No. of episodes" description={episodes} />}

          {chapters && chapters > 1 && <MediaInfo title="No. of chapters" description={chapters} />}

          {duration &&
            (episodes === 1 ? (
              <MediaInfo title="Run time" description={`${duration} min`} />
            ) : (
              <MediaInfo title="Episode run time" description={`${duration} min`} />
            ))}

          {genres && genres.length > 0 && (
            <MediaInfo title="Genres" description={genres.join(', ')} />
          )}
        </Box>

        {streamingEpisodes && streamingEpisodes?.length > 0 && (
          <Box sx={style.episodesContainer}>
            <Typography variant="bodyRegular" sx={style.episodesHeader}>
              Streaming Episodes
            </Typography>

            <Box sx={style.episodesList}>
              {streamingEpisodes.map((episode, i) => (
                <EpisodeItem key={i} episode={episode} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

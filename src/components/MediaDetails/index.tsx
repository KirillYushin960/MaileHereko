/* eslint-disable no-console */
import { EpisodeItem } from '@components/EpisodeItem';
import { GetSingleMediaQuery } from '@generated/types';
import { handleDateFormat, areDatesEqual, parseMediaStatus, parseDescription } from '@helpers';
import { MediaInfo } from '@ui/MediaInfo';
import { Rating } from '@ui/Rating';
import { Box, Typography } from '@mui/material';
import { style } from './style';
import { useEffect, useState } from 'react';
import { charLimit } from '@constants';
import { Button } from '@components/Button';
import { userStore } from '@store/UserStore';
import { db } from '@config/firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { observer } from 'mobx-react-lite';

interface IMediaDetails {
  data: GetSingleMediaQuery['Media'];
}

export const MediaDetails = observer(({ data }: IMediaDetails) => {
  const {
    id,
    title,
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

  const { user } = userStore;
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  const datesEqual = startDate && endDate ? areDatesEqual({ startDate, endDate }) : false;

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const parsedDescription = parseDescription(description ?? '');
  const isTruncated = parsedDescription.toString().length > charLimit;

  // config/quires/index.ts
  const fetchFavorite = async () => {
    if (!user || !id) return;

    try {
      const favoriteRef = doc(db, 'favorites', id?.toString());
      const docSnap = await getDoc(favoriteRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.subscribes && Array.isArray(data.subscribes)) {
          setIsSubscribed(data.subscribes.includes(user.uid));
        }
      } else {
        setIsSubscribed(false);
      }
    } catch (err) {
      console.error('Error fetchFavorite:', err);
    }
  };

  const initFavorite = async () => {
    if (!user || !id) return;

    try {
      await setDoc(doc(db, 'favorites', id?.toString()), {
        title: title?.userPreferred ?? '',
        image: coverImage?.extraLarge ?? '',
        rating: meanScore ?? 0,
        subscribes: [],
      });
    } catch (err) {
      console.error('Error initFavorite:', err);
    }
  };

  const handleAddFavorite = async () => {
    if (!user || !id) return;

    try {
      const favoriteRef = doc(db, 'favorites', id?.toString());
      const docSnap = await getDoc(favoriteRef);

      if (!docSnap.exists()) {
        await initFavorite();
        await updateDoc(favoriteRef, {
          subscribes: arrayUnion(user.uid),
        });
        setIsSubscribed(true);
      } else {
        await updateDoc(favoriteRef, {
          subscribes: arrayUnion(user.uid),
        });
        setIsSubscribed(true);
      }
    } catch (err) {
      console.error('Error handleAddFavorite:', err);
    }
  };

  const handleRemoveFavorite = async () => {
    if (!user || !id) return;

    try {
      const favoriteRef = doc(db, 'favorites', id?.toString());

      await updateDoc(favoriteRef, {
        subscribes: arrayRemove(user.uid),
      });
      setIsSubscribed(false);
    } catch (err) {
      console.error('Error handleRemoveFavorite:', err);
    }
  };

  useEffect(() => {
    fetchFavorite();
  }, [user, id]);

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
                  {parsedDescription.toString().slice(0, 200)}...
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
              {user && isSubscribed !== null && (
                <Button
                  sxStyle={{ height: '32px' }}
                  onClick={
                    isSubscribed === false
                      ? () => handleAddFavorite()
                      : () => handleRemoveFavorite()
                  }
                >
                  {/* favoriteButtonText */}
                  {isSubscribed === false ? 'Add to favorites' : 'Remove from favorites'}
                </Button>
              )}
            </Box>
          )}
        </Box>

        <Box sx={style.infoContainer}>
          <Box sx={style.infoSection}>
            {type && <MediaInfo title="Type" description={type.toLowerCase()} />}

            {status && <MediaInfo title="Status" description={parseMediaStatus(status)} />}
          </Box>

          {startDate && (
            <>
              {endDate && !datesEqual ? (
                <Box sx={style.infoSection}>
                  <MediaInfo title="First air date" description={handleDateFormat(startDate)} />
                  <MediaInfo title="Last air date" description={handleDateFormat(endDate)} />
                </Box>
              ) : (
                <MediaInfo title="Release" description={handleDateFormat(startDate)} />
              )}
            </>
          )}
          <Box sx={style.infoSection}>
            {episodes && episodes > 1 && (
              <MediaInfo title="No. of episodes" description={episodes} />
            )}

            {chapters && chapters > 1 && (
              <MediaInfo title="No. of chapters" description={chapters} />
            )}

            {duration &&
              (episodes === 1 ? (
                <MediaInfo title="Run time" description={`${duration} min`} />
              ) : (
                <MediaInfo title="Episode run time" description={`${duration} min`} />
              ))}
          </Box>

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
});

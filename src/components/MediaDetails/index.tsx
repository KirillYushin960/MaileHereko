/* eslint-disable no-console */
import { EpisodeItem } from '@components/EpisodeItem';
import { GetSingleMediaQuery } from '@generated/types';
import { handleDateFormat, areDatesEqual, parseMediaStatus, parseDescription } from '@helpers';
import { MediaInfo } from '@ui/MediaInfo';
import { Rating } from '@ui/Rating';
import { Box, Skeleton, Typography } from '@mui/material';
import { style } from './style';
import { useEffect, useState } from 'react';
import { charLimit } from '@constants';
import { Button } from '@components/Button';
import { userStore } from '@store/UserStore';
import { db } from '@config/firebase';
import {
  doc,
  Timestamp,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { observer } from 'mobx-react-lite';
import { AuthDialog } from '@components/AuthDialog';

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
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isFetchingFavorite, setIsFetchingFavorite] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const datesEqual = startDate && endDate ? areDatesEqual({ startDate, endDate }) : false;

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const parsedDescription = parseDescription(description ?? '');
  const isTruncated = parsedDescription.toString().length > charLimit;

  // config/quires/index.ts
  const fetchFavorite = async () => {
    if (!user || !id) return;

    try {
      setIsFetchingFavorite(true);

      const favoriteRef = collection(db, 'favorites');
      const dbQuery = query(
        favoriteRef,
        where('userId', '==', user.uid),
        where('mediaId', '==', id)
      );
      const querySnapshot = await getDocs(dbQuery);

      if (!querySnapshot.empty) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    } catch (err) {
      console.error('Error fetchFavorite:', err);
    } finally {
      setIsFetchingFavorite(false);
    }
  };

  const handleAddFavorite = async () => {
    if (!user || !id) return;

    try {
      setIsSubscribing(true);

      const favoriteRef = collection(db, 'favorites');
      const dbQuery = query(
        favoriteRef,
        where('userId', '==', user.uid),
        where('mediaId', '==', id)
      );
      const querySnapshot = await getDocs(dbQuery);

      if (!querySnapshot.empty) {
        return;
      }

      await addDoc(favoriteRef, {
        title: title?.userPreferred ?? '',
        image: coverImage?.extraLarge ?? '',
        rating: meanScore ?? 0,
        createdAt: Timestamp.now(),
        userId: user.uid,
        mediaId: id,
      });

      setIsSubscribed(true);
    } catch (err) {
      console.error('Error handleAddFavorite:', err);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleRemoveFavorite = async () => {
    if (!user || !id) return;

    try {
      setIsSubscribing(true);

      const favoriteRef = collection(db, 'favorites');
      const dbQuery = query(
        favoriteRef,
        where('userId', '==', user.uid),
        where('mediaId', '==', id)
      );
      const querySnapshot = await getDocs(dbQuery);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(db, 'favorites', docId));
        setIsSubscribed(false);
      }
    } catch (err) {
      console.error('Error handleRemoveFavorite:', err);
    } finally {
      setIsSubscribing(false);
    }
  };

  useEffect(() => {
    fetchFavorite();

    if (!user) {
      setIsSubscribed(null);
    }
  }, [user, id]);

  const favoriteButtonText =
    isSubscribed === false || isSubscribed === null ? 'Add to favorites' : 'Remove from favorites';

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

          <Box sx={style.ratingContainer}>
            {meanScore && <Rating number={meanScore} sxStyle={style.rating} />}

            {!user && (
              <Button
                onClick={() => setDialogOpen(true)}
                sxStyle={style.subscribeButton}
                disabled={isSubscribing}
              >
                {favoriteButtonText}
              </Button>
            )}

            {isFetchingFavorite && <Skeleton sx={style.subscribeButtonSkeleton} />}

            {user && isSubscribed !== null && (
              <Button
                sxStyle={style.subscribeButton}
                onClick={isSubscribed === false ? handleAddFavorite : handleRemoveFavorite}
                disabled={isSubscribing}
              >
                {favoriteButtonText}
              </Button>
            )}
          </Box>
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

        <AuthDialog isOpen={isDialogOpen} handleClose={() => setDialogOpen(false)} />
      </Box>
    </>
  );
});

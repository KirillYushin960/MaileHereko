/* eslint-disable no-console */
import { EpisodeItem } from '@components/EpisodeItem';
import { GetSingleMediaQuery } from '@generated/types';
import { handleDateFormat, areDatesEqual, parseMediaStatus, parseDescription } from '@helpers';
import { MediaInfo } from '@ui/MediaInfo';
import { Rating } from '@ui/Rating';
import { Box, CircularProgress, Skeleton, Typography } from '@mui/material';
import { style } from './style';
import { ChangeEvent, useEffect, useState } from 'react';
import { mediaDescriptionCharLimit } from '@constants';
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
  orderBy,
} from 'firebase/firestore';
import { observer } from 'mobx-react-lite';
import { AuthDialog } from '@components/AuthDialog';
import { CommentItem } from '@types';
import { Comment } from '@components/Comment';
import { Textarea } from '@components/Textarea';
import { Element, Text, Descendant } from 'slate';

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
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const [comments, setComments] = useState<CommentItem[] | null>(null);
  const [isFetchingComments, setFetchingComments] = useState(false);

  const datesEqual = startDate && endDate ? areDatesEqual({ startDate, endDate }) : false;

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const parsedDescription = parseDescription(description ?? '');
  const isTruncated = parsedDescription.toString().length > mediaDescriptionCharLimit;

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

  const fetchComments = async () => {
    try {
      setFetchingComments(true);

      const commentRef = collection(db, 'comments');

      const dbQuery = query(commentRef, where('mediaId', '==', id), orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(dbQuery);

      const comments: CommentItem[] = querySnapshot.docs.map((doc) => ({
        commentId: doc.id,
        authorId: doc.data().authorId,
        authorImage: doc.data().authorImage,
        authorName: doc.data().authorName,
        createdAt: doc.data().createdAt,
        mediaId: doc.data().mediaId,
        text: doc.data().text,
        liked: doc.data().liked,
      }));

      setComments(comments);
    } catch (err) {
      console.error('Error fetchComments:', err);
    } finally {
      setFetchingComments(false);
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

    if (!comments) {
      fetchComments();
    }

    if (!user) {
      setIsSubscribed(null);
    }
  }, [user, id]);

  const favoriteButtonText =
    isSubscribed === false || isSubscribed === null ? 'Add to favorites' : 'Remove from favorites';

  const [inputValue, setInputValue] = useState('');

  const parseSlateContent = (content: string | Descendant[]): Descendant[] => {
    if (typeof content === 'string') {
      try {
        return JSON.parse(content);
      } catch {
        return [{ type: 'paragraph', children: [{ text: 'Parsing error' }] }];
      }
    }
    return content;
  };

  const isContentEmpty = (content: Descendant[]): boolean => {
    return content.every((node) => {
      if (Text.isText(node)) {
        return node.text.trim() === '';
      }

      if (Element.isElement(node)) {
        return isContentEmpty(node.children);
      }

      return true;
    });
  };

  const handleCommentSubmit = async () => {
    if (!user || !id) {
      setDialogOpen(true);
      return;
    }

    const parsedContent = parseSlateContent(inputValue);

    if (isContentEmpty(parsedContent)) {
      console.error('Field is empty');
      return;
    }

    try {
      const commentRef = collection(db, 'comments');
      await addDoc(commentRef, {
        authorId: user.uid,
        authorImage: user.photoURL || '',
        authorName: user.displayName || 'Anonymous',
        createdAt: Timestamp.now(),
        liked: [],
        mediaId: id,
        text: inputValue,
      });

      setInputValue('');
      fetchComments();
    } catch (err) {
      console.error('Error handleCommentSubmit:', err);
    }
  };

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
                  {parsedDescription.toString().slice(0, mediaDescriptionCharLimit - 100)}...
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
            <Typography variant="bodyRegular" sx={style.sectionHeader}>
              Streaming Episodes
            </Typography>

            <Box sx={style.episodesList}>
              {(showAllEpisodes ? streamingEpisodes : streamingEpisodes.slice(0, 6)).map(
                (episode, i) => (
                  <EpisodeItem key={i} episode={episode} />
                )
              )}
            </Box>

            {!showAllEpisodes && streamingEpisodes.length > 6 && (
              <Button sxStyle={style.showMoreEpisodes} onClick={() => setShowAllEpisodes(true)}>
                Show all episodes
              </Button>
            )}
          </Box>
        )}

        <Typography variant="bodyRegular" sx={style.sectionHeader}>
          Comments
        </Typography>

        <Textarea
          label="Write something..."
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log(inputValue);
            setInputValue(e.target.value);
          }}
          buttonClick={handleCommentSubmit}
        />

        {isFetchingComments && <CircularProgress sx={{ display: 'block', m: '20px auto' }} />}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '8px' }}>
          {comments?.length === 0 && (
            <Typography
              sx={{
                color: 'white',
                my: '12px',
                textAlign: 'center',
                typography: { xs: 'bodyRegular', sm: 'bodyLarge' },
              }}
            >
              There&nbsp;are&nbsp;no&nbsp;comments&nbsp;yet.
              Be&nbsp;the&nbsp;first&nbsp;to&nbsp;leave&nbsp;a&nbsp;comment!
            </Typography>
          )}

          {comments?.map((comment) => (
            <Comment key={comment.commentId} comment={comment} setDialogOpen={setDialogOpen} />
          ))}
        </Box>

        <AuthDialog isOpen={isDialogOpen} handleClose={() => setDialogOpen(false)} />
      </Box>
    </>
  );
});

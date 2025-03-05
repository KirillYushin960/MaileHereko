/* eslint-disable no-console */
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Box, Avatar, Typography, Skeleton } from '@mui/material';
import { CommentItem } from '@types';
import { formatLikes, getFormattedDate } from '@helpers';
import { mediaCommentCharLimit } from '@constants';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { userStore } from '@store/UserStore';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@config/firebase';
import { style } from './style';
import MenuIcon from '@mui/icons-material/Menu';
import { Descendant, Element, Text } from 'slate';

interface IComment {
  comment: CommentItem;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

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

export const Comment = ({ comment: initialComment, setDialogOpen }: IComment) => {
  const [showMore, setShowMore] = useState(false);
  const [localComment, setLocalComment] = useState({
    ...initialComment,
    text: parseSlateContent(initialComment.text),
  });
  const [revealedSpoilers, setRevealedSpoilers] = useState<Set<number>>(new Set());

  const { user } = userStore;

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'comments', initialComment.commentId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as CommentItem;
        setLocalComment({
          ...data,
          commentId: doc.id,
          createdAt: data.createdAt,
          text: parseSlateContent(data.text),
        });
      }
    });

    return () => unsubscribe();
  }, [initialComment.commentId]);

  const handleLike = async () => {
    if (!user) return;

    try {
      const commentRef = doc(db, 'comments', localComment.commentId);
      if (localComment.liked.includes(user.uid)) {
        await updateDoc(commentRef, { liked: arrayRemove(user.uid) });
      } else {
        await updateDoc(commentRef, { liked: arrayUnion(user.uid) });
      }
    } catch (err) {
      console.error('Error handleLike:', err);
    }
  };

  const handleSpoilerClick = (index: number) => {
    setRevealedSpoilers((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }

      return newSet;
    });
  };

  const renderLeaf = (child: Descendant) => {
    if (Text.isText(child)) {
      let element: React.ReactNode = child.text;
      if (child.bold) element = <strong>{element}</strong>;
      if (child.italic) element = <em>{element}</em>;
      if (child.underline) element = <u>{element}</u>;
      return element;
    }
    return null;
  };

  const renderElement = (element: Descendant, index: number) => {
    if (Element.isElement(element)) {
      if (element.type === 'spoiler') {
        const isRevealed = revealedSpoilers.has(index);

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '100%',
              lineHeight: 'normal',
              wordBreak: 'break-word',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.preventDefault();
              handleSpoilerClick(index);
            }}
          >
            {isRevealed ? (
              <span style={{ position: 'relative', zIndex: 1 }}>
                {element.children.map((child, i) => renderElement(child, i))}
              </span>
            ) : (
              <>
                <span style={{ visibility: 'hidden', height: 0 }}>
                  {element.children.map((child, i) => renderElement(child, i))}
                </span>
                <Skeleton
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(255, 255, 255, 0.16)',
                    transform: 'none',
                    '&::after': {
                      content: '"Spoiler"',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                    },
                  }}
                />
              </>
            )}
          </span>
        );
      }

      return (
        <div key={index}>
          {element.children.map((child, i) => (
            <span key={`${index}-${i}`}>{renderElement(child, i)}</span>
          ))}
        </div>
      );
    }
    return <span key={index}>{renderLeaf(element)}</span>;
  };

  const getTextLength = (content: Descendant[]): number => {
    return content.reduce((acc, element) => {
      if (Element.isElement(element)) {
        return acc + getTextLength(element.children);
      } else if (Text.isText(element)) {
        return acc + element.text.length;
      }
      return acc;
    }, 0);
  };

  const truncateContent = (content: Descendant[], limit: number): Descendant[] => {
    let length = 0;
    const result: Descendant[] = [];

    for (const element of content) {
      if (Element.isElement(element)) {
        const truncatedChildren = truncateContent(element.children, limit - length);
        if (truncatedChildren.length > 0) {
          result.push({ ...element, children: truncatedChildren });
          length += getTextLength(truncatedChildren);
        }
      } else if (Text.isText(element)) {
        const text = element.text.slice(0, limit - length);
        if (text.length > 0) {
          result.push({ ...element, text });
          length += text.length;
        }
      }
      if (length >= limit) break;
    }

    return result;
  };

  const renderedContent = showMore
    ? localComment.text
    : truncateContent(localComment.text, mediaCommentCharLimit);
  const isTruncated = getTextLength(localComment.text) > mediaCommentCharLimit;

  return (
    <Box sx={style.container}>
      <Box sx={style.header}>
        <Avatar sx={style.avatar} src={localComment.authorImage} />
        <Box sx={style.headerSection}>
          <Typography variant="bodyLarge" sx={style.authorName}>
            {localComment.authorName}
          </Typography>
          <Typography variant="bodySmall" sx={style.date}>
            {getFormattedDate(localComment.createdAt.seconds)}
          </Typography>
        </Box>
        {user?.uid === localComment.authorId && (
          <MenuIcon sx={{ color: 'white', ml: 'auto', mr: '16px' }} />
        )}
      </Box>

      <Box>
        <Typography variant="bodyRegular" sx={style.text}>
          {renderedContent.map((element, index) => renderElement(element, index))}
          {isTruncated && !showMore && (
            <Box component="span" onClick={() => setShowMore(true)} sx={style.showMore}>
              show more
            </Box>
          )}
        </Typography>
      </Box>

      <Box
        sx={style.likeContainer(!!user && localComment.liked.includes(user.uid))}
        onClick={user ? handleLike : () => setDialogOpen(true)}
      >
        {localComment.liked.length > 0 && (
          <Typography
            variant="bodyRegular"
            sx={style.likesCount(!!user && localComment.liked.includes(user.uid))}
          >
            {formatLikes(localComment.liked.length)}
          </Typography>
        )}
        {user && localComment.liked.includes(user.uid) ? (
          <FavoriteIcon sx={style.likeIcon(true)} />
        ) : (
          <FavoriteBorderIcon sx={style.likeIcon(false)} />
        )}
      </Box>
    </Box>
  );
};

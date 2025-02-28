import { useState, useRef, useEffect } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { CommentItem } from '@types';
import { getFormattedDate } from '@helpers';

interface IComment {
  comment: CommentItem;
}

export const Comment = ({ comment }: IComment) => {
  const [showMore, setShowMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkClamp = () => {
      if (textRef.current) {
        const element = textRef.current;
        setIsClamped(element.scrollHeight > element.clientHeight);
      }
    };

    checkClamp();
    window.addEventListener('resize', checkClamp);
    return () => window.removeEventListener('resize', checkClamp);
  }, [comment.text]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        position: 'relative',
        backgroundColor: '#121829',
        p: '16px',
        borderRadius: '8px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <Avatar
          sx={{ height: { xs: '40px', sm: '60px' }, width: { xs: '40px', sm: '60px' } }}
          src={comment.authorImage}
        />

        <Typography variant="bodyLarge" sx={{ color: 'white', fontWeight: 600 }}>
          {comment.authorName}
        </Typography>
      </Box>

      <Box>
        <Typography
          ref={textRef}
          variant="bodyRegular"
          sx={{
            color: '#C3C8D4',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordBreak: 'break-word',
            WebkitLineClamp: showMore
              ? 'unset'
              : {
                  xs: 8,
                  sm: 4,
                },
            whiteSpace: 'pre-wrap',
          }}
        >
          {comment.text}
        </Typography>

        {isClamped && !showMore && (
          <Box
            component="span"
            onClick={() => setShowMore(true)}
            sx={{
              color: 'lightblue',
              cursor: 'pointer',
            }}
          >
            show more
          </Box>
        )}
      </Box>

      <Typography variant="bodySmall" sx={{ color: 'white' }}>
        {getFormattedDate(comment.createdAt.seconds)}
      </Typography>
    </Box>
  );
};

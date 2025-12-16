import { SxProps, Theme } from '@mui/material';
import { theme } from '@theme';

interface StyleProps {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  avatar: SxProps<Theme>;
  headerSection: SxProps<Theme>;
  authorName: SxProps<Theme>;
  date: SxProps<Theme>;
  text: SxProps<Theme>;
  showMore: SxProps<Theme>;
  likeContainer: (likedByUser: boolean | null) => SxProps<Theme>;
  likesCount: (likedByUser: boolean | null) => SxProps<Theme>;
  likeIcon: (likedByUser: boolean | null) => SxProps<Theme>;
  menuIcon: SxProps<Theme>;
}

export const style: StyleProps = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'relative',
    backgroundColor: theme.palette.customBlack[20],
    p: '16px',
    borderRadius: '8px',
  },

  header: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', mb: '8px' },

  avatar: { height: { xs: '40px', sm: '60px' }, width: { xs: '40px', sm: '60px' } },

  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  authorName: { color: theme.palette.customGray[50] },

  date: { color: theme.palette.customGray[400], mr: '12px' },

  text: { color: theme.palette.customGray[200], wordBreak: 'break-word' },

  showMore: {
    color: theme.palette.customGray[50],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.customGray[100],
    },
    ml: '4px',
  },

  likeContainer: (likedByUser) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    backgroundColor: likedByUser ? theme.palette.error.light : 'transparent',
    minWidth: '60px',
    height: '40px',
    borderRadius: '8px',
    p: '8px 12px',
    cursor: 'pointer',
    width: 'fit-content',
    transition: 'background-color 0.3s ease',
  }),

  likesCount: (likedByUser) => ({
    color: likedByUser ? theme.palette.customGray[50] : theme.palette.customGray[200],
    transition: 'color 0.3s ease',
  }),

  likeIcon: (likedByUser) => ({
    height: '20px',
    width: '20px',
    mb: '3px',
    color: likedByUser ? theme.palette.customGray[50] : theme.palette.customGray[200],
    transition: 'transform 0.2s ease, color 0.3s ease',
  }),

  menuIcon: { color: 'white', ml: 'auto', mr: '16px' },
};

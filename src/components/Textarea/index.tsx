import { useState, useMemo, useCallback, ChangeEvent } from 'react';
import { createEditor, Editor, Transforms, Element as SlateElement, Descendant } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import {
  Box,
  SxProps,
  Theme,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { style } from './style';
import { Button } from '@components/Button';

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor;
    Element: {
      type: string;
      children: Descendant[];
      [key: string]: unknown;
    };
    Text: {
      text: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      [key: string]: unknown;
    };
  }
}

type MarkFormat = 'bold' | 'italic' | 'underline';

interface ITextarea {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  sxStyle?: SxProps<Theme>;
  buttonClick: () => void;
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const Textarea = ({ value, onChange, label, buttonClick, sxStyle }: ITextarea) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [slateValue, setSlateValue] = useState(() => {
    try {
      return value ? JSON.parse(value) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const handleChange = (newValue: Descendant[]) => {
    setSlateValue(newValue);
    onChange({
      target: { value: JSON.stringify(newValue) },
    } as ChangeEvent<HTMLInputElement>);
  };

  const renderElement = useCallback(
    (props: RenderElementProps) => {
      const { element, children, attributes } = props;

      if (element.type === 'spoiler') {
        return (
          <span
            {...attributes}
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '100%',
              lineHeight: 'normal',
              wordBreak: 'break-word',
            }}
            onClick={(e) => {
              e.preventDefault();
              const path = ReactEditor.findPath(editor, element);
              Transforms.setNodes(editor, { revealed: !element.revealed }, { at: path });
            }}
          >
            {element.revealed ? (
              children
            ) : (
              <>
                <span
                  style={{
                    visibility: 'hidden',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    display: 'block',
                    position: 'relative',
                  }}
                >
                  {children}
                </span>
                <Skeleton
                  sx={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.16)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    transform: 'none',
                    cursor: 'pointer',
                  }}
                />
              </>
            )}
          </span>
        );
      }

      return <p {...attributes}>{children}</p>;
    },
    [editor]
  );

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    const { leaf, children, attributes } = props;
    let element = children;
    if (leaf.bold) element = <strong>{element}</strong>;
    if (leaf.italic) element = <em>{element}</em>;
    if (leaf.underline) element = <u>{element}</u>;
    return <span {...attributes}>{element}</span>;
  }, []);

  return (
    <Box
      sx={() => ({
        ...style.inputBox,
        ...sxStyle,
      })}
    >
      <Slate editor={editor} initialValue={slateValue} onChange={handleChange}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{
            minHeight: '100px',
            padding: '24px 16px 8px',
            width: '100%',
            outline: 'none',
            color: 'white',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            marginTop: '8px',
          }}
          placeholder={label}
        />
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: '100%', my: '8px' }} />
        <FormattingToolbar buttonClick={buttonClick} />
      </Slate>
    </Box>
  );
};

interface IFormattingToolbar {
  buttonClick: () => void;
}

const FormattingToolbar = ({ buttonClick }: IFormattingToolbar) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, 'spoiler');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: { xs: 'column', sm: 'row', gap: '8px' },
      }}
    >
      <ToggleButtonGroup
        sx={{
          border: '1px solid rgba(255,255,255,0.2)',
          width: 'fit-content',
          '&& .Mui-selected': { backgroundColor: 'gray', color: 'white' },
        }}
      >
        <MarkButton format="bold" icon={<FormatBoldIcon />} />
        <MarkButton format="italic" icon={<FormatItalicIcon />} />
        <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
        <ToggleButton
          value="spoiler"
          selected={isActive}
          onMouseDown={(e) => {
            e.preventDefault();
            if (isActive) {
              Transforms.unwrapNodes(editor, {
                match: (n) => SlateElement.isElement(n) && n.type === 'spoiler',
                split: true,
              });
            } else {
              Transforms.wrapNodes(
                editor,
                { type: 'spoiler', revealed: false, children: [] },
                { split: true }
              );
            }
          }}
          sx={{
            color: 'white',
            backgroundColor: 'transparent',
            '&&&:hover': {
              backgroundColor: 'darkgray',
            },
            '&&.Mui-selected': {
              backgroundColor: 'gray',
            },
          }}
        >
          <VisibilityOffIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      <Button onClick={buttonClick} sxStyle={{ height: '32px' }}>
        Comment
      </Button>
    </Box>
  );
};

const MarkButton = ({ format, icon }: { format: MarkFormat; icon: React.ReactNode }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <ToggleButton
      value={format}
      selected={isActive}
      onMouseDown={(e: React.MouseEvent) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
      sx={{
        color: 'white',
        backgroundColor: 'transparent',
        '&&&:hover': {
          backgroundColor: 'darkgray',
        },
        '&&.Mui-selected': {
          backgroundColor: 'gray',
        },
      }}
    >
      {icon}
    </ToggleButton>
  );
};

const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
};

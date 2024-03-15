import React from 'react';
import ReactMarkdown from 'react-markdown';

const ColoredMessage = ({ text }) => {
  return (
    <ReactMarkdown
      source={text}
      renderers={{
        text: ({ value }) => <span style={{ color: value }}> </span>,
        paragraph: 'span',
        emphasis: 'span',
        strong: 'span',
        link: 'span',
        linkReference: 'span',
        break: 'br',
        thematicBreak: 'hr',
        delete: 'del',
        inlineCode: 'code',
        blockquote: 'blockquote',
        root: 'div'
      }}
    />
  );
};

export default ColoredMessage;

import React, { useState } from 'react';

import * as S from '@/components/Molecules/TextAreaEditer/index.styles';
import TextArea, { TextAreaTypes } from '@/components/Atoms/TextArea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TextAreaEditer = ({ edit, textAreaValue, setTextAreaValue }: TextAreaTypes) => {
  const [editerMode, setEditerMode] = useState<'Write' | 'Preview'>('Write');

  return (
    <S.Editer>
      <S.EditerNavButtons editerMode={editerMode}>
        <button type="button" className="write_button" onClick={() => setEditerMode('Write')}>
          Write
        </button>
        <button type="button" className="preview_button" onClick={() => setEditerMode('Preview')}>
          Preview
        </button>
      </S.EditerNavButtons>
      <S.EditerTextAreaWrapper>
        {editerMode === 'Write' && (
          <TextArea edit={edit} textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue} />
        )}
        {editerMode === 'Preview' && (
          <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
            {textAreaValue}
          </ReactMarkdown>
        )}
      </S.EditerTextAreaWrapper>
    </S.Editer>
  );
};

export default TextAreaEditer;

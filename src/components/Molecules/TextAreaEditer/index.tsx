import { useState } from 'react';

import * as S from '@/components/Molecules/TextAreaEditer/index.styles';
import TextArea from '@/components/Atoms/TextArea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TextAreaTypes {
  textAreaValue?: string;
}

const TextAreaEditer = ({ textAreaValue }: TextAreaTypes) => {
  const [editerMode, setEditerMode] = useState<'Write' | 'Preview'>('Write');
  const [areaValue, setAreaValue] = useState<string>(textAreaValue || '');

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
        {editerMode === 'Write' && <TextArea textAreaValue={areaValue} setAreaValue={setAreaValue} />}
        {editerMode === 'Preview' && (
          <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
            {areaValue}
          </ReactMarkdown>
        )}
      </S.EditerTextAreaWrapper>
    </S.Editer>
  );
};

export default TextAreaEditer;

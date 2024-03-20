import MonacoEditor, {OnMount} from '@monaco-editor/react';
import debounce from 'lodash/debounce';

export interface CodeInputProps {
  code: string;
  language: string;
  onChange: (newValue?: string) => void;
  onSelectionChange?: (newSelection: string) => void;
  returnEditorReference: (ref: any) => void;
}

const CodeInput = ({code, language, onChange, onSelectionChange, returnEditorReference}: CodeInputProps) => {
  const editorDidMount: OnMount = (editorInstance) => {
    editorInstance.focus();
    returnEditorReference(editorInstance);
    const debouncedSelectionChange = debounce((selection: any) => {
      const model = editorInstance.getModel();
      if (model && onSelectionChange) {
        const selectedText = model.getValueInRange(selection);
        const regex = /^[a-zA-Z0-9_]+$/;
        if (selectedText.trim().length > 0 && regex.test(selectedText) && selectedText !== code) {
          onSelectionChange(selectedText);
        }
      }
    }, 300); // Debounce delay of 300 milliseconds

    editorInstance.onDidChangeCursorSelection(({selection}) => {
      debouncedSelectionChange(selection);
    });
  };

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <MonacoEditor
        height="20rem"
        width="90%"
        language={language}
        theme="vs-dark"
        value={code}
        options={{
          selectOnLineNumbers: true,
        }}
        onChange={onChange}
        onMount={editorDidMount}
      />

      <span style={{paddingTop: '15px'}}>Detected language: {language}</span>
    </div>
  );
};

export default CodeInput;

import MonacoEditor, {OnMount} from '@monaco-editor/react';
import debounce from 'lodash/debounce';

export interface CodeInputProps {
    code: string;
    language: string;
    onChange: (newValue?: string) => void;
    onSelectionChange?: (newSelection: string) => void;
}

const CodeInput = ({code, language, onChange, onSelectionChange}: CodeInputProps): JSX.Element => {
    const editorDidMount: OnMount = (editorInstance) => {
        editorInstance.focus();
        const debouncedSelectionChange = debounce((selection: any) => {
            const model = editorInstance.getModel();
            if (model && onSelectionChange) {
                const selectedText = model.getValueInRange(selection);
                if (selectedText.trim().length > 0) {
                    onSelectionChange(selectedText);
                }
            }
        }, 300); // Debounce delay of 300 milliseconds

        editorInstance.onDidChangeCursorSelection(({selection}) => {
            debouncedSelectionChange(selection);
        });
    };

    return (
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
    );
};

export default CodeInput;

import MonacoEditor from '@monaco-editor/react';

export interface CodeInputProps {
    code: string;
    language: string;
    onChange: (newValue?: string) => void;
}
const CodeInput = ({ code, language, onChange }: CodeInputProps) : JSX.Element => {
    const editorDidMount = (editor: any) => {
        editor.focus();
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

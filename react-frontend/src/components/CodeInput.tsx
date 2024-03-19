import React from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';

export interface CodeInputProps {
    code: string;
    language: string;
    onChange: (newValue?: string) => void;
    onLanguageChange: (newValue?: string) => void;
}
const CodeInput = ({ code, language, onChange, onLanguageChange }: CodeInputProps) : JSX.Element => {
    const editorDidMount = (editor: any) => {
        editor.focus();
    };

    const changeLanguage = (newLanguage: string) => {
        onLanguageChange(newLanguage); // A function provided by the parent to update the language state
    };

    return (
        <div>
            <MonacoEditor
                height="20rem"
                width="50rem"
                language={language}
                theme="vs-dark"
                value={code}
                options={{
                    selectOnLineNumbers: true,
                }}
                onChange={onChange}
                onMount={editorDidMount}
            />
            <button onClick={() => changeLanguage('javascript')}>JS</button>
            <button onClick={() => changeLanguage('python')}>Python</button>
            {/* Add more buttons for languages as needed */}
        </div>
    );
};

export default CodeInput;

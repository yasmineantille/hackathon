import React from 'react';
import { DiffEditor } from '@monaco-editor/react';

interface DiffViewerProps {
    original: string;
    modified: string;
    language: string;
    renderSideBySide?: boolean;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified, renderSideBySide = false, language }) => {
    return (
        <DiffEditor
            height="20rem"
            width="90%"
            language={language}
            theme="vs-dark"
            original={original}
            modified={modified}
            options={{
                renderSideBySide,
                readOnly: true
            }}
        />
    );
};

export default DiffViewer;

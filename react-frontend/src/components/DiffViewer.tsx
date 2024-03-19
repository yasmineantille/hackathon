import React from 'react';
import { DiffEditor } from '@monaco-editor/react';

interface DiffViewerProps {
    original: string;
    modified: string;
    renderSideBySide?: boolean;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified, renderSideBySide = false }) => {
    return (
        <DiffEditor
            height="20rem"
            width="90%"
            language="javascript"
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

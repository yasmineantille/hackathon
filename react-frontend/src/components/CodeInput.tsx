import {useRef, useState} from 'react';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Button from "../shared/Button.tsx";
import remoteService from '../services/RemoteService.tsx';

const CodeInput = () => {
    const [code, setCode] = useState('');
    const codeRef = useRef(null);
    if (codeRef.current) {
        console.log((codeRef.current! as HTMLInputElement).value)
    }

    function handleSubmit() {
        remoteService.post('/review/', code);
    }

    return (
        <>
            <div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Insert your code here..."
                style={{width: '100%', height: '150px'}}
                ref={codeRef}
            ></textarea>
                <div style={{marginTop: '20px'}}>
                    <SyntaxHighlighter language="java" style={docco}>
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
            <Button onClick={handleSubmit}>Submit</Button></>
    );
};

export default CodeInput;

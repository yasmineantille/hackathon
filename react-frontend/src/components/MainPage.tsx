import styled from 'styled-components';
import {useState} from 'react';
import FileUploader from './FileUploader.tsx';
import CodeInput from './CodeInput.tsx';
import Button from "../shared/Button.tsx";
import remoteService from "../services/RemoteService.tsx";
import DiffViewer from "./DiffViewer.tsx";

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function MainPage() {
    const [code, setCode] = useState('function add(a, b) { return a + b; }');
    const [newCode, setNewCode] = useState('');
    const [language, setLanguage] = useState('javascript');

    const handleOnCodeChange = (value?: string) => {
        if (value) {
            setCode(value);
        }
        console.log(code);
    };

    const changeLanguage = (newLanguage: string) => {
        setLanguage(newLanguage); // A function provided by the parent to update the language state
    };

    const handleFileUploaded = (content: string | undefined | null) => {
        if (content) {
            setCode(content);
        }
    };

    const handleOnPreview = () => {

    }

    const handleOnSubmit = () => {
        remoteService.post<{ review: string }>('/review', code).then((reviewDto) => {
            console.log(reviewDto.review);
            setNewCode(extractCodeBlock(reviewDto.review) ?? '');
        })
    }

    const extractCodeBlock = (input: string): string | null => {
        const regex = /```(.*?)```/s;
        const match = input.match(regex);

        return match ? match[1] : null;
    }


    return (
        <Section>
            <CodeInput
                code={code}
                language={language}
                onChange={handleOnCodeChange}
            ></CodeInput>
            <FileUploader handleFileUploaded={handleFileUploaded}/>
            <div>
                <button onClick={() => changeLanguage('javascript')}>JS</button>
                <button onClick={() => changeLanguage('python')}>Python</button>
            </div>
            <br/>
            <div>
                <Button onClick={handleOnPreview}>Preview</Button>
                <Button onClick={handleOnSubmit}>Submit</Button>
            </div>
            <br/>
            <DiffViewer original={code} modified={newCode}></DiffViewer>
        </Section>
    );
}

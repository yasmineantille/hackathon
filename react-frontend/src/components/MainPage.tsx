import styled from 'styled-components';
import {useEffect, useState} from 'react';
import FileUploader from './FileUploader.tsx';
import CodeInput from './CodeInput.tsx';
import Button from "../shared/Button.tsx";
import remoteService from "../services/RemoteService.tsx";
import DiffViewer from "./DiffViewer.tsx";
import Review from "./Review.tsx";
import hljs from "highlight.js";

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export interface CodeRequestDto {
    codeSnippet: string;
    ruleSet: string;
}

export interface CodeResponse {
    code: string;
}

export interface ReviewResponse {
    review: string;
}

export default function MainPage() {
    const [code, setCode] = useState('function add(a, b) { return a + b; }');
    const [previewCode, setPreviewCode] = useState('');
    const [reviewedCode, setReviewedCode] = useState('')
    const [language, setLanguage] = useState('javascript');
    const [comments, setComments] = useState('');
    const [isPreview, setIsPreview] = useState(true);

    useEffect(() => {
        const map = localStorage.getItem('substitutionMap');
        const defaultMap = {
            Dan: 'Programmer0',
            Yasmine: 'Programmer1',
            Cedrik: 'Programmer2'
        };
        if (!map) {
            localStorage.setItem('substitutionMap', JSON.stringify(defaultMap));
        }
    }, []);
    const handleOnCodeChange = (value?: string) => {
        if (value) {
            setCode(value);
            detectLanguage(value);
        }
    };

    const detectLanguage = (codeSnippet: string) => {
        const language = hljs.highlightAuto(codeSnippet).language;
        if (language) {
            setLanguage(language);
        }
    }


    const changeLanguage = (newLanguage: string) => {
        setLanguage(newLanguage); // A function provided by the parent to update the language state
    };

    const handleFileUploaded = (content: string | undefined | null) => {
        if (content) {
            setCode(content);
        }
    };

    const handleOnSubmit = () => {
        remoteService.post<ReviewResponse>('/review', {
            codeSnippet: previewCode,
            ruleSet: localStorage.getItem('substitutionMap')
        } as CodeRequestDto).then((response) => {
            setComments(extractAdditionalComments(response.review) ?? '');
            setReviewedCode(extractCodeBlockAndSetLanguage(response.review) ?? '');
            setIsPreview(false);
        });
    }

    const handleOnPreview = () => {
        remoteService.post<CodeResponse>('/sanitize', {
            codeSnippet: code,
            ruleSet: localStorage.getItem('substitutionMap')
        } as CodeRequestDto).then((response) => {
            setPreviewCode(response.code);
            setIsPreview(true);
        })
    }

    const extractCodeBlockAndSetLanguage = (input: string): string | null => {
        const regex = /```(.*?)```/s;
        const match = input.match(regex);
        let code = null;
        if (match) {
            const seperatedCode = match[1].split('\n');
            setLanguage(seperatedCode.shift() ?? '');
            code = seperatedCode.join('\n')
        }
        return code;
    }

    const extractAdditionalComments = (input: string): string | null => {
        const regex = /```.*?```(.*)/s;
        const match = input.match(regex);

        return match ? match[1] : null;
    }


    function getPreview() {
        return <><DiffViewer original={code} modified={previewCode}></DiffViewer>
            <br/>
            <Button onClick={handleOnSubmit}>Submit</Button></>;
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
            <Button onClick={handleOnPreview}>Preview</Button>
            <br/>
            {isPreview && previewCode.length > 0 && getPreview()}
            {!isPreview && previewCode.length > 0 &&
                <Review originalCode={code} reviewedCode={reviewedCode} additionalComments={comments}></Review>}
        </Section>
    );
}

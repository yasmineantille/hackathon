import styled from 'styled-components';
import {useEffect, useState} from 'react';
import FileUploader from './FileUploader.tsx';
import CodeInput from './CodeInput.tsx';
import Button from '../shared/Button.tsx';
import remoteService from '../services/RemoteService.tsx';
import DiffViewer from './DiffViewer.tsx';
import Review from './Review.tsx';
import {SyncLoader} from 'react-spinners';
import hljs from 'highlight.js';
import SelectionPopup from './SelectionPopup.tsx';
import {presentSuccessToast} from '../shared/ToastComponent.tsx';
import Markdown from 'react-markdown';
import {editor} from 'monaco-editor';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0.5rem 1.5rem 0.5rem;
    background-color: rgba(165, 165, 165, 0);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 1.5rem;
    background-color: white;
`;

export const SubSectionTitle = styled.h1`
    font-size: 20px;
    margin-bottom: 10px;
`;

export const LoadingTitle = styled.h1`
    font-size: 40px;
    margin-right: 25px;
    color: white;
`;

export const LoadingSpinnerSection = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
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

export interface SubstitutionJSON {
    [key: string]: string;
}

export default function MainPage() {
    const [code, setCode] = useState('function add(a, b) { return a + b; }');
    const [previewCode, setPreviewCode] = useState('');
    const [reviewedCode, setReviewedCode] = useState('')
    const [language, setLanguage] = useState('javascript');
    const [comments, setComments] = useState('');
    const [isPreview, setIsPreview] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCode, setSelectedCode] = useState('');
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editorReference, setEditorReference] = useState<editor.IStandaloneCodeEditor>();

    useEffect(() => {
        const map = localStorage.getItem('substitutionMap');
        const defaultMap = {
            SBB: 'CompanyA',
            Zuehlke: 'CompanyZ',
            Zuhlke: 'CompanyZ'
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
        let language = hljs.highlightAuto(codeSnippet, ['java', 'javascript', 'c++']).language;
        if (language) {
            // if (language == 'typescript'){
            //     language = 'java';
            // }
            setLanguage(language);
        }
    }

    const handleFileUploaded = (content: string | undefined | null) => {
        if (content) {
            setCode(content);
        }
    };

    const handleOnSubmit = () => {
        setIsLoading(true);
        remoteService.post<ReviewResponse>('/review', {
            codeSnippet: previewCode,
            ruleSet: localStorage.getItem('substitutionMap')
        } as CodeRequestDto).then((response) => {
            setComments(extractAdditionalComments(response.review) ?? '');
            setReviewedCode(extractCodeBlockAndSetLanguage(response.review) ?? '');
            setIsPreview(false);
        })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleOnPreview = () => {
        setIsLoadingPreview(true);
        remoteService.post<CodeResponse>('/sanitize', {
            codeSnippet: code,
            ruleSet: localStorage.getItem('substitutionMap')
        } as CodeRequestDto).then((response) => {
            setPreviewCode(response.code);
            setIsPreview(true);
        })
            .finally(() => {
                setTimeout(() => {
                    setIsLoadingPreview(false);
                }, 500);
            });
    }

    const closePopup = () => {
        setShowPopup(false);
        editorReference?.focus();
    }

    const handleSelectionChange = (selection: string): void => {
        setSelectedCode(selection);
        setShowPopup(true);
    }

    const saveNewSubstitution = (key: string, value: string): void => {
        modifyAndSaveSubstitution(key, value);
        setShowPopup(false);
    }

    const modifyAndSaveSubstitution = (key: string, value: string): void => {
        const substitutionString = localStorage.getItem('substitutionMap');
        let substitutionJson: SubstitutionJSON = {};
        if (substitutionString) {
            substitutionJson = JSON.parse(substitutionString);
        }
        substitutionJson[key] = value;
        localStorage.setItem('substitutionMap', JSON.stringify(substitutionJson));
        presentSuccessToast("Added substitution!", 1000);
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
        return <Section>
            <SubSectionTitle>Preview of Code You Want Reviewed</SubSectionTitle>
            <DiffViewer original={code} modified={previewCode} language={language}></DiffViewer>
            <br/>
            <Button onClick={handleOnSubmit}>Submit</Button></Section>;
    }

    const editorReferenceReturned = (reference: editor.IStandaloneCodeEditor) => {
        setEditorReference(reference);
    }

    return (
        <>
            <Section>
                <SubSectionTitle>Your Friendly Neighbourhood Code Reviewer</SubSectionTitle>
                <CodeInput
                    code={code}
                    language={language}
                    onChange={handleOnCodeChange}
                    onSelectionChange={handleSelectionChange}
                    returnEditorReference={editorReferenceReturned}
                ></CodeInput>
                {showPopup && (
                    <SelectionPopup
                        initialKey={selectedCode}
                        onClose={closePopup}
                        onSave={saveNewSubstitution}
                    />
                )}
                <FileUploader handleFileUploaded={handleFileUploaded}/>
                <br/>
                <Button onClick={handleOnPreview}>Preview</Button>
            </Section>
            {isLoadingPreview ? (
                <LoadingSpinnerSection>
                    <LoadingTitle>Loading</LoadingTitle>
                    <SyncLoader color="white"></SyncLoader>
                </LoadingSpinnerSection>
            ) : (isPreview && previewCode.length > 0 && getPreview())}
            {isLoading ? (
                <LoadingSpinnerSection>
                    <LoadingTitle>Reviewing your Code</LoadingTitle>
                    <SyncLoader color="white"></SyncLoader>
                </LoadingSpinnerSection>
            ) : (
                !isPreview && previewCode.length > 0 && (
                    <><Section>
                        <SubSectionTitle>Code Review</SubSectionTitle>
                        <Review originalCode={code} reviewedCode={reviewedCode} language={language}/>
                    </Section>
                        <Section>
                            <SubSectionTitle>Additional Review Comments</SubSectionTitle>
                            <Markdown>{comments}</Markdown>
                        </Section>
                    </>
                )
            )}
        </>
    );
}

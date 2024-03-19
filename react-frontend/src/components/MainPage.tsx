import styled from 'styled-components';
import {useState} from 'react';
import FileUploader from './FileUploader.tsx';
import CodeInput from "./CodeInput.tsx";

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function MainPage() {

    const handleFileUploaded = (content: string | ArrayBuffer | undefined | null) => {
      console.log("file upld ", content);
    }
    const [code, setCode] = useState("function add(a, b) { return a + b; }");
    const [language, setLanguage] = useState("javascript")

    const handleOnCodeChange = (value?: string) => {
        if (value) {
            setCode(value);
        }
        console.log(code);
    }

    const handleOnLanguageChange = (value?: string) => {
        if (value) {
            setLanguage(value);
        }
    }


    return (
        <Section>
            <CodeInput
                code={code}
                language={language}
                onChange={handleOnCodeChange}
                onLanguageChange={handleOnLanguageChange}
            ></CodeInput>

            <FileUploader handleFileUploaded={handleFileUploaded}/>
        </Section>
    );
}

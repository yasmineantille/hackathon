import styled from 'styled-components';
import {useState} from 'react';
import CodeInput from "./CodeInput.tsx";

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function MainPage() {
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
        </Section>
    );
}

import styled from 'styled-components';
import remoteService from '../services/RemoteService.tsx';
import {useEffect, useState} from 'react';
import {ExampleDto, MessageOfTheDayDto} from '../shared/model.tsx';
import CodeInput from "./CodeInput.tsx";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExampleTitle = styled.h3`
  font-size: 3rem;
  margin-bottom: 0;
  color: var(--secondary);
  padding-bottom: 4%;
`;

const ExampleSubTitle = styled.h4`
  font-size: 3rem;
  margin-bottom: 0;
  color: var(--tertiary);
  padding-bottom: 2%;
`;

export default function MainPage() {
    const [example, setExample] = useState<ExampleDto | undefined>(undefined);

    const [motd, setMotd] = useState<MessageOfTheDayDto | undefined>(undefined);

    function loadData() {
        loadExample();
        loadMessageOfTheDay();
    }

    useEffect(() => {
    }, []);

    function loadExample() {
        setExample(undefined);
        remoteService.get<ExampleDto>('/example/').then((response: ExampleDto) => {
            console.log(response);
            setExample(response);
        });
    }

    function loadMessageOfTheDay() {
        setMotd(undefined);
        remoteService.get<MessageOfTheDayDto>('/example/motd').then((response: MessageOfTheDayDto) => {
            console.log(response);
            setMotd(response);
        });
    }

    return (
        <Section>
            <CodeInput></CodeInput>
        </Section>
    );
}

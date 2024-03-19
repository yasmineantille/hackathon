import {ChangeEvent} from 'react';
import {Section} from './MainPage.tsx';

export interface FileUploaderProps {
  handleFileUploaded: (content: string | undefined | null) => void;
}

export default function FileUploader({handleFileUploaded}: FileUploaderProps) {

  const handleFileRead = (content: string | ArrayBuffer | null) => {
    if (content) {
      if (typeof content === 'string') {
        handleFileUploaded(content);
      } else if (typeof content === typeof ArrayBuffer) {
        const decoder = new TextDecoder();
        const str = decoder.decode(content);
        handleFileUploaded(str);
      }
    }
  };

  const onInputChange = (ev: ChangeEvent) => {
    const uploadedFiles = (ev.nativeEvent.target as HTMLInputElement).files;

    if (uploadedFiles) {
      const fileContents = uploadedFiles.item(0);

      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => handleFileRead(reader.result),
        false,
      );

      if (fileContents) {
        //reader.readAsArrayBuffer(fileContents);
        reader.readAsText(fileContents);
      }
    }
  };

  return (
    <Section>
      <input type="file" name="file" accept="text/plain, application/javascript" onChange={onInputChange}/>
    </Section>
  );

}
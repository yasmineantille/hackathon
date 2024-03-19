import {ChangeEvent} from 'react';
import {Section} from './MainPage.tsx';

export interface FileUploaderProps {
  handleFileUploaded: (content: string | ArrayBuffer | undefined | null) => void;
}

export default function FileUploader({handleFileUploaded}: FileUploaderProps) {
  const onInputChange = (ev: ChangeEvent) => {
    const uploadedFiles = (ev.nativeEvent.target as HTMLInputElement).files;

    if (uploadedFiles) {
      const fileContents = uploadedFiles.item(0);

      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => handleFileUploaded(reader.result),
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
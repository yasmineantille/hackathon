import {ChangeEvent} from 'react';
import {Section} from './MainPage.tsx';
import remoteService from '../services/RemoteService.tsx';

export default function FileUploader() {
  const onInputChange = (ev: ChangeEvent) => {
    const uploadedFiles= (ev.nativeEvent.target as HTMLInputElement).files;

    if (uploadedFiles) {
      const fileContents = uploadedFiles.item(0);

      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => remoteService.post('upload', {fileContents: reader.result}),
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
      <form>
        <input type="file" name="file" accept="text/plain, application/javascript" onChange={onInputChange}/>
        <button type="submit">Upload</button>
      </form>

    </Section>
  );

}
import DiffViewer from "./DiffViewer.tsx";

export interface ReviewProps {
    originalCode: string;
    reviewedCode: string;
    language: string;
}

const Review = ({originalCode, reviewedCode, language}: ReviewProps) => {

    return (
        <>
            <DiffViewer
                original={originalCode}
                modified={reviewedCode}
                language={language}
            ></DiffViewer>
        </>);
}

export default Review;
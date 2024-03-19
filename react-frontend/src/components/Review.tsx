import DiffViewer from "./DiffViewer.tsx";

export interface ReviewProps {
    originalCode: string;
    reviewedCode: string;
}

const Review = ({originalCode, reviewedCode}: ReviewProps) => {
    return (
        <>
            <DiffViewer
                original={originalCode}
                modified={reviewedCode}
            ></DiffViewer>
        </>);
}

export default Review;
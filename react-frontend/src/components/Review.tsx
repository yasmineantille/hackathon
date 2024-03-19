import DiffViewer from "./DiffViewer.tsx";

export interface ReviewProps {
    originalCode: string;
    reviewedCode: string;
    additionalComments: string;
}

const Review = ({originalCode, reviewedCode, additionalComments}: ReviewProps) => {
    const commentsStyle = {
        paddingTop: '1rem',
        width: '90%',

    }
    return (
        <>
            <DiffViewer
                original={originalCode}
                modified={reviewedCode}
            ></DiffViewer>
            <div style={commentsStyle}>
                {additionalComments}
            </div>
        </>);
}

export default Review;
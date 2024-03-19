import React, { useState } from 'react';

interface PopupProps {
    initialKey: string;
    onClose: () => void;
    onSave: (key: string, value: string) => void;
}

const SelectionPopup: React.FC<PopupProps> = ({ initialKey, onClose, onSave }) => {
    const [key, setKey] = useState(initialKey);
    const [value, setValue] = useState('')

    const handleSave = () => {
        onSave(key, value);
    }

    return (
        <div style={{ position: 'absolute', border: '1px solid gray', padding: '10px', backgroundColor: 'white', zIndex: 100 }}>
            <div>
                <label htmlFor="keyInput">Key:</label>
                <input
                    id="keyInput"
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="valueInput">Value:</label>
                <input
                    id="valueInput"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div>
                <button onClick={onClose}>Close</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default SelectionPopup;

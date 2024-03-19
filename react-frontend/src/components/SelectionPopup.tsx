import React, {useEffect, useRef, useState} from 'react';

interface PopupProps {
    initialKey: string;
    onClose: () => void;
    onSave: (key: string, value: string) => void;
}

const SelectionPopup: React.FC<PopupProps> = ({ initialKey, onClose, onSave }) => {
    const [key, setKey] = useState(initialKey);
    const [value, setValue] = useState('');
    const valueInputRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        valueInputRef.current?.focus();

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleSave = () => {
        onSave(key, value);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div ref={popupRef} style={{ position: 'absolute', border: '1px solid gray', padding: '10px', backgroundColor: 'white', zIndex: 100 }}>
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
                    ref={valueInputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyPress}
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

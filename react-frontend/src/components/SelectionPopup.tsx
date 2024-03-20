import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import Button from "../shared/Button.tsx";

interface PopupProps {
    initialKey: string;
    onClose: () => void;
    onSave: (key: string, value: string) => void;
}

const style: { [key: string]: CSSProperties } = {
    popupContainer: {
        position: 'absolute',
        border: '1px solid gray',
        padding: '20px',
        backgroundColor: 'white',
        zIndex: 100,
        width: '300px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    inputWrapper: {
        marginBottom: '20px'
    },
    label: {
        marginBottom: '5px'
    },
    inputField: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    buttonWrapper: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    }
}

const SelectionPopup: React.FC<PopupProps> = ({initialKey, onClose, onSave}) => {
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
        <div ref={popupRef} style={style.popupContainer}>
            <div style={style.inputWrapper}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <label htmlFor="keyInput" style={style.label}>Key:</label>
                    <input
                        id="keyInput"
                        type="text"
                        value={key}
                        style={style.inputField}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <label htmlFor="valueInput" style={style.label}>Value:</label>
                <input
                    id="valueInput"
                    ref={valueInputRef}
                    type="text"
                    value={value}
                    style={style.inputField}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div style={style.buttonWrapper}>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
};

export default SelectionPopup;

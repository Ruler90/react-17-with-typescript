import { ChangeEvent, useState } from 'react';

const TextInputAndOutput = () => {
    const [text, setText] = useState('');
    const [showText, setShowText] = useState(false);

    const inputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const clickHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShowText(!showText);
    };

    return (
        <>
            <form>
                <label htmlFor="text" className="header-input-label"> Type something:
                    <input
                        type="text"
                        name="text"
                        className="header-input"
                        value={text}
                        onChange={(e) => inputHandler(e)}
                    />
                </label>
                {text && <button type="button" className="show-text-button" onClick={(e) => clickHandler(e)}>{showText ? 'hide text' : 'show text'}</button>}
            </form>
            {text && showText && <p className="text-from-input">Text from the input: <span>{text}</span></p>}
        </>
    );
};

export default TextInputAndOutput;

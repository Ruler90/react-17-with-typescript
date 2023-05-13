import TextInputAndOutput from 'components/TextInputAndOutput/TextInputAndOutput.component';

interface HeaderProps {
    text?: string;
    author?: string;
}

const Header = ({ text, author }:HeaderProps) => (
    <div>
        <header className="app-header">
            <h1>{text}</h1>
            <h2>Author: {author}</h2>
        </header>
        <TextInputAndOutput />
    </div>
);


export default Header;

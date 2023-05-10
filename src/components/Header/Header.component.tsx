interface HeaderProps {
    text: string;
    version: number;
}

const Header = ({ text, version }:HeaderProps) => (
    <header className="app-header">
        <h1>{text}</h1>
        <h2>version: {version}</h2>
    </header>
);

export default Header;

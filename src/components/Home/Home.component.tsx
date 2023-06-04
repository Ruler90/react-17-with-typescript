import Header from 'components/Header/Header.component';
import Section from 'components/Section/Section.component';

const Home: React.FC = () => {
    const appName = 'This is my new App';
    const author = 'Ruler90';

    return (
        <>
            <Header text={appName} author={author} />
            <Section>
                <p>{'This is the Section component that renders everything that is passed to it as it\'s child.'}</p>
                <p>We can think of it as a wrapper for the content.</p>
            </Section>
            <Section>
                <p>Here is the next section with an image</p>
                <img src="https://placehold.co/200x200/orange/white" alt="" />
            </Section>
        </>
    );
};

export default Home;

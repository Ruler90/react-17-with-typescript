import Header from 'components/Header/Header.component';
import Section from 'components/Section/Section.component';

const Home = () => {
    const appName = 'This is my new App';
    const version = 2;

    return (
        <>
            <Header text={appName} version={version} />
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

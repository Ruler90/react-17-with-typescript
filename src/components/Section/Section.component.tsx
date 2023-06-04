import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode
}

const Section: React.FC<SectionProps> = ({ children }) => (
    <section className="section-component">
        {children}
    </section>
);

export default Section;

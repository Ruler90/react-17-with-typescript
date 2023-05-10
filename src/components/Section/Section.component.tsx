import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode
}

const Section = ({ children }:SectionProps) => (
    <section className="section-component">
        {children}
    </section>
);

export default Section;

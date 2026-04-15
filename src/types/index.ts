export interface NavItem {
    title: string;
    href: string;
    external?: boolean;
}

export interface Stat {
    label: string;
    value: string;
    sub: string;
}

export interface ContactConfig {
    ctaHref: string;
}

export interface SiteConfig {
    name: string;
    description: string;
    nav: NavItem[];
    hero: {
        title: string;
        subtitle: string;
    };
    invective: {
        date: string;
        title: string;
        paragraphs: string[];
    };
    supplyChain: {
        label: string;
        title: string[]; // Array for line breaks
        description: string;
        commodities: string[];
        stats: Stat[];
    };
    contact: ContactConfig;
}

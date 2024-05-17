/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/

import Head from 'next/head';
import { useState, cloneElement, Children } from 'react';
import { useRouter } from 'next/router';
import useThemeSystem, { THEMES } from '@hooks/useThemeSystem';
import SettingsModal from '@components/modals/settings';
import NavbarModal from '@components/modals/navbar';
import MetaHead from '@components/core/metahead';
import Footer from '@components/core/footer';
import Navbar from '@components/core/navbar';
import Dektionary from 'config/dektionary';


function GoogleTagManager() {
    const enabled = process.env.GOOGLE_TAG_ENABLED;
    const id = process.env.GOOGLE_TAG_ID;
    if (!enabled) return null;
    return <>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
        <Script id="google-analytics">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${id});
        `}
        </Script>
    </>
}

export default function Layout({ children }) {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showNavbarModal, setShowNavbarModal] = useState(false);
    const [theme_id, setThemeID] = useThemeSystem();
    const theme = `/themes/${THEMES[theme_id]}.css`;
    const active_route = useRouter().pathname;

    const modals = {
        onClickSettings: () => setShowSettingsModal(true),
        onClickHamburger: () => setShowNavbarModal(true),
    };

    const isbasepath = active_route !== '/';
    const bodystyle = isbasepath ? {overflowY: 'scroll'} : {};

    return (
        <>
            {/* <!-- Load theme style: not best practice --> */}
            <Head><link rel='stylesheet' href={theme} /></Head>
            {/* <!-- use metahead component to dynamically set social media embeddings per page --> */}
            <MetaHead
                title={`${Dektionary.brandname}: ${Dektionary.tagline}`}
                desc={Dektionary.tagline}
                url={active_route}
            />
            <GoogleTagManager />
            <div className='vh-100 theme-bg selection-secondary'>
                <Navbar modals={modals} />
                <div id='main-body' className='main-body h-full' style={bodystyle}>
                    {/* Add modals data to children to allow settings and store modal control */}
                    {Children.map(children, (child) => cloneElement(child, { modals }))}
                </div>
                <SettingsModal
                    themes={THEMES}
                    theme_id={theme_id}
                    setThemeID={setThemeID}
                    show={showSettingsModal}
                    setShow={setShowSettingsModal}
                />
                <NavbarModal
                    show={showNavbarModal}
                    setShow={setShowNavbarModal}
                />                 
                <Footer />
            </div>
        </>
    );
}

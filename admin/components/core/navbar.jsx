/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/

// import styles from '../styles/Home.module.css'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';

import DekSelect from '@components/core/dek-select';
import Dektionary from '@config/dektionary';
import * as CommonIcons from '@config/common-icons';

import DekCheckbox from '@components/core/dek-checkbox';
import Image from 'next/image';

import navbar_items from 'config/navbar-items';

const NSFWIcons = {
    enabled: CommonIcons.eye,
    disabled: CommonIcons.eye_slash,
};

export default function MainNavbar({
    modals: {
        onClickHamburger,
        onClickGemStore,
        showNSFW = false,
        setShowNSFW = () => {},
    },
}) {
    const router = useRouter();
    const active_route = router.pathname;

    return (
        <Navbar className='navbar theme-text'>
            <Container className='theme-text'>
                <Navbar.Brand>
                    <Link passHref href='/' className='hover-dark'>
                        <Nav.Link className='d-flex flex-row justify-content-center'>
                            <Image
                                className='p-0'
                                src='/favicon-32x32.png'
                                width={32}
                                height={32}
                                unoptimized
                                loading='lazy'
                            />
                            <small style={{ marginTop: 6, marginLeft: 4 }}>
                                <strong>{Dektionary.brandname}</strong>
                            </small>
                        </Nav.Link>
                    </Link>
                </Navbar.Brand>

                <Nav className='d-flex d-md-none me-auto'>
                    <div
                        className='btn p-2 no-shadow hover-dark hover-secondary'
                        onClick={onClickHamburger}>
                        <CommonIcons.navtoggle
                            height='1.75rem'
                            fill='currentColor'
                        />
                    </div>
                </Nav>

                <Nav
                    className='d-none d-md-flex me-auto'
                    activeKey={active_route}>
                    {navbar_items.map((element) => {
                        return (
                            <Link
                                passHref
                                href={element.href}
                                key={element.href}
                                className='hover-dark'>
                                <Nav.Link className='hover-secondary'>
                                    {element.text}
                                </Nav.Link>
                            </Link>
                        );
                    })}
                </Nav>

                <Nav className='text-end'>
                    <div
                        className='btn p-2 no-shadow hover-dark hover-secondary'
                        onClick={() => router.push('/dashboard')}>
                        <CommonIcons.account
                            height='1.75rem'
                            fill='currentColor'
                        />
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
}

/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';

export default function FourOhFourPage() {
    const router = useRouter();
    const imageSize = 512;
    const timeoutDelay = 5000;// ms
    const [knownPath] = useState(router.pathname);
    const onReturnHome = () => {
        if (knownPath !== router.pathname) return;
        router.push('/');
    }
    useEffect(()=>{
        // set timeout to redirect back to home
        setTimeout(onReturnHome, timeoutDelay)
    }, []);

    return (
        <div
            className='page-header-bg'
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Container className='text-center'>
                <Image
                    src='/logo.webp'
                    width={imageSize}
                    height={imageSize}
                    unoptimized={true}
                    className='img-fluid'
                    loading='lazy'
                />
                <h1>Opps...</h1>
                <h3>Cannot find page</h3>
            </Container>
        </div>
    );
}

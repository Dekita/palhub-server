/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/

import MetaHead from '@components/core/metahead';
import Dektionary from 'config/dektionary';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useScreenSize from "@hooks/useScreenSize";
// import { useEffect, useMemo, useState } from 'react';
// import * as CommonIcons from 'config/common-icons';

// export const getServerSideProps = async () => {
//     return { props: {} };
// };

export default function HomePage(props) {
    const router = useRouter();
    const {isDesktop} = useScreenSize();
    const onClickHomeAdmin = () => location.assign('/admin');// to enforce htaccess access rules
    const onClickHomeDetails = () => router.push('/details');
    const onClickViewOnPalHUB = () => router.push('/about');
    const image_size = isDesktop ? 256 : 192;
    const metahead_opts = {
        title: `${Dektionary.brandname}: ${Dektionary.tagline}`,
        desc: `${Dektionary.brandname}: ${Dektionary.tagline}`,
    };
    return (<>
        <MetaHead {...metahead_opts} />
        <div
            className='page-header-bg'
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <motion.div
                    initial={{ opacity: 0, y: 512 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className='text-center w-100'>
                    <Image
                        src='/logo.webp'
                        width={image_size}
                        height={image_size}
                        unoptimized={true}
                        className='img-fluid'
                        loading='lazy'
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className='text-center w-100'>
                    <h1 className='text-secondary'>
                        <strong>{Dektionary.brandname}</strong>
                    </h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -64 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className='text-center w-100'>
                    <h6><strong>{Dektionary.tagline}</strong></h6>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 128 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className='text-center mt-4'>
                    <a
                        className='btn btn-secondary p-3'
                        style={{ width: 256 }}
                        onClick={onClickHomeDetails}>
                        <strong>
                            {Dektionary.buttons.home_details}
                        </strong>
                    </a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -128 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className='text-center mt-2'>
                    <a
                        className='btn btn-primary p-3'
                        style={{ width: 256 }}
                        onClick={onClickHomeAdmin}>
                        <strong>{Dektionary.buttons.home_admin}</strong>
                    </a>
                </motion.div>
                {false && <motion.div
                    initial={{ opacity: 0, y: 64 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className='text-center mt-2'>
                    <a
                        className='btn btn-info p-3'
                        style={{ width: 256 }}
                        onClick={onClickViewOnPalHUB}>
                        <strong>{Dektionary.buttons.home_palhub}</strong>
                    </a>
                </motion.div>}
            </div>
        </div>
    </>);
}

/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
import IconLock from '@svgs/fa5/solid/lock.svg';
import IconDiscord from '@svgs/fa6/brands/discord.svg';

export default function Footer() {
    return (
        <footer className='footer darker-bg3 text-center p-3'>
            <a href='https://discord.gg/DCXh2TUF2u' target='_blank' className='btn hover-secondary'>
                <IconDiscord
                    height='1.6rem'
                    fill='currentColor'
                    style={{ opacity: 0.5 }}
                />
            </a>
        </footer>
    );
}

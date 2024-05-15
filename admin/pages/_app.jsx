/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
_app.jsx: the main frontend entrypoint
*/

import Layout from '@components/core/layout';
import 'bootstrap/dist/css/bootstrap.css';
import '@styles/dek-style.css';
import '@styles/globals.css';

// export const getServerSideProps = async () => {
//     return { props: {} };
// };

// main app function
export default function APP_ROOT({Component,pageProps}) {
    // console.log('pageProps', pageProps, Component);
    return <Layout><Component {...pageProps}/></Layout>
}

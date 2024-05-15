/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
import Container from 'react-bootstrap/Container';
import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {cpu, cpu_load, ip_traffic, io_usage, ram, jitter, disks} from '@config/common-icons';

import StatCard from '@components/stats/card';
import swrStats from '@hooks/useSwrStats';
import RCONModal from '@components/modals/rcon';
import ENVModal from '@components/modals/envfile';
import INIModal from '@components/modals/inifile';
import Dektionary from 'config/dektionary';
import { fetcher } from '@hooks/useSwrJSON';
import fs from 'fs/promises';  // Using fs/promises for async operations
import ini from 'ini';

export async function getServerSideProps() {
    try {
        const PALHUB_ADMIN_PASS = process.env.PALHUB_ADMIN_PASS;
        console.log("getServerSideProps:", PALHUB_ADMIN_PASS);
        console.log('__dirname:', __dirname);

        const env_file_path = '/app/mounted-env.env';
        const env_file = await fs.readFile(env_file_path, 'utf-8');
        console.log('env_file:', env_file);

        const denv_file_path = '/app/default-env.env';
        const denv_file = await fs.readFile(denv_file_path, 'utf-8');
        console.log('env_default:', denv_file);

        const props = {PALHUB_ADMIN_PASS};
        props.ENV_DEFAULTS = denv_file;
        props.ENV_FILE = env_file;

        const ini_file_path = '/app/PalServer/Pal/Saved/Config/WindowsServer/PalWorldSettings.ini';
        // const dini_file_path = '/app/PalServer/DefaultPalWorldSettings.ini';
        // const dini_file = await fs.readFile(dini_file_path, 'utf-8');
        const ini_file = await fs.readFile(ini_file_path, 'utf-8');

        props.INI_FILE = ini.parse(ini_file);
        props.INI_DEFAULTS = props.INI_FILE;//ini.parse(dini_file);

        // ini.decode()

        return {props};
    } catch (error) {
        console.error(error);
    }

    return {props:{}};
} 

export default function AdminPage({ modals, PALHUB_ADMIN_PASS, ENV_FILE, ENV_DEFAULTS, INI_FILE, INI_DEFAULTS }) {
    const {onClickSettings=()=>{}} = modals || {};
    const [showRCON, setShowRCON] = useState(false);
    const [showENV, setShowENV] = useState(false);
    const [showINI, setShowINI] = useState(false);

    const tryRunSystemCMD = async(cmd) => {
        try {
            console.log(`Trying to run system cmd: ${cmd}!`)
            const {error, result} = await fetcher('/api/run', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pwd: PALHUB_ADMIN_PASS,
                    cmd, return: false,
                }),
                method: 'POST',
            })
            console.log('error', error)
            console.log('result', result)
        } catch (error) {
            console.error(error)
        }
    }

    const tryRunShutdown = async() => await tryRunSystemCMD('shutdown');
    const tryRunRestart = async() => await tryRunSystemCMD('restart');
    const tryRunUpdater = async() => await tryRunSystemCMD('update');

    return (<>
        <RCONModal 
            {...{ENV_FILE, PALHUB_ADMIN_PASS}}
            show={showRCON} setShow={setShowRCON}
        />
        <ENVModal 
            {...{ENV_FILE, ENV_DEFAULTS, PALHUB_ADMIN_PASS}}
            show={showENV} setShow={setShowENV}
        />
        <INIModal 
            {...{INI_FILE, INI_DEFAULTS, PALHUB_ADMIN_PASS}}
            show={showINI} setShow={setShowINI}
        />
        <Container className='d-flex flex-column text-start pt-5 h-100'>
            <div className='flex-fill'>
                <div className='row m-3 gap-3'>
                    <a className='btn btn-success p-3 col' onClick={tryRunShutdown}>
                        <strong>STOP ALL</strong>
                    </a>
                    <a className='btn btn-success p-3 col' onClick={tryRunRestart}>
                        <strong>RESTART</strong>
                    </a>
                    <a className='btn btn-success p-3 col' onClick={tryRunUpdater}>
                        <strong>UPDATE</strong>
                    </a>
                </div>
                <div className='row m-3 gap-3'>
                    <a className='btn btn-success p-3 col' onClick={()=>setShowRCON(true)}>
                        <strong>RCON Terminal</strong>
                    </a>
                    <a className='btn btn-success p-3 col' onClick={()=>setShowENV(true)}>
                        <strong>Edit ENV Variables</strong>
                    </a>
                    <a className='btn btn-success p-3 col' onClick={()=>setShowINI(true)}>
                        <strong>Edit INI Configuration</strong>
                    </a>
                    <a className='btn btn-success p-3 col' onClick={onClickSettings}>
                        <strong>Edit Admin Panel</strong>
                    </a>
                </div>
                <div className='row'>
                    <StatCard metric='cpu' icon={cpu} target='sum' sizes={{xs:12}}/>
                    <StatCard metric='load' icon={cpu_load} target={0} />
                    <StatCard metric='ip' icon={ip_traffic} target='sum' />
                    <StatCard metric='storage' icon={disks} target={0} suffix=''/>
                    <StatCard metric='ram' icon={ram} target={0} />
                    <StatCard metric='jitter' icon={jitter} target={2} />
                    <StatCard metric='io' icon={io_usage} target={0} />
                </div>
            </div>
            <div className='position-relative'>
                {/* sticky on de bottum! */}
            </div>
        </Container>
    </>);
}

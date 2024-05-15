/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {info as InfoIcon} from '@config/common-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';

import DekSwitch from '@components/core/dek-switch'
// import DekSelect from '@components/core/dek-select';
// import DekChoice from "@components/core/dek-choice";



export function ensureEntryValueType(value, num_type = 'float') {
    if (typeof value !== 'string') return value;

    // const numval = num_type === 'int' ? parseInt(value) : parseFloat(value);
    // if (num_type && !isNaN(numval)) return numval;

    const lowerval = value.toLowerCase();
    const isboolval = ['true','false'].includes(lowerval)
    if (isboolval) return lowerval === 'true';

    return value;
}


export function prepareDecription(desc) {
    if (!desc) return '???';
    const lines = desc.split('\n');
    const filtered = lines.filter(line => line.trim().startsWith('#'));
    const newdesc = filtered.join("\n");
    return newdesc.replace(/#/g, "").trim();
}

export function ENVEntryLabel({name, envdatas}) {

    const customStyle = {
        backgroundColor: '#3498db', // Background color
        color: '#ffffff',            // Text color
        borderRadius: '5px',         // Border radius
        // padding: '10px',             // Padding
        fontSize: '14px',            // Font size
    };

    const tooltip_text = prepareDecription(envdatas?.[name]?.val);
    const button_style = { borderRadius: 99, boxShadow: 'none' };
    const delay = { show: 100, hide: 250 };
    const overlay = <Tooltip className="text-end">{tooltip_text}</Tooltip>;
    const icon_size = 16;


    const placement = 'bottom';
    const onClick = () => {};
    const tooltip = '';

    return <div className="px-2 pb-2">
        <div className="row">
            <div className="col">
                <strong>{name}</strong>
            </div>
            <div className="col" style={{maxWidth:'36px'}}>
                <OverlayTrigger placement={placement} delay={delay} overlay={overlay}>
                    <a
                        className='btn p-0 border-0 hover-secondary w-100 text-end'
                        style={button_style}
                        onClick={onClick}>
                        <InfoIcon
                            fill='currentColor'
                            width={icon_size}
                            height={icon_size}
                        />
                    </a>
                </OverlayTrigger>
            </div>
        </div>
    </div>
}


export function ENVEntry_Input({name, value, updateSetting, defaults, envdatas, type='text'}) {
    const [knownValue, setKnownValue] = useState(value);

    const onKeyUp = (e) => {
        // Check if the key pressed is 'Enter' (key code 13)
        if (e.key !== 'Enter') return;
        onChanged(e)
    }

    const onChanged = (e) => {
        setKnownValue(e.target.value);
        updateSetting(name, e.target.value);
    }

    // console.log(name, envdatas[name])

    return <div className="py-2">
        <ENVEntryLabel {...{name,envdatas}} />
        <input 
            type={type}
            placeholder={name} 
            id={name + "-input"} 
            name={name + "-input"} 
            className='form-control form-secondary' 
            onChange={onChanged} 
            // disabled={working}
            autoComplete="off"
            // list="fruitsList"
            style={{ width: '100%' }}
            onKeyUp={onKeyUp} 
            value={knownValue} 
        />
    </div>
}



export function ENVEntry_Bool({name, value, updateSetting, defaults, envdatas}) {
    // const [knownValue, setKnownValue] = useState(value);
    // updateSetting(name)
    return <div className="py-2">
        <ENVEntryLabel {...{name,envdatas}} />
        <DekSwitch
            maxIconWidth={64}
            labels={['Enabled','Disabled']}
            // icons={NSFWIcons}
            checked={value}
            onClick={newval=>updateSetting(name, newval)}
            iconPos='left'
            inline={true}
        />
    </div>
}

export function ENVEntry({name, value, updateSetting, defaults, envdatas}) {
    // value = ensureEntryValueType(value);
    const passthrough = {name, value, updateSetting, defaults, envdatas};

    // console.log(`entry for ${name}:`, typeof value, {name, value})
    switch (typeof value) {
        case 'string': return <ENVEntry_Input {...passthrough} />
        case 'number': return <ENVEntry_Input {...passthrough} type='number' />
        case 'boolean': return <ENVEntry_Bool {...passthrough} />
        default: return <ENVEntry_Input {...passthrough} />
    }
}


/**
 * /api/svg?params...
 * params:
 * header {text}
 * caption {text}
 * value {text}
 * color {css colors} (hexcodes, rgb(), hsl(), blue)
 * backgroundColor {css colors}
 * borderRadius {css radius}
 * borderColor{css colors}
 * border {css border} any valid css value for border
 * iconColor {css colors} the color to set the icon, defaults to color
 * iconType {solid|regular|brands} corresponds to font awesome icon type
 * iconSize {number} the icon height
 * icon {text} font-awesome v5.15 icons
 * fontSize {number} set the fontsize for text,
 * width {number} set the output svg width
 * height {number} set the output svg height
 * size {number} set both width and height simultaniously
 */

import Dekache from 'dekache';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import satori from 'satori';
import {
    hexToFilter,
    rgbToFilter,
    hslToFilter,
    keywordToFilter,
} from 'css-filter-converter';

// the public files directory:
const PUBLIC_DIR = join(__dirname, '../../../../public');

// cache to check file existence:
const ExistsCache = {};
// cache to store available fonts:
const FontCache = [];
// renewable cache to store generated svg's
const SVGCache = new Dekache({
    name: 'svg-cache',
    type: 'renew',
    mins: 60,
});

// gets the array of valid fonts:
async function getFontsArray() {
    if (!FontCache.length) {
        FontCache.push({
            data: await loadFont('Whitney-Bold'),
            name: 'Whitney',
            style: 'normal',
            weight: 400,
        });
    }
    return FontCache;
}
// loads a font file
async function loadFont(file) {
    return await readFile(join(PUBLIC_DIR, `fonts/${file}.ttf`));
}
// checks if a file exists on the system
function checkFileExists(file) {
    if (ExistsCache[file] === undefined) {
        ExistsCache[file] = existsSync(join(PUBLIC_DIR, file));
        console.log('checking existence!');
    }
    return ExistsCache[file];
}

// validates request query
// returns error message as string to throw
function validateRequestQuery(query) {
    const valid_types = ['solid', 'brands', 'regular'];
    if (query.iconType && !valid_types.includes(query.iconType)) {
        return `valid iconTypes are: ${valid_types}`;
    }

    const type = query.iconType || 'solid';
    const path = `svgs/${type}/${query.icon}.svg`;
    if (query.icon && !checkFileExists(path)) {
        return 'icon file does not exist!';
    }

    return null;
}

// get object for error query
function getErrorQuerySettings(message) {
    return {
        icon: 'exclamation-triangle',
        iconType: 'solid',
        iconSize: 192,
        iconColor: '#b57252',
        header: 'uERROR',
        caption: message,
    };
}

// determine type of filter to use
function getFilterType(color) {
    if (color.startsWith('#')) return 'hex';
    else if (color.startsWith('rgb(')) return 'rgb';
    else if (color.startsWith('hsl(')) return 'hsl';
    else return 'txt';
}

// get the filter used to set svg color
function getFilter(color) {
    let filter = null;
    switch (getFilterType(color)) {
        case 'hex':
            filter = hexToFilter(color);
            break;
        case 'rgb':
            filter = rgbToFilter(color);
            break;
        case 'hsl':
            filter = hslToFilter(color);
            break;
        case 'txt':
            filter = keywordToFilter(color);
            break;
    }
    if (!filter.error) return { filter: filter.color };
    return { filter: hexToFilter('#e4e4e4').color };
}

// generate the actual svg
// todo: refactor
async function generateSVG(query) {
    const rowdir = ['row', 'badge'].includes(query.style);

    const {
        header = 'uSTREEM',
        caption = null,
        value = '1234',
        color = '#e4e4e4',
        backgroundColor = '#33213f',
        borderRadius = rowdir ? '45px' : 0,
        borderColor = 'rgba(0,0,0,0.25)',
        border = rowdir ? '6px' : '12px',
        iconColor,
        iconType = 'solid',
        iconSize = rowdir ? 24 : 128,
        icon,

        fontSize = rowdir ? 24 : 48,
        height = rowdir ? query.size || 32 : 420,
        width = rowdir ? query.size || 256 : 690,
    } = query;

    const base_path = 'http://dekai_client:3000';
    const main_logo = `${base_path}/android-chrome-512x512.png`;
    const main_icon = `${base_path}/svgs/${iconType}/${icon}.svg`;
    const wrapper_style = {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: rowdir ? 'row' : 'column',
        width: '100%',
        height: '100%',
        border,
        borderColor,
        borderRadius,
        backgroundColor,
        color,
    };
    const header_style = {
        fontSize,
        // display: 'flex',
        // flex: 1,
        paddingLeft: 6,
    };
    const caption_style = {
        fontSize: Math.floor(fontSize / 2),
    };

    const value_style = {
        fontSize: Math.floor(fontSize / 2),
        backgroundColor: borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        paddingLeft: 6,
        height: '100%',
    };
    const icon_style = {
        ...getFilter(iconColor || color),
    };

    const html = rowdir ? (
        // rows/badges
        <div style={wrapper_style}>
            {icon && iconSize ? ( // show FA icon svg:
                <div
                    style={{
                        height: '100%',
                        backgroundColor: borderColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        paddingRight: 6,
                    }}>
                    <img src={main_icon} height={iconSize} style={icon_style} />
                </div>
            ) : (
                // show default image header:
                <img src={main_logo} height='192px' />
            )}
            {header && <span style={header_style}>{header}</span>}
            {caption && <span style={caption_style}>{caption}</span>}
            {value && <span style={value_style}>{value}</span>}
        </div>
    ) : (
        // columns/cards
        <div style={wrapper_style}>
            {icon && iconSize ? ( // show FA icon svg:
                <img
                    src={main_icon}
                    height={iconSize}
                    style={getFilter(iconColor || color)}
                />
            ) : (
                // show default image header:
                <img src={main_logo} height='192px' />
            )}
            {header && <span style={header_style}>{header}</span>}
            {caption && <span style={caption_style}>{caption}</span>}
        </div>
    );

    console.log('generating');

    const fonts = await getFontsArray();
    const opts = { width, height, fonts };
    return await satori(html, opts);
}

// handle the api route
export default async function handler(req, res) {
    // check for error, and change query to display
    // error message when error message is thrown
    const error = await validateRequestQuery(req.query);
    if (error) req.query = getErrorQuerySettings(error);

    // fetch/cache the svg using the stringified query as key
    const cache_key = JSON.stringify(req.query);
    const svg = await SVGCache.get(cache_key, async () => {
        // if no svg exist in cache then generate and store
        return await generateSVG(req.query);
    });

    // return the svg to the client:
    await res.setHeader('Content-Type', 'image/svg+xml');
    await res.status(200);
    await res.write(svg);
    await res.end();
}

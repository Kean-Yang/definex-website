/**
 * 左侧菜单
 * @author
 * @create
 */

import Twiiter from '../assets/socials/twiiter.svg';
import Discord from '../assets/socials/discord.svg';
import Medium from '../assets/socials/medium.svg';
import Telegram from '../assets/socials/telegram.svg';
import RedditPofile from '../assets/socials/Vector.svg';

import {
    DD_TWITTER_URL,
    DD_DISCORD_URL,
    DD_MEDIUM_URL,
    DD_T_ME_URL,
    REDDIT_POFILE,
} from '../constants';

export interface RouteType {
    name: string;
    url: string;
    icon: any;
    key?: string;
    target?: boolean;
    childPages?: any;
    childrenName?: any;
}

// 导航
const AppMenu: RouteType[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: '',
        key: 'dashboard',
        target: false,
        childPages: '',
        childrenName: '',
    },
    {
        name: 'Vote',
        url: '/vote',
        icon: '',
        key: 'Vote',
        target: false,
        childPages: '/vote/details',
        childrenName: '',
    },
];

const AppMenuMobile: RouteType[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: '',
        key: 'dashboard',
        target: false,
        childPages: '',
        childrenName: '',
    },
    {
        name: 'Vote',
        url: '/vote',
        icon: '',
        key: 'Vote',
        target: false,
        childPages: '/vote/details',
        childrenName: '',
    },
];

const AppMenuSocial: RouteType[] = [
    {
        name: 'Twiiter',
        url: DD_TWITTER_URL,
        icon: Twiiter,
        key: 'Twiiter',
        target: false,
        childrenName: '',
    },
    {
        name: 'Discord',
        url: DD_DISCORD_URL,
        icon: Discord,
        key: 'Discord',
        target: false,
        childrenName: '',
    },
    {
        name: 'Medium',
        url: DD_MEDIUM_URL,
        icon: Medium,
        key: 'Medium',
        target: false,
        childrenName: '',
    },
    {
        name: 'Reddit pofile',
        url: REDDIT_POFILE,
        icon: RedditPofile,
        key: 'Reddit pofile',
        target: false,
        childrenName: '',
    },

    {
        name: 'Telegram',
        url: DD_T_ME_URL,
        icon: Telegram,
        key: 'Telegram',
        target: false,
        childrenName: '',
    },
];

export { AppMenu, AppMenuMobile, AppMenuSocial };

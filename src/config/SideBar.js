const sidebarMenu = [
    {
        name: "HNW Projects",
        options: {},
        items: [
            { path: '/dashboard', icon: 'fa fa-sitemap', title: 'Dashboard'},
            { path: '/hnw', img: '/assets/img/logo/hnw-small.png', bgImg:'p-1 bg-gray-800 bg-opacity-80', title: 'HNW',
                children: [
                    { path: 'https://pancakeswap.finance/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x8173CcC721111b5a93CE7fa6fEc0fc077B58B1B7', title: 'Buy', external: true },
                    { path: '/hnw/nft', title: 'NFT',
                        children: [
                            { path: '/hnw/nft/claim', title: 'Claim' },
                            { path: '/hnw/nft/mint', title: 'Mint' },
                        ]
                    },
                    { path: '/hnw/stake', title: 'Stake' },
                ]
            },
            { path: '/hfuel', img: '/assets/img/logo/hfuel-small.png', bgImg:'p-1 bg-gray-200 bg-opacity-80', title: 'HFUEL',
                children: [
                    { path: 'https://pancakeswap.finance/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x157Ba4bBbb2bd7D59024143C2C9E08f6060717a6', title: 'Buy', external: true },
                    { path: '/hfuelv1/stake', title: 'Stake' },
                    { path: '/hfuel/migrate', title: 'Migrate' },
                ]
            },
        ],
    },
    {
        name: "Partners Projects",
        options: {
            addDivider: {class: 'menu-divider mt-3'}
        },
        items: [
            // { path: '/ruyi', img: '/assets/img/logo/ruyi-small.png', bgImg:'p-1 bg-white bg-opacity-80', title: 'RUYI',
            //     children: [
            //         { path: '/ruyi/presale', title: 'Presale' },
            //     ]
            // },
            { path: '/sk', img: '/assets/img/logo/sidekick-small.png', bgImg:'p-1 bg-gray-800 bg-opacity-90', title: 'SIDEKICK',
                children: [
                    { path: 'https://pancakeswap.finance/swap?outputCurrency=0x5755e18d86c8a6d7a6e25296782cb84661e6c106', title: 'Buy', external: true },
                    { path: '/sk/stake', title: 'Stake' },
                    { path: 'https://sidekick.finance/', external: true, title: 'Website' },
                    
                ]
            },
            // { path: '/https://sidekick.finance/', img: '/assets/img/logo/sidekick-small.png', bgImg:'p-1 bg-gray-800 bg-opacity-90', title: 'SIDEKICK',

            // },
        ],
    },
    {
        name: "Services",
        options: {
            addDivider: {class: 'menu-divider mt-3'}
        },
        items: [
            // { path: '/launchpad', img: '/assets/img/logo/launchpad-small.png', bgImg:'p-1 bg-gray-800 bg-opacity-80', title: 'Launchpad',
            //     children: [
            //         { path: '/launchpad/anti_bot', title: 'Anti-Bot' },
            //         { path: '/launchpad/create/fairlaunch', title: 'Create Market Generation' },
            //         { path: '/launchpad/create/presale', title: 'Create Presale' },
            //         { path: '/launchpad/create/token', title: 'Create Token' },
            //         { path: '/launchpad/list', title: 'Launchpad List' },
            //     ]
            // },
            { path: '/refinery', img: '/assets/img/logo/refinery-small.png', bgImg:'p-1 bg-gray-900 bg-opacity-80', title: 'Refinery',
                children: [
                    // { path: '/refinery/swap', title: 'Swap' },
                    { path: '/refinery/pipeline', title: 'Pipeline' },
                    { path: 'https://hnwdefi.com/pdf/DRIVEN_securityAudit.pdf', external: true, title: 'Driven Audit' },
                    // { path: '/refinery/reservoir', title: 'Reservoir' },
                ]
            },
            // { path: '/lock', img: '/assets/img/logo/launchpad-small.png', bgImg:'p-1 bg-gray-800 bg-opacity-80', title: 'Lock',
            //     children: [
            //         { path: '/lock/create', title: 'Create Lock' },
            //         { path: '/lock/token', title: 'Token' },
            //         { path: '/lock/liquidity', title: 'Liquidity' },
            //     ]
            // },
        ],
    }
];

export default sidebarMenu;
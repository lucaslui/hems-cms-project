db.auth('admin', 'rtdsp1020304050')

db.createUser({
    user: 'user',
    pwd: 'user1020304050',
    roles: [
        {
            role: 'readWrite',
            db: 'software-nuvem-db',
        },
    ],
});

db.hems.insert({
    _id: 'hems_1',
    regionId: 'region_1',
    mqttUsername: 'hems_1',
    mqttPassword: '$2b$12$Mom6Yun8SK3/H6iAep/2k.px8rk12FyqMYn0/Iq5fcUNep3Vkh4HW',
    publishACL: ['hems/data'],
    subscribeACL: ['hems/commands/hems_1']
})

// db.vmq_acl_auth.insert({
//     mountpoint: '',
//     client_id: 'hems_1',
//     username: 'hems_1',
//     passhash: '$2a$10$.uEEbFYuEhzVIbfPPSD.9ezkQqLxgSH.feV/HY2ur./0D0tSVTtku',
//     publish_acl: [
//         {
//             pattern: 'hems/data',
//             pattern: 'hems/%c/state/#'
//         }
//     ],
//     subscribe_acl: [
//         { 
//             pattern: 'hems/%c/commands/#'
//          }
//     ]
// })
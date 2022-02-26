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

db.vmq_acl_auth.insert({
    mountpoint: '',
    client_id: 'hems_1',
    username: 'hems_1',
    passhash: '$2a$10$.uEEbFYuEhzVIbfPPSD.9ezkQqLxgSH.feV/HY2ur./0D0tSVTtku',
    publish_acl: [
        {
            pattern: 'hems/data',
            pattern: 'hems/%c/state/#'
        }
    ],
    subscribe_acl: [
        { 
            pattern: 'hems/%c/commands/#'
         }
    ]
})

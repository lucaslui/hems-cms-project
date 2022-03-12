/* Create default database access for applications*/
db.createUser({
  user: 'user',
  pwd: 'user1234',
  roles: [
    {
      role: 'readWrite',
      db: 'software-nuvem-db',
    },
  ],
});

/* Add default hems controller */
db.hems.insert({
    _id: 'hems_1',
    username: 'hems_1',
    password: '$2a$12$z3BPpNMiiJVDYxIgz0P8xOhula/DX3c71lph.y99fJ39EiswYBWv6',
    publishACL: ['hems/data', 'hems/state/hems_1'],
    subscribeACL: ['hems/commands/hems_1']
})

/* Add default admin user */
db.users.insert({
    "name": "admin",
    "email": "admin@email.com",
    "password": "$2a$12$S0j7gdE1CHp0tGyL976vtOYuf0fmhX/3Frx6QxwdajePcUSrjTBSK",
    "role": "admin",
    "createdAt": new Date()
})

/* Add default customer user */
db.users.insert({
    "name": "customer",
    "email": "customer@email.com",
    "password": "$2a$12$S0j7gdE1CHp0tGyL976vtOYuf0fmhX/3Frx6QxwdajePcUSrjTBSK",
    "role": "customer",
    "createdAt": new Date()
})

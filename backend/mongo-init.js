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

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

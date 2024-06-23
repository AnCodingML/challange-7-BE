1. npm init -y
2. npm install express --save
3. npm install --save-dev nodemon
4. npm install --save-dev typescript @types/express @types/node ts-node-dev
5. tsc –init
6. buat file bin/www.ts pada root
7. tambahkan <code>"include": ["./bin/www.ts"]</code> di file tsconfig.json
9. Running <code>npm run dev</code>
10. npm i objection knex ts-node pg
11. npm i -D @types/pg
12. npx knex init -x ts
13. seting configurasi database di knekfile.ts
14. untuk membuat tabel <code>npx knex migrate:make cars<code>, <code>npx knex migrate:make users</code>, dst
15. running migrate <code>npx knex migrate:latest</code>
16. running seed <code>npx knex seed:make cars</code>, <code>npx knex seed:make users</code>, dst
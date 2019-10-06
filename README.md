# @saber2pr/mongodb

> promisify operators for mongodb.

```bash
yarn add @saber2pr/mongodb
```

---

### Example

```ts
import { connect, findOne } from "@saber2pr/mongodb"

const DATABASE_PORT = 27017
const DATABASE_NAME = "saber2pr"

const client = await connect(
  `mongodb://localhost:${DATABASE_PORT}/${DATABASE_NAME}`
)

const database = client.db(DATABASE_NAME)

const user_query = async (query: string) => {
  const site = database.collection("user")
  return await findOne(site, { name: query })
}
```

[details](./src/test/test.ts)

## start

```bash
yarn install
```

```bash
yarn start

yarn test
```

> Author: saber2pr

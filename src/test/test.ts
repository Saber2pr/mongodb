/*
 * @Author: saber2pr
 * @Date: 2019-10-06 14:23:15
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-10-06 15:16:18
 */
import { createServer } from "http"
import { connect, findOne, parseURLParams, getBody, insertOne } from "../core"

// config
const DATABASE_PORT = 27017
const DATABASE_NAME = "saber"
const HTTP_PORT = 3000

async function main() {
  // database init
  const client = await connect(
    `mongodb://localhost:${DATABASE_PORT}/${DATABASE_NAME}`
  )
  const database = client.db(DATABASE_NAME)

  // collections service
  const user_query = async (query: string | string[]) => {
    const site = database.collection("user")
    return await findOne(site, { name: query })
  }
  const user_add = async (user: object) => {
    const site = database.collection("user")
    return await insertOne(site, user)
  }

  // http server
  const server = createServer(async (req, res) => {
    // GET
    if (req.method === "GET") {
      // parse get query
      const params = parseURLParams(req.url)
      const query = params["q"]
      // match routes
      if (query && req.url.startsWith("/user")) {
        // database op
        const result = await user_query(query)
        // response
        res.end(JSON.stringify(result))
        return
      }
    }

    // POST
    if (req.method === "POST") {
      // parse post body
      const body = await getBody(req)
      // match routes
      if (body && req.url.startsWith("/user")) {
        // database op
        await user_add(JSON.parse(body))
        // HTTP code
        res.statusCode = 200
        // response
        res.end("user add ok.")
        return
      }
    }

    // Route Matched Fail
    res.end("404")
  })

  // listening
  server.listen(HTTP_PORT, () => console.log(`http://localhost:${HTTP_PORT}`))
  server.on("close", client.close)
}

main().catch(console.log)

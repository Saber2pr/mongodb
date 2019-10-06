/*
 * @Author: saber2pr
 * @Date: 2019-10-06 14:24:18
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-10-06 15:08:32
 */
import querystring from "querystring"
import URL from "url"
import { IncomingMessage } from "http"

export const parseURLParams = (url: string) =>
  querystring.parse(URL.parse(url).query)

export const getBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    const data = []
    req.on("data", chunk => data.push(chunk))
    req.on("end", () => resolve(data.join("")))
    req.on("error", err => reject(err))
  })

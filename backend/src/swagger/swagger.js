import postmanToOpenApi from 'postman-to-openapi'
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
const postmanCollection = path.join(__dirname, "MuziQi.postman_collection.json")

const outputFile = path.join(__dirname, "result.yml")


async function generateSwagger() {
    try {
        const options = {
            info: {
                title: "oversight Apis",
                version: "1.0.o-beta",
                description: "All oversight apis"
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Dev environment server'
                },
                {
                    url: 'https://backend-muziqi-53ef7f049bb5.herokuapp.com/',
                    description: 'Production environment server'
                }
            ],
            defaultTag : "General"
        }

     await postmanToOpenApi(postmanCollection, outputFile, options)

    } catch (err) {
        console.log(err)
    }
}

generateSwagger()
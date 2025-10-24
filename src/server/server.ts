import { createServer, Model } from "miragejs";


export function makeServer() {
    const server = createServer({
        models: {
            user: Model
        },

        routes() {
            this.namespace = "api"
            this.get("/users", (schema: any) => schema.users.all())
            this.get("/users/:id", (schema: any, request) => {
                return schema.users.find(request.params.id)
            })
            this.delete("/users/:id", (schema: any, request) => {
                return schema.users.find(request.params.id).destroy()
            })
            let nextid = 1
            this.post("/users", (schema: any, request) => {
                const attrs = JSON.parse(request.requestBody)
                attrs.id = nextid++
                // debugger
                return schema.users.create(attrs)
            })
        }
    })

    return server
}
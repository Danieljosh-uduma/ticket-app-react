import { createServer, Model } from "miragejs";


export function makeServer() {
    const server = createServer({
        models: {
            user: Model,
            ticket: Model
        },
        seeds(server) {
            server.create("user", {id: "user1", fullname: "josh", email: "josh@gmail.com", password: "josh123", phoneNumber: "12345678", show: false})
            server.create("user", {id: "user2", fullname: "josh2", email: "josh2@gmail.com", password: "josh123", phoneNumber: "12345678", show: false})
            server.create("ticket", {id: "ticket1", title: "Software issue", status: "open", priority: "high", description: "Payment methods not working and duplicate payments.", show: false})
            server.create("ticket", {id: "ticket2", title: "Dev Fest", status: "open", priority: "low", description: "Tech fest coming up this month", show: false})
            server.create("ticket", {id: "ticket3", title: "Email spams", status: "pending", priority: "medium", description: "Lot's of emails coming in", show: false})
            server.create("ticket", {id: "ticket4", title: "The boys s4", status: "closed", priority: "low", description: "nothing here", show: false})
            server.create("ticket", {id: "ticke5", title: "Portfolio issue", status: "closed", priority: "high", description: "fixing my portfolio for better work", show: false})
            server.create("ticket", {id: "ticket6", title: "HNG 13", status: "pending", priority: "high", description: "My life on the line", show: false})
            server.create("ticket", {id: "ticket7", title: "Read a book", status: "pending", priority: "low", description: "personal development", show: false})
        },
        routes() {
            this.namespace = "api"

            let nextUserid = 3
            this.post("/signup", (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                attrs.id = "user" +nextUserid++
                return schema.users.create(attrs)
            }, {timing: 500})

            this.get("/tickets", (schema) => {
                return schema.tickets.all()
            })

            this.get("/tickets/:id", (schema, request) => {
                return schema.tickets.find(request.params.id)
            })

            this.put("/tickets/:id", (schema, request) => {
                return schema.tickets.find(request.params.id).update(JSON.parse(request.requestBody))
            })

            this.delete("/tickets/:id", (schema, request) => {
                return schema.tickets.find(request.params.id).destroy()
            })

            let nextTicketId =8
            this.post("/tickets", (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                attrs.id = "ticket" + nextTicketId++
                return schema.tickets.create(attrs)
            }, {timing: 500})

            // this.get("/users", (schema) => schema.users.all())
            // this.get("/users/:id", (schema, request) => {
            //     return schema.users.find(request.params.id)
            // })
            // this.delete("/users/:id", (schema, request) => {
            //     return schema.users.find(request.params.id).destroy()
            // })
            // let nextid = 1
            // this.post("/users", (schema, request) => {
            //     const attrs = JSON.parse(request.requestBody)
            //     attrs.id = nextid++
            //     // debugger
            //     return schema.users.create(attrs)
            // })
        }
    })

    return server
}
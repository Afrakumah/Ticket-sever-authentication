export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "An api for user Auth and generating tickets",
      version: "1.0.0",
      description:
        "this is used for api documentation this is used for api documentation this is used for api documentation this is used for api documentation this is used for api documentation this is used for api documentation this is used for api documentationthis is used for api documentation",

      contact: {
        email: "angel@ymail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:7000/api",
        description: "development server",
      },
      {
        url: "http://localhost:6000/api",
      },
    ],

    tags: [
      {
        name: "Users",
        description: "Everything about the user",
        externalDocs: {
          description: "find out more about the users",
          url: "https://google.com",
        },
      },

      {
        name: "Tickets",
        description: "Everything about a users ticket",
      },
    ],

    paths: {
      "/users": {
        get: {
          summary: "details about all the users in the db",
          description: "this specifies getting all users",
          tags: ["Users"],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
        },
      },
    },

    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: {
              type: "string",
              description: "this is the users email",
            },

            password: {
                type: 'string',
                description: "this is the users email"
            },

            tickets: {

                type: 'array',
                description: "these are the users tickets"
            
            }
          },
        },
      },
    },
  },

  apis: ["./routes*.js"],
};

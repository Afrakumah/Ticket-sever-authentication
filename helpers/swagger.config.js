export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "An api for user Authentication and generating tickets",
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
                    // items: {
                    //   type: "object",
                    // },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },

        post: {
          tags: ["Users"],
          summary: "signup a user",
          description: "register a user",
          requestBody: {
            description: "Provide email and password",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Registration Successful ",
              content: {
                "application/json": {
                  schema: {
                    type: "object",

                    // items: {
                    //   type: "object",
                    // },
                  },

                  409: {
                    description: "user already exist",
                  },
                },
              },
            },
          },
        },
      },

      "/users/login": {
        post: {
          tags: ["Users"],
          summary: "User Authentication",
          description: "Login a user",
          requestBody: {
            description: "Provide email and password",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    //items: { $ref: "#/components/schemas/User" },
                    items: {
                      type: "object",
                    },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/tickets/{userId}": {
        post: {
          tags: ["Tickets"],
          summary: "Add a ticket",
          description: "Add a ticket to a specific user",
          operationId: "addTicket",
          parameters: [
            {
              name: "userId",
              in: "path",
              description: "The user to add ticket by id.",
              required: true,
              schema: {
                type: "string",
                format: "ObjectId",
              },
            },
          ],
          requestBody: {
            description: "Provide details for adding a ticket",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Ticket",
                },
              },
            },
          },
          responses: {
            201: {
              //description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    //items: { $ref: "#/components/schemas/User" },
                    // items: {
                    //   type: "object",
                    // },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/tickets": {
        get: {
          tags: ["Tickets"],
          summary: "Get all tickets",
          description: "Get all tickets in the db",

          responses: {
            200: {
              //description: "Operation successful",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/tickets/{id}": {
        delete: {
          tags: ["Tickets"],
          summary: "Delete a ticket by id",
          description: "Delete a ticket",
          operationId: "deleteTicket",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "The ticketId to delete a ticket.",
              required: true,
              schema: {
                type: "string",
                format: "ObjectId",
              },
            },
          ],

          responses: {
            200: {
              description: "Operation successful",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },

                  //   '401': {
                  //     'description': 'Unauthorized access'
                  //   }
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
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "this is the users email",
              required: true,
            },

            password: {
              type: "string",
              description: "this is the users email",
              required: true,
            },

            tickets: {
              type: "array",
              description: "these are the users tickets",
            },
          },
        },

        Ticket: {
          type: "object",
          properties: {
            title: {
              type: "string",
              required: true,
            },
            desc: {
              type: "string",
              required: true,
            },
            user: {
              type: "string",
              format: "ObjectId",
              description: "MongoDB id",
              required: true,
            },
          },
        },
      },
    },
  },

  apis: ["./routes*.js"],
};

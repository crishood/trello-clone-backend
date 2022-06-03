const swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "This is a document from a project Clone Trello",
    version: "1.0.0",
    title: "Clone Trello",
    contact: {
      email: "dannytorres0211@gmail.com ",
    },
  },
  tags: [
    {
      name: "User",
      description: "Operations about user",
    },
    {
      name: "Board",
      description: "Access to Boards",
    },
    {
      name: "List",
      description: "Access to Lists",
    },
    {
      name: "Cards",
      description: "Access to Cards",
    },
    {
      name: "Tags",
      description: "Access to Tags",
    },
  ],
  paths: {
    "cloneTrello/users": {
      get: {
        tags: ["User"],
        description: "This get to list all users",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Users found",
            schema: {
              $ref: "#/definitions/userGetResponse",
            },
          },
          404: {
            description: "Users not found",
          },
        },
      },
    },
    "cloneTrello/users/{userId}": {
      get: {
        tags: ["User"],
        description: "Returns a single user",
        produces: ["application/json"],
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of user to return",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "User found",
            schema: {
              $ref: "#/definitions/userGetResponse",
            },
          },
          404: {
            description: "User not found",
          },
        },
      },
      put: {
        tags: ["User"],
        description: "Updates an user with form data",
        produces: ["application/json"],
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of user that needs to be updated",
            required: true,
            type: "string",
          },
          {
            name: "name",
            in: "formData",
            description: "Update user name",
            required: false,
            type: "string",
          },
          {
            name: "nickname",
            in: "formData",
            description: "Update user nickname",
            required: false,
            type: "string",
          },
          {
            name: "email",
            in: "formData",
            description: "Update user email",
            required: false,
            type: "string",
          },
          {
            name: "password",
            in: "formData",
            description: "Update user password",
            required: false,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "User updated",
            schema: {
              $ref: "#/definitions/userUpdateResponse",
            },
          },
          400: {
            description: "User could not be updated",
          },
        },
      },
      delete: {
        tags: ["User"],
        description: "Deletes a user",
        produces: ["application/json"],
        parameters: [
          {
            name: "api_key",
            in: "header",
            required: false,
            type: "string",
          },
          {
            name: "userId",
            in: "path",
            description: "User id to delete",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "User destroyed",
          },
          400: {
            description: "User could not be destroyed",
          },
        },
      },
    },
    "cloneTrello/users/register": {
      post: {
        tags: ["User"],
        description: "This post is to register a new user",
        produces: ["application/json"],
        parameters: [
          {
            name: "name",
            in: "body",
            description: "User name",
            required: true,
            type: "string",
          },
          {
            name: "nickname",
            in: "body",
            description: "User nickname",
            required: true,
            type: "string",
          },
          {
            name: "email",
            in: "body",
            description: "User email",
            required: true,
            type: "string",
          },
          {
            name: "password",
            in: "body",
            description: "User password",
            required: true,
            type: "string",
          },
        ],
        responses: {
          201: {
            description: "User created",
            schema: {
              $ref: "#/definitions/userCreateResponse",
            },
          },
          400: {
            description: "User could not be created",
          },
        },
      },
    },
    "cloneTrello/users/login": {
      get: {
        tags: ["User"],
        description: "Logs user into the system",
        produces: ["application/json"],
        parameters: [
          {
            name: "email",
            in: "query",
            description: "The user email for login",
            required: true,
            type: "string",
          },
          {
            name: "password",
            in: "query",
            description: "The password for login in clear text",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            headers: {
              X_Expires_After: {
                type: "string",
                format: "date-time",
                description: "date in UTC when token expires",
              },
              X_Rate_Limit: {
                type: "integer",
                format: "int32",
                description: "calls per hour allowed by the user",
              },
            },
            schema: {
              type: "string",
            },
          },
          400: {
            description: "Invalid username/password supplied",
          },
        },
      },
    },
    "cloneTrello/boards": {
      get: {
        tags: ["Board"],
        description: "This get to list all boards",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Boards found",
            schema: {
              $ref: "#/definitions/boardGetResponse",
            },
          },
          404: {
            description: "Boards not found",
          },
        },
      },
    },
    "cloneTrello/boards/{boardId}": {
      get: {
        tags: ["Board"],
        description: "Returns a single board",
        produces: ["application/json"],
        parameters: [
          {
            name: "boardId",
            in: "path",
            description: "ID of board to return",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Board found",
            schema: {
              $ref: "#/definitions/boardGetResponse",
            },
          },
          404: {
            description: "Board not found",
          },
        },
      },
      put: {
        tags: ["Board"],
        description: "Updates a board with form data",
        produces: ["application/json"],
        parameters: [
          {
            name: "boardId",
            in: "path",
            description: "ID of board that needs to be updated",
            required: true,
            type: "string",
          },
          {
            name: "name",
            in: "formData",
            description: "Update board name",
            required: false,
            type: "string",
          },
          {
            name: "marked",
            in: "formData",
            description: "Update board marking",
            required: false,
            type: "boolean",
            default: "false",
          },
          {
            name: "closed",
            in: "formData",
            description: "Update board closing",
            required: false,
            type: "boolean",
            default: "false",
          },
          {
            name: "userId",
            in: "formData",
            description: "Update user with userId",
            required: false,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Board updated",
            schema: {
              $ref: "#/definitions/boardUpdateResponse",
            },
          },
          400: {
            description: "Board could not be updated",
          },
        },
      },
      delete: {
        tags: ["Board"],
        description: "Deletes a board",
        produces: ["application/json"],
        parameters: [
          {
            name: "api_key",
            in: "header",
            required: false,
            type: "string",
          },
          {
            name: "boardId",
            in: "path",
            description: "Board id to delete",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Board destroyed",
          },
          400: {
            description: "Board could not be destroyed",
          },
        },
      },
    },
    "cloneTrello/boards/{userId}": {
      post: {
        tags: ["Board"],
        description: "This post create a new board",
        produces: ["application/json"],
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of user to create a new board",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Board created",
            schema: {
              $ref: "#/definitions/boardPostResponse",
            },
          },
          400: {
            description: "Board could not be created",
          },
        },
      },
    },
  },
  definitions: {
    userCreateResponse: {
      type: "object",
      required: ["name", "nickname", "email", "password"],
      properties: {
        name: {
          type: "string",
        },
        nickname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    userGetResponse: {
      type: "object",
      required: ["name", "nickname", "email", "password"],
      properties: {
        name: {
          type: "string",
        },
        nickname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    userUpdateResponse: {
      type: "object",
      required: ["name", "nickname", "email", "password"],
      properties: {
        name: {
          type: "string",
        },
        nickname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    boardGetResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        marked: {
          type: "boolean",
          default: "false",
        },
        closed: {
          type: "boolean",
          default: "false",
        },
        user: {
          type: "array",
          $ref: "#/definitions/UserBoard",
        },
      },
    },
    UserBoard: {
      type: "object",
      properties: {
        nickname: {
          type: "string",
        },
        email: {
          type: "string",
        },
      },
    },
    boardUpdateResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        marked: {
          type: "boolean",
          default: "false",
        },
        closed: {
          type: "boolean",
          default: "false",
        },
        user: {
          type: "array",
          $ref: "#/definitions/UserBoard",
        },
      },
    },
    boardPostResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        marked: {
          type: "boolean",
          default: "false",
        },
        closed: {
          type: "boolean",
          default: "false",
        },
        user: {
          type: "string",
          example: "userId",
        },
      },
    },
  },
};

module.exports = swaggerDocument;

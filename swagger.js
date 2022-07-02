const swaggerDocument = {
  swagger: "2.0",
  info: {
    description:
      "This is a document from a project Trello, tool to teamwork management.",
    version: "1.0.0",
    title: "Trello",
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
      name: "Card",
      description: "Access to Cards",
    },
    {
      name: "Tag",
      description: "Access to Tags",
    },
  ],
  paths: {
    "trello/users": {
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
    "trello/users/{userId}": {
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
    "trello/users/register": {
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
    "trello/users/login": {
      post: {
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
    "trello/boards": {
      get: {
        tags: ["Board"],
        description: "This get to list all boards from authorization user",
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
    "trello/boards/{boardId}": {
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
    "trello/boards/{userId}": {
      post: {
        tags: ["Board"],
        description: "This post create a new board from authorization user",
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
    "trello/lists/{boardId}": {
      get: {
        tags: ["List"],
        description:
          "This get to list all Lists with boardId from authorization user",
        produces: ["application/json"],
        parameters: [
          {
            name: "boardId",
            in: "path",
            description: "ID of board to list all lists",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Lists found",
            schema: {
              $ref: "#/definitions/listGetResponse",
            },
          },
          404: {
            description: "Lists not found",
          },
        },
      },
      post: {
        tags: ["List"],
        description:
          "This post to create a List with boardId from authorization user",
        produces: ["application/json"],
        parameters: [
          {
            name: "boardId",
            in: "path",
            description: "ID of board to create a list",
            required: true,
            type: "string",
          },
        ],
        responses: {
          201: {
            description: "List created",
            schema: {
              $ref: "#/definitions/listPostResponse",
            },
          },
          400: {
            description: "List could not be created",
          },
        },
      },
    },
    "trello/lists/{listId}": {
      get: {
        tags: ["List"],
        description: "Returns a single list",
        produces: ["application/json"],
        parameters: [
          {
            name: "listId",
            in: "path",
            description: "ID of list to return",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "List found",
            schema: {
              $ref: "#/definitions/listGetResponse",
            },
          },
          404: {
            description: "List not found",
          },
        },
      },
      put: {
        tags: ["List"],
        description: "Updates a list with form data",
        produces: ["application/json"],
        parameters: [
          {
            name: "listId",
            in: "path",
            description: "ID of list that needs to be updated",
            required: true,
            type: "string",
          },
          {
            name: "name",
            in: "formData",
            description: "Update list name",
            required: false,
            type: "string",
          },
        ],
        responses: {
          201: {
            description: "List updated",
            schema: {
              $ref: "#/definitions/listUpdateResponse",
            },
          },
          400: {
            description: "List could not be updated",
          },
        },
      },
      delete: {
        tags: ["List"],
        description: "Deletes a list",
        produces: ["application/json"],
        parameters: [
          {
            name: "api_key",
            in: "header",
            required: false,
            type: "string",
          },
          {
            name: "listId",
            in: "path",
            description: "List id to delete",
            required: true,
            type: "string",
          },
        ],
        responses: {
          201: {
            description: "List destroyed",
          },
          400: {
            description: "List could not be destroyed",
          },
        },
      },
    },
    "trello/cards": {
      get: {
        tags: ["Card"],
        description: "This get to list all cards from authorization user",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Cards found",
            schema: {
              $ref: "#/definitions/cardGetResponse",
            },
          },
          404: {
            description: "Cards not found",
          },
        },
      },
    },
    "trello/cards/{listId}": {
      post: {
        tags: ["Card"],
        description: "This post to create a card with listId from logged user",
        produces: ["application/json"],
        parameters: [
          {
            name: "listId",
            in: "path",
            description: "ID of list to create a Card",
            required: true,
            type: "string",
          },
        ],
        responses: {
          201: {
            description: "Card created",
            schema: {
              $ref: "#/definitions/cardPostResponse",
            },
          },
          400: {
            description: "Card failed",
          },
        },
      },
    },
    "trello/cards/{cardId}": {
      get: {
        tags: ["Card"],
        description: "Returns a single card",
        produces: ["application/json"],
        parameters: [
          {
            name: "cardId",
            in: "path",
            description: "ID of card to return",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Card found",
            schema: {
              $ref: "#/definitions/cardGetResponse",
            },
          },
          404: {
            description: "Card not found",
          },
        },
      },
      put: {
        tags: ["Card"],
        description: "Updates a card with form data",
        produces: ["application/json"],
        parameters: [
          {
            name: "cardId",
            in: "path",
            description: "ID of card that needs to be updated",
            required: true,
            type: "string",
          },
          {
            name: "name",
            in: "formData",
            description: "Update card name",
            required: true,
            type: "string",
          },
          {
            name: "description",
            in: "formData",
            description: "Update card description",
            required: false,
            type: "string",
          },
          {
            name: "date",
            in: "formData",
            description: "Update card date",
            required: false,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Card updated",
            schema: {
              $ref: "#/definitions/cardUpdateResponse",
            },
          },
          400: {
            description: "Card could not be updated",
          },
        },
      },
      delete: {
        tags: ["Card"],
        description: "Deletes a card",
        produces: ["application/json"],
        parameters: [
          {
            name: "api_key",
            in: "header",
            required: false,
            type: "string",
          },
          {
            name: "cardId",
            in: "path",
            description: "Card id to delete",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Card destroyed",
          },
          400: {
            description: "Card could not be destroyed",
          },
        },
      },
    },
    "trello/tags/{cardId}": {
      get: {
        tags: ["Tag"],
        description:
          "This get to list all cards with listId from authorization user",
        produces: ["application/json"],
        parameters: [
          {
            name: "listId",
            in: "path",
            description: "ID of list to list all cards",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Tags found",
            schema: {
              $ref: "#/definitions/tagGetResponse",
            },
          },
          404: {
            description: "Tags not found",
          },
        },
      },
      post: {
        tags: ["Tag"],
        description: "This post to create a tag with cardId from logged user",
        produces: ["application/json"],
        parameters: [
          {
            name: "cardId",
            in: "path",
            description: "ID of card to create a Tag",
            required: true,
            type: "string",
          },
        ],
        responses: {
          201: {
            description: "Tag created",
            schema: {
              $ref: "#/definitions/tagPostResponse",
            },
          },
          400: {
            description: "Tag could not be created",
          },
        },
      },
    },
    "trello/tags/{tagId}": {
      get: {
        tags: ["Tag"],
        description: "Returns a single tag",
        produces: ["application/json"],
        parameters: [
          {
            name: "tagId",
            in: "path",
            description: "ID of tag to return",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Tag found",
            schema: {
              $ref: "#/definitions/tagGetResponse",
            },
          },
          404: {
            description: "Tag not found",
          },
        },
      },
      put: {
        tags: ["Tag"],
        description: "Updates a tag with form data",
        produces: ["application/json"],
        parameters: [
          {
            name: "tagId",
            in: "path",
            description: "ID of tag that needs to be updated",
            required: true,
            type: "string",
          },
          {
            name: "name",
            in: "formData",
            description: "Update tag name",
            required: true,
            type: "string",
          },
          {
            name: "color",
            in: "formData",
            description: "Update tag color",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Tag updated",
            schema: {
              $ref: "#/definitions/tagUpdateResponse",
            },
          },
          400: {
            description: "Tag could not be updated",
          },
        },
      },
      delete: {
        tags: ["Tag"],
        description: "Deletes a tag",
        produces: ["application/json"],
        parameters: [
          {
            name: "api_key",
            in: "header",
            required: false,
            type: "string",
          },
          {
            name: "tagId",
            in: "path",
            description: "Tag id to delete",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Tag destroyed",
          },
          400: {
            description: "Tag could not be destroyed",
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
    listGetResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        board: {
          type: "string",
          $ref: "#/definitions/BoardList",
        },
        cards: {
          type: "array",
          $ref: "#/definitions/CardsList",
        },
      },
    },
    BoardList: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
      },
    },
    CardsList: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        date: {
          type: "string",
        },
        tags: {
          type: "string",
          $ref: "#/definitions/TagsList",
        },
      },
    },
    TagsList: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
    },
    listPostResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        board: {
          type: "string",
          example: "boardId",
        },
        cards: {
          type: "array",
          example: [
            { name: "card1" },
            { description: "To do this task" },
            { date: "22-06-2022" },
            { tags: [{ name: "tag1" }, { name: "tag2" }] },
          ],
        },
      },
    },
    listUpdateResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        board: {
          type: "string",
          $ref: "#/definitions/BoardList",
        },
        cards: {
          type: "array",
          $ref: "#/definitions/CardsList",
        },
      },
    },
    cardGetResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        date: {
          type: "string",
        },
        list: {
          type: "array",
          $ref: "#/definitions/listCard",
        },
        tags: {
          type: "array",
          $ref: "#/definitions/tagsCard",
        },
      },
    },
    listCard: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
      },
    },
    tagsCard: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        color: {
          type: "string",
        },
      },
    },
    cardPostResponse: {
      type: "object",
      required: ["name", "list"],
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        date: {
          type: "string",
        },
        list: {
          type: "string",
          example: "listId",
        },
        tags: {
          type: "array",
          example: [{ name: "tag1" }, { color: "red" }],
        },
      },
    },
    cardUpdateResponse: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        date: {
          type: "string",
        },
        list: {
          type: "string",
          $ref: "#/definitions/listCard",
        },
        tags: {
          type: "array",
          $ref: "#/definitions/tagsCard",
        },
      },
    },
    tagGetResponse: {
      type: "object",
      required: ["name", "color"],
      properties: {
        name: {
          type: "string",
        },
        color: {
          type: "string",
        },
        card: {
          type: "array",
          $ref: "#/definitions/cardTag",
        },
      },
    },
    cardTag: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        date: {
          type: "string",
        },
      },
    },
    tagPostResponse: {
      type: "object",
      required: ["name", "color"],
      properties: {
        name: {
          type: "string",
        },
        color: {
          type: "string",
        },
        card: {
          type: "array",
          example: [
            { id: "2222333" },
            { name: "card1" },
            { description: "Description to card1" },
            { date: "22-06-2022" },
            { list: "listId" },
          ],
        },
      },
    },
    tagUpdateResponse: {
      type: "object",
      required: ["name", "color"],
      properties: {
        name: {
          type: "string",
        },
        color: {
          type: "string",
        },
        card: {
          type: "array",
          $ref: "#/definitions/cardTag",
        },
      },
    },
  },
};

module.exports = swaggerDocument;

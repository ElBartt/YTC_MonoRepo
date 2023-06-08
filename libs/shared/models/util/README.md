# shared-models-util

This library was generated with [Nx](https://nx.dev).

## Description

This library contains shared models that are used for the whole project. 
It is used to share models between backends and frontends for example, so the scope of this library is shared.

If this library grows too much, it will be split into smaller libraries.

## Zod
It's a good idea to use Zod for validation of these models because we can't trust the data that comes from the database.
In case of models changing in the database, zod will throw an explicit error so we can adapt our models.

# YTC [OnGoing]

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![test](https://github.com/ElBartt/YTC/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/ElBartt/YTC/actions/workflows/tests.yml) 

![Statements](https://img.shields.io/badge/statements-7%25-red.svg?style=flat) 
![Branches](https://img.shields.io/badge/branches-1.35%25-red.svg?style=flat) 
![Functions](https://img.shields.io/badge/functions-6.81%25-red.svg?style=flat) 
![Lines](https://img.shields.io/badge/lines-7.69%25-red.svg?style=flat)

# Table of contents
- [Introduction](#introduction)
- [How to start](#how-to-start)
- [Architecture](#architecture)

# Introduction

[TBD]

# How to start :
create a `.env` file at folder root, copy and replace that 
```
# DB 
DB_HOST = 'REPLACE-ME'
DB_NAME = 'REPLACE-ME'
DB_USER = 'REPLACE-ME'
DB_PASSWORD = 'REPLACE-ME'

# Youtube API 
YT_API_KEY = 'REPLACE-ME'

# OpenAI
OAI_API_KEY = 'REPLACE-ME'
OAI_ORG_ID = 'REPLACE-ME'
```
## Get Api keys here : 
- [OpenAI API key](https://platform.openai.com/account/api-keys)
- [OpenAI org ID](https://platform.openai.com/account/org-settings)
- [Youtube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=reflected-radio-138113)

## Create the database :
Run the `YTC.sql` on your favorite DB administration tool

## Generate an API key for the project :

run the `./apikey/generate.py` script to generate an API key for the project
(You will have to install python3 and the `pyperclip` package)

then add the generated key to the database apikey table, with as a name your pseudo

## Start the project : 
> `npm install` 
> 
> `npm start`

## Testing API :

Go on [localhost](http://localhost:1234/api-docs/), click on authorize and paste the generated API key

Then you can try out the differents routes

# Architecture :
```
YoutubeComment
├── .husky/
│   ├── _/
│   └── pre-commit
├── docs/
│   └── swagger.json
├── src/
│   ├── configs/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── ai.test.ts
│   ├── configurations.test.ts
│   ├── interface.test.ts
│   ├── models.test.ts
│   ├── setupTests.ts
│   └── youtubeAPI.test.ts
├── .env
├── .gitignore
├── LICENSE
├── README-DEV.md
├── README.md
├── YTC.sql
├── file_tree.txt
├── package-lock.json
├── package.json
└── tsconfig.json

```


# oxylume frontend
find and visit various TON sites

SSG website built with [Astro](https://astro.build) and [Svelte](https://svelte.dev)

##### support project
if you love this project and want to support its development you can donate on this TON address
`ishoneypot.ton` or `UQA705AUWErQe9Ur56CZz-v6N9J2uw298w-31ZCu475hT8U4`

## setup & run
to actually use a self-hosted instance of this website you are required to run [index service](https://github.com/oxylume/index)

### prerequisites
- pnpm

install deps
```bash
pnpm i
```

#### start app
change [environment variables](#environment-variables) if required (defaults work fine)

run dev server
```bash
pnpm dev
```

or build static website
```bash
pnpm build
```
build can be found in "dist/" directory

preview build
```bash
pnpm preview
```

#### lint
dry run
```bash
pnpm lint
```

auto fix what possible
```bash
pnpm lint:fix
```

## environment variables
| name | default | note |
| --- | --- | --- |
| `API_URL` | http://localhost:8081 | [index service](https://github.com/oxylume/index) url to fetch sites data from

### set using `.env` file
create `.env` file in the project's directory
```
API_URL=https://bogus.com
```

### set using the CLI
```
API_URL=https://bogus.com pnpm build
```

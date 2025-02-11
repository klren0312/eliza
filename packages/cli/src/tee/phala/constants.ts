export const CLI_VERSION = "0.1.0";
export const CLOUD_API_URL = "https://cloud-api.phala.network";
export const CLOUD_URL = "https://cloud.phala.network";
export const TEE_SIMULATOR = "phalanetwork/tappd-simulator:latest";
export const COMPOSE_FILES_DIR = ".tee-cloud/compose-files";

export const DOCKER_COMPOSE_ELIZA_V2_TEMPLATE = `version: '3'
services:
  eliza:
    image: {{imageName}}:{{tag}}
    container_name: eliza
    command: bun run dev
    stdin_open: true
    tty: true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
{{#each envVars}}      - {{{this}}}
{{/each}}
    ports:
      - "3000:3000"
    restart: always

volumes:
  eliza:`;

export const DOCKER_COMPOSE_ELIZA_V1_TEMPLATE = `version: '3'
services:
  eliza:
    image: {{imageName}}:{{tag}}
    container_name: eliza
    command: >
      /bin/sh -c "
      cd /app &&
      echo {{characterBase64Data}} | base64 -d > characters/{{characterName}}.character.json &&
      bun run start --non-interactive --character=characters/{{characterName}}.character.json
      "
    stdin_open: true
    tty: true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - eliza:/app/packages/client-twitter/src/tweetcache
      - eliza:/app/db.sqlite
    environment:
{{#each envVars}}      - {{{this}}}
{{/each}}
    ports:
      - "3000:3000"
    restart: always

volumes:
  eliza:`;
# monorepo

## instalacao no linux
- instalar docker
- configurar docker para usar sudo
- instalar docker-compose, 1.29.x +
- para desenvolvimento: instalar o "nodejs" e o "mongodb compass"

## para executar em modo desenvolvimento

- ### na primeira execução do projeto:
  > docker-compose pull

- ### fluxo padrão de execução em modo de desenvolvimento:

  - em ./monorepo
    - subir os bancos de dados em containers
      > \# cd ../monosever \
      > docker-compose up -d  mongo \
      > docker-compose up -d influxdb

    - subir o frontend em modo de desenvolvimento
      > \# cd ./frontend \
      > npm install \
      > npm run dev

    - subir o backend em modo de desenvolvimento
      > \# cd ./backend \
      > npm install \
      > npm run build \
      > docker-compose up \
      > npm run watch

- ### caso queira simular o envio de dados para o influxdb
  - em ./monorepo/
    - subir o collector e o mqtt-broker
      > \# cd ./monoserver \
      > docker-compose up -d collector \
      > docker-compose up -d vernemq

    - subir o gerador de dados
      > \# cd ./generator \
      > npm install
      > node ./generate-data-to-collector.js
    
- ### caso queira remover os containers
  > docker-compose down 

- ### caso queira resetar os dados dos bancos, em ./monoserver:
  > docker-compose down \
  > sudo rm -rf ./mongodb \
  > sudo rm -rf ./influxdb
  
## em produção: para executar o projeto pela primeira vez
  > docker-compose pull \
  > docker-compose up

## em produção: para recriar os containers
  *para maquinas de desenvolvimento
    - em ./backend:
      > rm -r ./node_modules
      > rm -r ./dist/*
      
    - em ./frontend:
      > rm -r ./node_modules
      > rm -r ./dist/*
    
  > docker-compose down \
  > docker-compose build \
  > docker-compose up

## para acessar o frontend em modo de produção
- http://localhost:5052

## para acessar o frontend em modo de desenvolvimento
- http://localhost:8080

## para acessar backend em modo de produção
- http://localhost:5050

## para acessar backend em modo de desenvolvimento
- http://localhost:8082

## para subir novos códigos ao repositório
- é necessário commitar alterações no branch dev e depois fazer pull request e merge para o branch main

  - ## para trocar para o branch dev
    > git switch dev
    > # ou entao: git checkout dev *pesquisar diferenca

  - ## para fazer commits
    > git add *file-name* \
    > git commit -m "*commit-message*"

    - tentar usar a convenção *conventional commits*
      - https://www.conventionalcommits.org/en/v1.0.0/

  - ## para transferir alterações da main para dev
    > git rebase main \
    > \# após fazer rebase você pode querer atualizar o branch dev fazendo commit...
    

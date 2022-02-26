<h1> 🤝 Metodologia de Trabalho </h1>

Para subir novos códigos ao repositório é necessário commitar alterações na branch dev e depois fazer pull request e merge para a branch main

  Para trocar para o branch dev:
  ```sh
    git switch dev
  ```
  ou entao:
  ```sh
     git checkout dev
  ```
  
  Para fazer commits:
  ```sh
    git add *file-name*
    git commit -m "*commit-message*"
  ```
  
  Para descrever os commits usar [*conventional commits*](https://www.conventionalcommits.org/en/v1.0.0/)

  Para transferir alterações da main para dev
  ```sh
    git rebase main
  ```
  após fazer rebase você pode querer atualizar o branch dev fazendo commit.

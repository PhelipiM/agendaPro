 # AgendaPro

 Minimal README for local development.

 ## Pré-requisitos

 - Node 18+ recomendado
 - pnpm instalado (o projeto usa pnpm workspace)

 ## Instalação

 ```bash
 pnpm install
```

 ## Executar em desenvolvimento

 ```bash
 pnpm dev
```

 ## Build

 ```bash
 pnpm build
```

 ## Testes

 - Atualmente não há scripts de teste configurados. Recomenda-se adicionar `vitest` ou `jest` e um script `test` em `package.json`.

 ```bash
pnpm test
```

## Formatação

Formate o código com Prettier (adicionado ao `devDependencies`):

```bash
pnpm format
```

 ## Observações

 - Verifique se o projeto pretende usar `react-router` ou `react-router-dom` no ambiente de browser. Eu atualizei vários imports para `react-router-dom` conforme prática comum.
 - Após alterações, rode uma formatação/lint: `pnpm install` e `pnpm dev` para validar que tudo inicia corretamente.


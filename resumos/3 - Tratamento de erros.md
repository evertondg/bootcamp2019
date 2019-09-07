# Tratamento de exceções

Para manter o controle e ficar sabendo dos erros que ocorrem na sua aplicação, utilizaremos um sistema de monitoramento de erros.

Utilizaremos o [Sentry.io](https://docs.sentry.io) por sua boa integração com o nodeJS.

> O Sentry é uma plataforma de rastreamento de erros que ajuda os desenvolvedores a monitorar e corrigir falhas em tempo real.

Após criar a conta no site e gerar uma aplicação você é direcionado para uma tela com instruções de instalaçao referentes a tecnologia que escolheu.

Basicamente devemos instalar as dependências, inicializar o Sentry em nosso metodo construtor e colar uma função junto aos middleawares de forma que toda requisição passe por ela e uma outra função ao fim das rotas para que receba os erros. Para isso devemos:

Instalação:

```javascript
yarn add yarn add @sentry/node@5.6.2
```

Importação

```javascript
import * as Sentry from '@sentry/node';
```

Por boa pratica, criamos um **sentry.config** em nossa pasta _config_ para guardar o dns que é um identificador da sua aplicação no sentry. o arquivo também deve ser importado

```javascript
import sentryConfig from './config/sentry';
```

Iniciação do Sentry no metodo construtor passando o parametro do sentryConfig

```javascript
Sentry.init(sentryConfig);
```

Como primeiro middleware devemos colocar:

```javascript
//Antes de todas as rotas
this.server.use(Sentry.Handlers.requestHandler());
```

Depois de todas as rotas devemos colocar:

```javascript
//Antes de todas as rotas
this.server.use(Sentry.Handlers.errorHandler()););
```

O Express não retorna erros quando utilizamos o async, porém podemos resolver isto adicionando um pacote chamado [**express-async-errors**](https://www.npmjs.com/package/express-async-errors), para isto :

```
yarn add express-async-errors
```

depois basta importar ela após o express e antes das rotas, também no app.js

```javascript
import 'express-async-errors';
```

Neste ponto, tudo já está configurado porém ao utilizar o insomnia para gerar algum erro em um teste veremos que nao existirá retorno e ele continuará tentando obter resposta da api. Porém o Sentry já recebeu o erro.

Para corrigir esse "problema" criamos o middleware exceptionHandler() que irá retornar o erro para nossa requisição, esse Middleware ficará na ultima posição em nossa lista de Middlewares, de preferencia após as rotas.

esse middleware normalmente recebe os parametros **(req,res,next)**, já um middleware de tratamento de erros recebe **(err,req,res,next)**

Nesse Middleware, utilizaremos o pacote [YOUCH](https://www.npmjs.com/package/youch). esse pacote serve para fazer uma tratativa das mensagens de erro, para dar uma visualização melhor para o desenvolvedor.

```javascript
yarn add youch
```

após instalar o Youch, é necessário Importa-lo

```javascript
import Youch from 'youch';
```

Nosso middleware exceptionHandler() ficará assim:

```javascript
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
    });
  }
```

O Sentry permite várias integrações com Github, envio de emails, Slack, etc. Assim podemos fazer um monitoramento dos erros de forma eficiente.

# Váriaveis de Ambiente

Váriaveis de ambiente são variáveis que podem ter os valores alterados dependendo do ambiente. Além disso nos permitem alterar de forma rápida qualquer variável que é utilizada em nosso sistema.

Para utilizar as váriaveis de ambiente, criamos o arquivo **.env** na raiz do nosso projeto. Este arquivo deve ser adicionado em nosso arquivo _**.gitignore**_, já que informações confidenciais como endereços e senhas de bancos e servidores estarão contidas neste arquivo.

o Formato dentro dos arquivos deve ser o seguinte:

    APP_URL = http://localhost:3333
    NODE_ENV = development

Repare que o nome da váriavel é inserido em caixa alta e o sinal de = atribui o valor da variável, sem aspas ou outros sinais.

Podemos criar um arquivo **.env.example** para comitar, porém ele não conterá os valores das variáveis:

Nossos arquivos ficarão com estas variáveis.

    APP_URL=http://localhots:3333
    NODE_ENV=development

    # Auth

    APP_SECRET=bootcampgobarbernode

    # Database

    DB_HOST=
    DB_USER=
    DB_PASS=
    DB_NAME=

    # Mongo

    MONGO_URL=

    # Redis

    REDIS_HOST=127.0.0.1
    REDIS_POST=6379

    # Mail

    MAIL_HOST=
    MAIL_PORT=
    MAIL_USER=
    MAIL_PASS=

    # Sentry
    SENTRY_DSN=

Para nos auxiliar com o arquivo de variável de ambiente, instalamos o pacote _**dotenv**_, para isto utilizamos o yarn:

    yarn add dotenv

Para utilizar as váriaveis deste arquivo é necessário importá-lo no arquivo **app.js**, na primeira linha do arquivo. Como este arquivo é o principal e tudo praticamente passa por ele, a maior parte do sistema já tera acesso apenas com essa importação:

```javascript
import 'dotenv/config';
```

Essa importação junto com o pacote **dotenv** faz com que todas as variáveis de ambiente fiquem armazenadas em uma variável global do node chamada _**process.env**_, logo poderemos chamar qualquer variavel como o exemplo abaixo:

```javascript
// ambiente de desenvolvimento
process.env.NODE_ENV;
//nome do banco de dados
process.env.DB_NAME;
```

Além de importar em nosso app.js, devemos importar também no arquivo _**queue.js**_, já que ele roda em um processo à parte de nossa aplicação.Neste arquivo importamos da mesma forma que foi feito no _**app.js**_

Já no arquivo _**database.js**_ a importação deve ser feita da seguinte forma:

```javascript
require('dotenv').config();
```

OU

```javascript
require('dotenv/config');
```

PRONTO !!! agora basta encontrar a posição das suas variáveis e subistitui-las!

EXEMPLO:

No arquivo _**app.js**_ o método _exceptionHandler()_ exibe os erros e é importante mostra-los apenas no ambiente de dev, para isso fazemos uma condição para verificar se o ambiente é de desenvolvimento:

```javascript
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
```

ATENÇÃO:

- Lembre-se sempre que devemos utilizar a sintaxe _process.env.VARIAVEL_;
- Adicione o .env no .gitignore;
- Crie um arquivo .env.example sem os valores sensíveis de variáveis como senhas e endereços, deixe apenas o que o desenvolvedor que for utilizar possa preencher para rodar no ambiente dele.

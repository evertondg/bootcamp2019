# Campos virtuais

**Objetivo:** Criar campos tratados ou calculados que são retornados apenas na API e não existem nos bancos de dados.

Criamos estes campos no nosso Model junto com os campos que são retornados do banco de dados pelo Sequeline no metodo init.

O exemplo abaixo retorna um campo na api retornando _true_ ou _false_ através do método **isBefore()** do [date-fns](https://date-fns.org/docs/Getting-Started), assim o usuário não corre o risco de agendar um horário no passado.

```javascript
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
```

O _this.date_ é um campo do mesmo objeto que está sendo gerado.Podemos dizer que ele está sendo tratado e retornado em um outro formato para facilitar na hora de utilizar no frontend.

O próximo exemplo nos mostra como verificar se a data atual é antes de duas horas do agendamento, para que possamos definir que o usuário só pode cancelar agendamentos com até duas horas de antecedencia, Veja que ainda utilizamos o **isBefore()** porém comparamos a data atual com a data que existe de cadastro no banco subtraindo 2 horas com o método **subHours()**, também fornecido pelo sequelize.

```javascript
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
```

Os campos Virtuais podem ser retornados em nosso _Controller_ normalmente no momento que fazemos o **.findAll()**

```javascript
...,

  attributes: ['id', 'date', 'canceled_at', 'past', 'cancelable'],

...
```

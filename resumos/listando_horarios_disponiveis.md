# Listando horários disponíveis do prestador de serviços

**Objetivo:** Criar rotas para listar horários disponíveis em um dia e para um determinado prestador dentro de um range de horários em que o prestador trabalha.

Criamos um novo Controller (AvailableController). Embora seja novos agendamentos estamos abstraindo a responsabilidade de mostrar apenas os disponíveis para esta classe, deixando assim a classe Appointments responsável apenas pelos agendamentos no geral.

Ao preparamos o insomnia, criamos uma rota get no endereço _base_url/providers/:id/available_, Vale lembrar que precisamos do parametro da data atual para trazer apenas os agendamentos do dia corrente (que vem no formato timestamp pelo react no frontend)

O módulo que nos auxilia com todo o tratamento de datas no nodeJS é o [**date-fns**](https://date-fns.org/docs/Getting-Started).
Devemos importa-lo.

```javascript
import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter
} from 'date-fns';
```

## Op - Sequelize

Para buscar as datas agendadas utilizaremos o [**Op**](https://sequelize.org/master/manual/querying.html#operators) do _Sequelize_.

O [**Op**](https://sequelize.org/master/manual/querying.html#operators) pode ser visto como os operadores de condicional no SQL como between, notIn, like, etc. Estes operadores associados as funcoes startOfDay e endOfDay do [**date-fns**](https://date-fns.org/docs/Getting-Started) permitem que encontremos todos agendamentos de um dia.

```javascript
import { Op } from 'sequelize';
```

## DATAS

Utilizaremos uma lista de horários fixas como sendo o horário de trabalho do prestador de serviço

```javascript
const schedule = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '23:50',
  '23:55'
];
```

Os métodos setHours(), setMinutes() , setSeconds() e format()
nos ajudarão a montar o retorno da data no formato UTC:

- format(value, "yyyy-MM-dd'T'HH:mm:ssxxx")

```javascript
setSeconds(setMinutes(setHours(DTA_ATUAL, hour), minutes), 0);
```

## AVAILABLE

Para verificar se o horário esta livre usamos:

- **isAfter(p1,p2)** retorna se o parametro 1 acontece depois do 2, logo nos ajuda identificar se todos os agendamentos do dia (encontrados com o findAll e filtrado com o [Op:between]) já passaram, afinal não da pra fazer já que a hora passou nao é? hehe.

- Além de saber se já passou o horário, também podemos ver se o hora do agendamento está contida no array de horários usando o **.find()** do javascript, logo se existir agendamento e o horário na lista, ele não está disponível e nao vamos mostrar para o usuário agendar.

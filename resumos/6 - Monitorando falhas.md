# Monitoramento de Falhas no envio de email

É possivel fazer o monitoramento de falhas no envio de email através de um método on('failed') aplicado no momento em que a fila é processada. Ele atua basicamente como um listener que retorna uma função quando "ouve" uma falha.

Basta adicioná-lo da seguinte forma:

```javascript
bee.on('failed', this.handleFailure).process(handle);
```

veja que this.handleFailure é retornado para escrever a falha que foi interceptada ao processar a fila, para escrever no terminal definimos esta função da seguinte forma:

```javascript
  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: Failed `, err);
  }
```

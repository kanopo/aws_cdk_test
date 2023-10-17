# Test CDK
## Valce


## Init
Per poter fare il packaging fi una app con cdk e' necessario aver la cli di cdk installata:
MacOS:
```bash
npm i -g aws-cdk
```
Linux:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
npm i -g aws-cdk
```

## Packaging app cdk
_VALCE: packaging applicazione di cdk (diciamo alla gente di usare la CLI di AWS? Wrappiamo noi la cosa in una nostra cli e usiamo una sdk di AWS?)_


Per il packaging delle applicazioni magari si puo' buttare giu' un template con le cose piu' comuni in SF srl ma oltre a quello non andrei, mi sembra una cli semplice con letteralmente meno di 10 comandi:
```bash
cdk bootstrap # deploya uno stack su cloudformation per far funzionare cdk(eliminato lo stack rimangono i bucket s3 pieni)
cdk deploy # deploya lo stack su cloudformation (riconosce lo stack solo dal nome che gli si da come cloudformation)
cdk destroy # distrugge lo stack facendo riferimento al nome di quest'ultimo
cdk diff # differenze fra stack online e stack locale 
cdk init # creare un progetto nella cartella corrente con vari linguaggi e vari template
cdk synth # genera il template in formato JSON (penso si possa settare anche in yaml e comunque il synth lo genera ogni volta in una cartella)
```

Al mio livello di conoscenza attuale non mi sembra il caso di wrappare perche alal fine si vanno a chiamare solo `cdk deploy` e `cdk destroy`.([guida cli](https://docs.aws.amazon.com/cdk/v2/guide/cli.html))


## Deploy app CDK su Shippix

_VALCE: upload applicazione di CDK sulla piattaforma dove la gente possa deployarsi i suoi stack_

Dai DOCS di AWS mi sembra di capire che una persona possa dichiarare tanti stack diversi all'interno di una stessa app cdk, l'unico limite che mi sembra di vedere e' dovuto al template di cloudformation che al 17/10/2023 permette _solo_ 500 risorce per template ([source](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-limits.html)).

Ad esempio c'e' la possibilita' di _nestare_ stack in una unica app:
```ts
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();
const stack1 = new cdk.Stack(app, 'my-stack', {
    env: {
        region: process.env.REGION,
    },
    description: 'My CDK Stack',
});

const stack2 = new cdk.Stack(app, 'another-stack', {
    env: {
        region: process.env.REGION,
    },
    description: 'Another stack in the same app',
});

app.synth();
```
Dubbio riguardo alla sanificazione degli input dell'utente???

NOTA: `app.synth()` genera continuamente la versione json del template in `cdk.out/NOME_STACK.template.json`.


## Deployment stacks
_VALCE: deployment degli stack_

Per effettuare il deployment degli stack bisogna che lo stack companion di cdk sia deployata in cloudformation(altrimenti `cdk bootstrap`) e dopo di che si possono tranquillamente usare comandi come:
- `cdk deploy`
- `cdk destroy`

(NOTA: per trovare gli stack CDK fa riferimento solo al nome, quindi se cambio il nome di uno stack deployato e poi provo a fare azioni su di esso, cdk dira' che lo stack con quel nome non esiste)


## ENV varibles
_VALCE: Context / env variables stack? Parametri di cloudformation in stack di CDK?_


Dai docs mi sembra di capire che si possa fare tutto quello che cloudformation permette con l'aggiunta di poter far riferimenti a parametri mediante l'utilizzo del linguaggio di programmazione scelto come accedere ai vari parametri e far riferimenti all'interno del codice e senza dover prendere valori esportati da altri stack:
```ts
const stack = new cdk.Stack(app, 'my-stack', {
    env: {
        region: process.env.REGION, // passato tramite .env file
    },
    description: 'My CDK Stack',
});
```



E banalmente sono permesse le solite funzioni per parametrizzare, esporre outputs e funzioni condizionali:
```ts
const stackOutput = new cdk.CfnOutput(stack, 'my-stack-output', {
    value: 'Hello, CDK! You deployed me using the AWS CDK CLI!',
    description: 'My CDK Stack Output',
});

const conditionalValue = new cdk.CfnCondition(stack, 'my-stack-conditional', {
    expression: cdk.Fn.conditionEquals('true', 'true'),
    
});

const dbport = new cdk.CfnParameter(stack, 'dbport', {
    type: 'Number',
    default: 3306,
    minValue: 1024,
    maxValue: 65535,
    description: 'The port number of the database',
    allowedValues: ['3306', '5432', '1433'],
});
```

Per la risposta breve direi che tutte le variabili dello stack sono accessibili all'interno del _template_ scritto con typescript e la dev experience mi sembra notevolmente migliore solo per il fatto che non ci sono limiti di indentazione e tutti i campi sono accessibili mediante dot notation.

Tutte le variabili del Context sono accessibili anche con:
- Through the --context option to the cdk command. (These values are always strings.)
- In the project's cdk.context.json file.
- In the context key of the project's cdk.json file.
- In the context key of your ~/.cdk.json file.
- In your AWS CDK app using the construct.node.setContext() method.




_VALCE: Quanto è tipico avere dei template di CDK parametrizzati che ricevano poi env variables / variabili dal context e poi parametrizzarli?_

Penso non ci siano problemi a parametrizzare delle variabili di AWS con cdk(forse piu' comodo/ergonomico che con yaml).

_VALCE: Come si differenziano da una repository di template nel caso le applicazioni di cdk?_

NON CAPITO da richiedere




## Ipotesi
perché magari dire alla gente "caricati il tuo codice di applicazioni di cdk, poi me le deploy come stack specificando dei parametri (nelle 3 modalità con cui da quel che ho capito puoi farlo) e puoi averne n istanze per ciascuna" è una cosa che non ha tanto senso per CDK come ce l'ha per template di cf




## Useful links

- [AWS resource and property types reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)
- [AWS Construct library](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html)


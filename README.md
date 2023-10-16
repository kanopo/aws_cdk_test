# Imparando il corpo umano(jk cdk)


## Setup CDK
```bash
mkdir my-project
cd my-project
cdk init app --language typescript
```

Si deve modificare all'occorrenza qualche file e si e' a posto.

## Base project
Il progetto base include solo uno stack di cloudformation vuoto:

```bash
import { App, Stack } from "aws-cdk-lib";

const app = new App();
const stack = new Stack(app, "StackName");
```

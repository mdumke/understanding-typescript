# Typescript

Typescript is basically JavaScript with a type system. Adding type annotations makes it possible to perform static error checking. This does not help with performance optimization. Before running code in the browser or in Node, Typescript needs to be compiled to JavaScript.

```bash
# install the typescript compiler
npm install -g typescript ts-node

# compile a file
tsc index.ts

# run the compiled version
node index.js

# both steps in one
ts-node index.ts
```

When experimenting with syntax, it may be helpful to compile and run scripts with `ts-node`. For larger projects, Babel is a common choice for working with Typescript.

To get an overview over the Typescript syntax, check out [features](./features), and [maps](./maps) has a small example project that demonstrates the use of interfaces.

## Sources

- Official Typescript documentation
- Typescript: The Complete Developer's Guide, Stephen Grider / Udemy



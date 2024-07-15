## Usage

### Development

Just run and visit http://127.0.0.1:3000/

```bash
yarn dev
```

### Build

To build the App, run

```bash
yarn build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your repository, `OK` along the way, and your App will be live in a minute.

### Issues

#### Husky

If pre-commit hooks are not working be sure that you have installed husky: `husky install`.

By default this command should be triggered after yarn/npm deps are installed.

## Why

I have created several React apps recently. Setting the configs up is kinda the bottleneck for me to make the ideas simply come true within a very short time.

So I made this starter template for myself to create apps more easily, along with some good practices that I have learned from making those apps. Feel free to tweak it or even maintains your own forks.

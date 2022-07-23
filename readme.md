# @mind-elixir/export-xmind

`@mind-elixir/export-xmind` is a plugin of [mind-elixir-core](https://github.com/ssshooter/mind-elixir-core). You can use `@mind-elixir/export-xmind` to export a `.xmind` file.

## Install

```
npm i @mind-elixir/export-xmind jszip file-saver
```

## How To Use

```javascript
import MindElixir from 'mind-elixir'
import exportXmind from '@mind-elixir/export-xmind'

const mind = new MindElixir(options)
mind.install(exportXmind)
mind.init(data)

const blob = await mind.exportXmind() // get blob

mind.exportXmindFile() // download file
```

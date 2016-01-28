# superpowers-package-manager-plugin

A plugin to use and manage external packages in superpowers projects.


## Motivation

When using superpowers alone, it can be quite laborious to use external code in your project.
You need to get the code, create a specific plugin for that external code, install it in superpowers, restart the server. And finally access your hard coded dependency which will be available in all your games as long as your plugin is installed...
Yes, I said it was laborious; But honestly, while making games, you don't need that much extra code. The superpowers builtin API's are quite complete.

However, sometimes you need some specific stuff (e.g. An advanced math library), and that's why I made this plugin.

It basically let you chose the libraries you need for your project from your favorite package manager (only npm is supported atm, but I know it's your favorite anyway).


## Install

There will be a system/plugin manager in superpowers 1.0 but for now, you need to install it manually.  
Go to the [release page](https://github.com/antca/superpowers-package-manager-plugin/releases) and download the latest version.
Create the `antca` directory in `${superpowersPath}/resources/app/systems/game/plugins` if it does not already exists, then unzip the archive content in this directory.

Restart the superpowers server and the plugin should be operational.


## Usage

After the installation, you will be able to create a new type of asset, A `Dependency bundle`.
This asset represents the external dependencies, you can have multiple bundles for organizing your dependencies or if you want multiple versions of a package in your project (not the best idea though).

### Editor

#### Searching

You can search packages on npm and add them to your dependencies. If you don't find the desired dependency in the result list, you can type his complete name and confirm with the `enter` key. Not all packages are indexed by the npm search (autocomplete) engine, I guess.


#### Viewing

When you have found something interesting in the search list, you can view it. Some basic information and the package's readme are displayed.
When you think this is the package you need, you just have to click the `Add to dependencies` button.  
The readme can be quite useful while developing with superpowers. You can easily view it by using the `view` button in the `Actions` column of the `Manage` panel.


#### Editing

After you have clicked the big green button, you should be in the edit view.
The main goal of this panel is to let you customize a bit the dependency.  
First, you can choose a specific version if the latest one doesn't suit you.  
Then, you can add specific bindings. A binding is a mapping from a path of a node module to a property of the asset.  
Most of the time you don't need to edit/add the bindings. And if you messed with them, you can just click the reset button to set the dependency back in the default state.


### Using dependencies in your scripts

After you have set up a dependency, the way to use it is quite straight forward.
```javacript
const myDependency = Sup.get('My dependency bundle')['myBinding'];
myDependency.someUsefulFunction();
```


### Running

You can now simply run your project. If you edited the dependency bundle since the last run, the plugin will install/bundle you dependencies and then run the project, otherwise he will just copy the last bundle.


## Technical details

The way this plugin works is quite simple. It just downloads the dependencies via the npm node API and bundle them with webpack.

For security reasons, the npm install scripts (`preinstall`, `install`, `postinstall`) are not run. If you need it on your server and trust the users using it, you can enable them by editing the `src/config/index.js` file in the plugin's directory (You will need to rebuild the plugin).

## Development

### Requirements

- [nodejs and npm](https://nodejs.org)
- [superpowers sources](http://docs.superpowers-html5.com/en/development/building-superpowers)

### Building the plugin from sources

```shell
cd ${superpowersPath}/systems/supGame/plugins
mkdir antca
cd antca
git clone git@github.com:antca/superpowers-package-manager-plugin.git
cd superpowers-package-manager-plugin
npm install && NODE_ENV=development npm run build
```

### Develop with watch mode
After the initial setup, you can edit the plugin code in watch mode, gulp will rebuild the sources on save.

```shell
NODE_ENV=development gulp watch
```

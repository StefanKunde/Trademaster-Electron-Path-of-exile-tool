import * as React from 'react';

export interface AppProps {
}

export default class App extends React.Component<AppProps, any> {
  render() {
	return (
	  <div>
		<h1>Electron-React-Typescript-HotReload template is working!</h1>
	  </div>
	);
  }
}
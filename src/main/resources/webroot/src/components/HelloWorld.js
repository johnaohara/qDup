import React from 'react';
import SimpleCounter from './SimpleCounter';
import ActiveOutput from './ActiveOutput';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <SimpleCounter />
        <ActiveOutput />
      </div>
    );
  }
}

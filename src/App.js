import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './components/Header'
import Chat from './components/Chat'

function App() {
  return (
    <div className="app" style={styles.app}>
      <Header title='Journey.ai Chat' />
      <div className="container" style={styles.container}>
        <Chat channels={['football']}/>
      </div>

    </div>
  );
}

export default App;

const styles={
  app: {
    display: `flex`,
    flexDirection: 'row',
    marginLeft: '30px',
    marginRight: '30px'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
  }
}

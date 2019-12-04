import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import Header from './components/Header'
import Chat from './components/Chat'

function App() {
  return (
    <Router>
      <div className="app" style={styles.app}>
        <Header title='Journey.ai Chat' />
        <div className="container" style={styles.container}>
          <Switch>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </div>

      </div>
    </Router>
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

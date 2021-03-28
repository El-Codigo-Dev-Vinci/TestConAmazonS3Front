import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NewAudio } from './components/Audios/NewAudio';
import Home from './components/Home';

export default function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/new/audio">
            <NewAudio />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

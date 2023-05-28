import './App.css'
import {Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import NotFound from './components/NotFound'
import Home from './components/Home'
import CourseRoute from './components/CourseRoute'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id/" component={CourseRoute} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App

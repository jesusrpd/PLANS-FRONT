import Login from './views/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Page404 from './views/404';
import Panel from './views/Panel'
import {PrivateRoute} from './routes/PrivateRoute'
import Plan from './views/Plan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/panel' element={
          <PrivateRoute>
            <Panel/>
          </PrivateRoute>
        }/>
        <Route path='/plan/:id' element={
          <PrivateRoute>
            <Plan/>
          </PrivateRoute>
        }/>
        <Route path='/*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

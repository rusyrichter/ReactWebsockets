import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import Signup from './Signup'
import Home from './Home'
import Login from './Login'
import Logout from './Logout';
import { AuthContextComponent } from './AuthContextComponent';
import PrivateRoute from './PrivateRoute';


class App extends React.Component {

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        } />
                        <Route exact path='/signup' element={<Signup />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/logout' element={
                            <PrivateRoute>
                                <Logout />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Layout>
            </AuthContextComponent>
        );
    }
};

export default App;
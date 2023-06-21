import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import Signup from './Signup'
import Home from './Home'
import Login from './Login'
import { AuthContextComponent } from './AuthContextComponent';


class App extends React.Component {

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/signup' element={<Signup />} />
                        <Route exact path='/login' element={<Login />} />                       
                    </Routes>
                </Layout>
            </AuthContextComponent>
        );
    }
};

export default App;
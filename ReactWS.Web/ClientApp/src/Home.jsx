import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContextComponent';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Home = () => {
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isDoing, setisDoing] = useState(false);

    const connectionRef = useRef(null);

    useEffect(() => {
        const onLoad = async () => {
            const { data } = await axios.get('/api/taskitem/getTasks');
            setTasks(data);
        }
        onLoad();
    }, []);


    useEffect(() => {

        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/taskhub").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('jobreceived', task => {
                console.log(task);
                setTasks(tasks => [...tasks, task]);
            });

            connection.on('updatedTasks', all => {          
                    setTasks([...all]); 
                });
        }
        connectToHub();

    }, []);


    const onSubmitClick = async () => {
        await axios.post('/api/taskitem/addTask', {title});
        setTitle('');
    }

    const onBeingDoneClick = async (task) => {
        await axios.post('/api/taskitem/setTaskToDone', {Id : task.id} )
    }

    const onDoneClick = async (id) => {
        await axios.post('/api/taskitem/deleteTask', {id})
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ marginTop: '70px' }}>
                <div className="row">
                    <div className="col-md-10">
                        <input onChange={e => setTitle(e.target.value)} type="text" className="form-control" placeholder="Task Title" value={title} />
                    </div>
                    <div className="col-md-2">
                        <button onClick={onSubmitClick} className="btn btn-primary w-100">Add Task</button>
                    </div>
                </div>
                <table className="table table-hover table-striped table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>
                                    {!task.userId ? (
                                        <button className="btn btn-dark" onClick={() => onBeingDoneClick(task)}>
                                            I'm doing this one!
                                        </button>
                                        ) : task.userId === user.id ? (
                                                <button onClick={() => onDoneClick(task.id)} className="btn btn-success">I'm done!</button>
                                    ) : (
                                        <button disabled className="btn btn-danger">
                                            {task.user.firstName} {task.user.lastName} is doing this
                                        </button>
                                    )}
                                </td>
                                                                     
                                
                            </tr>


                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Home
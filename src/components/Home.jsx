import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { TextField, Button } from '@mui/material';

const Home = () => {
    const { dispatch } = useContext(UserContext);
    const [inputValue, setInputValue] = useState('');

    const handleUpdateUserName = () => {
        if (inputValue.trim() !== '') {
            dispatch({ type: 'SET_USER_NAME', payload: inputValue });
            setInputValue('');
        }
    };

    return (
        <div style={{ width: '100%', padding: '40px', boxSizing: 'border-box' }}>
            <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ textAlign: 'left' }}>Remember to live out our values</h2>
                <ol style={{ textAlign: 'left' }}>
                    <li>Relentless Learning and Growth</li>
                    <li>Creative Problem Solving</li>
                    <li>Curiosity-Driven Exploration</li>
                </ol>
            </section>

            <section
                style={{
                    maxWidth: '1200px',
                    margin: '40px auto',
                    width: '100%',
                }}
            >
                <h2 style={{ textAlign: 'left' }}>Latest Event</h2>
                <p style={{ textAlign: 'left' }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis animi
                    laudantium eos atque sed debitis eum deleniti cumque saepe aut
                    voluptatibus, dolores commodi corporis quibusdam numquam perferendis,
                    molestias tenetur suscipit!.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start' }}>
                    <img
                        src="https://plus.unsplash.com/premium_photo-1709247069711-068d383b8497?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        style={{ width: '45%', height: 'auto' }}
                        alt="Kickball outing"
                    />
                    <img
                        src="https://plus.unsplash.com/premium_photo-1661429511577-b165fc04718f?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        style={{ width: '45%', height: 'auto' }}
                        alt="Happy Hour"
                    />
                </div>
            </section>

            {/* MUI TextBox and Button */}
            <div
                style={{
                    marginTop: '50px',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    width: 'fit-content',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <TextField
                    label="Enter your name"
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ marginBottom: '10px', width: '250px' }}
                />
                <Button variant="contained" color="primary" onClick={handleUpdateUserName}>
                    Update Name
                </Button>
            </div>
        </div>
    );
};

export default Home;

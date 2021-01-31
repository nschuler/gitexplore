import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import { shade } from 'polished';

import api from '../api/api';

import logoImg from '../assets/logo.svg';

const Dashboard = () => {
    const [newRepository, setNewRepository] = useState('');
    const [inputError, setInputError] = useState('');


    async function handleAddRepository(event) {
        event.preventDefault();
    
        if (!newRepository) {
          setInputError('Enter the author / name of the repository');
          return;
        }
    
        try {
          setNewRepository('');
          setInputError('');
        } catch (err) {
          setInputError('Error searching for this repository');
        }
    }

    return (
        <>
            <img src={logoImg} alt="GitHub Explorer" />
            <Title>Explore repositories on GitHub</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepository}
                    onChange={e => setNewRepository(e.target.value)}
                    placeholder="Enter the name of the repository"
                />
                <button type="submit">Search</button>
            </Form>
        </>
    )
}

export default Dashboard

const Title = styled.h1`
    max-width: 450px;
    margin-top: 80px;
    color: #3a3a3a;
    font-size: 48px;
    line-height: 56px;
`;

const Form = styled.form`
  display: flex;
  max-width: 700px;
  margin-top: 40px;
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 2px solid #fff;
    border-radius: 5px 0px 0px 5px;
    border-right: 0;
    color: #3a3a3a;
    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}
    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    width: 180px;
    height: 70px;
    border: 0;
    border-radius: 0px 5px 5px 0px;
    background: #04d361;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.3, '#04d361')};
    }
  }
`;

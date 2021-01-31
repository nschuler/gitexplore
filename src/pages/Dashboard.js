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

    const [repositories, setRepositories] = useState(() => {
        const storageRepositories = localStorage.getItem('@gitexplore:repositories');
    
        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        }
    
        return [];
    });

    useEffect(() => {
        localStorage.setItem(
            '@gitexplore:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(event) {
        event.preventDefault();
    
        if (!newRepository) {
          setInputError('Enter the author / name of the repository');
          return;
        }
    
        try {
            const response = await api.get(`repos/${newRepository}`);
            const repository = response.data;
          
            setRepositories([...repositories, repository]);
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

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                <Link
                    key={repository.full_name}
                    to={`/repositories/${repository.full_name}`}
                >
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>

                    <FiChevronRight size={20} color="#cbcbcd" />
                </Link>
                ))}
            </Repositories>
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

const Error = styled.span`
    display: block;
    margin-top: 8px;
    color: #c53030;
`;

const Repositories = styled.div`
    max-width: 700px;
    margin-top: 80px;
    a {
        display: block;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 24px;
        border-radius: 5px;
        background: #fff;
        text-decoration: none;
        transition: transform 0.2s;
        & + a {
            margin-top: 16px;
        }
        &:hover {
            transform: translateX(10px);
        }
    }
    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }
    div {
        flex: 1;
        margin: 0 16px;
        strong {
            color: #3d3d4d;
            font-size: 20px;
        }
        p {
            margin-top: 4px;
            color: #a8a8b3;
            font-size: 18px;
        }
        svg {
            margin-left: auto;
        }
    }
`
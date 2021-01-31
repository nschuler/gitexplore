import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import api from '../api/api';

import logoImg from '../assets/logo.svg';

const Repository = () => {
    const [repository, setRepository] = useState(null);
    const [issues, setIssues] = useState([]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="GitHub Explorer" />

                <Link to="/">
                    <FiChevronLeft size={16} />
                    Back
                </Link>
            </Header>
        </>
    )
}

export default Repository

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a8a8b3;
        text-decoration: none;
        transition: 0.2s;
        &:hover {
            color: #666;
        }
        svg {
            margin-right: 4px;
        }
    }
`
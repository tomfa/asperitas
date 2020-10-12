import React from 'react';
import styled from 'styled-components/macro';
import SidebarCreatePostButton from './CreatePostButton';
import SidebarCategoryList from './CategoryList';
import categories from '../../categories';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  margin-left: 24px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 2px;
  background-color: ${props => props.theme.foreground};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const getCurrentCategory = ({ pathname}) => {
  if (!pathname.startsWith('/a/')) {
    return categories[1];
  }
  return categories.find(i => pathname.endsWith(i)) || categories[0];
};

const Sidebar = ({ token, location }) => {
  const category = getCurrentCategory(location);
  return <Wrapper>
    {token && <SidebarCreatePostButton category={category}/>}
    <SidebarCategoryList/>
  </Wrapper>
};

export default Sidebar;

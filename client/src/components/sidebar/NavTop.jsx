import React from 'react';
import styled from 'styled-components';
import logo from './img/logo.png';

const NavTop = styled.div`
  height: 140px;
  border-radius: 0.25rem;
`;

const Logo = styled.img`
  width: 100px;
  display: block;
  margin: 0px auto;
  padding-top: 0.25rem;
`;

const Line = styled.hr`
  width: 90%;
  background-color: #e0e0e0;
`;

const MyProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.25rem;
  padding: 5px 0;

  & .profileImgArea {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;

    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: white;

    & span {
      font-size: 2rem;
      padding-bottom: 3px;
    }
  }
`;

const NavTopArea = () => {
  return (
    <NavTop>
      <Logo src={logo} alt="logoImg" />
      <Line />
      <MyProfile>
        <div className="profileImgArea">
          <span className="profileEmoji">🤓</span>
        </div>
        <span>사용자 이름</span>
      </MyProfile>
      <Line />
    </NavTop>
  );
};

export default NavTopArea;

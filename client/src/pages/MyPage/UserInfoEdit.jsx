import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
//mui
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//style
import { SettingBtn, ModalStyle } from './style';
//function
import useLoc from '../Signup/userLocationFunction';

const UserInfoEditArea = props => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userData = props.data;
  const favorInit = props.favor;
  const languageInit = props.language;
  console.log(userData);

  const [favor, setFavor] = useState([]);
  const [language, setLanguage] = useState([]);
  const [inputData, setInputData] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [changedPassword, setChangedPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFavor(favorInit);
    setLanguage(languageInit);
  }, [userData]);

  const handleModal = () => {
    setOpen(!open);
  };

  console.log('favor:', favor);
  console.log('language:', language);

  const handleCheckedFavor = e => {
    // 유저가 선택한 관심사의 value값 가져오는 코드
    const checkedFavor = e.map(el => el.value);

    const checkedFavorArray = favor.map(el => {
      if (checkedFavor.includes(el.value)) {
        return { ...el, selected: true };
      } else if (!checkedFavor.includes(el.value)) {
        return { ...el, selected: false };
      }

      return el;
    });

    setFavor([...checkedFavorArray]);
  };

  const handleCheckedLanguage = e => {
    // 유저가 선택한 사용 언어의 value값 가져오는 코드
    const checkedLanguage = e.map(el => el.value);

    const checkedLanguageArray = language.map(el => {
      if (checkedLanguage.includes(el.value)) {
        return { ...el, selected: true };
      } else if (!checkedLanguage.includes(el.value)) {
        return { ...el, selected: false };
      }

      return el;
    });

    setLanguage([...checkedLanguageArray]);
  };

  const handleLocation = async e => {
    e.preventDefault();
    const data = await useLoc();
    setInputData({
      ...inputData,
      location: data,
    });
  };

  const handleOnChange = e => {
    const { value, name } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    try {
      if (checkPassword !== changedPassword) {
        alert('새로운 비밀번호를 다시 확인해주세요.');
      }

      const data = {
        nickname: inputData.nickname,
        profileText: inputData.profileText,
        birthday: inputData.birthday,
        newPassword: changedPassword ? changedPassword : currentPassword,
        currentPassword: currentPassword,
        favor: favor,
        language: language,
        location: inputData.location,
      };

      const bodyData = JSON.stringify(data);

      await axios.patch('http://localhost:3001/api/auth/me', bodyData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      alert('회원 정보가 변경되었습니다.');
      // handleModal();
      // navigate('/mypage');
      document.location.href = '/';
    } catch (err) {
      console.log(err);
      alert(err.message);
      navigate('/mypage');
    }
  };

  return (
    <div className="setting">
      <SettingBtn className="userInfoEdit" onClick={handleModal}>
        <EditIcon />
        <p>회원정보 수정</p>
      </SettingBtn>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="userInfoEdit-title"
        aria-describedby="userInfoEdit-description"
      >
        <ModalStyle style={{ width: 600 }}>
          {/* 모달 스타일 박스 쉐도우 값 설정 필요 */}
          <Title id="userInfoEdit-title">회원정보 수정</Title>
          <div id="userInfoEdit-description">
            <Form className="userInfoEditForm" onSubmit={handleSubmit}>
              <EditTitle className="nickname">
                닉네임
                <input
                  id="nickname"
                  type="text"
                  placeholder={inputData.nickname}
                  name="nickname"
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="profileText">
                한 줄 소개
                <input
                  id="profileText"
                  type="text"
                  placeholder={inputData.profileText}
                  name="profileText"
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="location">
                위치
                <br />
                {/* <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder={inputData.location}
                  value={inputData.location || ''}
                /> */}
                {inputData.location ? inputData.location : userData.location}
                <button type="button" onClick={handleLocation}>
                  테스트
                </button>
              </EditTitle>
              <EditTitle className="birthday">
                생일
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={inputData.birthday || ''}
                  onChange={handleOnChange}
                />
              </EditTitle>
              <EditTitle className="favor">
                관심사
                <StyledSelect
                  defaultValue={(favor || []).filter(e => e.selected)}
                  isMulti
                  name="favor"
                  options={favor}
                  className="favorSelect"
                  placeholder="관심사 선택"
                  onChange={handleCheckedFavor}
                />
              </EditTitle>
              <EditTitle className="language">
                사용 언어
                <StyledSelect
                  // defaultValue={(language || []).filter(e => e.selected)}
                  isMulti
                  name="language"
                  options={language}
                  className="languageSelect"
                  classNamePrefix="language"
                  placeholder="언어 선택"
                  onChange={handleCheckedLanguage}
                />
              </EditTitle>
              <EditTitle className="changedPassowrd">
                변경 할 비밀번호
                <input
                  id="changedPassowrd"
                  type="password"
                  placeholder="새로운 비밀번호"
                  name="changedPassowrd"
                  value={changedPassword}
                  onChange={e => {
                    setChangedPassword(e.target.value);
                  }}
                />
              </EditTitle>
              <EditTitle className="checkPassowrd">
                비밀번호 확인
                <input
                  id="checkPassowrd"
                  type="password"
                  placeholder="새로운 비밀번호 확인"
                  name="checkPassowrd"
                  value={checkPassword || ''}
                  onChange={e => {
                    setCheckPassword(e.target.value);
                  }}
                />
                {changedPassword !== checkPassword && (
                  <p
                    className="changedPasswordChecked"
                    style={{ fontSize: '0.75rem', color: 'red', marginTop: 0 }}
                  >
                    새로운 비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </EditTitle>
              <EditTitle className="currentPassowrd">
                현재 비밀번호를 입력해주세요.
                <input
                  id="currentPassowrd"
                  type="password"
                  placeholder="현재 비밀번호"
                  name="currentPassword"
                  value={currentPassword || ''}
                  onChange={e => {
                    setCurrentPassword(e.target.value);
                  }}
                />
                {/* {userData.password !== currentPassword && (
                  <p
                    className="currentPasswordChecked"
                    style={{ fontSize: '0.75rem', color: 'red', marginTop: 0 }}
                  >
                    현재 비밀번호가 일치해야 정보를 변경할 수 있습니다.
                  </p>
                )} */}
              </EditTitle>
              <div className="editBtn">
                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="neutral"
                    sx={{ mr: 1 }}
                  >
                    변경하기
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Button
                    type="button"
                    variant="outlined"
                    color="neutral"
                    onClick={handleModal}
                  >
                    닫기
                  </Button>
                </ThemeProvider>
              </div>
            </Form>
          </div>
        </ModalStyle>
      </Modal>
    </div>
  );
};

export default UserInfoEditArea;

const theme = createTheme({
  palette: {
    neutral: {
      main: '#59B1FC',
      contrastText: '#fff',
    },
  },
});

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(6, 0.5fr);
  justify-items: center;

  & input {
    height: 25px;
  }

  & #profileText {
    width: 200px;
  }

  & #favoriteTopic {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    align-items: center;
    margin-bottom: 13px;

    > span {
      display: flex;
      align-items: center;
      margin-right: 10px;
      > label {
        margin-left: 0 0 0 5px;
      }
    }
  }

  .currentPassowrd {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  > .currentPassowrd {
    grid-column: 1/3;
  }
  > .editBtn {
    grid-column: 1/3;
  }
`;

const EditTitle = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 7px 0;

  font-size: 1rem;
`;

const StyledSelect = styled(Select)`
  width: 250px;
  padding: 3px 0;
`;

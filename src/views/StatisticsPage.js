import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../actions/auth';
import { getStatistics } from '../actions/statistics';
import Moment from 'react-moment';

const StyledWrapper = styled.div`
  width: 80%;
  margin: 2rem auto 0;
  animation: slideIn 0.3s ease-in-out;

  div {
    margin: 2rem auto;
  }
`;

const StyledTitle = styled.h2`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledParagraph = styled.p`
  display: inline-block;
  margin: 1rem;
  color: ${({ theme, range }) => range === 'II' ? theme.colorExtraQuatenary : range === 'III' ? theme.colorExtraSecondary : range === 'IV' ? theme.colorExtraPrimary : theme.fontColorGray};

  ${({ column }) =>
    column &&
    css`
      margin: 1rem 0;
      display: block;

      @media ${device.tablet} {
        margin: 1rem;
        display: inline-block;
      }
    `};

  ${({ small }) =>
    small &&
    css`
      font-size: ${({ theme }) => theme.fontSize.xxs};
    `};
`;

const StyledRangeInformation = styled.div`
  margin: 0 !important;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.bgcDarkSecondary};
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  opacity: 0;

  p {
    margin: 1rem 0;
  }

  p:nth-child(1) {
    color: ${({theme}) => theme.fontColorGray};
  }

  p:nth-child(2) {
    color: ${({theme}) => theme.colorExtraQuatenary};
  }

  p:nth-child(3) {
    color: ${({theme}) => theme.colorExtraSecondary};
  }

  p:nth-child(4) {
    color: ${({theme}) => theme.colorExtraPrimary};
  }

  span {
    color: ${({ theme }) => theme.fontColorGray};
  }
`;

const StyledRangeWrapper = styled.div`
  position: relative;
  margin: 7rem auto !important;
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bgcDarkSecondary};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colorExtraPrimary};
  z-index: 10;

  :hover ${StyledRangeInformation} {
    opacity: 1;
  }

  :before {
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.bgcDarkSecondary};
    transform: rotate(-45deg);
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colorExtraPrimary};
    box-shadow: 3px 10px 30px -10px #000;
    z-index: -1;
  }

  @media ${device.tablet} {
    width: 300px;
    height: 300px;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin-left: 0;
  width: 130px;

  @media ${device.tablet} {
    width: 180px;
  }
`;

const StyledInput = styled(Input)`
  display: block;
  margin: 1rem 0;
  width: 150px;
  color: ${({ theme }) => theme.fontColorLight};
  background: ${({ theme }) => theme.bgcDarkSecondary};
  border: 1px solid ${({ theme }) => theme.bgcDarkTertiary};
  border-radius: 20px;

  @media ${device.tablet} {
    width: 250px;
    padding: 0.8rem;
    border-radius: 30px;
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }

  @media ${device.laptopL} {
    padding: 0.6rem;
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const TextError = styled.p`
  font-size: ${({theme}) => theme.fontSize.xs};
  margin-bottom: .5rem;
  color: ${({ theme }) => theme.colorExtraSecondary};
`;

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  const {
    username,
    createdAccountDate,
    points,
    doneTrainingsNumber,
    lastTraining,
  } = statistics;

  const [deleteAccountStep, setDeleteAccountStep] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState({
    inputUsername: '',
    inputUsernameError: '',
  });

  const { inputUsername, inputUsernameError } = deleteInputValue;

  const handleInputChange = (e) => {
    setDeleteInputValue({ inputUsername: e.target.value });
  };

  const handleDeleteAccount = () => {
    setDeleteAccountStep(true);
  };

  const handleDeleteAccountSubmit = () => {
    if (inputUsername === username) {
      dispatch(deleteAccount());
    } else {
      setDeleteInputValue({
        ...deleteInputValue,
        inputUsernameError: 'Incorrect username',
      });

      setTimeout(() => {
        setDeleteInputValue({ ...deleteInputValue, inputUsernameError: '' });
      }, 3000);
    }
  };

  return (
    <UserPanelTemplate pageTitle='statistics'>
      <StyledWrapper>
        {statistics ? (
          <>
            <div>
              <StyledTitle>User:</StyledTitle>
              <StyledParagraph>{username}</StyledParagraph>
            </div>
            <div>
              <StyledTitle>Created account:</StyledTitle>
              <StyledParagraph column>
                <Moment format='dddd hh YYYY-MM-DD' date={createdAccountDate} />
              </StyledParagraph>
            </div>
            <div>
              <StyledTitle>Trainings done:</StyledTitle>
              <StyledParagraph>{doneTrainingsNumber}</StyledParagraph>
            </div>
            <div>
              <StyledTitle>Last training:</StyledTitle>
              <StyledParagraph column>{lastTraining}</StyledParagraph>
            </div>
            <StyledRangeWrapper>
              <StyledTitle>CaF points:</StyledTitle>
              <StyledParagraph>{points}</StyledParagraph>
              { points < 3000 ? (
                <StyledParagraph>Range I</StyledParagraph>
              ) : points < 6000 ? (
                <StyledParagraph range='II'>Range II</StyledParagraph>
              ) : points < 12000 ? (
                <StyledParagraph range='III'>Range III</StyledParagraph>
              ) : (
                <StyledParagraph range='IV'>Range IV</StyledParagraph>
              )
              }
              <StyledRangeInformation>
                <p>Range I: <span>0</span></p>
                <p>Range II: <span>3000</span></p>
                <p>Range III: <span>6000</span></p>
                <p>Range IV: <span>12000</span></p>
              </StyledRangeInformation>
            </StyledRangeWrapper>
            <div>
              {deleteAccountStep ? (
                <>
                  <TextError>{inputUsernameError}</TextError>
                  <StyledParagraph column small>
                    To confirm, type your username below
                  </StyledParagraph>
                  <StyledButton tertiary onClick={handleDeleteAccountSubmit}>
                    Confirm
                  </StyledButton>
                  <StyledInput
                    type='text'
                    name='deleteAccountSubmit'
                    placeholder='username'
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <StyledParagraph column small>
                    To delete account, press button below
                  </StyledParagraph>
                  <StyledButton tertiary onClick={() => handleDeleteAccount()}>
                    Delete account
                  </StyledButton>
                </>
              )}
            </div>
          </>
        ) : (
          <StyledParagraph>Statistics loading</StyledParagraph>
        )}
      </StyledWrapper>
    </UserPanelTemplate>
  );
};

export default StatisticsPage;

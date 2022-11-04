import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import {v4 as uuid} from 'uuid';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../features/store';
import { setLanguage } from '../../features/user/reducers';
import { selectLanguage, selectUser } from '../../features/user/selectors';
import { formatObjectKey } from '../../helpers/helpers';
import { SCREENS } from '../../services/screens';
import DeleteUserModal from '../modals/DeleteUserModal';
import EditUserDataModal from '../modals/EditUserDataModal';
import UpdateAvatarModal from '../modals/UpdateAvatarModal';
import UpdatePasswordModal from '../modals/UpdatePasswordModal';


const Section = styled.section`
  ${tw`
    relative
    w-full
    mt-6
    mb-6
  `}
`;

const SubTitle = styled.h6`
  ${tw`
    text-lg
    font-semibold
  `}
`;

const SubSection = styled.div`
  ${tw`
  
  `}
`;

const Content = styled.div`
  ${tw`
    flex
    flex-col
    md:flex-row
    items-center
  `}
`;

const PhotoContainer = styled.div`

  ${tw`
    relative
    mt-3
    md:mr-12
    w-36
    h-36
    md:w-56
    md:h-56
    overflow-hidden
    rounded-full
  `}
`;

const UserPhoto = styled.img`
  ${tw`
    inline
    w-auto
    h-full
  `}
`;

const UserData = styled.ul`
  ${tw`
    mt-3
    w-full
    md:w-auto
  `}
`;

const DataItem = styled.li`
  ${tw`
    mb-3
    w-full
    md:w-96
    flex
  `}
`;

const DataTitle = styled.span`
  ${tw`
    block
    w-2/6
    md:w-1/2
    text-gray-500
    font-semibold
  `}
`;

const Data = styled.span`
  ${tw`
    block
    w-4/6
    md:w-1/2
    text-lg
    font-semibold
  `}
`;

const Actions = styled.div`
  button {
    margin-right: 20px;
    @media (max-width: ${SCREENS.md}) {
      margin: 0;
      width: 47%;
    }
  }
  ${tw`
    mt-6
    flex
    justify-between
    md:justify-start
  `}
`;

const LanguageSelect = styled.select`
  ${tw`
    p-3
    w-32
    border
    rounded
  `}
`;

const LanguageOption = styled.option`
  ${tw`
  
  `}
`;


const Profile: React.FC = () => {
  const { t } = useTranslation(['settingTabsProfile']);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const language = useSelector(selectLanguage);

  const handleLanguageChange = (e: any) => {
    localStorage.setItem('language', e.target.value);
    dispatch(setLanguage(e.target.value));
  };

  return (
    <Section>
      <SubSection>
        <SubTitle>{t('userData')}</SubTitle>
        <Content>
          <PhotoContainer>
            <UserPhoto src={user!.avatarUrl} alt='user_photo' />
          </PhotoContainer>
          <UserData>
            {Object
              .entries(user!)
              .map(item => (
                  item[0] === 'firstName' || 
                  item[0] === 'lastName' || 
                  item[0] === 'email' || 
                  item[0] === 'phone' || 
                  item[0] === 'city'
                ) && (
                  <DataItem key={uuid()}>
                    <DataTitle>
                      {formatObjectKey(item[0])}:
                    </DataTitle>
                    <Data>
                      {item[1]}
                    </Data>
                  </DataItem>
                )
              )}
          </UserData>
        </Content>
        <Actions>
          <EditUserDataModal />
          <UpdatePasswordModal />
          <UpdateAvatarModal />
          <DeleteUserModal />
        </Actions>
      </SubSection>
      <SubSection>
        <SubTitle>{t('language')}</SubTitle>
        <LanguageSelect 
          value={language}
          onChange={handleLanguageChange}
        >
          <LanguageOption value={'en'}>EN</LanguageOption>
          <LanguageOption value={'ua'}>UA</LanguageOption>
        </LanguageSelect>
      </SubSection>
    </Section>
  );
};

export default Profile;
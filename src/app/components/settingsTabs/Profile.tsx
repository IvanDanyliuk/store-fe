import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import {v4 as uuid} from 'uuid';
import { ButtonColor, ButtonType } from '../../../types/types';
import { selectUser } from '../../features/user/selectors';
import { formatObjectKey } from '../../helpers/helpers';
import EditUserDataModal from '../modals/EditUserDataModal';
import Button from '../ui/Button';


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
  
  `}
`;

const PhotoContainer = styled.div`
  ${tw`
  
  `}
`;

const UserPhoto = styled.img`
  ${tw`
  
  `}
`;

const UserData = styled.ul`
  ${tw`
  
  `}
`;

const DataItem = styled.li`
  ${tw`
  
  `}
`;

const DataTitle = styled.span`
  ${tw`
  
  `}
`;

const Data = styled.span`
  ${tw`
  
  `}
`;

const Actions = styled.div`
  ${tw`
  
  `}
`;


const Profile: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <Section>
      <SubSection>
        <SubTitle>User Data</SubTitle>
        <Content>
          <PhotoContainer>
            <UserPhoto src={user?.avatarUrl} alt='user_photo' />
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
          <Actions>
            <EditUserDataModal />
          </Actions>
        </Content>
      </SubSection>
    </Section>
  );
};

export default Profile;
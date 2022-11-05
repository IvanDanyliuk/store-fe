import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import Input from '../inputs/Input';


interface IOrderFormProps {
  data: {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
  };
  onChange: (e: any) => void;
}

const Form = styled.form`
  ${tw`
    w-full
    flex
    flex-wrap
  `}
`;

const Fieldset = styled.fieldset`
  ${tw`
    md:pr-6
    w-full
    md:w-1/2
  `}
`;


const OrderForm: React.FC<IOrderFormProps> = ({ data, onChange }) => {
  const { t } = useTranslation(['order']);

  return (
    <Form>
      <Fieldset>
        <Input 
          name='firstName'
          label={t('firstName')}
          value={data.firstName}
          onChange={onChange}
        />
      </Fieldset>
      <Fieldset>
        <Input 
          name='lastName'
          label={t('lastName')}
          value={data.lastName}
          onChange={onChange}
        />
      </Fieldset>
      <Fieldset>
        <Input 
          name='email'
          label={t('email')}
          value={data.email}
          onChange={onChange}
        />
      </Fieldset>
      <Fieldset>
        <Input 
          name='phone'
          label={t('phone')}
          value={data.phone}
          onChange={onChange}
        />
      </Fieldset>
    </Form>
  );
};

export default OrderForm;
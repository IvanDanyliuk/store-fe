import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';


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

const Label = styled.label`
  ${tw`
    font-medium
    text-xs
    text-gray-500
  `}
`;

const Input = styled.input`
  ${tw`
    mb-2
    p-2
    w-full
    text-sm
    font-semibold
    border
    rounded
  `}
`;

const OrderForm: React.FC<IOrderFormProps> = ({ data, onChange }) => {
  return (
    <Form>
      <Fieldset>
        <Label>First name</Label>
        <Input 
          name='firstName' 
          value={data.firstName} 
          onChange={onChange} 
        />
      </Fieldset>
      <Fieldset>
        <Label>Last Name</Label>
        <Input 
          name='lastName' 
          value={data.lastName} 
          onChange={onChange} 
        />
      </Fieldset>
      <Fieldset>
        <Label>Email</Label>
        <Input 
          name='email' 
          value={data.email} 
          onChange={onChange} 
        />
      </Fieldset>
      <Fieldset>
        <Label>Phone</Label>
        <Input 
          name='phone' 
          value={data.phone} 
          onChange={onChange} 
        />
      </Fieldset>
    </Form>
  );
};

export default OrderForm;
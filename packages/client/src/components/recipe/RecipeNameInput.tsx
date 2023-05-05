import { type ChangeEvent, type FormEvent, useState, useEffect } from 'react';
import { HiOutlinePencil as EditingIcon } from 'react-icons/hi';
import type { StyledComponentProps } from '../../type-utils';
import { MdDone as CompletedIcon } from 'react-icons/md';
import * as constants from '../../constants';
import styled from 'styled-components';

const NameInputContainer = styled.div`
  margin-bottom: 40px;
  width: 100%;
`;

const NameForm = styled.form`
  justify-content: flex-start;
  align-items: center;
  margin-left: 25px;
  display: flex;
`;

const NameInput = styled.input<StyledComponentProps<
  'input', { isEditing: boolean }>
>`
  font-size: 1.8rem;
  font-weight: bold;
  border: ${props => (
    props.isEditing ? '2px solid #000' : '0px'
  )};

  &:focus {
    outline: none;
    border: ${props => (
      props.isEditing ? '2px solid #000' : '0px'
    )};
  }

  &:disabled {
    color: #000;
  }
`;

const NameSubmitButton = styled.button`
  margin: auto 0.5rem auto 0.5rem;
  background: transparent;
  border: 0px;
`;

interface RecipeNameIputProps {
  setRecipeName: (name: string) => void;
  recipeName: string;
};

const RecipeNameInput = (props: RecipeNameIputProps): JSX.Element => {
  const [inputText, setInputText] = useState(props.recipeName);
  const [isEditing, setIsEditing] = useState(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    if (!isEditing) {
      setInputText(props.recipeName);
    }
  }, [props.recipeName, isEditing]);

  const handleOnSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (!isEditing) {
      setIsEditing(true);
    } else {
      /** 
       * TODO: replace this "else" condition with "else if" condition which
       * validates "inputText" with the following checks before setting it as 
       * recipe name.
       */
      props.setRecipeName(inputText);
      setIsEditing(false);
    }
  };

  return (
    <NameInputContainer>
      <NameForm onSubmit={handleOnSubmit}>
        <NameInput
          placeholder={constants.DefaultRecipeName}
          onChange={handleOnChange}
          size={inputText.length}
          disabled={!isEditing}
          isEditing={isEditing}
          value={inputText}
          type='text'
        />
        <NameSubmitButton type='submit'>
          {isEditing 
            ? <CompletedIcon size={constants.DefaultIconSize} /> 
            : <EditingIcon size={constants.DefaultIconSize} />}
        </NameSubmitButton>
      </NameForm>
    </NameInputContainer>
  );
};

export default RecipeNameInput;

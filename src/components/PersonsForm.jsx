import React from 'react'
import Input from './input/Input'
import InputContainer from './input/InputContainer'
import InputNumber from './input/InputNumber'
import Label from './input/Label'

const PersonsForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  showInput,
  isShort,
  setIsShort,
  numberIsValid,
  setNumberIsValid,
  handleNameChange,
}) => {
  return (
    <form
      className={`absolute inset-0 transition-all ease-in-out duration-700  border-[#333333]  border rounded-lg flex items-center justify-center flex-col z-20 bg-black -translate-x-1/2 h-1/2  left-1/2 w-5/6 sm:w-4/6 max-w-lg px-10 gap-7 ${
        showInput ? 'top-1/2 -translate-y-1/2' : '-translate-y-full top-0'
      }`}
      onSubmit={handleSubmit}
    >
      <InputContainer>
        <Input
          setIsShort={setIsShort}
          isShort={isShort}
          id='name'
          value={newName}
          onChange={(e) => handleNameChange(e)}
        />
        <Label htmlFor='name'>Name</Label>
      </InputContainer>
      <InputContainer>
        <InputNumber
          numberIsValid={numberIsValid}
          setNumberIsValid={setNumberIsValid}
          id='number'
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <Label className='' htmlFor='number'>
          Number
        </Label>
      </InputContainer>
      <div>
        <button
          className='border-[#333333] hover:border-[#00C896] hover:text-[#00C896] border px-5 py-2  rounded-lg transition-all'
          type='submit'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default PersonsForm

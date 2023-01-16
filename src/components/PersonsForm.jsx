import React from 'react'
import Input from './input/Input'
import InputContainer from './input/InputContainer'
import Label from './input/Label'
// import './PersonsForm.css'

const PersonsForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  showInput,
}) => {
  console.log(newName)
  return (
    <form
      className={`absolute inset-0 transition-all ease-in-out duration-700  border-[#333333]  border rounded-lg flex items-center justify-center flex-col z-20 bg-black -translate-x-1/2 h-1/2  left-1/2 w-5/6 sm:w-4/6 max-w-lg px-10 gap-5 ${
        showInput ? 'top-1/2 -translate-y-1/2' : '-translate-y-full top-0'
      }`}
      onSubmit={handleSubmit}
    >
      <InputContainer>
        <Input
          id='name'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Label htmlFor='name'>Name</Label>
      </InputContainer>
      <InputContainer>
        <Input
          id='number'
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <Label className='' htmlFor='number'>
          Number
        </Label>
      </InputContainer>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonsForm

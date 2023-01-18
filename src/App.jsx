import { useEffect, useState } from 'react'
import './App.css'
import PersonsForm from './components/PersonsForm'
import personsService from './services/persons'
import PersonsTable from './components/PersonsTable'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import BtnAdd from './components/buttons/BtnAdd'
import Loader from './components/Loader'
import RepeatedAlert from './components/RepeatedAlert'
import SuccesAlert from './components/SuccesAlert'

function App() {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [nameRepeated, setNameRepeated] = useState(null)
  const [showNameModal, setShowNameModal] = useState(false)
  const [isBarHidden, setIsBarHidden] = useState(false)
  const [updatePerson, setUpdatePerson] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [addedPersonName, setAddedPersonName] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [filterValue, setFilterValue] = useState('')

  const [usersToDelete, setUsersToDelete] = useState([])
  const [idsChecked, setIdsChecked] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isShort, setIsShort] = useState(false)
  const [numberIsValid, setNumberIsValid] = useState(false)

  const handleDelete = () => {
    if (!idsChecked.length <= 0) {
      if (idsChecked.length === 1) {
        const name = persons.filter((person) => person.id === idsChecked[0])
        const confirm = window.confirm(`Delete ${name[0].name}?`)
        if (confirm) {
          setIsLoading(true)
          personsService.deletePerson(idsChecked[0]).then(() => {
            setPersons(persons.filter((person) => person.id !== idsChecked[0]))
            setIsLoading(false)
            setIdsChecked([])
          })
        }
      } else {
        const confirm = window.confirm(`Delete ${idsChecked.length} User?`)
        if (confirm) {
          setIsLoading(true)
          const deletePromises = idsChecked.map((id) =>
            personsService.deletePerson(id)
          )
          Promise.all(deletePromises).then(() => {
            setPersons(
              persons.filter((person) => !idsChecked.includes(person.id))
            )
            setIdsChecked([])
            setIsLoading(false)
          })
        }
      }
    }
  }

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      if (!idsChecked.includes(e.target.id))
        setIdsChecked(idsChecked.concat(e.target.id))
    } else {
      setIdsChecked(idsChecked.filter((id) => id !== e.target.id))
    }
  }

  const handleTimeOut = (time) => {
    let timeOut = setTimeout(() => {
      setShowSuccessModal(false)
      setIsBarHidden(false)
    }, time)
    return () => clearTimeout(timeOut)
  }

  const handleUpdatePerson = (nameExist) => {
    setIsLoading(true)
    personsService
      .updatePerson(nameExist.id, {
        name: newName,
        number: newNumber,
      })
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== nameExist.id ? person : returnedPerson
          )
        )
        setIsBarHidden(true)
        setIsLoading(false)
        setShowInput(false)
        setNameRepeated(null)
        setNewName('')
        setNewNumber('')
        setUpdatePerson(false)
        setShowNameModal(false)
        setAddedPersonName(returnedPerson.name)
        setShowSuccessModal(true)
        handleTimeOut(4000)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const nameExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (nameExist) {
      setNameRepeated(nameExist?.name)
      setShowNameModal(true)
      setUpdatePerson(false)
      if (updatePerson) {
        handleUpdatePerson(nameExist)
      }
    } else {
      setNameRepeated(null)
      setShowNameModal(false)
      setShowInput(false)
      setIsLoading(true)
      personsService.createPerson(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setIsBarHidden(true)
        setNewName('')
        setNewNumber('')
        setIsLoading(false)
        setIsShort(false)
        setAddedPersonName(returnedPerson.name)
        setShowSuccessModal(true)
        handleTimeOut(4000)
      })
    }
  }

  const handleNameChange = (e) => {
    setNameRepeated(null)
    setNewName(e.target.value)
  }

  const handleFilter = (e) => {
    setFilterValue(e.target.value)
  }

  useEffect(() => {
    setIsLoading(true)
    personsService.getPersons().then((initialPersons) => {
      setPersons(initialPersons)
      setIsLoading(false)
    })
  }, [])

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      <div className='bg-black text-[#ccc] min-h-screen flex items-center justify-center flex-col'>
        <Navbar />
        <div>
          <div>
            <div
              onClick={() => {
                setShowInput(false)
                setShowNameModal(false)
              }}
              className={`absolute inset-0 z-10 backdrop-blur-sm transition-all duration-500 ease-in-out bg-black/95 ${
                showInput ? 'opacity-100' : 'opacity-0 -z-40'
              }`}
            ></div>

            <PersonsForm
              handleSubmit={handleSubmit}
              newName={newName}
              setNewName={setNewName}
              newNumber={newNumber}
              setNewNumber={setNewNumber}
              handleDelete={handleDelete}
              showInput={showInput}
              isShort={isShort}
              setIsShort={setIsShort}
              numberIsValid={numberIsValid}
              setNumberIsValid={setNumberIsValid}
              handleNameChange={handleNameChange}
            />
          </div>
        </div>
        <div className='w-full absolute  top-16 bottom-0 flex items-center justify-center'>
          <PersonsTable
            persons={persons}
            setUsersToDelete={setUsersToDelete}
            idsChecked={idsChecked}
            handleCheckbox={handleCheckbox}
            handleDelete={handleDelete}
            handleFilter={handleFilter}
            filterValue={filterValue}
          />
        </div>
      </div>
      <RepeatedAlert
        nameRepeated={nameRepeated}
        setShowNameModal={setShowNameModal}
        showNameModal={showNameModal}
        setUpdatePerson={setUpdatePerson}
        handleUpdatePerson={handleUpdatePerson}
        persons={persons}
        newName={newName}
      />
      <SuccesAlert
        showSuccessModal={showSuccessModal}
        addedPersonName={addedPersonName}
        isBarHidden={isBarHidden}
        setIsBarHidden={setIsBarHidden}
      />
      <BtnAdd setShowInput={setShowInput} />
    </BrowserRouter>
  )
}

export default App

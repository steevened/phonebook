import { useEffect, useState } from 'react'
import './App.css'
import PersonsForm from './components/PersonsForm'
import personsService from './services/persons'
import Notification from './components/Notification'
import PersonsTable from './components/PersonsTable'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import BtnAdd from './components/buttons/BtnAdd'

function App() {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [nameRepeated, setNameRepeated] = useState(null)
  const [notificationShowed, setNotificationShowed] = useState(false)
  const [numberChanged, setNumberChanged] = useState(null)
  const [isError, setIsError] = useState(false)
  const [minName, setMinName] = useState(false)
  const [minNumber, setMinNumber] = useState(false)
  const [numberForm, setNumberForm] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [usersToDelete, setUsersToDelete] = useState([])
  const [idsChecked, setIdsChecked] = useState([])

  useEffect(() => {
    let nameRepeatedFromArray = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    setNameRepeated(nameRepeatedFromArray)
  }, [newName])

  const handleDelete = () => {
    // const personToDelete = persons.find((person) => person.id === id)
    // const confirm = window.confirm(`Delete ${personToDelete.name}?`)
    // if (confirm) {
    //   personsService.deletePerson(id).then((returnedPerson) => {
    //     setPersons(persons.filter((person) => person.id !== id))
    //   })
    // }
    idsChecked.forEach((id) => {
      const confirm = window.confirm('Delete All users?')
      if (confirm) {
        personsService.deletePerson(id).then((returnedPerson) => {
          setPersons(persons.filter((person) => person.id !== id))
        })
      }
    })
    setIdsChecked([])
  }

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      if (!idsChecked.includes(e.target.id))
        setIdsChecked(idsChecked.concat(e.target.id))
    } else {
      setIdsChecked(idsChecked.filter((id) => id !== e.target.id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (nameRepeated && newNumber) {
      const id = nameRepeated.id
      let phoneChanged = { ...nameRepeated, number: newNumber }
      const confirm = window.confirm(
        `${nameRepeated.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirm) {
        personsService
          .updatePerson(id, phoneChanged)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            )
          })
          .catch(() => setIsError(true))
        setNewName('')
        setNewNumber('')
        setNotificationShowed(true)
        setNumberChanged(phoneChanged)
      }
    } else if (!newName) {
      alert(`Add a name`)
    } else if (!newNumber) {
      alert(`Add a number`)
    } else {
      setNotificationShowed(true)
      setNumberChanged(null)
      setShowInput(false)
      personsService
        .createPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMinName(false)
          setMinNumber(false)
          setNumberForm(false)
        })
        .catch((error) => {
          const { data } = error.response
          if (data.includes('name: ')) {
            setMinName(true)
          }
          if (data.includes('number: ')) {
            setMinNumber(true)
          }
          if (!data.includes('name: ') && data.includes('number: ')) {
            setMinName(false)
            setMinNumber(true)
          }
          if (data.includes('name: ') && !data.includes('number: ')) {
            setMinName(true)
            setMinNumber(false)
          }
          if (data.includes('number: Validator')) {
            setNumberForm(true)
          }
          // console.log(data)
        })
    }
  }

  // console.log(numberForm)

  useEffect(() => {
    personsService
      .getPersons()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (notificationShowed) {
        setNotificationShowed(false)
      }
    }, 5000)
    // setNumberChanged(null)
  }, [notificationShowed])

  // console.log(`min name: ${minName}, min number: ${minNumber}`)

  return (
    <BrowserRouter>
      <div className='bg-slate-800 text-white h-screen flex items-center justify-center flex-col'>
        <Navbar />
        <div>
          <div>
            {showInput && (
              <>
                <div
                  onClick={() => setShowInput(false)}
                  className='absolute inset-0  z-10'
                ></div>

                <PersonsForm
                  handleSubmit={handleSubmit}
                  newName={newName}
                  setNewName={setNewName}
                  newNumber={newNumber}
                  setNewNumber={setNewNumber}
                  handleDelete={handleDelete}
                />
              </>
            )}
          </div>
        </div>
        <div className='mt-12 w-auto  mx-auto'>
          <PersonsTable
            persons={persons}
            setUsersToDelete={setUsersToDelete}
            idsChecked={idsChecked}
            handleCheckbox={handleCheckbox}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <BtnAdd setShowInput={setShowInput} />
    </BrowserRouter>

    // {notificationShowed && (
    //   <Notification
    //     persons={persons}
    //     numberChanged={numberChanged}
    //     isError={isError}
    //   />
    // )}
    // <div>
    //   Filter shown with{' '}
    //   <input
    //     value={filterValue}
    //     onChange={(e) => setFilterValue(e.target.value)}
    //   />
    // </div>

    // <h2>Numbers</h2>
  )
}

export default App

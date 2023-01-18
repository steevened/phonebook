import { useEffect, useState } from 'react'
import './App.css'
import PersonsForm from './components/PersonsForm'
import personsService from './services/persons'
import Notification from './components/Notification'
import PersonsTable from './components/PersonsTable'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import BtnAdd from './components/buttons/BtnAdd'
import Loader from './components/Loader'
import RepeatedAlert from './components/RepeatedAlert'

function App() {
  const [persons, setPersons] = useState([])
  // const [noPerson, setNoPerson] = useState(false)
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [nameRepeated, setNameRepeated] = useState(null)
  const [showNameModal, setShowNameModal] = useState(false)
  const [loaderTime, setLoaderTime] = useState(true)
  const [intervalId, setIntervalId] = useState(null)

  // const [notificationShowed, setNotificationShowed] = useState(false)
  const [numberChanged, setNumberChanged] = useState(null)
  const [isError, setIsError] = useState(false)
  const [minName, setMinName] = useState(false)
  const [minNumber, setMinNumber] = useState(false)
  const [numberForm, setNumberForm] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [usersToDelete, setUsersToDelete] = useState([])
  const [idsChecked, setIdsChecked] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isShort, setIsShort] = useState(false)
  const [numberIsValid, setNumberIsValid] = useState(false)

  // useEffect(() => {
  //   let nameRepeatedFromArray = persons.find(
  //     (person) => person.name.toLowerCase() === newName.toLowerCase()
  //   )
  //   setNameRepeated(nameRepeatedFromArray)
  // }, [newName])

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

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const personObject = {
  //     name: newName,
  //     number: newNumber,
  //   }
  //   if (nameRepeated && newNumber) {
  //     const id = nameRepeated.id
  //     let phoneChanged = { ...nameRepeated, number: newNumber }
  //     const confirm = window.confirm(
  //       `${nameRepeated.name} is already added to phonebook, replace the old number with a new one?`
  //     )
  //     if (confirm) {
  //       setIsLoading(true)
  //       personsService
  //         .updatePerson(id, phoneChanged)
  //         .then((returnedPerson) => {
  //           setPersons(
  //             persons.map((person) =>
  //               person.id !== id ? person : returnedPerson
  //             )
  //           )
  //           setIsLoading(false)
  //         })
  //         .catch(() => setIsError(true))
  //       setNewName('')
  //       setNewNumber('')
  //       // setNotificationShowed(true)
  //       setNumberChanged(phoneChanged)
  //     }
  //   } else if (!newName) {
  //     alert(`Add a name`)
  //   } else if (!newNumber) {
  //     alert(`Add a number`)
  //   } else {
  //     if (!isShort) {
  //       // setNotificationShowed(true)
  //       setShowInput(false)
  //       setNumberChanged(null)
  //       setIsLoading(true)
  //       personsService
  //         .createPerson(personObject)
  //         .then((returnedPerson) => {
  //           setPersons(persons.concat(returnedPerson))
  //           setNewName('')
  //           setNewNumber('')
  //           setMinName(false)
  //           setMinNumber(false)
  //           setNumberForm(false)
  //           setIsLoading(false)
  //           setIsShort(false)
  //         })
  //         .catch((error) => {
  //           const { data } = error.response
  //           if (data.includes('name: ')) {
  //             setMinName(true)
  //           }
  //           if (data.includes('number: ')) {
  //             setMinNumber(true)
  //           }
  //           if (!data.includes('name: ') && data.includes('number: ')) {
  //             setMinName(false)
  //             setMinNumber(true)
  //           }
  //           if (data.includes('name: ') && !data.includes('number: ')) {
  //             setMinName(true)
  //             setMinNumber(false)
  //           }
  //           if (data.includes('number: Validator')) {
  //             setNumberForm(true)
  //           }
  //           // console.log(data)
  //         })
  //     } else {
  //       setIsShort(true)
  //     }
  //   }
  // }

  const handleTimeOut = (time) => {
    let timeOut = setTimeout(() => {
      setShowNameModal(null)
      setLoaderTime(true)
    }, time)
    return () => clearTimeout(timeOut)
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
      setLoaderTime(false)
      setNameRepeated(nameExist?.name)
      setShowNameModal(true)
      handleTimeOut(3000)
    } else {
      setNameRepeated(null)
      setShowNameModal(false)
      setShowInput(false)
      setIsLoading(true)
      personsService.createPerson(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMinName(false)
        setMinNumber(false)
        setIsLoading(false)
        setIsShort(false)
      })
    }
  }

  const handleNameChange = (e) => {
    setNameRepeated(null)
    setNewName(e.target.value)
  }

  useEffect(() => {
    setIsLoading(true)
    personsService.getPersons().then((initialPersons) => {
      setPersons(initialPersons)
      setIsLoading(false)
    })
    // .catch((error) => (error ? setNoPerson(true) : setNoPerson(false)))
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (notificationShowed) {
  //       setNotificationShowed(false)
  //     }
  //   }, 5000)
  //   // setNumberChanged(null)
  // }, [notificationShowed])

  // console.log(`min name: ${minName}, min number: ${minNumber}`)

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
          />
        </div>
      </div>
      <RepeatedAlert
        nameRepeated={nameRepeated}
        setShowNameModal={setShowNameModal}
        showNameModal={showNameModal}
        loaderTime={loaderTime}
        setLoaderTime={setLoaderTime}
      />
      <BtnAdd setShowInput={setShowInput} />
    </BrowserRouter>
  )
}

export default App

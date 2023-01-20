const InputNumber = ({ value, onChange, numberIsValid, setNumberIsValid }) => {
  const phoneNumberPattern = /^(\d{2}-\d{6}|\d{3}-\d{6})\d*$/
  return (
    <>
      <input
        pattern='^(\d{2}-\d{6}|\d{3}-\d{6})\d*$'
        title='Enter a valid phone number in the format: 00-000000 or 000-000000'
        minLength={10}
        maxLength={14}
        value={value}
        onChange={(e) => {
          setNumberIsValid(!phoneNumberPattern.test(e.target.value))
          onChange(e)
        }}
        required={true}
        className='w-full p-1 input-bordered text-[#f5f5f5] focus:outline-none peer input focus:border-[#00C896] px-5 rounded-lg'
      />
      {numberIsValid && (
        <p className='text-[#FF00FF] mt-2 ml-1 text-sm'>
          {' '}
          Phone number format should be xx-xxxxxx... or xxx-xxxxxx...
        </p>
      )}
    </>
  )
}

export default InputNumber

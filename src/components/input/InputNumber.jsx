const InputNumber = ({ value, onChange }) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        required={true}
        className='w-full p-1 input-bordered text-[#f5f5f5] focus:outline-none peer input focus:border-[#00C896] px-5 rounded-lg'
      />
    </>
  )
}

export default InputNumber

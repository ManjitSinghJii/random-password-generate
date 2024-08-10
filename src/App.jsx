import { useState, useRef } from "react";
import 'remixicon/fonts/remixicon.css'
const App = ()=> {

  const el = useRef(null)
  const [copy, setCopy] = useState(false)
  const [value, setValue] = useState(8)
  const [newPassword, setNewPassword] = useState(null)

  const generatePassword = (e)=>{
    e.preventDefault()
    let password = ''
    const pattern = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890@#$%&"
    for(let i=0; i<value; i++)
    {
      const index = Math.floor(Math.random() * pattern.length)
      password = password + pattern[index]
    }
    setNewPassword(password)
  }

  const copyPassword = ()=> {
    const input = el.current;
    input.select()
    navigator.clipboard.writeText(input.value);
    setCopy(true)

    setTimeout(()=>{
      setCopy(false)
      window.getSelection().removeAllRanges()
    },3000)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[600px]">
        <h1 className="text-4xl font-bold text-center">Random <span className="text-blue-600">Password Generator</span></h1>
        <p className="text-base text-center mt-3 mb-12">By Your System</p>
        <form className="flex flex-col gap-4" onSubmit={generatePassword}>
          <input 
            type="number" 
            className="border border-gray-400 p-3 rounded"
            placeholder="Enter Password Length.."
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
          <button className="bg-violet-600 p-3 text-white rounded">Generate</button>
        </form>

        {
          newPassword &&
          <div className="mt-6 bg-rose-200 p-3 rounded-lg flex justify-between">
            <input 
              ref={el}
              value={newPassword} 
              className="bg-transparent focus:outline-none" 
              readOnly
            />
            <div className="space-x-2">
              <button onClick={copyPassword}>
                {
                  copy ? <i className="ri-check-double-line"></i> : <i className="ri-file-copy-line"></i>
                }
              </button>
              <button onClick={()=>setNewPassword(null)}>
                <i class="ri-close-circle-fill"></i>
              </button>
            </div>
          </div>
        }
        {
          (newPassword && copy) &&
          <p className="text-center mt-2 font-medium text-indigo-600 text-lg">Copied !</p>
        }
      </div>
    </div>
  )
}

export default App;
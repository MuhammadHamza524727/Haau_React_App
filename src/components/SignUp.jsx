// import React, { useState } from 'react'
// import { supabase } from '../supabaseClient'
// import { Link, useNavigate } from 'react-router-dom'
// import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'

// const SignUp = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [passwordStrength, setPasswordStrength] = useState("")
//   const [fullName, setFullName] = useState("");


//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: fullName, // 👈 custom field sent to user_metadata
//           },
//         },
//       })
//       if (error) {
//         console.log(error.message, "supabase error");
//         alert("getting error")
//       }
//       else {
//         console.log(data, "SignUp successfull data");
//         alert("SignUp successfull")
//         navigate("/dashboardpage")
//       }
//     } catch (error) {
//       console.log("unexpected Error", error.message);
//       alert("code error")
//     }
//   }

//   const checkStrength = (value) => {
//     setPassword(value)
//     if (value.length < 6) {
//       setPasswordStrength("Weak")
//     } else if (value.match(/[A-Z]/) && value.match(/[0-9]/) && value.match(/[@$!%*?&]/)) {
//       setPasswordStrength("Strong")
//     } else {
//       setPasswordStrength("Medium")
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md">
//         <div className="flex justify-center mb-2">
//           <div>
//             <img
//               src="/src/assets/images/logo.svg"
//               alt="HAAU LOGO"
//               className="h-[100px] w-[100px] rounded-full border-0"
//             />
//           </div>
//         </div>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>


//             <input
//               type="text"
//               className="..."
//               required
//               placeholder='Full name'
//               onChange={(e) => setFullName(e.target.value)}

//             />

//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email address</label>
//             <input
//               type="email"
//               placeholder="info@yourmail.com"
//               className="w-full rounded-md focus:border-blue-500 border-gray-300 px-4 shadow-sm py-2 pl-4 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               className="w-full rounded-md focus:border-blue-500 border-gray-300 px-4 shadow-sm py-2 pl-4 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
//               onChange={(e) => checkStrength(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//             {password && (
//               <p className={`text-xs mt-1 ${passwordStrength === "Weak"
//                 ? "text-red-500"
//                 : passwordStrength === "Medium"
//                   ? "text-yellow-500"
//                   : "text-green-500"
//                 }`}>
//                 <div className='flex justify-start text-md px-2 items-center'>
//                   Strength: {passwordStrength}
//                 </div>
//               </p>
//             )}
//           </div>

//           <div className="text-center">
//             <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
//           >
//             Register
//           </button>
//         </form>

//         <div className="flex items-center my-4">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="mx-2 text-gray-400">Or signup with</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         <button
//           className="w-full bg-blue-800 text-white rounded-md py-2 flex items-center justify-center space-x-2 hover:bg-blue-850"
//         >
//           <FaGoogle size={18} color="white" /><span>Sign in with Google</span>
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           <Link to="/loginpage">
//             Already have an account? <span className="text-blue-600 hover:underline">Sign In</span>
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default SignUp


import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")  // ✅ full name state
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName  // ✅ send to user_metadata
          }
        }
      })
      if (error) {
        console.log(error.message, "supabase error");
        alert("getting error")
      }
      else {
        console.log(data, "SignUp successful data");
        alert("SignUp successful")
        navigate("/dashboardpage")
      }
    } catch (error) {
      console.log("unexpected Error", error.message);
      alert("code error")
    }
  }

  const checkStrength = (value) => {
    setPassword(value)
    if (value.length < 6) {
      setPasswordStrength("Weak")
    } else if (value.match(/[A-Z]/) && value.match(/[0-9]/) && value.match(/[@$!%*?&]/)) {
      setPasswordStrength("Strong")
    } else {
      setPasswordStrength("Medium")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-2">
          <div>
            <img
              src="/src/assets/images/logo.svg"
              alt="HAAU LOGO"
              className="h-[100px] w-[100px] rounded-full border-0"
            />
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full rounded-md focus:border-blue-500 border-gray-300 px-4 shadow-sm py-2 pl-4 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
              required
              placeholder='Full name'
              onChange={(e) => setFullName(e.target.value)}  // ✅ bind to state
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="info@yourmail.com"
              className="w-full rounded-md focus:border-blue-500 border-gray-300 px-4 shadow-sm py-2 pl-4 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-md focus:border-blue-500 border-gray-300 px-4 shadow-sm py-2 pl-4 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
              onChange={(e) => checkStrength(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {password && (
              <p className={`text-xs mt-1 ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}>
                <div className='flex justify-start text-md px-2 items-center'>
                  Strength: {passwordStrength}
                </div>
              </p>
            )}
          </div>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400">Or signup with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          className="w-full bg-blue-800 text-white rounded-md py-2 flex items-center justify-center space-x-2 hover:bg-blue-850"
        >
          <FaGoogle size={18} color="white" /><span>Sign in with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          <Link to="/loginpage">
            Already have an account? <span className="text-blue-600 hover:underline">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp

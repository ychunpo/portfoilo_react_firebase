// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserAuth } from './AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { signIn } = UserAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('')
//     try {
//       await signIn(email, password)
//       navigate('/panel')
//     } catch (e) {
//       setError(e.message)
//       console.log(e.message)
//     }
//   };

//   return (
//     <div className=''>
//       <div>
//         <h1 className=''>Account</h1>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className=''>
//           <label className=''>Email Address</label>
//           <input onChange={(e) => setEmail(e.target.value)} className='' type='email' />
//         </div>
//         <div className=''>
//           <label className=''>Password</label>
//           <input onChange={(e) => setPassword(e.target.value)} className='' type='password' />
//         </div>
//         <button className=''>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
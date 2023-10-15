import { useState } from 'react';
import { signIn, getCsrfToken  } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {registerUser} from "../services/userServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const [signUpError, setError] = useState(null);
    const router = useRouter();

    // useEffect(()=>{
    //     async function login(){
    //         const res = await signIn('credentials', {
    //             redirect: false,
    //             username: "sakshi123456@gmail.com",
    //             password: "123456",
    //             callbackUrl: `${window.location.origin}`,
    //           });
    //           console.log("REsponse" , res)
    //           if (res?.error) {
    //             setError(res.error);
    //           } else {
    //             setError(null);
    //           }
    //     }
    //     login();
    // })
  return (
    <>
       <ToastContainer/>
    <Formik
      initialValues={{ name:'' ,username: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Please enter your name'),
        username: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .email('Invalid email address')
          .required('Please enter your email'),
        password: Yup.string().required('Please enter your password'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        var {user , error} = await registerUser(values.name , values.username , values.password)
        if(user)
        {
             await signIn('credentials', {
                redirect: false,
                username: values.username,
                password: values.password,
                callbackUrl: `${window.location.origin}`
              });
              // console.log("signup response" ,res , "loading" , submitting)
              // if (res?.error) {
              //   setError(res.error);
              // } else {
              //   setError(null);
                // console.log("signup successfull")
                // router.push("../Home");
              //}
              // if (res.url)
              //  {
              //    console.log("res url" , res.url)
              //    router.push(res.url);
              //  }
              //  if(!error)
              //  {
              //    console.log("res url" , res.url)
              //    router.push(res.url);
              //  }
               
              setSubmitting(false);
            
        }
        
        else
        {
           setSubmitting(false);
           toast.error( error , {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        }
 
        if(signUpError == null)
          router.push(window.location.origin);
    }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
          <h1 className='heading'> Sign Up</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
              />

              <div className="text-red-400 text-md text-center rounded p-2">
                {error}
              </div> */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="uppercase text-sm text-black font-bold"
                >
                  Name
                  <Field
                    name="name"
                    aria-label="enter your name"
                    aria-required="true"
                    type="text"
                    className="w-full border-black mt-2 p-3 border-x border-y rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </label>

                <div className="text-red-600 text-sm">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="uppercase text-sm text-black font-bold"
                >
                  Email
                  <Field
                    name="username"
                    aria-label="enter your email"
                    aria-required="true"
                    type="text"
                    className="w-full border-black mt-2 p-3 border-x border-y rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </label>

                <div className="text-red-600 text-sm">
                  <ErrorMessage name="username" />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="uppercase text-sm text-black font-bold"
                >
                  password
                  <Field
                    name="password"
                    aria-label="enter your password"
                    aria-required="true"
                    type="password"
                    className="w-full border-black border-x border-y mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </label>

                <div className="text-red-600 text-sm">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className='buttonInvert w-full formButton'
                >
                  {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                </button>
              </div>
            </div>
          <span onClick={()=>signIn()}>Already have a account? login here</span>
          </div>
        </form>
        
      )}
       
    </Formik>
    
  </>
  )
}
// export async function getServerSideProps(context) {
//     return {
//       props: {
//         csrfToken: await getCsrfToken(context),
//       },
//     };
//   }

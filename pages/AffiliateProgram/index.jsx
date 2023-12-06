// Mahaavtar babaji ki jai !!!
import React from 'react'
import styles from './index.module.css'
import { Footer } from '../../components'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn, getCsrfToken  } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import { Alert } from '@mui/material';

// const BASE_URL = 'https://www.thedistinguishedsociety.com/internal/api/users'
const BASE_URL = 'https://api.thedistinguishedsociety.com/internal/api/users'

export default function index() {
    const router = useRouter();
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false)
  return (
    <>
      <Head>
        {/* <meta name="description" content="Distinguished Society is for the upcoming visionaries, the ones who speak with their art and creativity. The ones who choose the harder path for a greater purpose. The ones who believe that creativity is the measure of a persons greatness. The Creative Geniuses."  ></meta> */}
        <meta
          name="keywords"
          content="distinguished,distinguished society,tee of greatness,
            underrated visionaries,art,creativity,The Creative Geniuses,
            t-shirts,Nikola Tesla Beige Tee,Oversized Fit Tee,
            Heavy Ribbed Neck,Oversized Fit Tee with Heavy Ribbed Neck,
            The Tee of Peace,Puff Print,Tee with Puff Print,
            The Creators Tote Bag,Tote bag,creators tee,
            unfinished clothing brand,legacy brand,
            miseducated,Unfinished,distinguished tshirt,
            tshirt distinguished,distinguished bags,
            distinguished tote bags,distinguished society tshirt,
            tshirt distinguished society,distinguished society tote bags,
            the distingushed society"
        />
        <meta name="robots" content="all" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Affiliate Program | Distinguished Society</title>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.heading}>Affiliate Program</h1>
        <hr className={styles.line}></hr>
        {isSubmitted && <Alert onClose={() => {setIsSubmitted(false)}}>Your Application is submitted. We will get back to you soon!</Alert>}
        <h3 className={styles.subheading}>Application Form</h3>

        <>
          <Formik
            initialValues={{ fullName: '', email: '', age: '', instagramUsername: '', reason: '' }}
            validationSchema={Yup.object({
              fullName: Yup.string()
                .min(4, 'Must be 4 characters or more')
                .max(50, 'Must be 50 characters or less')
                .required('Please enter your name.'),
              email: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .email('Invalid email address')
                .required('Please enter your email.'),
                age: Yup.number().min(10).required('Please enter your age.'),
                instagramUsername: Yup.string().required('Please enter your Instagram Username.'),
                reason: Yup.string().min(50, 'Must be 50 characters or more').required('This field is requied.'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const body = {
                ...values
              }
              const res = await axios.post(`${BASE_URL}/affiliateProgramRegistration`, body)
              if (res?.error) {
                setError(res.error)
              } else {
                setError(null)
                setIsSubmitted(true)
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              setSubmitting(false)
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col justify-center py-2">
                  <div className="  w-full">
                    <div className="text-md rounded p-2 text-center text-red-400">
                      {error}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="fullName"
                        className="text-sm font-bold uppercase text-black"
                      >
                        Full Name
                        <Field
                          name="fullName"
                          aria-label="enter your email"
                          aria-required="true"
                          type="text"
                          className="focus:shadow-outline mt-2 w-full rounded border-x border-y border-black p-3 focus:outline-none"
                        />
                      </label>

                      <div className="text-sm text-red-600">
                        <ErrorMessage name="fullName" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="text-sm font-bold uppercase text-black"
                      >
                        Email
                        <Field
                          name="email"
                          aria-label="enter your email"
                          aria-required="true"
                          type="text"
                          className="focus:shadow-outline mt-2 w-full rounded border-x border-y border-black p-3 focus:outline-none"
                        />
                      </label>

                      <div className="text-sm text-red-600">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="age"
                        className="text-sm font-bold uppercase text-black"
                      >
                        Age
                        <Field
                          name="age"
                          aria-label="enter your email"
                          aria-required="true"
                          type="number"
                          className="focus:shadow-outline mt-2 w-full rounded border-x border-y border-black p-3 focus:outline-none"
                        />
                      </label>

                      <div className="text-sm text-red-600">
                        <ErrorMessage name="age" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="instagramUsername"
                        className="text-sm font-bold uppercase text-black"
                      >
                        Instagram Username
                        <Field
                          name="instagramUsername"
                          aria-label="enter your email"
                          aria-required="true"
                          type="text"
                          className="focus:shadow-outline mt-2 w-full rounded border-x border-y border-black p-3 focus:outline-none"
                        />
                      </label>

                      <div className="text-sm text-red-600">
                        <ErrorMessage name="instagramUsername" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="reason"
                        className="text-sm font-bold uppercase text-black"
                      >
                        Why do you want to be a part of Distinguished Society
                        <Field
                          name="reason"
                          aria-label="enter your email"
                          aria-required="true"
                          type="text"
                          as="textarea"
                          rows={10}
                          className="focus:shadow-outline mt-2 w-full rounded border-x border-y border-black p-3 focus:outline-none"
                        />
                      </label>

                      <div className="text-sm text-red-600">
                        <ErrorMessage name="reason" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className="buttonInvert formButton w-full"
                      >
                        {formik.isSubmitting ? 'Please wait...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </>

        <h3 className={styles.subheading}>CONTACT INFORMATION</h3>
        <p>
          Any Questions? Do reach us out at - 
          {/* <br /> */}
          <a
            href="mailto:support@thedistinguishedsociety.com"
            className={styles.link}
          >
             support@thedistinguishedsociety.com
          </a>
        </p>
      </div>
      <Footer />
    </>
  )
}

'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const {data: session} = useSession();

  // initialize providers
  const [providers, setProviders] = useState(null)
  useEffect(() => {
    async function fetchProviders (){
      const response = await getProviders();
      setProviders(response);
    }
    fetchProviders();
  }, [])

  useEffect(() => {
    console.log(providers)
  },[providers])

  const [isDropdownToggled, setIsDropdownToggled] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 p-3">
      <Link className="flex gap-2 flex-center" href='/'>
        <Image
          src='/assets/images/logo.svg'
          width={30}
          height={30}
          alt="logo"
          className="object-contain"
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Nav Bar */}
      <div className="sm:flex hidden">
        {session?.user?
          <div className="
            flex
            gap-3
            md:gap-5
          ">
            <Link className="black_btn" href="/create-post">
              Create Post
            </Link>
            <button 
            type="button"
            onClick={signOut}
            className="outline_btn">
              Sign Out
            </button>
            <Link href='/profile'>
              <Image 
              src='/assets/images/logo.svg'
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              />
            
            </Link>
          </div>
          :<>
            {providers &&
              Object.values(providers).map(
                (provider)=>(
                  <button className="black_btn"
                    type="button"
                    key={provider.name}
                    onClick={()=>signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                )
              )
            }
          </>
        }
      </div>

      {/* Mobile Nav Bar */}
      <div className="sm:hidden flex relative">
        {session?.user?(
          <div className="flex">
                <Image 
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
                onClick={()=>setIsDropdownToggled((prev)=>!prev)}
                />
            {/* dropdown menu */}
            {isDropdownToggled &&(
              <div className="dropdown">
                <Link className="dropdown_link"
                  href='/profile'
                  onClick={()=>setIsDropdownToggled(false)}
                >
                  My Profile
                </Link>
                <Link className="dropdown_link"
                  href='/create-post'
                  onClick={()=>setIsDropdownToggled(false)}
                >
                  Create Post 
                </Link>
                <button
                  type="button"
                  onClick={()=>{
                    setIsDropdownToggled(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out 
                </button>
              </div>
            )}
          </div>
        ):(
          <>
          {providers &&
              Object.values(providers).map(
                (provider)=>(
                  <button className="black_btn"
                    type="button"
                    key={provider.name}
                    onClick={()=>signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                )
              )
            }
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
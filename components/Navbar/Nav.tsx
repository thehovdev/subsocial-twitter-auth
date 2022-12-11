import React from "react";
import NavStyled from './Nav.styled'
import {signIn, signOut, useSession} from "next-auth/react";
export default function Nav() : JSX.Element {
  const { data: session } = useSession()
  if (session && session.user) {
    return (
        <NavStyled>
        <div>
          <small>
            Signed in as {session.user.email} <br />
          </small>
          <a href={'#'} onClick={() => signOut()}>Sign out</a>
        </div>
      </NavStyled>
    )
  }
  return (
    <NavStyled>
      <div>
        <small>
          Not signed in <br />
        </small>
        <a href={'#'} onClick={() => signIn()}>Sign in</a>
      </div>
    </NavStyled>
  )
}

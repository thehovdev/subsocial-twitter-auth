import TweetsContainerStyled from "./TweetsContainer.styled";
import TweetsStyled from "./Tweets.styled";
import React from "react";
import {useGetTweetsQuery} from '../../slices/twitterSlice'
import {useSaveContentMutation} from "../../slices/subSocialSlice";
import {UseMutationStateOptions} from "@reduxjs/toolkit/src/query/react/buildHooks";
import {useSession} from "next-auth/react";
import {Tweet} from "../../interfaces/iTweet";

export default function Tweets() : JSX.Element {
  const { data: session } = useSession()
  const [saveContent, { status }] = useSaveContentMutation()
  const {
    data,
    isLoading
  } = useGetTweetsQuery({})

  const updateTweet = (tweet: Tweet) => {
    // saveTweet(tweet)
    saveContent(tweet)
  }

  return <div>
          {!session && (
            <span> Please sign by clicking button on the Navigation Bar</span>
          )}
          {session?.user && (

            isLoading ? <h1>Loading...</h1> :
              <>
                <div><small>click to any tweet for create backup</small></div>
                <div><small>{'Backup status: ' + status}</small></div>
                <TweetsContainerStyled>
                  {
                    data.map((tweet:Tweet) =>
                      <TweetsStyled key={tweet.id} onClick={() => updateTweet(tweet)}>
                        <p>{tweet.text}</p>
                      </TweetsStyled>
                    )
                  }
                </TweetsContainerStyled>
              </>
          )}
        </div>
}
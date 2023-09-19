// The following code is written in TypeScript and uses React hooks for state management.
// It also uses the Next.js Image component for optimized image handling.
// The main functionality of the code is to take a user's input, send it to an API for processing,
// and then display the results. The results are images generated based on the user's input.
// The code also handles various states of the application, such as loading, error, and success states.

// The following line is used to set the client-side environment
'use client'

// Importing necessary libraries and components
// useState is a Hook that lets you add React state to function components
import { useState } from 'react';

// Next.js's Image component is an extension of the HTML <img> element, evolved for the modern web.
import Image from 'next/image'

// Button, Label, Input, Skeleton are custom UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from '@/components/ui/skeleton';

// ReloadIcon is an icon component
import { ReloadIcon } from "@radix-ui/react-icons"

// Logo, Dialog, Bg are custom components
import Logo from "@/components/logos/logo"

// Bars3Icon, XMarkIcon are icon components
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// sleep is a utility function that pauses execution for a specified time
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Prediction is an interface that defines the shape of prediction data
interface Prediction {
  output: string[];
  status: string;
  id: string;
  detail?: string;
}

// Main function component
export default function Home() {

  // State variables for message, translated data and audio source
  // useState returns a stateful value, and a function to update it.
  const [message, setMessage] = useState("");
  const [predictionOn, setPredictionOn] = useState(false);

  // prediction and error are state variables that hold prediction data and error message respectively
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to handle input change and set message state
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Function to handle button click and perform translation
  const handleButtonClick = async () => {
    if (message) {

      setError(null);
      if (message.length > 2000) {
        setError('Your message exceeds the 2000 characters limit. Please shorten your message and try again.');
        return;
      }

      setPredictionOn(true);

      const prompt = 'in the style of TOK,' + message + ' as a tattoo';


      // Adding message as a param
      const apiRoute = `/api/prediction`;


      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      };
      try {
        // Fetching response from API
        let response = await fetch(apiRoute, options);
        if (!response.ok) {
          if (response.status === 429) {
            setError('You have reached your request limit for the hour. Try again after sometime.');
            setPredictionOn(false);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        }
        // Parsing response data
        let prediction = await response.json();


        if (response.status !== 201) {
          setError(prediction.detail);
          setPredictionOn(false);
          return;
        }



        if (!!prediction) {
          // Setting translated data state
          setPrediction(prediction);
          console.log(prediction.id)
          // Calling text to speech function
          let predictionsIdUrl = "/api/predictionState" + "/" + prediction.id;

          while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
          ) {
            await sleep(2000);
            response = await fetch(predictionsIdUrl);
            prediction = await response.json();
            if (response.status !== 200) {
              setError(prediction.detail);
              return;
            }
            setPrediction(prediction);
            if (prediction.status === "succeeded") {
              setPredictionOn(false);
            }

          }

        } else {
          setPrediction(null);
          setPredictionOn(false);
        }

      } catch (error) {
        setPredictionOn(false);
        if (error instanceof Error) {
          console.log('There was a problem with the fetch operation: ' + error.message);
        }
      }

    } else {
      setError('No text entered. Please enter a prompt and try again.');

    }
  };

  // ImageComponent is a functional component that takes a src prop and returns an Image component
  const ImageComponent = ({ src }: { src: string }) => (
    <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100  border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:rotate-2 sm:hover:rotate-0">
      <Image
        alt="Predictions"
        loading="lazy"
        width={228}
        height={320}
        src={src}
        decoding="async"
        data-nimg={1}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ color: "transparent" }}
        sizes="(min-width: 640px) 18rem, 11rem"
      />
    </div>
  );

  // Rendering component
  return (

    <div className="relative min-h-screen">

      {/* <Bg className="absolute inset-0 w-full" /> */}

      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <span className="sr-only">Tattoo Ideas</span>
            <Logo className="inline-block h-6 w-auto" />
          </div>
        </nav>
      </header>

      <div className="relative isolate overflow-hidden pt-14">

        <div className="mx-auto  py-32 sm:py-48">

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl leading-16">
              Tattoo Ideas by A.I
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl text-center mx-auto">
              Crafting unique tattoos with a digital touch. Dive into a world where AI meets ink, bringing you cutting-edge designs tailored just for you.

            </p>
            <div className="mt-8 flex items-center justify-center">
              <div className="w-full max-w-lg items-center pt-8 pb-2 px-4">
                <Input type="text" id="message" onChange={handleInputChange} placeholder="Eg.: Tiger on the horizon" />
                <p className="text-sm text-red-600 pt-2">
                  {error}
                </p>
                <Button onClick={handleButtonClick} disabled={predictionOn} className='mt-4 w-full sm:w-1/3'>
                  {predictionOn && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                  Go
                </Button>
              </div>

            </div>
            {prediction && prediction.status !== "succeeded" &&

              <div className="mt-16 sm:mt-20">
                <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                  <Skeleton className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:rotate-2 sm:hover:rotate-0" />
                  <Skeleton className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl  border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:-rotate-2 sm:hover:rotate-0" />
                  <Skeleton className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl   border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:rotate-2 sm:hover:rotate-0" />
                  <Skeleton className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl   border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:rotate-2 sm:hover:rotate-0" />
                </div>
              </div>

            }


            {prediction && prediction.output &&
             <div className="mt-16 sm:mt-20">
             <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                <ImageComponent src={prediction.output[prediction.output.length - 1]} />
                <ImageComponent src={prediction.output[prediction.output.length - 2]} />
                <ImageComponent src={prediction.output[prediction.output.length - 3]} />
                <ImageComponent src={prediction.output[prediction.output.length - 4]} />
                </div>
              </div>
                
            }

            {!prediction &&
              <div className="mt-16 sm:mt-20">
                <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                  <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100  border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:rotate-2 sm:hover:rotate-0">
                    <Image
                      alt=""
                      loading="lazy"
                      width={3744}
                      height={5616}
                      decoding="async"
                      data-nimg={1}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ color: "transparent" }}
                      sizes="(min-width: 640px) 18rem, 11rem"
                      src="/images/tree.webp"
                    />
                  </div>
                  <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100  border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:-rotate-2 sm:hover:rotate-0">
                    <Image
                      alt=""
                      loading="lazy"
                      width={3936}
                      height={2624}
                      decoding="async"
                      data-nimg={1}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ color: "transparent" }}
                      sizes="(min-width: 640px) 18rem, 11rem"
                      src="/images/dog.webp"
                    />
                  </div>
                  <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100  border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:rotate-2 sm:hover:rotate-0">
                    <Image
                      alt=""
                      loading="lazy"
                      width={5760}
                      height={3840}
                      decoding="async"
                      data-nimg={1}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ color: "transparent" }}
                      sizes="(min-width: 640px) 18rem, 11rem"
                      src="/images/space.webp"
                    />
                  </div>
                  <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100  border-2 border-white sm:w-72 sm:rounded-2xl rotate-0 sm:rotate-2 sm:hover:rotate-0">
                    <Image
                      alt=""
                      loading="lazy"
                      width={2400}
                      height={3000}
                      decoding="async"
                      data-nimg={1}
                      className="absolute inset-0 h-full w-full object-cover border-stone-400"
                      style={{ color: "transparent" }}
                      sizes="(min-width: 640px) 18rem, 11rem"
                      src="/images/samurai.webp"
                    />
                  </div>

                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </div>




  )
}



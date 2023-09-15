
'use client'
// Importing necessary libraries and components
import { useState } from 'react';
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import  Logo  from "@/components/logos/logo"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface Prediction {
  output: string[];
  status: string;
  id: string;
  detail?: string;
}

// Main function component
export default function Home() {

  // State variables for message, translated data and audio source
  const [message, setMessage] = useState("");
  const [translatedData, setTranslatedData] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [maxLengthReached, setMaxLengthReached] = useState(false);

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to handle input change and set message state
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    if (event.target.value.length > 2000) {
      setMaxLengthReached(true);
    } else {
      setMaxLengthReached(false);
    }
  };

  // Function to handle button click and perform translation
  const handleButtonClick = async () => {
    if (message) {

      if (message.length > 2000) {
        return;
      }

      const prompt = 'in the style of TOK,'+ message+'as a tattoo in the back';

      // Resetting audio source
      setAudioSrc("");

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
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parsing response data
        let prediction = await response.json();

        if (response.status !== 201) {
          setError(prediction.detail);
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
      console.log({ prediction })
      setPrediction(prediction);
    }
          
        } else {
          setPrediction(null);
        }

      } catch (error) {
        if (error instanceof Error) {
          console.log('There was a problem with the fetch operation: ' + error.message);
        }
      }

    }
  };


  // Function to convert translated text to speech
  const handleTextToSpeech = async (translatedData: string) => {
    // Adding translated data as a param
    const apiRoute = `/api/textToSpeech`;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ text: translatedData }),
    };
    try {
      // Fetching response from API
      const response = await fetch(apiRoute, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parsing response data
      const data = await response.blob();

      // Setting audio source state
      setAudioSrc(URL.createObjectURL(data));

    } catch (error) {
      if (error instanceof Error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
      }
    }
  };

  const currentYear = new Date().getFullYear();


  // Rendering component
  return (
    <div>
      <main className="relative isolate bg-white">


        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">



          <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-38 lg:my-10">



            <div className="group block flex-shrink-0">
              <div className="flex items-center pb-8">
                <div>
                  {/* <svg className="inline-block h-9 w-9 rounded-full" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M250 125C250 194.036 194.036 250 125 250C55.9644 250 0 194.036 0 125C0 55.9644 55.9644 0 125 0C194.036 0 250 55.9644 250 125Z" fill="#1E1E1E" />
                    <path d="M66.2 122.5H76.7C77.2 117.8 77.55 113.95 77.75 110.95C77.95 107.95 78.05 104.85 78.05 101.65C78.05 94.95 77.15 90.45 75.35 88.15C73.55 85.75 70.9 84.55 67.4 84.55C64.9 84.55 62.65 85.3 60.65 86.8C58.65 88.3 57.65 90.35 57.65 92.95C57.65 95.55 58.7 97.7 60.8 99.4C62.9 101.1 65.05 102.55 67.25 103.75V105.4C66.25 105.5 65.5 105.6 65 105.7C64.6 105.7 64.35 105.7 64.25 105.7C58.45 105.7 53.95 103.95 50.75 100.45C47.55 96.95 45.95 92.9 45.95 88.3C45.95 85.2 46.75 82.6 48.35 80.5C49.95 78.4 51.95 76.8 54.35 75.7C56.85 74.6 59.35 74.05 61.85 74.05C65.65 74.05 69.25 75 72.65 76.9C76.05 78.7 79.05 81.15 81.65 84.25C84.35 87.35 86.45 90.75 87.95 94.45C89.45 98.15 90.2 101.8 90.2 105.4C90.2 108 90.15 110.85 90.05 113.95C89.95 117.05 89.85 119.9 89.75 122.5H119.15L119.45 87.25H98.45L93.35 77.5V76H144.5L149.6 85.75V87.25H132.05L132.35 170.5H130.85L118.85 162.7L119 133.75H88.7C88.1 139.05 87.5 142.8 86.9 145C86.4 147.2 85.2 148.3 83.3 148.3C81.7 148.3 79.7 147.55 77.3 146.05C75 144.45 72.7 142.45 70.4 140.05C68.1 137.65 66.2 135.2 64.7 132.7C63.2 130.2 62.45 128 62.45 126.1C62.45 125.1 62.75 124.25 63.35 123.55C63.95 122.85 64.9 122.5 66.2 122.5Z" fill="white" />
                    <path d="M189.623 87.25H172.073L172.373 171.25H170.873L158.873 163.45L159.473 87.25H146.273L141.173 77.5V76H184.523L189.623 85.75V87.25Z" fill="white" />
                  </svg> */}
                  <Logo className="inline-block h-20 w-20 rounded-full" />
                  
                </div>
                <div className="ml-3">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tatto Ideas</h2>
                </div>
              </div>
            </div>



            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Enter Text - पाठ दर्ज करें</Label>
                  <div className="mt-2.5">
                    <Textarea rows={12} placeholder="Enter Text any language. - किसी भी भाषा में पाठ दर्ज करें" id="message" onChange={handleInputChange} className="appearance-none block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <p className={`text-sm text-muted-foreground pt-2 flex justify-end ${maxLengthReached ? 'text-red-500' : ''}`}>
                      Characters entered - पत्र दर्ज किये गये: {message.length}
                    </p>

                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={handleButtonClick}>Translate - अनुवाद</Button>
              </div>
            </div>

          </div>
          <div className="relative px-6 pb-20 pt-10 sm:pt-32 lg:static lg:px-8 lg:py-38">
          <div className="group block flex-shrink-0">
              <div className="flex items-center pb-8">
                <div>
                  <svg className="inline-block h-9 w-9 rounded-full" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M250 125C250 194.036 194.036 250 125 250C55.9644 250 0 194.036 0 125C0 55.9644 55.9644 0 125 0C194.036 0 250 55.9644 250 125Z" fill="#1E1E1E" />
                    <path d="M66.2 122.5H76.7C77.2 117.8 77.55 113.95 77.75 110.95C77.95 107.95 78.05 104.85 78.05 101.65C78.05 94.95 77.15 90.45 75.35 88.15C73.55 85.75 70.9 84.55 67.4 84.55C64.9 84.55 62.65 85.3 60.65 86.8C58.65 88.3 57.65 90.35 57.65 92.95C57.65 95.55 58.7 97.7 60.8 99.4C62.9 101.1 65.05 102.55 67.25 103.75V105.4C66.25 105.5 65.5 105.6 65 105.7C64.6 105.7 64.35 105.7 64.25 105.7C58.45 105.7 53.95 103.95 50.75 100.45C47.55 96.95 45.95 92.9 45.95 88.3C45.95 85.2 46.75 82.6 48.35 80.5C49.95 78.4 51.95 76.8 54.35 75.7C56.85 74.6 59.35 74.05 61.85 74.05C65.65 74.05 69.25 75 72.65 76.9C76.05 78.7 79.05 81.15 81.65 84.25C84.35 87.35 86.45 90.75 87.95 94.45C89.45 98.15 90.2 101.8 90.2 105.4C90.2 108 90.15 110.85 90.05 113.95C89.95 117.05 89.85 119.9 89.75 122.5H119.15L119.45 87.25H98.45L93.35 77.5V76H144.5L149.6 85.75V87.25H132.05L132.35 170.5H130.85L118.85 162.7L119 133.75H88.7C88.1 139.05 87.5 142.8 86.9 145C86.4 147.2 85.2 148.3 83.3 148.3C81.7 148.3 79.7 147.55 77.3 146.05C75 144.45 72.7 142.45 70.4 140.05C68.1 137.65 66.2 135.2 64.7 132.7C63.2 130.2 62.45 128 62.45 126.1C62.45 125.1 62.75 124.25 63.35 123.55C63.95 122.85 64.9 122.5 66.2 122.5Z" fill="white" />
                    <path d="M189.623 87.25H172.073L172.373 171.25H170.873L158.873 163.45L159.473 87.25H146.273L141.173 77.5V76H184.523L189.623 85.75V87.25Z" fill="white" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">भाषा पुल</h2>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg
                  className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      x="100%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                  <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                </svg>
              </div>

              {audioSrc && (
                <audio className="block w-full max-w-md mx-auto my-8" controls autoPlay>
                  <source src={audioSrc} type="audio/mpeg" />
                </audio>
              )}

             

              {prediction && (
          <div>
            {prediction.output && (
              <div>
                <Image
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                  width={1024}
                  height={1024}
                />
                 <Image
                  src={prediction.output[prediction.output.length - 2]}
                  alt="output"
                  width={1024}
                  height={1024}
                />
              </div>
            )}
            <p>status: {prediction.status}</p>
          </div>
        )}

            </div>
            <div className="absolute bottom-0 right-0 px-6 py-6">
              <p className="text-center text-xs leading-5 text-gray-500">

                &copy; {currentYear} Bhasa Bridge. All rights reserved.

              </p>
            </div>
          </div>

        </div>
      </main>

    </div>


  )
}




// import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { Field, Label, Switch } from "@headlessui/react";

import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../App";

export default function MainForm() {
  let navigate = useNavigate();
  let { blog_id } = useParams();

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const handleSubmit = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    e.preventDefault();

    const data = new FormData(e.target);

    const placeOfVisit = data.get("placeOfVisit");
    const purposeOfVisit = data.get("purposeOfVisit");
    const cpfNumber = data.get("cpfNumber");
    const location = data.get("location");

    console.log("location", location);

    console.log({ placeOfVisit, purposeOfVisit, cpfNumber });
    if (!placeOfVisit.length) {
      return toast.error("Write blog title before publishing");
    }

    // if (!tags.length) {
    //   return toast.error("Enter at least 1 tag to help us rank your blog");
    // }

    let loadingToast = toast.loading("Publishing....");

    e.target.classList.add("disable");

    let blogObj = {
      title: placeOfVisit,
      //   banner:"",
      des: "description",
      purpose_of_visit: purposeOfVisit,
      location: location,
      cpfnumber: cpfNumber,
      //   content:"",
      tags: ["tag1"],
      draft: false,
    };

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",
        { ...blogObj, id: blog_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        e.target.classList.remove("disable");

        toast.dismiss(loadingToast);
        toast.success("Published 👍");

        setTimeout(() => {
          navigate("/dashboard/blogs");
        }, 500);
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);

        return toast.error(response.data.error);
      });
  };

  //   const [agreed, setAgreed] = useState(false);

  return (
    <div className="isolate  px-6 py-24 sm:py-32 lg:px-8">
      <Toaster />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
          Create Requisition
        </h2>
        <p className="mt-2 text-lg leading-8 ">blah blah blah</p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="placeOfVisit"
              className="block text-sm font-semibold leading-6 "
            >
              placeOfVisit
            </label>
            <div className="mt-2.5">
              <input
                id="placeOfVisit"
                name="placeOfVisit"
                type="text"
                autoComplete="placeOfVisit"
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="purposeOfVisit"
              className="block text-sm font-semibold leading-6 "
            >
              purposeOfVisit
            </label>
            <div className="mt-2.5">
              <input
                id="purposeOfVisit"
                name="purposeOfVisit"
                type="text"
                autoComplete="purposeOfVisit"
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset text-black  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="cpfNumber"
              className="block text-sm font-semibold leading-6 "
            >
              cpfNumber
            </label>
            <div className="mt-2.5">
              <input
                id="cpfNumber"
                name="cpfNumber"
                type="text"
                autoComplete="cpfNumber"
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset text-black  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium "
            >
              Select an location
            </label>

            <div className="mt-2.5">
              <select
                required={true}
                name="location"
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a location</option>
                <option value="DEHRADUN">DEHRADUN</option>
                <option value="Delhi">DEHLI</option>
                <option value="FARIDABAD">FARIDABAD</option>
                <option value="XXX">XXX</option>
              </select>
            </div>
          </div>
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 "
            >
              Company
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset text-black  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 "
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset text-black  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 "
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
              </div>
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20  shadow-sm ring-1 ring-inset text-black  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 "
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset text-black  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div> */}
          {/* <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 ">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field> */}
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lets talk
          </button>
        </div>
      </form>
    </div>
  );
}

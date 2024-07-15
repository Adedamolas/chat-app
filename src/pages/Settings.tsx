import { useContext, useState } from "react";
import { AppContext } from "../helpers/Context";
import Loader from "../loader/Loader";
import { Description, Field, Input, Label, Switch } from "@headlessui/react";

export default function Settings() {
  const { loading, theme, setTheme } = useContext(AppContext);
  const [enabled, setEnabled] = useState(false)
  if (loading) {
    return (
      <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" w-full h-full space-y-5 flex flex-col align-middle justify-start place-items-middle py-48 sm:py-32 items-center">
      <div>
        <h2 className=" font-extrabold">Settings</h2>
      </div>
      <div className=" flex flex-col gap-4 px-44 w-full">
        <Field className=" flex flex-row w-full justify-between">
          <Label>Enable notifications</Label>
          <Description>
            Get notified about important changes in your projects.
          </Description>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-white"
          >
            <span className="size-4 translate-x-1 rounded-full bg-black p-2 transition group-data-[checked]:-translate-x-5" />
          </Switch>
        </Field>
        <Field className=" flex flex-row w-full justify-between">
          <Label>Dark Mode.</Label>
          <Description>If you like dark environments.</Description>
          <Switch
            checked={theme}
            onChange={setTheme}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-white"
          >
            <span className="size-4 translate-x-1 rounded-full bg-black p-2 transition group-data-[checked]:-translate-x-5" />
          </Switch>
        </Field>
        <Field>
          <Label>Name</Label>
          <Description>
            Use your real name so people will recognize you.
          </Description>
          <div className=" flex flex-col gap-3">
            <Input name="full_name" />
            <button type="submit">Submit</button>
          </div>
        </Field>
      </div>
    </div>
  );
}

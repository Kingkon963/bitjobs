import LondonAreaSelector from "@components/LondonAreaSelector";
import InputWrapper from "@components/common/InputWrapper";
import React from "react";

function PersonalInfo() {
  return (
    <div>
      <div className="grid grid-cols-2">
        <InputWrapper topLeft="What is your first name?">
          <input
            type="text"
            placeholder="Your first name"
            className="input-bordered input w-full max-w-xs"
          />
        </InputWrapper>
        <InputWrapper topLeft="What is your last name?">
          <input
            type="text"
            placeholder="Your last name"
            className="input-bordered input w-full max-w-xs"
          />
        </InputWrapper>
        <InputWrapper topLeft="What is your phone number?">
          <div className="join">
            <div className="flex items-center justify-center border bg-base-100 px-2">
              +440
            </div>
            <input
              type="text"
              placeholder="Your number"
              className="input-bordered input w-full max-w-xs flex-1 appearance-none"
            />
          </div>
        </InputWrapper>
        <InputWrapper topLeft="What is you Email?">
          <input
            type="text"
            placeholder="Your email"
            className="input-bordered input w-full max-w-xs flex-1 appearance-none"
          />
        </InputWrapper>
        <InputWrapper topLeft="Where do you live?">
          <LondonAreaSelector
            onSelect={(area) => {
              console.log(area);
            }}
            hideLabel={true}
          />
        </InputWrapper>
      </div>
    </div>
  );
}

export default PersonalInfo;

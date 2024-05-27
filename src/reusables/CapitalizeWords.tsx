// React component to display capitalized text
import React from 'react';

interface Props {
  text: string;
}
export default function CapitalizeWords({ text }: Props){
    function capitalizeFirstLetterOfEachWord(text: string) {
      return text
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }

  const capitalizedText = capitalizeFirstLetterOfEachWord(text);

  return (
    <div>
      {capitalizedText}
    </div>
  );
};
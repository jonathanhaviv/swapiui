import React from "react";

export const Character = ({ info }) => {
  const { name } = info;
  const fields = [
    "height",
    "mass",
    "hair_color",
    "birth_year",
    "gender",
    "homeworld"
  ];

  return (
    <article>
      <h3>Name: {name}</h3>
      <ul>
        {fields.map(field => {
          return (
            <li key={field} className="capitalize">
              {field.replace("_", " ")}: {info[field]}
            </li>
          )
        })}
      </ul>
    </article>
  )
}
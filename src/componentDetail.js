import React from 'react';

export default function (props) {
  const {
    name,
    description,
    source,
    readme,
  } = props;
  return (
    <div>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <h3>{readme.data}</h3>
      <h4>{source.data}</h4>
    </div>
  );
}

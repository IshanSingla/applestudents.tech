import React from 'react'
import {useParams} from "react-router-dom";

export default function Event() {
    var { id } = useParams();
  return (
    <div>{id}</div>
  )
}

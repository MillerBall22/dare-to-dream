import { useEffect, useState } from "react"
import { createUser, getUser, updateUser } from "../../utils/airtable/users"

export default function Test() {
  const [email, setEmail] = useState("");
  const updateUserTest = async () => {
    console.log(await getUser("miller"));
  }
  return (
    <div>
        <button onClick={updateUserTest}>Click here</button>
        <h1>{email}</h1>  
    </div>
  )
}

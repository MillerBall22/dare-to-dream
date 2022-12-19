import { useState } from "react"
import { getUser} from "../../utils/airtable/users"

export default function Test() {
  const [email, setEmail] = useState("");
  const updateUserTest = async () => {
    console.log("hello", await getUser("miller.keaton22@g.com"));
  }
  return (
    <div>
        <button onClick={updateUserTest}>Click here</button>
        <h1>{email}</h1>  
    </div>
  )
}

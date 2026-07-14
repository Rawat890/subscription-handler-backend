`What is IP address ?`
IP address is a unique number assigned to each device on the internet. It is used to identify the device on the network. There are 2 types of IP addresses: IPv4 and IPv6. 
`Difference between IP address and hostname`: The difference between IP address and hostname is that IP address is a unique number assigned to each device on the internet, while hostname is a name given to a computer or a network device.

IPV4 vs IPV5

APIS uses http methods or verbs to select what action to perform on a specific resource. There are multiple types of http methods -

GET: This method is used to retrieve data from a server
POST: This method is used to send data to a server
PUT: This method is used to update data on a server
DELETE: This method is used to delete data from a server

An endpoint can be defined as a specific resource on a server that can be accessed using HTTP methods. Endpoints are identified by their URL and the HTTP method used to access them.
Headers contains information about the request, such as the user agent, the accept type, and the authorization token.

Here How frontend communicates with backend -

`Frontend` - First creates a request that has to be sent to the server
example -
const requestOptions ={
 method="POST",
 headers:{"Content-Type":"application/json",
 Authorization: `Bearer ${token}`
 },
 body:JSON.stringify({
  name: "John Doe",
  email: "V6i0I@example.com",
  password: "password123"
 })
}

fetch("https://api.example.com/users", requestOptions)

`Backend` -

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  // Create a new user in the database
  res.status(201).json({ message: "User created successfully" });
})

`What are ORM ?`
ORM is an object-relational mapping (ORM) library that allows you to map database tables to JavaScript objects, and vice versa.

`Backend Architecture`
1. Monolithic Architecture - Single server that handles all requests. Easier to debug as everything is in one place. Simple to develop and deploy
Cons - Single point of failure, increased complexity, increased cost, increased maintenance, increased security risk
2. Microservices Architecture - Multiple servers that handle different parts of the application. Easier to scale, easier to manage, easier to deploy

Tech stack  -

Arcjet - 
Upstash -

`What is mongoose.session ?`
It is used to store session data in the database. Used to perform the atomic operations on db. They are the operations that perdorms the logic ALL or NOTHING
function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus} /> : 
        <CreateMsg setShow={setShow} setStatus={setStatus} />}
    />
  )
}

function CreateMsg(props){
  function logout() {
    loggedUser.email = '';
    loggedUser.balance = '';
    loggedUser.name = '';
    loggedUser.isLogged = false;

    document.getElementById('deposit').style.display='none';
    document.getElementById('withdraw').style.display='none'; 
    document.getElementById('logout').style.display='none'; 
    document.getElementById('create-account').style.display=''; 
    document.getElementById('login').style.display=''; 
    document.getElementById('welcome-message').innerHTML = '';

    props.setShow(true);
    props.setStatus('');
  }
  return(<>
    <h5>{status}</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={logout}>Logout</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    console.log(name,email,password);
    fetch(`/account/create/${name}/${email}/${password}/user`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      loggedUser.email = data.email;
      loggedUser.balance = data.balance;
      loggedUser.name = data.name;
      loggedUser.role = data.role;

      document.getElementById('deposit').style.display='';
      document.getElementById('withdraw').style.display=''; 
      document.getElementById('logout').style.display=''; 
      document.getElementById('create-account').style.display='none'; 
      document.getElementById('login').style.display='none'; 
      document.getElementById('welcome-message').innerHTML = `Welcome, ${loggedUser.name}`;
      
      props.setStatus('');
      props.setShow(false);
    })
    .catch(error => {
      console.log(error);
      props.setStatus(error);
    });

    props.setShow(false);
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}